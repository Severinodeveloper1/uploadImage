<?php

use App\Http\Controllers\Api\V1\BucketApiController;
use App\Http\Controllers\Api\V1\StorageApiController;
use App\Http\Middleware\AuthenticateApiToken;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware(AuthenticateApiToken::class)->group(function () {
    // Project info
    Route::get('/project', [StorageApiController::class, 'projectInfo']);

    // Buckets
    Route::get('/buckets', [BucketApiController::class, 'index']);
    Route::post('/buckets', [BucketApiController::class, 'store']);
    Route::get('/buckets/{bucket}', [BucketApiController::class, 'show']);
    Route::delete('/buckets/{bucket}', [BucketApiController::class, 'destroy']);

    // Files
    Route::post('/buckets/{bucket}/upload', [StorageApiController::class, 'upload']);
    Route::get('/buckets/{bucket}/files', [StorageApiController::class, 'index']);
    Route::get('/buckets/{bucket}/files/{id}', [StorageApiController::class, 'show']);
    Route::delete('/buckets/{bucket}/files/{id}', [StorageApiController::class, 'destroy']);
    Route::get('/buckets/{bucket}/folders', [StorageApiController::class, 'folders']);
});
