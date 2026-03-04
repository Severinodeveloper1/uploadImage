<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Bucket extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'name',
        'slug',
        'is_public',
        'allowed_mime_types',
        'max_file_size_mb',
        'file_count',
        'total_size_bytes',
    ];

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean',
            'allowed_mime_types' => 'array',
            'max_file_size_mb' => 'integer',
            'file_count' => 'integer',
            'total_size_bytes' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Bucket $bucket) {
            if (empty($bucket->slug)) {
                $bucket->slug = Str::slug($bucket->name);
            }
        });
    }

    // Relationships

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function files(): HasMany
    {
        return $this->hasMany(StorageFile::class);
    }

    // Methods

    public function getFolders(): array
    {
        return $this->files()
            ->whereNotNull('folder')
            ->where('folder', '!=', '')
            ->distinct()
            ->pluck('folder')
            ->sort()
            ->values()
            ->all();
    }

    public function isMimeTypeAllowed(string $mimeType): bool
    {
        if (empty($this->allowed_mime_types)) {
            return true;
        }

        return in_array($mimeType, $this->allowed_mime_types, true);
    }

    public function getTotalSizeMbAttribute(): float
    {
        return round($this->total_size_bytes / (1024 * 1024), 2);
    }
}
