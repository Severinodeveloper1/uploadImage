<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class AdminUserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::with('roles')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_active' => $user->is_active,
                'role' => $user->roles->first()?->name ?? 'sin rol',
                'created_at' => $user->created_at->toISOString(),
            ]);

        $currentUser = $request->user();
        $isSuperAdmin = $currentUser->hasRole('super_admin');

        // Admin no puede ver/asignar super_admin
        $roles = Role::query()
            ->when(!$isSuperAdmin, fn ($q) => $q->where('name', '!=', 'super_admin'))
            ->pluck('name');

        return Inertia::render('admin/Users', [
            'users' => $users,
            'roles' => $roles,
            'canAssignRoles' => $currentUser->can('users.assign_roles'),
        ]);
    }

    public function updateRole(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role' => 'required|string|exists:roles,name',
        ]);

        $currentUser = $request->user();

        // Solo super_admin puede asignar el rol super_admin
        if ($validated['role'] === 'super_admin' && !$currentUser->hasRole('super_admin')) {
            abort(403, 'No tienes permiso para asignar el rol super_admin.');
        }

        // No permitir quitarse el rol a sí mismo si es super_admin
        if ($user->id === $currentUser->id && $currentUser->hasRole('super_admin') && $validated['role'] !== 'super_admin') {
            return back()->withErrors(['role' => 'No puedes quitarte el rol de super_admin a ti mismo.']);
        }

        $user->syncRoles([$validated['role']]);

        // Limpiar caché de permisos
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        return back()->with('success', "Rol de {$user->name} actualizado a {$validated['role']}.");
    }

    public function toggleActive(Request $request, User $user): RedirectResponse
    {
        // No permitir desactivarse a sí mismo
        if ($user->id === $request->user()->id) {
            return back()->withErrors(['user' => 'No puedes desactivar tu propia cuenta.']);
        }

        $user->update(['is_active' => !$user->is_active]);

        $status = $user->is_active ? 'activado' : 'desactivado';

        return back()->with('success', "Usuario {$user->name} {$status}.");
    }
}
