<?php

use App\Http\Controllers\ApiTokenController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SecureFileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Redirect raíz: al dashboard si está autenticado, al login si no
Route::get('/', function () {
    return Auth::check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
})->name('home');

// Secure file serving — auth checked inside controller (web session OR API bearer token)
Route::get('/files/{file}', [SecureFileController::class, 'serve'])->name('files.secure');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');

    // User management (admin creates users without auto-login)
    Route::get('dashboard/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('dashboard/users', [UserController::class, 'store'])->name('users.store');

    // Projects
    Route::get('dashboard/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::post('dashboard/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('dashboard/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    Route::put('dashboard/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('dashboard/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

    // API Tokens
    Route::get('dashboard/projects/{project}/tokens', [ApiTokenController::class, 'index'])->name('projects.tokens.index');
    Route::post('dashboard/projects/{project}/tokens', [ApiTokenController::class, 'store'])->name('projects.tokens.store');
    Route::delete('dashboard/projects/{project}/tokens/{token}', [ApiTokenController::class, 'destroy'])->name('projects.tokens.destroy');

    // Storage Browser
    Route::get('dashboard/projects/{project}/storage', [ProjectController::class, 'storage'])->name('projects.storage');
    Route::get('dashboard/projects/{project}/storage/{bucket}', [ProjectController::class, 'storageBucket'])->name('projects.storage.bucket');

    // Bucket CRUD (web)
    Route::post('dashboard/projects/{project}/buckets', [ProjectController::class, 'storeBucket'])->name('projects.buckets.store');
    Route::delete('dashboard/projects/{project}/buckets/{bucket}', [ProjectController::class, 'destroyBucket'])->name('projects.buckets.destroy');

    // File upload/delete (web)
    Route::post('dashboard/projects/{project}/storage/{bucket}/upload', [ProjectController::class, 'uploadFile'])->name('projects.storage.upload');
    Route::delete('dashboard/projects/{project}/storage/{bucket}/files/{file}', [ProjectController::class, 'destroyFile'])->name('projects.storage.file.destroy');
});

require __DIR__.'/settings.php';
