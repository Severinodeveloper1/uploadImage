<?php

namespace App\Observers;

use App\Models\StorageFile;
use Illuminate\Support\Facades\Storage;

class StorageFileObserver
{
    public function created(StorageFile $file): void
    {
        $this->updateBucketStats($file);
    }

    public function deleted(StorageFile $file): void
    {
        // Delete physical file from the correct disk
        $disk = $file->is_public ? 'public' : 'local';
        $storagePath = $file->project->slug . '/' . $file->bucket->slug . '/' . $file->path;
        Storage::disk($disk)->delete($storagePath);

        $this->updateBucketStats($file);
    }

    private function updateBucketStats(StorageFile $file): void
    {
        $bucket = $file->bucket;
        $bucket->update([
            'file_count' => $bucket->files()->count(),
            'total_size_bytes' => (int) $bucket->files()->sum('size_bytes'),
        ]);
    }
}
