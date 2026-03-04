<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Middleware\AuthenticateApiToken;
use App\Models\StorageFile;
use App\Services\StorageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StorageApiController extends Controller
{
    public function __construct(
        private StorageService $storageService,
    ) {}

    /**
     * Upload a file to a bucket.
     */
    public function upload(Request $request, string $bucketSlug): JsonResponse
    {
        $denied = AuthenticateApiToken::checkPermission($request, 'write');
        if ($denied) return $denied;

        $project = $request->get('project');
        $bucket = $project->buckets()->where('slug', $bucketSlug)->first();

        if (!$bucket) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'BUCKET_NOT_FOUND',
                    'message' => 'Bucket no encontrado.',
                ],
            ], 404);
        }

        $request->validate([
            'file' => 'required|file',
            'path' => 'nullable|string|max:500',
        ]);

        $file = $request->file('file');
        $folder = $request->input('path', '');

        // Check MIME type
        if (!$bucket->isMimeTypeAllowed($file->getMimeType())) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'MIME_TYPE_NOT_ALLOWED',
                    'message' => 'El tipo de archivo ' . $file->getMimeType() . ' no está permitido en este bucket.',
                ],
            ], 422);
        }

        // Check file size
        $maxBytes = $bucket->max_file_size_mb * 1024 * 1024;
        if ($file->getSize() > $maxBytes) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'FILE_TOO_LARGE',
                    'message' => "El archivo supera el límite de {$bucket->max_file_size_mb}MB del bucket.",
                ],
            ], 422);
        }

        // Check project storage limit
        if (!$this->storageService->hasAvailableStorage($project, $file->getSize())) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'STORAGE_LIMIT_EXCEEDED',
                    'message' => 'El proyecto ha alcanzado su límite de almacenamiento.',
                ],
            ], 422);
        }

        $storageFile = $this->storageService->upload($file, $bucket, $folder);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $storageFile->id,
                'name' => $storageFile->original_name,
                'path' => $storageFile->path,
                'url' => $storageFile->url,
                'size' => $storageFile->size_bytes,
                'mime_type' => $storageFile->mime_type,
                'width' => $storageFile->width,
                'height' => $storageFile->height,
                'created_at' => $storageFile->created_at->toISOString(),
            ],
        ], 201);
    }

    /**
     * List files in a bucket with optional folder filtering.
     */
    public function index(Request $request, string $bucketSlug): JsonResponse
    {
        $denied = AuthenticateApiToken::checkPermission($request, 'read');
        if ($denied) return $denied;

        $project = $request->get('project');
        $bucket = $project->buckets()->where('slug', $bucketSlug)->first();

        if (!$bucket) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'BUCKET_NOT_FOUND',
                    'message' => 'Bucket no encontrado.',
                ],
            ], 404);
        }

        $query = $bucket->files();

        if ($request->has('folder')) {
            $query->where('folder', $request->input('folder'));
        }

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('original_name', 'like', "%{$search}%");
        }

        if ($request->has('mime_type')) {
            $query->where('mime_type', 'like', $request->input('mime_type') . '%');
        }

        $files = $query->orderByDesc('created_at')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $files,
        ]);
    }

    /**
     * Get a single file info.
     */
    public function show(Request $request, string $bucketSlug, int $fileId): JsonResponse
    {
        $denied = AuthenticateApiToken::checkPermission($request, 'read');
        if ($denied) return $denied;

        $project = $request->get('project');
        $bucket = $project->buckets()->where('slug', $bucketSlug)->first();

        if (!$bucket) {
            return response()->json([
                'success' => false,
                'error' => ['code' => 'BUCKET_NOT_FOUND', 'message' => 'Bucket no encontrado.'],
            ], 404);
        }

        $file = $bucket->files()->find($fileId);

        if (!$file) {
            return response()->json([
                'success' => false,
                'error' => ['code' => 'FILE_NOT_FOUND', 'message' => 'Archivo no encontrado.'],
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $file,
        ]);
    }

    /**
     * Delete a file.
     */
    public function destroy(Request $request, string $bucketSlug, int $fileId): JsonResponse
    {
        $denied = AuthenticateApiToken::checkPermission($request, 'delete');
        if ($denied) return $denied;

        $project = $request->get('project');
        $bucket = $project->buckets()->where('slug', $bucketSlug)->first();

        if (!$bucket) {
            return response()->json([
                'success' => false,
                'error' => ['code' => 'BUCKET_NOT_FOUND', 'message' => 'Bucket no encontrado.'],
            ], 404);
        }

        $file = $bucket->files()->find($fileId);

        if (!$file) {
            return response()->json([
                'success' => false,
                'error' => ['code' => 'FILE_NOT_FOUND', 'message' => 'Archivo no encontrado.'],
            ], 404);
        }

        $this->storageService->delete($file);

        return response()->json([
            'success' => true,
            'data' => ['message' => 'Archivo eliminado correctamente.'],
        ]);
    }

    /**
     * List folders in a bucket.
     */
    public function folders(Request $request, string $bucketSlug): JsonResponse
    {
        $denied = AuthenticateApiToken::checkPermission($request, 'read');
        if ($denied) return $denied;

        $project = $request->get('project');
        $bucket = $project->buckets()->where('slug', $bucketSlug)->first();

        if (!$bucket) {
            return response()->json([
                'success' => false,
                'error' => ['code' => 'BUCKET_NOT_FOUND', 'message' => 'Bucket no encontrado.'],
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $bucket->getFolders(),
        ]);
    }

    /**
     * Get project stats.
     */
    public function projectInfo(Request $request): JsonResponse
    {
        $denied = AuthenticateApiToken::checkPermission($request, 'read');
        if ($denied) return $denied;

        $project = $request->get('project');
        $project->loadCount(['buckets', 'storageFiles', 'apiTokens']);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $project->id,
                'name' => $project->name,
                'slug' => $project->slug,
                'storage_used_mb' => $project->storage_used_mb,
                'storage_limit_mb' => $project->storage_limit_mb,
                'storage_percentage' => $project->storage_percentage,
                'buckets_count' => $project->buckets_count,
                'files_count' => $project->storage_files_count,
                'tokens_count' => $project->api_tokens_count,
            ],
        ]);
    }
}
