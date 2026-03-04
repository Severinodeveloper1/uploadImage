<?php

namespace App\Http\Controllers;

use App\Models\Bucket;
use App\Models\Project;
use App\Services\StorageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct(
        private StorageService $storageService,
    ) {}

    public function index(Request $request): Response
    {
        $projects = Project::forUser($request->user()->id)
            ->withCount(['buckets', 'storageFiles', 'apiTokens'])
            ->get()
            ->map(function (Project $project) {
                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'slug' => $project->slug,
                    'description' => $project->description,
                    'is_active' => $project->is_active,
                    'storage_limit_mb' => $project->storage_limit_mb,
                    'storage_used_mb' => $project->storage_used_mb,
                    'storage_percentage' => $project->storage_percentage,
                    'buckets_count' => $project->buckets_count,
                    'storage_files_count' => $project->storage_files_count,
                    'api_tokens_count' => $project->api_tokens_count,
                    'created_at' => $project->created_at->toISOString(),
                ];
            });

        return Inertia::render('projects/ProjectsList', [
            'projects' => $projects,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'storage_limit_mb' => 'nullable|integer|min:100|max:50000',
        ]);

        $slug = Str::slug($validated['name']) . '-' . Str::random(6);

        $request->user()->projects()->create([
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'storage_limit_mb' => $validated['storage_limit_mb'] ?? 1000,
        ]);

        return back()->with('success', 'Proyecto creado correctamente.');
    }

    public function show(Request $request, Project $project): Response
    {
        $this->authorizeProject($request, $project);

        $project->loadCount(['buckets', 'storageFiles', 'apiTokens']);

        $buckets = $project->buckets()
            ->select('id', 'name', 'slug', 'is_public', 'file_count', 'total_size_bytes', 'max_file_size_mb', 'created_at')
            ->get();

        // File type distribution
        $filesByType = $project->storageFiles()
            ->selectRaw("CASE
                WHEN mime_type LIKE 'image/%' THEN 'images'
                WHEN mime_type LIKE 'application/pdf' OR mime_type LIKE 'application/msword%' OR mime_type LIKE 'application/vnd.openxmlformats%' THEN 'documents'
                ELSE 'other'
            END as file_type, COUNT(*) as count")
            ->groupBy('file_type')
            ->pluck('count', 'file_type')
            ->all();

        return Inertia::render('projects/ProjectDashboard', [
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'slug' => $project->slug,
                'description' => $project->description,
                'is_active' => $project->is_active,
                'storage_limit_mb' => $project->storage_limit_mb,
                'storage_used_mb' => $project->storage_used_mb,
                'storage_percentage' => $project->storage_percentage,
                'buckets_count' => $project->buckets_count,
                'storage_files_count' => $project->storage_files_count,
                'api_tokens_count' => $project->api_tokens_count,
                'created_at' => $project->created_at->toISOString(),
            ],
            'buckets' => $buckets,
            'filesByType' => $filesByType,
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $this->authorizeProject($request, $project);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'storage_limit_mb' => 'nullable|integer|min:100|max:50000',
            'is_active' => 'boolean',
        ]);

        $project->update($validated);

        return back()->with('success', 'Proyecto actualizado correctamente.');
    }

    public function destroy(Request $request, Project $project): RedirectResponse
    {
        $this->authorizeProject($request, $project);

        // Delete all physical files
        $this->storageService->deleteProjectFiles($project);

        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Proyecto eliminado correctamente.');
    }

    // Storage browser routes

    public function storage(Request $request, Project $project): Response
    {
        $this->authorizeProject($request, $project);

        $buckets = $project->buckets()
            ->select('id', 'name', 'slug', 'is_public', 'file_count', 'total_size_bytes', 'max_file_size_mb', 'allowed_mime_types', 'created_at')
            ->get();

        return Inertia::render('projects/StorageBrowser', [
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'slug' => $project->slug,
                'storage_limit_mb' => $project->storage_limit_mb,
                'storage_used_mb' => $project->storage_used_mb,
                'storage_percentage' => $project->storage_percentage,
            ],
            'buckets' => $buckets,
            'currentBucket' => null,
            'files' => null,
            'folders' => [],
            'currentFolder' => null,
        ]);
    }

    public function storageBucket(Request $request, Project $project, string $bucketSlug): Response
    {
        $this->authorizeProject($request, $project);

        $bucket = Bucket::where('project_id', $project->id)->where('slug', $bucketSlug)->firstOrFail();

        $folder = $request->query('folder');

        $filesQuery = $bucket->files();
        if ($folder) {
            $filesQuery->where('folder', $folder);
        } else {
            $filesQuery->where(function ($q) {
                $q->whereNull('folder')->orWhere('folder', '');
            });
        }

        if ($request->has('search')) {
            $search = $request->input('search');
            $filesQuery->where('original_name', 'like', "%{$search}%");
        }

        $files = $filesQuery->orderByDesc('created_at')->paginate(15);
        $folders = $bucket->getFolders();

        $buckets = $project->buckets()
            ->select('id', 'name', 'slug', 'is_public', 'file_count', 'total_size_bytes')
            ->get();

        return Inertia::render('projects/StorageBrowser', [
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'slug' => $project->slug,
                'storage_limit_mb' => $project->storage_limit_mb,
                'storage_used_mb' => $project->storage_used_mb,
                'storage_percentage' => $project->storage_percentage,
            ],
            'buckets' => $buckets,
            'currentBucket' => $bucket,
            'files' => $files,
            'folders' => $folders,
            'currentFolder' => $folder,
        ]);
    }

    // Bucket CRUD (web)

    public function storeBucket(Request $request, Project $project): RedirectResponse
    {
        $this->authorizeProject($request, $project);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'is_public' => 'boolean',
            'allowed_mime_types' => 'nullable|array',
            'allowed_mime_types.*' => 'string',
            'max_file_size_mb' => 'nullable|integer|min:1|max:100',
        ]);

        $slug = Str::slug($validated['name']);

        if ($project->buckets()->where('slug', $slug)->exists()) {
            return back()->withErrors(['name' => 'Ya existe un bucket con ese nombre.']);
        }

        $project->buckets()->create([
            'name' => $validated['name'],
            'slug' => $slug,
            'is_public' => $validated['is_public'] ?? true,
            'allowed_mime_types' => $validated['allowed_mime_types'] ?? null,
            'max_file_size_mb' => $validated['max_file_size_mb'] ?? 5,
        ]);

        return back()->with('success', 'Bucket creado correctamente.');
    }

    public function destroyBucket(Request $request, Project $project, string $bucketSlug): RedirectResponse
    {
        $this->authorizeProject($request, $project);

        $bucket = Bucket::where('project_id', $project->id)->where('slug', $bucketSlug)->firstOrFail();

        $this->storageService->deleteBucketFiles($bucket);
        $bucket->files()->delete();
        $bucket->delete();

        return redirect()->route('projects.storage', $project)
            ->with('success', 'Bucket eliminado correctamente.');
    }

    // File upload/delete (web)

    public function uploadFile(Request $request, Project $project, string $bucketSlug): RedirectResponse
    {
        $this->authorizeProject($request, $project);

        $bucket = Bucket::where('project_id', $project->id)->where('slug', $bucketSlug)->firstOrFail();

        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file',
            'folder' => 'nullable|string|max:500',
        ]);

        $folder = $request->input('folder', '');

        foreach ($request->file('files') as $file) {
            if (!$bucket->isMimeTypeAllowed($file->getMimeType())) {
                continue;
            }

            $maxBytes = $bucket->max_file_size_mb * 1024 * 1024;
            if ($file->getSize() > $maxBytes) {
                continue;
            }

            if (!$this->storageService->hasAvailableStorage($project, $file->getSize())) {
                return back()->withErrors(['files' => 'Límite de almacenamiento alcanzado.']);
            }

            $this->storageService->upload($file, $bucket, $folder);
        }

        return back()->with('success', 'Archivos subidos correctamente.');
    }

    public function destroyFile(Request $request, Project $project, string $bucketSlug, int $fileId): RedirectResponse
    {
        $this->authorizeProject($request, $project);

        $bucket = Bucket::where('project_id', $project->id)->where('slug', $bucketSlug)->firstOrFail();
        $file = $bucket->files()->findOrFail($fileId);

        $this->storageService->delete($file);

        return back()->with('success', 'Archivo eliminado correctamente.');
    }

    private function authorizeProject(Request $request, Project $project): void
    {
        abort_unless($project->user_id === $request->user()->id, 403);
    }
}
