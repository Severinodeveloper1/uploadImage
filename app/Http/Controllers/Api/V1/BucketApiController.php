<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Middleware\AuthenticateApiToken;
use App\Models\Bucket;
use App\Services\StorageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BucketApiController extends Controller
{
    public function __construct(
        private StorageService $storageService,
    ) {}

    /**
     * List all buckets for the authenticated project.
     */
    public function index(Request $request): JsonResponse
    {
        $denied = AuthenticateApiToken::checkPermission($request, 'read');
        if ($denied) return $denied;

        $project = $request->get('project');

        $buckets = $project->buckets()
            ->select('id', 'name', 'slug', 'is_public', 'file_count', 'total_size_bytes', 'max_file_size_mb', 'created_at')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $buckets,
        ]);
    }

    /**
     * Create a new bucket.
     */
    public function store(Request $request): JsonResponse
    {
        $denied = AuthenticateApiToken::checkPermission($request, 'write');
        if ($denied) return $denied;

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'is_public' => 'boolean',
            'allowed_mime_types' => 'nullable|array',
            'allowed_mime_types.*' => 'string',
            'max_file_size_mb' => 'nullable|integer|min:1|max:100',
        ]);

        $project = $request->get('project');

        $slug = \Illuminate\Support\Str::slug($validated['name']);

        // Check unique slug per project
        if ($project->buckets()->where('slug', $slug)->exists()) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'BUCKET_ALREADY_EXISTS',
                    'message' => 'Ya existe un bucket con ese nombre en este proyecto.',
                ],
            ], 409);
        }

        $bucket = $project->buckets()->create([
            'name' => $validated['name'],
            'slug' => $slug,
            'is_public' => $validated['is_public'] ?? true,
            'allowed_mime_types' => $validated['allowed_mime_types'] ?? null,
            'max_file_size_mb' => $validated['max_file_size_mb'] ?? 5,
        ]);

        return response()->json([
            'success' => true,
            'data' => $bucket,
        ], 201);
    }

    /**
     * Get a single bucket info.
     */
    public function show(Request $request, string $bucketSlug): JsonResponse
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

        return response()->json([
            'success' => true,
            'data' => $bucket,
        ]);
    }

    /**
     * Delete a bucket and all its files.
     */
    public function destroy(Request $request, string $bucketSlug): JsonResponse
    {
        $denied = AuthenticateApiToken::checkPermission($request, 'delete');
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

        $this->storageService->deleteBucketFiles($bucket);
        $bucket->files()->delete();
        $bucket->delete();

        return response()->json([
            'success' => true,
            'data' => ['message' => 'Bucket eliminado correctamente.'],
        ]);
    }
}
