<?php

namespace App\Http\Controllers;

use App\Models\ApiToken;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ApiTokenController extends Controller
{
    public function index(Request $request, Project $project): Response
    {
        abort_unless($project->user_id === $request->user()->id, 403);

        $tokens = $project->apiTokens()
            ->select('id', 'name', 'token_prefix', 'permissions', 'last_used_at', 'expires_at', 'is_active', 'created_at')
            ->orderByDesc('created_at')
            ->paginate(15);

        return Inertia::render('projects/ApiTokens', [
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'slug' => $project->slug,
            ],
            'tokens' => $tokens,
            'newToken' => session('newToken'),
        ]);
    }

    public function store(Request $request, Project $project): RedirectResponse
    {
        abort_unless($project->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'permissions' => 'required|array|min:1',
            'permissions.*' => 'in:read,write,delete',
            'expires_at' => 'nullable|date|after:today',
        ]);

        $tokenData = ApiToken::generateToken();

        $project->apiTokens()->create([
            'name' => $validated['name'],
            'token' => $tokenData['hash'],
            'token_prefix' => $tokenData['prefix'],
            'permissions' => $validated['permissions'],
            'expires_at' => $validated['expires_at'] ?? null,
        ]);

        return back()->with('newToken', $tokenData['plain']);
    }

    public function destroy(Request $request, Project $project, ApiToken $token): RedirectResponse
    {
        abort_unless($project->user_id === $request->user()->id, 403);
        abort_unless($token->project_id === $project->id, 403);

        $token->delete();

        return back()->with('success', 'Token revocado correctamente.');
    }
}
