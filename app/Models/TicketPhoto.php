<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TicketPhoto extends Model
{
    protected $fillable = [
        'service_ticket_id',
        'storage_file_id',
        'photo_type',
        'file_path',
        'caption',
        'uploaded_by',
    ];

    public function serviceTicket(): BelongsTo
    {
        return $this->belongsTo(ServiceTicket::class);
    }

    public function storageFile(): BelongsTo
    {
        return $this->belongsTo(StorageFile::class);
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Get the URL for displaying this photo.
     */
    public function getUrlAttribute(): string
    {
        if ($this->storage_file_id) {
            return url('/files/' . $this->storage_file_id);
        }

        // Fallback for legacy photos stored without StorageFile
        return '';
    }
}
