<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\CreateNewUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function create(Request $request): Response
    {
        $isSuperAdmin = $request->user()->hasRole('super_admin');

        $roles = Role::query()
            ->when(!$isSuperAdmin, fn ($q) => $q->where('name', '!=', 'super_admin'))
            ->pluck('name');

        return Inertia::render('users/Create', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request, CreateNewUser $creator): RedirectResponse
    {
        $request->validate([
            'role' => 'required|string|exists:roles,name',
        ]);

        // Solo super_admin puede asignar ese rol
        if ($request->role === 'super_admin' && !$request->user()->hasRole('super_admin')) {
            abort(403);
        }

        $user = $creator->create($request->all());
        $user->syncRoles([$request->role]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario creado correctamente.');
    }
}
