<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { ClipboardList, Plus, Eye, Trash2 } from 'lucide-vue-next';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/composables/usePermissions';
import type { BreadcrumbItem } from '@/types';

const { can } = usePermissions();

interface Ticket {
    id: number;
    ticket_code: string;
    client_name: string;
    product_name: string;
    status: string;
    service_date: string;
    created_at: string;
    technician: { id: number; name: string } | null;
    document_type: { id: number; name: string } | null;
}

interface PaginatedTickets {
    data: Ticket[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

const props = defineProps<{
    tickets: PaginatedTickets;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Fichas de Servicio', href: '/dashboard/tickets' },
];

const statusLabels: Record<string, string> = {
    draft: 'Borrador',
    received: 'Recibido',
    approved: 'Aprobado',
    repaired: 'Reparado',
    delivered: 'Entregado',
    closed: 'Cerrado',
};

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    received: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    approved: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    repaired: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    delivered: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    closed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

function deleteTicket(id: number) {
    if (!confirm('¿Está seguro de eliminar esta ficha?')) return;
    router.delete(`/dashboard/tickets/${id}`, { preserveScroll: true });
}
</script>

<template>
    <Head title="Fichas de Servicio" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-1 flex-col gap-4 p-4 md:p-6">
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold flex items-center gap-2">
                    <ClipboardList class="h-5 w-5" />
                    Fichas de Servicio
                </h2>
                <Link v-if="can('tickets.create')" href="/dashboard/tickets/create">
                    <Button>
                        <Plus class="mr-1 h-4 w-4" />
                        Nueva Ficha
                    </Button>
                </Link>
            </div>

            <Card>
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-sm">
                            <thead class="border-b text-xs uppercase text-muted-foreground">
                                <tr>
                                    <th class="px-4 py-3">Código</th>
                                    <th class="px-4 py-3">Cliente</th>
                                    <th class="px-4 py-3">Producto</th>
                                    <th class="px-4 py-3">Técnico</th>
                                    <th class="px-4 py-3">Fecha</th>
                                    <th class="px-4 py-3">Estado</th>
                                    <th class="px-4 py-3 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="tickets.data.length === 0">
                                    <td colspan="7" class="px-4 py-8 text-center text-muted-foreground">
                                        No hay fichas de servicio registradas.
                                    </td>
                                </tr>
                                <tr
                                    v-for="ticket in tickets.data"
                                    :key="ticket.id"
                                    class="border-b transition-colors hover:bg-muted/50"
                                >
                                    <td class="px-4 py-3 font-mono text-xs font-medium">
                                        {{ ticket.ticket_code }}
                                    </td>
                                    <td class="px-4 py-3">{{ ticket.client_name }}</td>
                                    <td class="px-4 py-3 text-muted-foreground">{{ ticket.product_name }}</td>
                                    <td class="px-4 py-3 text-muted-foreground">
                                        {{ ticket.technician?.name ?? '—' }}
                                    </td>
                                    <td class="px-4 py-3 text-muted-foreground">
                                        {{ new Date(ticket.service_date).toLocaleDateString('es-PE') }}
                                    </td>
                                    <td class="px-4 py-3">
                                        <span
                                            class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                            :class="statusColors[ticket.status] ?? statusColors.draft"
                                        >
                    {{ statusLabels[ticket.status] ?? ticket.status }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                        <div class="flex items-center justify-end gap-1">
                                            <Link :href="`/dashboard/tickets/${ticket.id}`">
                                                <Button size="sm" variant="ghost" title="Ver">
                                                    <Eye class="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                v-if="can('tickets.delete')"
                                                size="sm"
                                                variant="ghost"
                                                class="text-destructive"
                                                title="Eliminar"
                                                @click="deleteTicket(ticket.id)"
                                            >
                                                <Trash2 class="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Paginación -->
                    <div v-if="tickets.last_page > 1" class="flex items-center justify-between border-t px-4 py-3">
                        <span class="text-sm text-muted-foreground">
                            Mostrando {{ tickets.data.length }} de {{ tickets.total }} fichas
                        </span>
                        <div class="flex gap-1">
                            <Link
                                v-if="tickets.prev_page_url"
                                :href="tickets.prev_page_url"
                                preserve-scroll
                            >
                                <Button size="sm" variant="outline">Anterior</Button>
                            </Link>
                            <Link
                                v-if="tickets.next_page_url"
                                :href="tickets.next_page_url"
                                preserve-scroll
                            >
                                <Button size="sm" variant="outline">Siguiente</Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
