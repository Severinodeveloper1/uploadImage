<?php

namespace App\Http\Middleware;

use App\Models\ApiToken;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateApiToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $bearerToken = $request->bearerToken();

        if (!$bearerToken) {
            return $this->unauthorized('Token de autenticación requerido.');
        }

        $apiToken = ApiToken::findByToken($bearerToken);

        if (!$apiToken) {
            return $this->unauthorized('Token inválido.');
        }

        if (!$apiToken->isUsable()) {
            return $this->unauthorized('Token inactivo o expirado.');
        }

        $project = $apiToken->project;

        if (!$project || !$project->is_active) {
            return $this->unauthorized('El proyecto asociado está inactivo.');
        }

        // Inject project and token into request
        $request->merge([
            'project' => $project,
            'api_token' => $apiToken,
        ]);

        // Update last used timestamp
        $apiToken->update(['last_used_at' => now()]);

        return $next($request);
    }

    /**
     * Check if the token has a specific permission.
     */
    public static function checkPermission(Request $request, string $permission): ?JsonResponse
    {
        $apiToken = $request->get('api_token');

        if ($apiToken && !$apiToken->hasPermission($permission)) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'FORBIDDEN',
                    'message' => "No tienes permiso para realizar esta acción ({$permission}).",
                ],
            ], 403);
        }

        return null;
    }

    private function unauthorized(string $message): Response
    {
        return response()->json([
            'success' => false,
            'error' => [
                'code' => 'UNAUTHORIZED',
                'message' => $message,
            ],
        ], 401);
    }
}
