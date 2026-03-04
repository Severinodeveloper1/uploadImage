<?php

namespace App\Services;

use App\Models\Bucket;
use App\Models\Project;
use App\Models\StorageFile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StorageService
{
    /**
     * Upload a file to a bucket.
     */
    public function upload(UploadedFile $file, Bucket $bucket, string $folder = ''): StorageFile
    {
        $project = $bucket->project;
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $uniqueFilename = Str::uuid() . '.' . $extension;

        // Build storage path: {project_slug}/{bucket_slug}/{folder}/{filename}
        $relativePath = trim($folder . '/' . $uniqueFilename, '/');
        $storagePath = $project->slug . '/' . $bucket->slug . '/' . $relativePath;

        // Public buckets → public disk (symlinked, direct URL)
        // Private buckets → local disk (storage/app/private, protected)
        $disk = $bucket->is_public ? 'public' : 'local';

        Storage::disk($disk)->putFileAs(
            dirname($storagePath),
            $file,
            basename($storagePath)
        );

        $dimensions = $this->getImageDimensions($file);

        // For public files set final URL now; for private we set it after getting the ID
        $storageFile = StorageFile::create([
            'bucket_id' => $bucket->id,
            'project_id' => $project->id,
            'original_name' => $originalName,
            'filename' => $uniqueFilename,
            'path' => $relativePath,
            'folder' => $folder ?: null,
            'url' => $bucket->is_public ? $this->buildPublicUrl($storagePath) : '',
            'size_bytes' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'width' => $dimensions['width'],
            'height' => $dimensions['height'],
            'is_public' => $bucket->is_public,
        ]);

        // Private files: URL served through the secure controller (auth required)
        if (!$bucket->is_public) {
            $storageFile->url = url('/files/' . $storageFile->id);
            $storageFile->saveQuietly();
        }

        return $storageFile;
    }

    /**
     * Delete a storage file (physical + DB handled by observer).
     */
    public function delete(StorageFile $file): bool
    {
        return (bool) $file->delete();
    }

    /**
     * Get the public URL for a storage file.
     */
    public function getPublicUrl(StorageFile $file): string
    {
        return $file->url;
    }

    /**
     * Get image dimensions if the file is an image.
     */
    public function getImageDimensions(UploadedFile $file): array
    {
        $dimensions = ['width' => null, 'height' => null];

        if (!str_starts_with($file->getMimeType(), 'image/')) {
            return $dimensions;
        }

        try {
            $imageSize = getimagesize($file->getRealPath());
            if ($imageSize !== false) {
                $dimensions['width'] = $imageSize[0];
                $dimensions['height'] = $imageSize[1];
            }
        } catch (\Throwable) {
            // Ignore dimension extraction errors
        }

        return $dimensions;
    }

    /**
     * Recalculate bucket stats from DB.
     */
    public function updateBucketStats(Bucket $bucket): void
    {
        $bucket->update([
            'file_count' => $bucket->files()->count(),
            'total_size_bytes' => (int) $bucket->files()->sum('size_bytes'),
        ]);
    }

    /**
     * Get total storage used by a project in bytes.
     */
    public function getProjectStorageUsed(Project $project): int
    {
        return (int) $project->storageFiles()->sum('size_bytes');
    }

    /**
     * Check if project has enough storage for a given file size.
     */
    public function hasAvailableStorage(Project $project, int $fileSizeBytes): bool
    {
        $usedBytes = $this->getProjectStorageUsed($project);
        $limitBytes = $project->storage_limit_mb * 1024 * 1024;

        return ($usedBytes + $fileSizeBytes) <= $limitBytes;
    }

    /**
     * Delete all files for a project from storage (both disks).
     */
    public function deleteProjectFiles(Project $project): void
    {
        Storage::disk('public')->deleteDirectory($project->slug);
        Storage::disk('local')->deleteDirectory($project->slug);
    }

    /**
     * Delete all files for a bucket from storage (both disks).
     */
    public function deleteBucketFiles(Bucket $bucket): void
    {
        $path = $bucket->project->slug . '/' . $bucket->slug;
        Storage::disk('public')->deleteDirectory($path);
        Storage::disk('local')->deleteDirectory($path);
    }

    private function buildPublicUrl(string $storagePath): string
    {
        return rtrim(config('app.url'), '/') . '/storage/' . $storagePath;
    }
}
