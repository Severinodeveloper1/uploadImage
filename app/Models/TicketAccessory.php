<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TicketAccessory extends Model
{
    protected $fillable = [
        'service_ticket_id',
        'name',
        'included',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'included' => 'boolean',
        ];
    }

    public function serviceTicket(): BelongsTo
    {
        return $this->belongsTo(ServiceTicket::class);
    }
}
