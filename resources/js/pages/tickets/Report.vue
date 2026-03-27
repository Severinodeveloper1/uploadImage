<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, Printer } from 'lucide-vue-next';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';

interface Ticket {
    id: number;
    ticket_code: string;
    company_name: string | null;
    client_name: string;
    document_type: { id: number; name: string; code: string } | null;
    document_number: string;
    reported_failure: string;
    phone: string;
    service_date: string;
    entry_date: string;
    start_time: string;
    end_time: string | null;
    technician: { id: number; name: string } | null;
    product_name: string;
    model: string;
    serial_number: string;
    warranty_seals: string;
    physical_observations: string | null;
    reception_client_signature: string | null;
    reception_technician_signature: string | null;
    reception_signed_at: string | null;
    client_approved_repair: boolean;
    repair_details: string | null;
    final_description: string | null;
    delivery_client_signature: string | null;
    delivery_technician_signature: string | null;
    delivery_signed_at: string | null;
    status: string;
    accessories: { id: number; name: string; included: boolean; notes: string | null }[];
    photos: { id: number; photo_type: string; storage_file_id: number | null; file_path: string; caption: string | null }[];
}

const props = defineProps<{
    ticket: Ticket;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Fichas de Servicio', href: '/dashboard/tickets' },
    { title: props.ticket.ticket_code, href: `/dashboard/tickets/${props.ticket.id}` },
    { title: 'Reporte', href: `/dashboard/tickets/${props.ticket.id}/report` },
];

const warrantyLabels: Record<string, string> = {
    intacto: 'Intacto',
    roto: 'Roto',
    sin_sello: 'Sin sello',
};

const photoTypeLabels: Record<string, string> = {
    before_service: 'Antes del servicio',
    after_service: 'Después del servicio',
    reception: 'Recepción',
};

function printReport() {
    window.print();
}
</script>

<template>
    <Head :title="`Reporte ${ticket.ticket_code}`" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-1 flex-col gap-4 p-4 md:p-6">
            <!-- Toolbar (se oculta al imprimir) -->
            <div class="flex items-center justify-between print:hidden">
                <Link :href="`/dashboard/tickets/${ticket.id}`">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft class="mr-1 h-4 w-4" /> Volver
                    </Button>
                </Link>
                <Button @click="printReport">
                    <Printer class="mr-1 h-4 w-4" /> Imprimir / PDF
                </Button>
            </div>

            <!-- Reporte imprimible -->
            <div class="mx-auto w-full max-w-3xl rounded-lg border bg-white p-8 text-black print:border-0 print:shadow-none print:p-0">
                <!-- Encabezado -->
                <div class="mb-6 border-b-2 border-black pb-4 text-center">
                    <h1 class="text-2xl font-bold">FICHA DE SERVICIO TÉCNICO</h1>
                    <p class="mt-1 text-lg font-mono font-semibold">{{ ticket.ticket_code }}</p>
                </div>

                <!-- Datos del Cliente -->
                <section class="mb-4">
                    <h2 class="mb-2 border-b font-semibold text-sm uppercase">Datos del Cliente</h2>
                    <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        <p><span class="font-medium">Cliente:</span> {{ ticket.client_name }}</p>
                        <p><span class="font-medium">Empresa:</span> {{ ticket.company_name || '—' }}</p>
                        <p><span class="font-medium">Documento:</span> {{ ticket.document_type?.name }} {{ ticket.document_number }}</p>
                        <p><span class="font-medium">Teléfono:</span> {{ ticket.phone }}</p>
                    </div>
                    <p class="mt-2 text-sm"><span class="font-medium">Falla reportada:</span> {{ ticket.reported_failure }}</p>
                </section>

                <!-- Datos del Servicio -->
                <section class="mb-4">
                    <h2 class="mb-2 border-b font-semibold text-sm uppercase">Datos del Servicio</h2>
                    <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        <p><span class="font-medium">Técnico:</span> {{ ticket.technician?.name }}</p>
                        <p><span class="font-medium">Fecha atención:</span> {{ new Date(ticket.service_date).toLocaleDateString('es-PE') }}</p>
                        <p><span class="font-medium">Fecha ingreso:</span> {{ new Date(ticket.entry_date).toLocaleDateString('es-PE') }}</p>
                        <p><span class="font-medium">Hora inicio:</span> {{ ticket.start_time }}</p>
                        <p><span class="font-medium">Hora fin:</span> {{ ticket.end_time ?? '—' }}</p>
                    </div>
                </section>

                <!-- Datos del Producto -->
                <section class="mb-4">
                    <h2 class="mb-2 border-b font-semibold text-sm uppercase">Datos del Producto</h2>
                    <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        <p><span class="font-medium">Producto:</span> {{ ticket.product_name }}</p>
                        <p><span class="font-medium">Modelo:</span> {{ ticket.model }}</p>
                        <p><span class="font-medium">N° Serie:</span> {{ ticket.serial_number }}</p>
                        <p><span class="font-medium">Sellos garantía:</span> {{ warrantyLabels[ticket.warranty_seals] ?? ticket.warranty_seals }}</p>
                    </div>
                </section>

                <!-- Observaciones -->
                <section v-if="ticket.physical_observations" class="mb-4">
                    <h2 class="mb-2 border-b font-semibold text-sm uppercase">Observaciones Físicas</h2>
                    <p class="text-sm">{{ ticket.physical_observations }}</p>
                </section>

                <!-- Accesorios -->
                <section v-if="ticket.accessories.length > 0" class="mb-4">
                    <h2 class="mb-2 border-b font-semibold text-sm uppercase">Accesorios</h2>
                    <table class="w-full text-sm border">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="border px-2 py-1 text-left">Accesorio</th>
                                <th class="border px-2 py-1 text-center">Incluido</th>
                                <th class="border px-2 py-1 text-left">Notas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="acc in ticket.accessories" :key="acc.id">
                                <td class="border px-2 py-1">{{ acc.name }}</td>
                                <td class="border px-2 py-1 text-center">{{ acc.included ? 'Sí' : 'No' }}</td>
                                <td class="border px-2 py-1">{{ acc.notes || '—' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <!-- Reparación -->
                <section v-if="ticket.final_description" class="mb-4">
                    <h2 class="mb-2 border-b font-semibold text-sm uppercase">Resultado del Servicio</h2>
                    <div v-if="ticket.repair_details" class="mb-2">
                        <p class="text-sm"><span class="font-medium">Detalles de reparación:</span></p>
                        <p class="text-sm mt-1 pl-2 border-l-2">{{ ticket.repair_details }}</p>
                    </div>
                    <p class="text-sm"><span class="font-medium">Descripción final:</span></p>
                    <p class="text-sm mt-1 pl-2 border-l-2">{{ ticket.final_description }}</p>
                </section>

                <!-- Fotos -->
                <section v-if="ticket.photos.length > 0" class="mb-4 print:break-before-page">
                    <h2 class="mb-2 border-b font-semibold text-sm uppercase">Fotos del Equipo</h2>
                    <div class="grid grid-cols-2 gap-3">
                        <div v-for="photo in ticket.photos" :key="photo.id" class="border rounded p-1">
                            <img :src="`/files/${photo.storage_file_id}`" :alt="photo.caption || 'Foto'" class="w-full object-contain max-h-48" />
                            <p class="mt-1 text-xs text-center">
                                {{ photoTypeLabels[photo.photo_type] }}
                                <span v-if="photo.caption"> — {{ photo.caption }}</span>
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Firmas de Recepción -->
                <section v-if="ticket.reception_signed_at" class="mb-6">
                    <h2 class="mb-2 border-b font-semibold text-sm uppercase">Conformidad de Recepción</h2>
                    <p class="text-xs text-gray-500 mb-2">
                        Firmado el {{ new Date(ticket.reception_signed_at).toLocaleString('es-PE') }}
                    </p>
                    <div class="grid grid-cols-2 gap-8">
                        <div class="text-center">
                            <img v-if="ticket.reception_client_signature" :src="ticket.reception_client_signature"
                                alt="Firma cliente" class="mx-auto max-h-20" />
                            <div class="mt-2 border-t pt-1 text-xs">Firma del Cliente</div>
                        </div>
                        <div class="text-center">
                            <img v-if="ticket.reception_technician_signature" :src="ticket.reception_technician_signature"
                                alt="Firma técnico" class="mx-auto max-h-20" />
                            <div class="mt-2 border-t pt-1 text-xs">Firma del Técnico</div>
                        </div>
                    </div>
                </section>

                <!-- Firmas de Entrega -->
                <section v-if="ticket.delivery_signed_at" class="mb-6">
                    <h2 class="mb-2 border-b font-semibold text-sm uppercase">Conformidad de Entrega</h2>
                    <p class="text-xs text-gray-500 mb-2">
                        Firmado el {{ new Date(ticket.delivery_signed_at).toLocaleString('es-PE') }}
                    </p>
                    <div class="grid grid-cols-2 gap-8">
                        <div class="text-center">
                            <img v-if="ticket.delivery_client_signature" :src="ticket.delivery_client_signature"
                                alt="Firma cliente" class="mx-auto max-h-20" />
                            <div class="mt-2 border-t pt-1 text-xs">Firma del Cliente</div>
                        </div>
                        <div class="text-center">
                            <img v-if="ticket.delivery_technician_signature" :src="ticket.delivery_technician_signature"
                                alt="Firma técnico" class="mx-auto max-h-20" />
                            <div class="mt-2 border-t pt-1 text-xs">Firma del Técnico</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </AppLayout>
</template>
