<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ApiToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'name',
        'token',
        'token_prefix',
        'permissions',
        'last_used_at',
        'expires_at',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'permissions' => 'array',
            'last_used_at' => 'datetime',
            'expires_at' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    // Relationships

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    // Methods

    public function hasPermission(string $permission): bool
    {
        $permissions = $this->permissions ?? [];

        return in_array($permission, $permissions, true);
    }

    public function isExpired(): bool
    {
        return $this->expires_at !== null && $this->expires_at->isPast();
    }

    public function isUsable(): bool
    {
        return $this->is_active && !$this->isExpired();
    }

    /**
     * Generate a new token. Returns the plain text token (show ONCE).
     */
    public static function generateToken(): array
    {
        $prefix = 'sk_live_';
        $random = Str::random(40);
        $plainToken = $prefix . $random;
        $hashedToken = hash('sha256', $plainToken);

        return [
            'plain' => $plainToken,
            'hash' => $hashedToken,
            'prefix' => $prefix . substr($random, 0, 8) . '...',
        ];
    }

    /**
     * Find a token by its plain text value.
     */
    public static function findByToken(string $plainToken): ?self
    {
        $hash = hash('sha256', $plainToken);

        return static::where('token', $hash)->first();
    }
}
