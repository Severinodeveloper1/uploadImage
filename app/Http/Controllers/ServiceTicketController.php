<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignatureRequest;
use App\Http\Requests\StoreServiceTicketRequest;
use App\Http\Requests\UpdateRepairRequest;
use App\Models\Bucket;
use App\Models\DocumentType;
use App\Models\Project;
use App\Models\ServiceTicket;
use App\Services\StorageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceTicketController extends Controller
{
    public function __construct(
        private readonly StorageService $storageService,
    ) {}

    /**
     * Get or create the system bucket used for ticket photos.
     */
    private function ticketPhotoBucket(): Bucket
    {
        $project = Project::firstOrCreate(
            ['slug' => 'system-service-tickets'],
            [
                'user_id' => 1,
                'name' => 'Service Tickets (Sistema)',
                'is_active' => true,
                'storage_limit_mb' => 5120, // 5 GB
            ],
        );

        return Bucket::firstOrCreate(
            ['project_id' => $project->id, 'slug' => 'ticket-photos'],
            [
                'name' => 'Ticket Photos',
                'is_public' => false,
                'allowed_mime_types' => ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
                'max_file_size_mb' => 10,
            ],
        );
    }
    public function index(Request $request): Response
    {
        $user = $request->user();

        $tickets = ServiceTicket::with(['technician:id,name', 'documentType:id,name'])
            ->when(
                !$user->can('tickets.view_any'),
                fn ($q) => $q->where('technician_id', $user->id)
            )
            ->orderByDesc('created_at')
            ->paginate(15);

        return Inertia::render('tickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', ServiceTicket::class);

        return Inertia::render('tickets/Create', [
            'documentTypes' => DocumentType::where('is_active', true)->get(['id', 'name', 'code']),
        ]);
    }

    public function store(StoreServiceTicketRequest $request): RedirectResponse
    {
        $ticket = ServiceTicket::create([
            ...$request->safe()->except('accessories'),
            'technician_id' => $request->user()->id,
            'status' => 'draft',
        ]);

        // Guardar accesorios si los hay
        if ($request->has('accessories')) {
            foreach ($request->input('accessories', []) as $acc) {
                $ticket->accessories()->create($acc);
            }
        }

        return redirect()->route('tickets.show', $ticket)
            ->with('success', 'Ficha de servicio creada correctamente.');
    }

    public function show(ServiceTicket $ticket): Response
    {
        $this->authorize('view', $ticket);

        $ticket->load([
            'technician:id,name',
            'documentType:id,name,code',
            'accessories',
            'photos',
        ]);

        return Inertia::render('tickets/Show', [
            'ticket' => $ticket,
            'documentTypes' => DocumentType::where('is_active', true)->get(['id', 'name', 'code']),
        ]);
    }

    public function edit(ServiceTicket $ticket): Response
    {
        $this->authorize('update', $ticket);

        $ticket->load(['accessories', 'photos']);

        return Inertia::render('tickets/Edit', [
            'ticket' => $ticket,
            'documentTypes' => DocumentType::where('is_active', true)->get(['id', 'name', 'code']),
        ]);
    }

    public function update(StoreServiceTicketRequest $request, ServiceTicket $ticket): RedirectResponse
    {
        $this->authorize('update', $ticket);

        if ($ticket->isClientDataLocked()) {
            // Solo se pueden editar observaciones y datos del servicio
            $ticket->update($request->safe()->only([
                'physical_observations',
                'service_date',
                'entry_date',
                'start_time',
            ]));
        } else {
            $ticket->update($request->safe()->except('accessories'));
        }

        // Sync accesorios
        if ($request->has('accessories')) {
            $ticket->accessories()->delete();
            foreach ($request->input('accessories', []) as $acc) {
                $ticket->accessories()->create($acc);
            }
        }

        return redirect()->route('tickets.show', $ticket)
            ->with('success', 'Ficha actualizada correctamente.');
    }

    public function destroy(ServiceTicket $ticket): RedirectResponse
    {
        $this->authorize('delete', $ticket);

        $ticket->delete(); // soft delete

        return redirect()->route('tickets.index')
            ->with('success', 'Ficha eliminada correctamente.');
    }

    // ── Firmar recepción ─────────────────────────────────

    public function signReception(SignatureRequest $request, ServiceTicket $ticket): RedirectResponse
    {
        $this->authorize('update', $ticket);

        if ($ticket->status !== 'draft') {
            return back()->withErrors(['status' => 'La ficha ya fue recibida.']);
        }

        $ticket->update([
            'reception_client_signature' => $request->input('client_signature'),
            'reception_technician_signature' => $request->input('technician_signature'),
            'reception_signed_at' => now(),
            'status' => 'received',
        ]);

        return back()->with('success', 'Conformidad de recepción firmada.');
    }

    // ── Aprobar / Rechazar reparación ────────────────────

    public function approveRepair(Request $request, ServiceTicket $ticket): RedirectResponse
    {
        if (!$request->user()->can('tickets.approve_repair')) {
            abort(403);
        }

        if (!in_array($ticket->status, ['received'])) {
            return back()->withErrors(['status' => 'La ficha no está en estado de recepción.']);
        }

        $approved = $request->boolean('client_approved_repair');

        if ($approved) {
            $ticket->update([
                'client_approved_repair' => true,
                'status' => 'approved',
            ]);
        } else {
            $ticket->update([
                'client_approved_repair' => false,
                'final_description' => 'El cliente no autorizó la reparación.',
                'status' => 'delivered',
                'end_time' => now()->format('H:i:s'),
            ]);
        }

        return back()->with('success', $approved
            ? 'Reparación aprobada por el cliente.'
            : 'El cliente rechazó la reparación.');
    }

    // ── Completar reparación ─────────────────────────────

    public function completeRepair(UpdateRepairRequest $request, ServiceTicket $ticket): RedirectResponse
    {
        $this->authorize('update', $ticket);

        if ($ticket->status !== 'approved') {
            return back()->withErrors(['status' => 'La ficha no está aprobada para reparación.']);
        }

        $ticket->update([
            'repair_details' => $request->input('repair_details'),
            'final_description' => $request->input('final_description'),
            'client_approved_repair' => true,
            'status' => 'repaired',
        ]);

        return back()->with('success', 'Reparación completada.');
    }

    // ── Firmar entrega final ─────────────────────────────

    public function signDelivery(SignatureRequest $request, ServiceTicket $ticket): RedirectResponse
    {
        $this->authorize('update', $ticket);

        if (!in_array($ticket->status, ['repaired', 'delivered'])) {
            return back()->withErrors(['status' => 'La ficha no está lista para entrega.']);
        }

        $ticket->update([
            'delivery_client_signature' => $request->input('client_signature'),
            'delivery_technician_signature' => $request->input('technician_signature'),
            'delivery_signed_at' => now(),
            'end_time' => now()->format('H:i:s'),
            'status' => 'closed',
        ]);

        return back()->with('success', 'Conformidad de entrega firmada. Ficha cerrada.');
    }

    // ── Subir fotos ──────────────────────────────────────

    public function uploadPhoto(Request $request, ServiceTicket $ticket): RedirectResponse
    {
        $this->authorize('update', $ticket);

        $request->validate([
            'photo' => ['required', 'image', 'max:10240'], // 10MB
            'photo_type' => ['required', 'in:before_service,after_service,reception'],
            'caption' => ['nullable', 'string', 'max:255'],
        ]);

        // Validar tipo de foto según estado
        $photoType = $request->input('photo_type');
        if ($photoType === 'before_service' && in_array($ticket->status, ['repaired', 'delivered', 'closed'])) {
            return back()->withErrors(['photo_type' => 'No se pueden subir fotos "antes" en este estado.']);
        }
        if ($photoType === 'after_service' && $ticket->status !== 'repaired') {
            return back()->withErrors(['photo_type' => 'Las fotos "después" solo se suben en estado reparado.']);
        }

        $bucket = $this->ticketPhotoBucket();
        $folder = "ticket-{$ticket->id}/{$photoType}";
        $storageFile = $this->storageService->upload($request->file('photo'), $bucket, $folder);

        $ticket->photos()->create([
            'storage_file_id' => $storageFile->id,
            'photo_type' => $photoType,
            'file_path' => $storageFile->path,
            'caption' => $request->input('caption'),
            'uploaded_by' => $request->user()->id,
        ]);

        return back()->with('success', 'Foto subida correctamente.');
    }

    // ── Eliminar foto ────────────────────────────────────

    public function deletePhoto(ServiceTicket $ticket, int $photoId): RedirectResponse
    {
        $this->authorize('update', $ticket);

        $photo = $ticket->photos()->findOrFail($photoId);

        if ($photo->storageFile) {
            $this->storageService->delete($photo->storageFile);
        }

        $photo->delete();

        return back()->with('success', 'Foto eliminada.');
    }

    // ── Generar PDF ──────────────────────────────────────

    public function generateReport(ServiceTicket $ticket)
    {
        if (!request()->user()->can('tickets.export_pdf')) {
            abort(403);
        }

        $this->authorize('view', $ticket);

        $ticket->load(['technician:id,name', 'documentType:id,name,code', 'accessories', 'photos']);

        // Se implementará con DomPDF en el paso 6
        return Inertia::render('tickets/Report', [
            'ticket' => $ticket,
        ]);
    }
}
