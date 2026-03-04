<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StorageFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'bucket_id',
        'project_id',
        'original_name',
        'filename',
        'path',
        'folder',
        'url',
        'size_bytes',
        'mime_type',
        'width',
        'height',
        'metadata',
        'is_public',
        'download_count',
    ];

    protected function casts(): array
    {
        return [
            'size_bytes' => 'integer',
            'width' => 'integer',
            'height' => 'integer',
            'metadata' => 'array',
            'is_public' => 'boolean',
            'download_count' => 'integer',
        ];
    }

    // Relationships

    public function bucket(): BelongsTo
    {
        return $this->belongsTo(Bucket::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    // Accessors

    public function getSizeMbAttribute(): float
    {
        return round($this->size_bytes / (1024 * 1024), 2);
    }

    public function getIsImageAttribute(): bool
    {
        return str_starts_with($this->mime_type, 'image/');
    }
}
