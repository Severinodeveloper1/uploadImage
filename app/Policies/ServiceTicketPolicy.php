<?php

namespace App\Policies;

use App\Models\User;

class ServiceTicketPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('tickets.view_any') || $user->can('tickets.view_own');
    }

    /**
     * @param  \Illuminate\Database\Eloquent\Model  $ticket
     */
    public function view(User $user, $ticket): bool
    {
        if ($user->can('tickets.view_any')) {
            return true;
        }

        // Técnico ve solo sus fichas
        if ($user->can('tickets.view_own') && $ticket->technician_id === $user->id) {
            return true;
        }

        // Cliente ve fichas donde coincide su documento
        if ($user->hasRole('client') && $user->can('tickets.view_report')) {
            return isset($ticket->document_number)
                && isset($user->document_number)
                && $ticket->document_number === $user->document_number;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('tickets.create');
    }

    public function update(User $user, $ticket): bool
    {
        if (!$user->can('tickets.edit')) {
            return false;
        }

        // No se puede editar si está cerrada
        if (isset($ticket->status) && $ticket->status === 'closed') {
            return false;
        }

        // Técnico solo edita las suyas
        if ($user->hasRole('technician')) {
            return $ticket->technician_id === $user->id;
        }

        return true;
    }

    public function sign(User $user, $ticket): bool
    {
        if (!$user->can('tickets.sign')) {
            return false;
        }

        // Técnico solo firma las suyas
        if ($user->hasRole('technician')) {
            return $ticket->technician_id === $user->id;
        }

        return true;
    }

    public function approveRepair(User $user): bool
    {
        return $user->can('tickets.approve_repair');
    }

    public function delete(User $user): bool
    {
        return $user->can('tickets.delete');
    }

    public function viewReport(User $user, $ticket): bool
    {
        if ($user->can('tickets.view_any')) {
            return true;
        }

        if ($user->can('tickets.view_own') && $ticket->technician_id === $user->id) {
            return true;
        }

        // Cliente solo ve reportes de sus fichas
        if ($user->hasRole('client') && $user->can('tickets.view_report')) {
            return isset($ticket->document_number)
                && isset($user->document_number)
                && $ticket->document_number === $user->document_number;
        }

        return false;
    }

    public function exportPdf(User $user, $ticket): bool
    {
        if (!$user->can('tickets.export_pdf')) {
            return false;
        }

        // Técnico solo exporta las suyas
        if ($user->hasRole('technician')) {
            return $ticket->technician_id === $user->id;
        }

        return true;
    }
}
