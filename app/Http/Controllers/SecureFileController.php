<?php

namespace App\Http\Controllers;

use App\Models\ApiToken;
use App\Models\StorageFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SecureFileController extends Controller
{
    /**
     * Serve a storage file.
     * - Public files: redirects to the direct public URL.
     * - Private files: requires authenticated web session OR a valid API token with 'read' permission.
     */
    public function serve(Request $request, StorageFile $file): mixed
    {
        if ($file->is_public) {
            // Re-build public URL in case it was stored incorrectly
            $storagePath = $file->project->slug . '/' . $file->bucket->slug . '/' . $file->path;
            return redirect(rtrim(config('app.url'), '/') . '/storage/' . $storagePath);
        }

        // Attempt web session auth
        $user = $request->user();
        if ($user && $user->id === $file->project->user_id) {
            return $this->streamFile($file);
        }

        // Attempt API token auth
        $bearerToken = $request->bearerToken();
        if ($bearerToken) {
            $hash = hash('sha256', $bearerToken);
            $apiToken = ApiToken::where('token', $hash)
                ->where('is_active', true)
                ->where(function ($q) {
                    $q->whereNull('expires_at')->orWhere('expires_at', '>', now());
                })
                ->first();

            if (
                $apiToken
                && $apiToken->project_id === $file->project_id
                && $apiToken->hasPermission('read')
            ) {
                return $this->streamFile($file);
            }
        }

        abort(403, 'This file is private. Authentication required.');
    }

    private function streamFile(StorageFile $file): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        $storagePath = $file->project->slug . '/' . $file->bucket->slug . '/' . $file->path;
        $fullPath = Storage::disk('local')->path($storagePath);

        abort_unless(file_exists($fullPath), 404);

        return response()->file($fullPath, [
            'Content-Type' => $file->mime_type,
            'Cache-Control' => 'private, no-store',
            'Content-Disposition' => 'inline; filename="' . addslashes($file->original_name) . '"',
        ]);
    }
}
