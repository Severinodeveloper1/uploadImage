<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';

type UserRow = {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    role: string;
    created_at: string;
};

const props = defineProps<{
    users: UserRow[];
    roles: string[];
    canAssignRoles: boolean;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gestión de Usuarios', href: '/dashboard/admin/users' },
];

const editingUserId = ref<number | null>(null);
const selectedRole = ref('');

function startEdit(user: UserRow) {
    editingUserId.value = user.id;
    selectedRole.value = user.role;
}

function cancelEdit() {
    editingUserId.value = null;
    selectedRole.value = '';
}

function saveRole(userId: number) {
    router.patch(`/dashboard/admin/users/${userId}/role`, {
        role: selectedRole.value,
    }, {
        preserveScroll: true,
        onSuccess: () => cancelEdit(),
    });
}

function toggleActive(userId: number) {
    router.patch(`/dashboard/admin/users/${userId}/toggle-active`, {}, {
        preserveScroll: true,
    });
}

const roleBadgeClass = (role: string): string => {
    const map: Record<string, string> = {
        super_admin: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        admin: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        technician: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        client: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    };
    return map[role] ?? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};
</script>

<template>
    <Head title="Gestión de Usuarios" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-1 flex-col gap-4 p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle class="text-lg">Gestión de Usuarios y Roles</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-sm">
                            <thead class="border-b text-xs uppercase text-muted-foreground">
                                <tr>
                                    <th class="px-4 py-3">Usuario</th>
                                    <th class="px-4 py-3">Email</th>
                                    <th class="px-4 py-3">Rol</th>
                                    <th class="px-4 py-3">Estado</th>
                                    <th class="px-4 py-3">Creado</th>
                                    <th class="px-4 py-3 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="user in users"
                                    :key="user.id"
                                    class="border-b transition-colors hover:bg-muted/50"
                                >
                                    <td class="px-4 py-3 font-medium">{{ user.name }}</td>
                                    <td class="px-4 py-3 text-muted-foreground">{{ user.email }}</td>
                                    <td class="px-4 py-3">
                                        <template v-if="editingUserId === user.id && canAssignRoles">
                                            <select
                                                v-model="selectedRole"
                                                class="rounded-md border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                            >
                                                <option v-for="role in roles" :key="role" :value="role">
                                                    {{ role }}
                                                </option>
                                            </select>
                                        </template>
                                        <template v-else>
                                            <span
                                                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                                :class="roleBadgeClass(user.role)"
                                            >
                                                {{ user.role }}
                                            </span>
                                        </template>
                                    </td>
                                    <td class="px-4 py-3">
                                        <span
                                            class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                            :class="user.is_active
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'"
                                        >
                                            {{ user.is_active ? 'Activo' : 'Inactivo' }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 text-muted-foreground">
                                        {{ new Date(user.created_at).toLocaleDateString('es') }}
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                        <div class="flex items-center justify-end gap-2">
                                            <template v-if="editingUserId === user.id">
                                                <Button size="sm" @click="saveRole(user.id)">
                                                    Guardar
                                                </Button>
                                                <Button size="sm" variant="outline" @click="cancelEdit">
                                                    Cancelar
                                                </Button>
                                            </template>
                                            <template v-else>
                                                <Button
                                                    v-if="canAssignRoles"
                                                    size="sm"
                                                    variant="outline"
                                                    @click="startEdit(user)"
                                                >
                                                    Cambiar rol
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    :variant="user.is_active ? 'destructive' : 'default'"
                                                    @click="toggleActive(user.id)"
                                                >
                                                    {{ user.is_active ? 'Desactivar' : 'Activar' }}
                                                </Button>
                                            </template>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
