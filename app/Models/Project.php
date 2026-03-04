<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'is_active',
        'storage_limit_mb',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'storage_limit_mb' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Project $project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->name) . '-' . Str::random(6);
            }
        });
    }

    // Relationships

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function apiTokens(): HasMany
    {
        return $this->hasMany(ApiToken::class);
    }

    public function buckets(): HasMany
    {
        return $this->hasMany(Bucket::class);
    }

    public function storageFiles(): HasMany
    {
        return $this->hasMany(StorageFile::class);
    }

    // Accessors

    public function getStorageUsedBytesAttribute(): int
    {
        return (int) $this->storageFiles()->sum('size_bytes');
    }

    public function getStorageUsedMbAttribute(): float
    {
        return round($this->storage_used_bytes / (1024 * 1024), 2);
    }

    public function getStoragePercentageAttribute(): float
    {
        if ($this->storage_limit_mb <= 0) {
            return 0;
        }

        return round(($this->storage_used_mb / $this->storage_limit_mb) * 100, 2);
    }

    // Scopes

    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }
}
