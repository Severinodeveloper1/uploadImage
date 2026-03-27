<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';

interface DocumentType {
    id: number;
    name: string;
    code: string;
}

interface Accessory {
    id?: number;
    name: string;
    included: boolean;
    notes: string;
}

interface Ticket {
    id: number;
    ticket_code: string;
    company_name: string | null;
    client_name: string;
    document_type_id: number;
    document_number: string;
    reported_failure: string;
    phone: string;
    service_date: string;
    entry_date: string;
    start_time: string;
    product_name: string;
    model: string;
    serial_number: string;
    warranty_seals: string;
    physical_observations: string | null;
    status: string;
    accessories: Accessory[];
}

const props = defineProps<{
    ticket: Ticket;
    documentTypes: DocumentType[];
}>();

const isLocked = props.ticket.status !== 'draft';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Fichas de Servicio', href: '/dashboard/tickets' },
    { title: props.ticket.ticket_code, href: `/dashboard/tickets/${props.ticket.id}` },
    { title: 'Editar', href: `/dashboard/tickets/${props.ticket.id}/edit` },
];

const form = useForm({
    company_name: props.ticket.company_name ?? '',
    client_name: props.ticket.client_name,
    document_type_id: props.ticket.document_type_id,
    document_number: props.ticket.document_number,
    reported_failure: props.ticket.reported_failure,
    phone: props.ticket.phone,
    service_date: props.ticket.service_date?.split('T')[0] ?? '',
    entry_date: props.ticket.entry_date?.split('T')[0] ?? '',
    start_time: props.ticket.start_time?.slice(0, 5) ?? '',
    product_name: props.ticket.product_name,
    model: props.ticket.model,
    serial_number: props.ticket.serial_number,
    warranty_seals: props.ticket.warranty_seals,
    physical_observations: props.ticket.physical_observations ?? '',
    accessories: (props.ticket.accessories ?? []).map(a => ({
        name: a.name,
        included: a.included,
        notes: a.notes ?? '',
    })),
});

function addAccessory() {
    form.accessories.push({ name: '', included: true, notes: '' });
}

function removeAccessory(index: number) {
    form.accessories.splice(index, 1);
}

function submit() {
    form.put(`/dashboard/tickets/${props.ticket.id}`);
}
</script>

<template>
    <Head :title="`Editar ${ticket.ticket_code}`" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-1 items-start justify-center p-4 md:p-8">
            <Card class="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle>Editar {{ ticket.ticket_code }}</CardTitle>
                    <CardDescription v-if="isLocked">
                        Los datos del cliente y producto están bloqueados porque la ficha ya fue recibida.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="submit" class="flex flex-col gap-6">
                        <!-- DATOS DEL CLIENTE -->
                        <fieldset class="rounded-lg border p-4">
                            <legend class="px-2 text-sm font-semibold">Datos del Cliente</legend>
                            <div class="grid gap-4 md:grid-cols-2">
                                <div class="grid gap-2">
                                    <Label>Nombre del cliente *</Label>
                                    <Input v-model="form.client_name" required :disabled="isLocked" />
                                    <InputError :message="form.errors.client_name" />
                                </div>
                                <div class="grid gap-2">
                                    <Label>Empresa</Label>
                                    <Input v-model="form.company_name" :disabled="isLocked" />
                                </div>
                                <div class="grid gap-2">
                                    <Label>Tipo de documento *</Label>
                                    <select v-model="form.document_type_id" :disabled="isLocked" required
                                        class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs disabled:opacity-50">
                                        <option v-for="dt in documentTypes" :key="dt.id" :value="dt.id">{{ dt.name }}</option>
                                    </select>
                                </div>
                                <div class="grid gap-2">
                                    <Label>N° Documento *</Label>
                                    <Input v-model="form.document_number" required :disabled="isLocked" />
                                </div>
                                <div class="grid gap-2">
                                    <Label>Teléfono *</Label>
                                    <Input v-model="form.phone" required :disabled="isLocked" />
                                </div>
                                <div class="grid gap-2 md:col-span-2">
                                    <Label>Falla reportada *</Label>
                                    <textarea v-model="form.reported_failure" required :disabled="isLocked" rows="3"
                                        class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs disabled:opacity-50" />
                                    <InputError :message="form.errors.reported_failure" />
                                </div>
                            </div>
                        </fieldset>

                        <!-- DATOS DEL SERVICIO -->
                        <fieldset class="rounded-lg border p-4">
                            <legend class="px-2 text-sm font-semibold">Datos del Servicio</legend>
                            <div class="grid gap-4 md:grid-cols-3">
                                <div class="grid gap-2">
                                    <Label>Fecha de atención *</Label>
                                    <Input v-model="form.service_date" type="date" required />
                                </div>
                                <div class="grid gap-2">
                                    <Label>Fecha de ingreso *</Label>
                                    <Input v-model="form.entry_date" type="date" required />
                                </div>
                                <div class="grid gap-2">
                                    <Label>Hora de inicio *</Label>
                                    <Input v-model="form.start_time" type="time" required />
                                </div>
                            </div>
                        </fieldset>

                        <!-- DATOS DEL PRODUCTO -->
                        <fieldset class="rounded-lg border p-4">
                            <legend class="px-2 text-sm font-semibold">Datos del Producto</legend>
                            <div class="grid gap-4 md:grid-cols-2">
                                <div class="grid gap-2">
                                    <Label>Producto *</Label>
                                    <Input v-model="form.product_name" required :disabled="isLocked" />
                                </div>
                                <div class="grid gap-2">
                                    <Label>Modelo *</Label>
                                    <Input v-model="form.model" required :disabled="isLocked" />
                                </div>
                                <div class="grid gap-2">
                                    <Label>N° de Serie *</Label>
                                    <Input v-model="form.serial_number" required :disabled="isLocked" />
                                </div>
                                <div class="grid gap-2">
                                    <Label>Sellos de garantía *</Label>
                                    <select v-model="form.warranty_seals" required :disabled="isLocked"
                                        class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs disabled:opacity-50">
                                        <option value="intacto">Intacto</option>
                                        <option value="roto">Roto</option>
                                        <option value="sin_sello">Sin sello</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        <!-- OBSERVACIONES -->
                        <fieldset class="rounded-lg border p-4">
                            <legend class="px-2 text-sm font-semibold">Observaciones Físicas</legend>
                            <textarea v-model="form.physical_observations" rows="3"
                                class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs" />
                        </fieldset>

                        <!-- ACCESORIOS -->
                        <fieldset class="rounded-lg border p-4">
                            <legend class="px-2 text-sm font-semibold">Accesorios</legend>
                            <div class="flex flex-col gap-3">
                                <div v-for="(acc, index) in form.accessories" :key="index" class="flex items-end gap-2">
                                    <div class="flex-1 grid gap-1">
                                        <Label class="text-xs">Nombre</Label>
                                        <Input v-model="acc.name" required placeholder="Ej: Cargador" />
                                    </div>
                                    <div class="flex items-center gap-2 pb-1">
                                        <input v-model="acc.included" type="checkbox" class="h-4 w-4 rounded border-gray-300" />
                                        <Label class="text-xs">Incluido</Label>
                                    </div>
                                    <div class="flex-1 grid gap-1">
                                        <Label class="text-xs">Notas</Label>
                                        <Input v-model="acc.notes" placeholder="Observaciones" />
                                    </div>
                                    <Button type="button" size="sm" variant="destructive" @click="removeAccessory(index)">✕</Button>
                                </div>
                                <Button type="button" variant="outline" size="sm" class="w-fit" @click="addAccessory">
                                    + Agregar accesorio
                                </Button>
                            </div>
                        </fieldset>

                        <Button type="submit" class="w-full" :disabled="form.processing">
                            <Spinner v-if="form.processing" />
                            Guardar Cambios
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
