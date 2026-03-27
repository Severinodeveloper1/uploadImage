<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
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

const props = defineProps<{
    documentTypes: DocumentType[];
}>();

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Fichas de Servicio', href: '/dashboard/tickets' },
    { title: 'Nueva Ficha', href: '/dashboard/tickets/create' },
];

const form = useForm({
    company_name: '',
    client_name: '',
    document_type_id: props.documentTypes[0]?.id ?? '',
    document_number: '',
    reported_failure: '',
    phone: '',
    service_date: new Date().toISOString().split('T')[0],
    entry_date: new Date().toISOString().split('T')[0],
    start_time: new Date().toTimeString().slice(0, 5),
    product_name: '',
    model: '',
    serial_number: '',
    warranty_seals: 'intacto',
    physical_observations: '',
    accessories: [] as { name: string; included: boolean; notes: string }[],
});

function addAccessory() {
    form.accessories.push({ name: '', included: true, notes: '' });
}

function removeAccessory(index: number) {
    form.accessories.splice(index, 1);
}

function submit() {
    form.post('/dashboard/tickets', {
        onSuccess: () => form.reset(),
    });
}
</script>

<template>
    <Head title="Nueva Ficha de Servicio" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-1 items-start justify-center p-4 md:p-8">
            <Card class="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle>Nueva Ficha de Servicio</CardTitle>
                    <CardDescription>Complete los datos para registrar una nueva ficha de servicio técnico.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="submit" class="flex flex-col gap-6">
                        <!-- DATOS DEL CLIENTE -->
                        <fieldset class="rounded-lg border p-4">
                            <legend class="px-2 text-sm font-semibold">Datos del Cliente</legend>
                            <div class="grid gap-4 md:grid-cols-2">
                                <div class="grid gap-2">
                                    <Label for="client_name">Nombre del cliente *</Label>
                                    <Input id="client_name" v-model="form.client_name" required placeholder="Nombre completo" />
                                    <InputError :message="form.errors.client_name" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="company_name">Empresa</Label>
                                    <Input id="company_name" v-model="form.company_name" placeholder="Razón social (opcional)" />
                                    <InputError :message="form.errors.company_name" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="document_type_id">Tipo de documento *</Label>
                                    <select
                                        id="document_type_id"
                                        v-model="form.document_type_id"
                                        required
                                        class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    >
                                        <option v-for="dt in documentTypes" :key="dt.id" :value="dt.id">
                                            {{ dt.name }}
                                        </option>
                                    </select>
                                    <InputError :message="form.errors.document_type_id" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="document_number">N° Documento *</Label>
                                    <Input id="document_number" v-model="form.document_number" required placeholder="12345678" />
                                    <InputError :message="form.errors.document_number" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="phone">Teléfono *</Label>
                                    <Input id="phone" v-model="form.phone" required placeholder="999 999 999" />
                                    <InputError :message="form.errors.phone" />
                                </div>
                                <div class="grid gap-2 md:col-span-2">
                                    <Label for="reported_failure">Falla reportada *</Label>
                                    <textarea
                                        id="reported_failure"
                                        v-model="form.reported_failure"
                                        required
                                        rows="3"
                                        placeholder="Describa la falla reportada por el cliente..."
                                        class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    />
                                    <InputError :message="form.errors.reported_failure" />
                                </div>
                            </div>
                        </fieldset>

                        <!-- DATOS DEL SERVICIO -->
                        <fieldset class="rounded-lg border p-4">
                            <legend class="px-2 text-sm font-semibold">Datos del Servicio</legend>
                            <div class="grid gap-4 md:grid-cols-3">
                                <div class="grid gap-2">
                                    <Label for="service_date">Fecha de atención *</Label>
                                    <Input id="service_date" v-model="form.service_date" type="date" required />
                                    <InputError :message="form.errors.service_date" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="entry_date">Fecha de ingreso *</Label>
                                    <Input id="entry_date" v-model="form.entry_date" type="date" required />
                                    <InputError :message="form.errors.entry_date" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="start_time">Hora de inicio *</Label>
                                    <Input id="start_time" v-model="form.start_time" type="time" required />
                                    <InputError :message="form.errors.start_time" />
                                </div>
                            </div>
                        </fieldset>

                        <!-- DATOS DEL PRODUCTO -->
                        <fieldset class="rounded-lg border p-4">
                            <legend class="px-2 text-sm font-semibold">Datos del Producto</legend>
                            <div class="grid gap-4 md:grid-cols-2">
                                <div class="grid gap-2">
                                    <Label for="product_name">Nombre del producto *</Label>
                                    <Input id="product_name" v-model="form.product_name" required placeholder="Ej: Laptop HP" />
                                    <InputError :message="form.errors.product_name" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="model">Modelo *</Label>
                                    <Input id="model" v-model="form.model" required placeholder="Ej: Pavilion 15" />
                                    <InputError :message="form.errors.model" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="serial_number">N° de Serie *</Label>
                                    <Input id="serial_number" v-model="form.serial_number" required placeholder="S/N del equipo" />
                                    <InputError :message="form.errors.serial_number" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="warranty_seals">Sellos de garantía *</Label>
                                    <select
                                        id="warranty_seals"
                                        v-model="form.warranty_seals"
                                        required
                                        class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    >
                                        <option value="intacto">Intacto</option>
                                        <option value="roto">Roto</option>
                                        <option value="sin_sello">Sin sello</option>
                                    </select>
                                    <InputError :message="form.errors.warranty_seals" />
                                </div>
                            </div>
                        </fieldset>

                        <!-- OBSERVACIONES FÍSICAS -->
                        <fieldset class="rounded-lg border p-4">
                            <legend class="px-2 text-sm font-semibold">Observaciones Físicas</legend>
                            <div class="grid gap-2">
                                <textarea
                                    id="physical_observations"
                                    v-model="form.physical_observations"
                                    rows="3"
                                    placeholder="Rayones, golpes, estado general del equipo..."
                                    class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                                <InputError :message="form.errors.physical_observations" />
                            </div>
                        </fieldset>

                        <!-- ACCESORIOS -->
                        <fieldset class="rounded-lg border p-4">
                            <legend class="px-2 text-sm font-semibold">Accesorios del Equipo</legend>
                            <div class="flex flex-col gap-3">
                                <div
                                    v-for="(acc, index) in form.accessories"
                                    :key="index"
                                    class="flex items-end gap-2"
                                >
                                    <div class="flex-1 grid gap-1">
                                        <Label :for="`acc_name_${index}`" class="text-xs">Nombre</Label>
                                        <Input
                                            :id="`acc_name_${index}`"
                                            v-model="acc.name"
                                            placeholder="Ej: Cargador"
                                            required
                                        />
                                    </div>
                                    <div class="flex items-center gap-2 pb-1">
                                        <input
                                            :id="`acc_incl_${index}`"
                                            v-model="acc.included"
                                            type="checkbox"
                                            class="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label :for="`acc_incl_${index}`" class="text-xs">Incluido</Label>
                                    </div>
                                    <div class="flex-1 grid gap-1">
                                        <Label :for="`acc_notes_${index}`" class="text-xs">Notas</Label>
                                        <Input :id="`acc_notes_${index}`" v-model="acc.notes" placeholder="Observaciones" />
                                    </div>
                                    <Button type="button" size="sm" variant="destructive" @click="removeAccessory(index)">
                                        ✕
                                    </Button>
                                </div>
                                <Button type="button" variant="outline" size="sm" class="w-fit" @click="addAccessory">
                                    + Agregar accesorio
                                </Button>
                            </div>
                        </fieldset>

                        <Button type="submit" class="w-full" :disabled="form.processing">
                            <Spinner v-if="form.processing" />
                            Crear Ficha de Servicio
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
