<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { ArrowLeft, Pencil, FileText, Camera, Trash2 } from 'lucide-vue-next';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/InputError.vue';
import SignaturePadComponent from '@/components/SignaturePad.vue';
import { usePermissions } from '@/composables/usePermissions';
import type { BreadcrumbItem } from '@/types';

interface DocumentType {
    id: number;
    name: string;
    code: string;
}

interface Accessory {
    id: number;
    name: string;
    included: boolean;
    notes: string | null;
}

interface Photo {
    id: number;
    photo_type: string;
    storage_file_id: number | null;
    file_path: string;
    caption: string | null;
    uploaded_by: number;
}

interface Ticket {
    id: number;
    ticket_code: string;
    company_name: string | null;
    client_name: string;
    document_type_id: number;
    document_type: DocumentType | null;
    document_number: string;
    reported_failure: string;
    phone: string;
    service_date: string;
    entry_date: string;
    start_time: string;
    end_time: string | null;
    technician_id: number;
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
    accessories: Accessory[];
    photos: Photo[];
}

const props = defineProps<{
    ticket: Ticket;
    documentTypes: DocumentType[];
}>();

const { can } = usePermissions();

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Fichas de Servicio', href: '/dashboard/tickets' },
    { title: props.ticket.ticket_code, href: `/dashboard/tickets/${props.ticket.id}` },
];

const statusLabels: Record<string, string> = {
    draft: 'Borrador',
    received: 'Recibido',
    approved: 'Aprobado',
    repaired: 'Reparado',
    delivered: 'Entregado',
    closed: 'Cerrado',
};

const statusVariant = computed<'default' | 'secondary' | 'destructive' | 'outline'>(() => {
    const map: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        draft: 'outline',
        received: 'secondary',
        approved: 'default',
        repaired: 'default',
        delivered: 'secondary',
        closed: 'destructive',
    };
    return map[props.ticket.status] ?? 'outline';
});

const warrantyLabels: Record<string, string> = {
    intacto: 'Intacto',
    roto: 'Roto',
    sin_sello: 'Sin sello',
};

// ── Firma de Recepción ───────────────────────────────
const showReceptionSign = ref(false);
const receptionForm = useForm({
    client_signature: '',
    technician_signature: '',
});

function submitReceptionSign() {
    receptionForm.post(`/dashboard/tickets/${props.ticket.id}/sign-reception`, {
        preserveScroll: true,
        onSuccess: () => {
            showReceptionSign.value = false;
            receptionForm.reset();
        },
    });
}

// ── Aprobar / Rechazar reparación ────────────────────
function approveRepair(approved: boolean) {
    const message = approved
        ? '¿Confirma que el cliente aprueba la reparación?'
        : '¿Confirma que el cliente NO autoriza la reparación?';
    if (!confirm(message)) return;

    router.post(`/dashboard/tickets/${props.ticket.id}/approve-repair`, {
        client_approved_repair: approved,
    }, { preserveScroll: true });
}

// ── Completar Reparación ─────────────────────────────
const showRepairForm = ref(false);
const repairForm = useForm({
    repair_details: '',
    final_description: '',
    client_approved_repair: true,
});

function submitRepair() {
    repairForm.post(`/dashboard/tickets/${props.ticket.id}/complete-repair`, {
        preserveScroll: true,
        onSuccess: () => {
            showRepairForm.value = false;
            repairForm.reset();
        },
    });
}

// ── Firma de Entrega ─────────────────────────────────
const showDeliverySign = ref(false);
const deliveryForm = useForm({
    client_signature: '',
    technician_signature: '',
});

function submitDeliverySign() {
    deliveryForm.post(`/dashboard/tickets/${props.ticket.id}/sign-delivery`, {
        preserveScroll: true,
        onSuccess: () => {
            showDeliverySign.value = false;
            deliveryForm.reset();
        },
    });
}

// ── Subir Foto ───────────────────────────────────────
const showPhotoUpload = ref(false);
const photoForm = useForm({
    photo: null as File | null,
    photo_type: 'before_service',
    caption: '',
});

function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) {
        photoForm.photo = target.files[0];
    }
}

function submitPhoto() {
    photoForm.post(`/dashboard/tickets/${props.ticket.id}/photos`, {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
            showPhotoUpload.value = false;
            photoForm.reset();
        },
    });
}

function deletePhoto(photoId: number) {
    if (!confirm('¿Eliminar esta foto?')) return;
    router.delete(`/dashboard/tickets/${props.ticket.id}/photos/${photoId}`, {
        preserveScroll: true,
    });
}

const photoTypeLabels: Record<string, string> = {
    before_service: 'Antes del servicio',
    after_service: 'Después del servicio',
    reception: 'Recepción',
};
</script>

<template>
    <Head :title="ticket.ticket_code" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-1 flex-col gap-4 p-4 md:p-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <Link href="/dashboard/tickets">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft class="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h2 class="text-xl font-semibold font-mono">{{ ticket.ticket_code }}</h2>
                        <p class="text-sm text-muted-foreground">{{ ticket.client_name }} — {{ ticket.product_name }}</p>
                    </div>
                    <Badge :variant="statusVariant">{{ statusLabels[ticket.status] ?? ticket.status }}</Badge>
                </div>
                <div class="flex gap-2">
                    <Link v-if="can('tickets.edit') && ticket.status === 'draft'" :href="`/dashboard/tickets/${ticket.id}/edit`">
                        <Button variant="outline" size="sm">
                            <Pencil class="mr-1 h-4 w-4" /> Editar
                        </Button>
                    </Link>
                    <Link v-if="can('tickets.export_pdf') && ticket.status === 'closed'" :href="`/dashboard/tickets/${ticket.id}/report`">
                        <Button variant="outline" size="sm">
                            <FileText class="mr-1 h-4 w-4" /> Reporte PDF
                        </Button>
                    </Link>
                </div>
            </div>

            <div class="grid gap-4 lg:grid-cols-2">
                <!-- Datos del Cliente -->
                <Card>
                    <CardHeader><CardTitle class="text-base">Datos del Cliente</CardTitle></CardHeader>
                    <CardContent>
                        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <dt class="text-muted-foreground">Nombre</dt>
                            <dd>{{ ticket.client_name }}</dd>
                            <dt class="text-muted-foreground">Empresa</dt>
                            <dd>{{ ticket.company_name || '—' }}</dd>
                            <dt class="text-muted-foreground">Documento</dt>
                            <dd>{{ ticket.document_type?.name }} {{ ticket.document_number }}</dd>
                            <dt class="text-muted-foreground">Teléfono</dt>
                            <dd>{{ ticket.phone }}</dd>
                            <dt class="text-muted-foreground">Falla reportada</dt>
                            <dd class="col-span-2 mt-1 rounded bg-muted p-2">{{ ticket.reported_failure }}</dd>
                        </dl>
                    </CardContent>
                </Card>

                <!-- Datos del Servicio -->
                <Card>
                    <CardHeader><CardTitle class="text-base">Datos del Servicio</CardTitle></CardHeader>
                    <CardContent>
                        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <dt class="text-muted-foreground">Técnico</dt>
                            <dd>{{ ticket.technician?.name ?? '—' }}</dd>
                            <dt class="text-muted-foreground">Fecha atención</dt>
                            <dd>{{ new Date(ticket.service_date).toLocaleDateString('es-PE') }}</dd>
                            <dt class="text-muted-foreground">Fecha ingreso</dt>
                            <dd>{{ new Date(ticket.entry_date).toLocaleDateString('es-PE') }}</dd>
                            <dt class="text-muted-foreground">Hora inicio</dt>
                            <dd>{{ ticket.start_time }}</dd>
                            <dt class="text-muted-foreground">Hora fin</dt>
                            <dd>{{ ticket.end_time ?? 'Pendiente' }}</dd>
                        </dl>
                    </CardContent>
                </Card>

                <!-- Datos del Producto -->
                <Card>
                    <CardHeader><CardTitle class="text-base">Datos del Producto</CardTitle></CardHeader>
                    <CardContent>
                        <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            <dt class="text-muted-foreground">Producto</dt>
                            <dd>{{ ticket.product_name }}</dd>
                            <dt class="text-muted-foreground">Modelo</dt>
                            <dd>{{ ticket.model }}</dd>
                            <dt class="text-muted-foreground">N° Serie</dt>
                            <dd class="font-mono">{{ ticket.serial_number }}</dd>
                            <dt class="text-muted-foreground">Sellos garantía</dt>
                            <dd>{{ warrantyLabels[ticket.warranty_seals] ?? ticket.warranty_seals }}</dd>
                        </dl>
                    </CardContent>
                </Card>

                <!-- Observaciones Físicas -->
                <Card>
                    <CardHeader><CardTitle class="text-base">Observaciones Físicas</CardTitle></CardHeader>
                    <CardContent>
                        <p class="text-sm">{{ ticket.physical_observations || 'Sin observaciones.' }}</p>
                    </CardContent>
                </Card>
            </div>

            <!-- Accesorios -->
            <Card v-if="ticket.accessories.length > 0">
                <CardHeader><CardTitle class="text-base">Accesorios</CardTitle></CardHeader>
                <CardContent>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="border-b text-xs uppercase text-muted-foreground">
                                <tr>
                                    <th class="px-3 py-2 text-left">Accesorio</th>
                                    <th class="px-3 py-2 text-center">Incluido</th>
                                    <th class="px-3 py-2 text-left">Notas</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="acc in ticket.accessories" :key="acc.id" class="border-b">
                                    <td class="px-3 py-2">{{ acc.name }}</td>
                                    <td class="px-3 py-2 text-center">
                                        <span :class="acc.included ? 'text-green-600' : 'text-red-600'">
                                            {{ acc.included ? '✓' : '✕' }}
                                        </span>
                                    </td>
                                    <td class="px-3 py-2 text-muted-foreground">{{ acc.notes || '—' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <!-- Fotos -->
            <Card>
                <CardHeader>
                    <div class="flex items-center justify-between">
                        <CardTitle class="text-base">Fotos del Equipo</CardTitle>
                        <Button
                            v-if="can('tickets.edit') && !['closed'].includes(ticket.status)"
                            size="sm"
                            variant="outline"
                            @click="showPhotoUpload = !showPhotoUpload"
                        >
                            <Camera class="mr-1 h-4 w-4" /> Subir Foto
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <!-- Upload Form -->
                    <form v-if="showPhotoUpload" @submit.prevent="submitPhoto" class="mb-4 rounded-lg border p-4 flex flex-col gap-3">
                        <div class="grid gap-4 md:grid-cols-3">
                            <div class="grid gap-2">
                                <Label>Tipo *</Label>
                                <select
                                    v-model="photoForm.photo_type"
                                    class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs"
                                >
                                    <option value="before_service">Antes del servicio</option>
                                    <option value="after_service">Después del servicio</option>
                                    <option value="reception">Recepción</option>
                                </select>
                            </div>
                            <div class="grid gap-2">
                                <Label>Foto *</Label>
                                <input type="file" accept="image/*" @change="handleFileChange"
                                    class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                                />
                                <InputError :message="photoForm.errors.photo" />
                            </div>
                            <div class="grid gap-2">
                                <Label>Descripción</Label>
                                <Input v-model="photoForm.caption" placeholder="Opcional" />
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <Button type="submit" size="sm" :disabled="photoForm.processing">
                                <Spinner v-if="photoForm.processing" />
                                Subir
                            </Button>
                            <Button type="button" size="sm" variant="outline" @click="showPhotoUpload = false">Cancelar</Button>
                        </div>
                    </form>

                    <!-- Photo Grid -->
                    <div v-if="ticket.photos.length > 0" class="grid grid-cols-2 gap-3 md:grid-cols-4">
                        <div v-for="photo in ticket.photos" :key="photo.id" class="group relative overflow-hidden rounded-lg border">
                            <img :src="`/files/${photo.storage_file_id}`" :alt="photo.caption || 'Foto'" class="aspect-square w-full object-cover" />
                            <div class="absolute bottom-0 left-0 right-0 bg-black/60 p-1.5 text-xs text-white">
                                {{ photoTypeLabels[photo.photo_type] }}
                                <span v-if="photo.caption"> — {{ photo.caption }}</span>
                            </div>
                            <Button
                                v-if="can('tickets.edit')"
                                size="sm"
                                variant="destructive"
                                class="absolute right-1 top-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                                @click="deletePhoto(photo.id)"
                            >
                                <Trash2 class="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                    <p v-else class="text-sm text-muted-foreground">No hay fotos registradas.</p>
                </CardContent>
            </Card>

            <!-- ═══ ACCIONES DE FLUJO ═══ -->

            <!-- Firmar Recepción (draft → received) -->
            <Card v-if="ticket.status === 'draft' && can('tickets.sign')">
                <CardHeader>
                    <CardTitle class="text-base">Conformidad de Recepción</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="mb-3 text-sm text-muted-foreground">
                        El cliente firma la conformidad de recepción del equipo. Una vez firmado, los datos del cliente
                        y producto quedarán bloqueados.
                    </p>
                    <Button v-if="!showReceptionSign" @click="showReceptionSign = true">
                        Firmar Recepción
                    </Button>
                    <form v-else @submit.prevent="submitReceptionSign" class="flex flex-col gap-4 rounded-lg border p-4">
                        <p class="text-sm font-medium">Firmas de Recepción</p>
                        <div class="grid gap-4 md:grid-cols-2">
                            <div class="grid gap-2">
                                <SignaturePadComponent
                                    v-model="receptionForm.client_signature"
                                    label="Firma del Cliente *"
                                />
                                <InputError :message="receptionForm.errors.client_signature" />
                            </div>
                            <div class="grid gap-2">
                                <SignaturePadComponent
                                    v-model="receptionForm.technician_signature"
                                    label="Firma del Técnico *"
                                />
                                <InputError :message="receptionForm.errors.technician_signature" />
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <Button type="submit" :disabled="receptionForm.processing">
                                <Spinner v-if="receptionForm.processing" /> Confirmar Recepción
                            </Button>
                            <Button type="button" variant="outline" @click="showReceptionSign = false">Cancelar</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <!-- Firmas de recepción guardadas -->
            <Card v-if="ticket.reception_signed_at">
                <CardHeader><CardTitle class="text-base">✓ Recepción Firmada</CardTitle></CardHeader>
                <CardContent>
                    <p class="text-sm text-muted-foreground mb-3">
                        Firmado el {{ new Date(ticket.reception_signed_at).toLocaleString('es-PE') }}
                    </p>
                    <div class="grid gap-4 md:grid-cols-2">
                        <div v-if="ticket.reception_client_signature">
                            <p class="text-xs font-medium mb-1">Firma del Cliente</p>
                            <img :src="ticket.reception_client_signature" alt="Firma cliente" class="max-h-24 rounded border p-1" />
                        </div>
                        <div v-if="ticket.reception_technician_signature">
                            <p class="text-xs font-medium mb-1">Firma del Técnico</p>
                            <img :src="ticket.reception_technician_signature" alt="Firma técnico" class="max-h-24 rounded border p-1" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Aprobar/Rechazar Reparación (received → approved/delivered) -->
            <Card v-if="ticket.status === 'received' && can('tickets.approve_repair')">
                <CardHeader><CardTitle class="text-base">Autorización de Reparación</CardTitle></CardHeader>
                <CardContent>
                    <p class="mb-3 text-sm text-muted-foreground">
                        El cliente debe autorizar o rechazar la reparación del equipo.
                    </p>
                    <div class="flex gap-3">
                        <Button @click="approveRepair(true)">Aprobar Reparación</Button>
                        <Button variant="destructive" @click="approveRepair(false)">Rechazar Reparación</Button>
                    </div>
                </CardContent>
            </Card>

            <!-- Completar Reparación (approved → repaired) -->
            <Card v-if="ticket.status === 'approved' && can('tickets.edit')">
                <CardHeader><CardTitle class="text-base">Completar Reparación</CardTitle></CardHeader>
                <CardContent>
                    <Button v-if="!showRepairForm" @click="showRepairForm = true">Registrar Reparación</Button>
                    <form v-else @submit.prevent="submitRepair" class="flex flex-col gap-4">
                        <div class="grid gap-2">
                            <Label>Detalles de la reparación *</Label>
                            <textarea
                                v-model="repairForm.repair_details"
                                required
                                rows="4"
                                placeholder="Describa los trabajos realizados..."
                                class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            <InputError :message="repairForm.errors.repair_details" />
                        </div>
                        <div class="grid gap-2">
                            <Label>Descripción final *</Label>
                            <textarea
                                v-model="repairForm.final_description"
                                required
                                rows="3"
                                placeholder="Descripción del resultado final..."
                                class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                            <InputError :message="repairForm.errors.final_description" />
                        </div>
                        <div class="flex gap-2">
                            <Button type="submit" :disabled="repairForm.processing">
                                <Spinner v-if="repairForm.processing" /> Completar Reparación
                            </Button>
                            <Button type="button" variant="outline" @click="showRepairForm = false">Cancelar</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <!-- Reparación completada -->
            <Card v-if="ticket.repair_details">
                <CardHeader><CardTitle class="text-base">✓ Reparación</CardTitle></CardHeader>
                <CardContent>
                    <dl class="grid gap-2 text-sm">
                        <dt class="text-muted-foreground">Detalles de reparación</dt>
                        <dd class="rounded bg-muted p-2">{{ ticket.repair_details }}</dd>
                        <dt class="text-muted-foreground">Descripción final</dt>
                        <dd class="rounded bg-muted p-2">{{ ticket.final_description }}</dd>
                    </dl>
                </CardContent>
            </Card>

            <!-- Firmar Entrega (repaired/delivered → closed) -->
            <Card v-if="['repaired', 'delivered'].includes(ticket.status) && can('tickets.sign')">
                <CardHeader><CardTitle class="text-base">Conformidad de Entrega Final</CardTitle></CardHeader>
                <CardContent>
                    <p class="mb-3 text-sm text-muted-foreground">
                        El cliente firma la conformidad de entrega del equipo reparado.
                    </p>
                    <Button v-if="!showDeliverySign" @click="showDeliverySign = true">
                        Firmar Entrega
                    </Button>
                    <form v-else @submit.prevent="submitDeliverySign" class="flex flex-col gap-4 rounded-lg border p-4">
                        <div class="grid gap-4 md:grid-cols-2">
                            <div class="grid gap-2">
                                <SignaturePadComponent
                                    v-model="deliveryForm.client_signature"
                                    label="Firma del Cliente *"
                                />
                                <InputError :message="deliveryForm.errors.client_signature" />
                            </div>
                            <div class="grid gap-2">
                                <SignaturePadComponent
                                    v-model="deliveryForm.technician_signature"
                                    label="Firma del Técnico *"
                                />
                                <InputError :message="deliveryForm.errors.technician_signature" />
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <Button type="submit" :disabled="deliveryForm.processing">
                                <Spinner v-if="deliveryForm.processing" /> Confirmar Entrega
                            </Button>
                            <Button type="button" variant="outline" @click="showDeliverySign = false">Cancelar</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <!-- Firmas de entrega guardadas -->
            <Card v-if="ticket.delivery_signed_at">
                <CardHeader><CardTitle class="text-base">✓ Entrega Firmada</CardTitle></CardHeader>
                <CardContent>
                    <p class="text-sm text-muted-foreground mb-3">
                        Firmado el {{ new Date(ticket.delivery_signed_at).toLocaleString('es-PE') }}
                    </p>
                    <div class="grid gap-4 md:grid-cols-2">
                        <div v-if="ticket.delivery_client_signature">
                            <p class="text-xs font-medium mb-1">Firma del Cliente</p>
                            <img :src="ticket.delivery_client_signature" alt="Firma cliente" class="max-h-24 rounded border p-1" />
                        </div>
                        <div v-if="ticket.delivery_technician_signature">
                            <p class="text-xs font-medium mb-1">Firma del Técnico</p>
                            <img :src="ticket.delivery_technician_signature" alt="Firma técnico" class="max-h-24 rounded border p-1" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Final description si rechazó -->
            <Card v-if="ticket.final_description && !ticket.repair_details">
                <CardHeader><CardTitle class="text-base">Resultado</CardTitle></CardHeader>
                <CardContent>
                    <p class="text-sm rounded bg-muted p-2">{{ ticket.final_description }}</p>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
