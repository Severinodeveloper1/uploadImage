<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\CreateNewUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('users/Create');
    }

    public function store(Request $request, CreateNewUser $creator): RedirectResponse
    {
        $creator->create($request->all());

        return redirect()->route('dashboard')
            ->with('success', 'Usuario creado correctamente.');
    }
}
