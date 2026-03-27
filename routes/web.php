<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\ApiTokenController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SecureFileController;
use App\Http\Controllers\ServiceTicketController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureUserIsActive;
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

Route::middleware(['auth', 'verified', EnsureUserIsActive::class])->group(function () {

    // ── Dashboard ────────────────────────────────────────
    Route::inertia('dashboard', 'Dashboard')
        ->middleware('permission:config.view_dashboard')
        ->name('dashboard');

    // ── User management ──────────────────────────────────
    Route::middleware('permission:users.view_any')->group(function () {
        Route::get('dashboard/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('dashboard/users', [UserController::class, 'store'])
            ->middleware('permission:users.create')
            ->name('users.store');
    });

    // ── Projects (uploadImage) ───────────────────────────
    Route::middleware('permission:projects.view_any|projects.view_own')->group(function () {
        Route::get('dashboard/projects', [ProjectController::class, 'index'])->name('projects.index');
        Route::post('dashboard/projects', [ProjectController::class, 'store'])
            ->middleware('permission:projects.create')
            ->name('projects.store');
        Route::get('dashboard/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
        Route::put('dashboard/projects/{project}', [ProjectController::class, 'update'])
            ->middleware('permission:projects.edit')
            ->name('projects.update');
        Route::delete('dashboard/projects/{project}', [ProjectController::class, 'destroy'])
            ->middleware('permission:projects.delete')
            ->name('projects.destroy');

        // API Tokens (dentro del contexto de projects)
        Route::get('dashboard/projects/{project}/tokens', [ApiTokenController::class, 'index'])->name('projects.tokens.index');
        Route::post('dashboard/projects/{project}/tokens', [ApiTokenController::class, 'store'])->name('projects.tokens.store');
        Route::delete('dashboard/projects/{project}/tokens/{token}', [ApiTokenController::class, 'destroy'])->name('projects.tokens.destroy');

        // Storage Browser
        Route::middleware('permission:files.view')->group(function () {
            Route::get('dashboard/projects/{project}/storage', [ProjectController::class, 'storage'])->name('projects.storage');
            Route::get('dashboard/projects/{project}/storage/{bucket}', [ProjectController::class, 'storageBucket'])->name('projects.storage.bucket');
        });

        // Bucket CRUD (web)
        Route::post('dashboard/projects/{project}/buckets', [ProjectController::class, 'storeBucket'])
            ->middleware('permission:buckets.create')
            ->name('projects.buckets.store');
        Route::delete('dashboard/projects/{project}/buckets/{bucket}', [ProjectController::class, 'destroyBucket'])
            ->middleware('permission:buckets.delete')
            ->name('projects.buckets.destroy');

        // File upload/delete (web)
        Route::post('dashboard/projects/{project}/storage/{bucket}/upload', [ProjectController::class, 'uploadFile'])
            ->middleware('permission:files.upload')
            ->name('projects.storage.upload');
        Route::delete('dashboard/projects/{project}/storage/{bucket}/files/{file}', [ProjectController::class, 'destroyFile'])
            ->middleware('permission:files.delete')
            ->name('projects.storage.file.destroy');
    });

    // ── Admin: Gestión de Usuarios y Roles ───────────────
    Route::middleware('permission:users.view_any')->prefix('dashboard/admin')->group(function () {
        Route::get('/users', [AdminUserController::class, 'index'])->name('admin.users.index');
        Route::patch('/users/{user}/role', [AdminUserController::class, 'updateRole'])
            ->middleware('permission:users.assign_roles')
            ->name('admin.users.update-role');
        Route::patch('/users/{user}/toggle-active', [AdminUserController::class, 'toggleActive'])
            ->middleware('permission:users.edit')
            ->name('admin.users.toggle-active');
    });

    // ── Fichas de Servicio Técnico ───────────────────────
    Route::middleware('permission:tickets.view_any|tickets.view_own')->prefix('dashboard/tickets')->group(function () {
        Route::get('/', [ServiceTicketController::class, 'index'])->name('tickets.index');
        Route::get('/create', [ServiceTicketController::class, 'create'])
            ->middleware('permission:tickets.create')
            ->name('tickets.create');
        Route::post('/', [ServiceTicketController::class, 'store'])
            ->middleware('permission:tickets.create')
            ->name('tickets.store');
        Route::get('/{ticket}', [ServiceTicketController::class, 'show'])->name('tickets.show');
        Route::get('/{ticket}/edit', [ServiceTicketController::class, 'edit'])
            ->middleware('permission:tickets.edit')
            ->name('tickets.edit');
        Route::put('/{ticket}', [ServiceTicketController::class, 'update'])
            ->middleware('permission:tickets.edit')
            ->name('tickets.update');
        Route::delete('/{ticket}', [ServiceTicketController::class, 'destroy'])
            ->middleware('permission:tickets.delete')
            ->name('tickets.destroy');

        // Acciones de flujo
        Route::post('/{ticket}/sign-reception', [ServiceTicketController::class, 'signReception'])
            ->middleware('permission:tickets.sign')
            ->name('tickets.sign-reception');
        Route::post('/{ticket}/approve-repair', [ServiceTicketController::class, 'approveRepair'])
            ->middleware('permission:tickets.approve_repair')
            ->name('tickets.approve-repair');
        Route::post('/{ticket}/complete-repair', [ServiceTicketController::class, 'completeRepair'])
            ->middleware('permission:tickets.edit')
            ->name('tickets.complete-repair');
        Route::post('/{ticket}/sign-delivery', [ServiceTicketController::class, 'signDelivery'])
            ->middleware('permission:tickets.sign')
            ->name('tickets.sign-delivery');

        // Fotos
        Route::post('/{ticket}/photos', [ServiceTicketController::class, 'uploadPhoto'])
            ->middleware('permission:tickets.edit')
            ->name('tickets.photos.upload');
        Route::delete('/{ticket}/photos/{photo}', [ServiceTicketController::class, 'deletePhoto'])
            ->middleware('permission:tickets.edit')
            ->name('tickets.photos.destroy');

        // PDF / Reporte
        Route::get('/{ticket}/report', [ServiceTicketController::class, 'generateReport'])
            ->middleware('permission:tickets.export_pdf')
            ->name('tickets.report');
    });
});

require __DIR__.'/settings.php';
