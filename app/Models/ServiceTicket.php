<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class ServiceTicket extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'ticket_code',
        'company_name',
        'client_name',
        'document_type_id',
        'document_number',
        'reported_failure',
        'phone',
        'service_date',
        'entry_date',
        'start_time',
        'end_time',
        'technician_id',
        'product_name',
        'model',
        'serial_number',
        'warranty_seals',
        'physical_observations',
        'reception_client_signature',
        'reception_technician_signature',
        'reception_signed_at',
        'client_approved_repair',
        'repair_details',
        'final_description',
        'delivery_client_signature',
        'delivery_technician_signature',
        'delivery_signed_at',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'service_date' => 'date',
            'entry_date' => 'date',
            'reception_signed_at' => 'datetime',
            'delivery_signed_at' => 'datetime',
            'client_approved_repair' => 'boolean',
            'deleted_at' => 'datetime',
        ];
    }

    // ── Auto-generate ticket_code ────────────────────────

    protected static function booted(): void
    {
        static::creating(function (ServiceTicket $ticket) {
            if (empty($ticket->ticket_code)) {
                $ticket->ticket_code = static::generateTicketCode();
            }
        });
    }

    public static function generateTicketCode(): string
    {
        $date = Carbon::now()->format('Ymd');
        $prefix = "ST-{$date}-";

        $lastTicket = static::withTrashed()
            ->where('ticket_code', 'like', "{$prefix}%")
            ->orderByDesc('ticket_code')
            ->first();

        if ($lastTicket) {
            $lastNumber = (int) str_replace($prefix, '', $lastTicket->ticket_code);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        return $prefix . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
    }

    // ── Relationships ────────────────────────────────────

    public function documentType(): BelongsTo
    {
        return $this->belongsTo(DocumentType::class);
    }

    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    public function accessories(): HasMany
    {
        return $this->hasMany(TicketAccessory::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(TicketPhoto::class);
    }

    // ── Helpers ──────────────────────────────────────────

    public function isEditable(): bool
    {
        return in_array($this->status, ['draft']);
    }

    public function isClientDataLocked(): bool
    {
        return !in_array($this->status, ['draft']);
    }
}
