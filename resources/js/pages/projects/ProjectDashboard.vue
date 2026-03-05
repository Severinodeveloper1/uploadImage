<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import {
    ArrowLeft,
    Database,
    HardDrive,
    Key,
    LayoutGrid,
    Settings,
    Trash2,
} from 'lucide-vue-next';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import StorageStats from '@/components/StorageStats.vue';
import type { BreadcrumbItem } from '@/types';
import { ref, computed } from 'vue';

interface BucketData {
    id: number;
    name: string;
    slug: string;
    is_public: boolean;
    file_count: number;
    total_size_bytes: number;
    max_file_size_mb: number;
    created_at: string;
}

interface ProjectData {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    storage_limit_mb: number;
    storage_used_mb: number;
    storage_percentage: number;
    buckets_count: number;
    storage_files_count: number;
    api_tokens_count: number;
    created_at: string;
}

const props = defineProps<{
    project: ProjectData;
    buckets: BucketData[];
    filesByType: Record<string, number>;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/dashboard/projects' },
    { title: props.project.name, href: `/dashboard/projects/${props.project.id}` },
];

const activeTab = ref<'overview' | 'storage' | 'tokens' | 'settings'>('overview');
const showDeleteConfirm = ref(false);
const showEditModal = ref(false);

const editForm = useForm({
    name: props.project.name,
    description: props.project.description || '',
    storage_limit_mb: props.project.storage_limit_mb,
    is_active: props.project.is_active,
});

function saveSettings() {
    editForm.transform(data => ({ ...data, _method: 'PUT' })).post(`/dashboard/projects/${props.project.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            showEditModal.value = false;
        },
    });
}

function deleteProject() {
    router.post(`/dashboard/projects/${props.project.id}`, { _method: 'DELETE' });
}

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

const sidebarItems = [
    { key: 'overview' as const, label: 'Overview', icon: LayoutGrid },
    { key: 'storage' as const, label: 'Storage', icon: HardDrive, link: true },
    { key: 'tokens' as const, label: 'API Keys', icon: Key, link: true },
    { key: 'settings' as const, label: 'Settings', icon: Settings },
];
</script>

<template>
    <Head :title="project.name" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1">
            <!-- Project Sidebar -->
            <aside class="w-56 shrink-0 border-r p-4">
                <div class="mb-6">
                    <h2 class="truncate text-sm font-semibold">{{ project.name }}</h2>
                    <p class="text-xs font-mono text-muted-foreground">{{ project.slug }}</p>
                </div>
                <nav class="flex flex-col gap-1">
                    <template v-for="item in sidebarItems" :key="item.key">
                        <Link
                            v-if="item.key === 'storage'"
                            :href="`/dashboard/projects/${project.id}/storage`"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                        >
                            <component :is="item.icon" class="size-4" />
                            {{ item.label }}
                        </Link>
                        <Link
                            v-else-if="item.key === 'tokens'"
                            :href="`/dashboard/projects/${project.id}/tokens`"
                            class="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                        >
                            <component :is="item.icon" class="size-4" />
                            {{ item.label }}
                        </Link>
                        <button
                            v-else
                            @click="activeTab = item.key"
                            :class="[
                                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors text-left',
                                activeTab === item.key ? 'bg-accent text-accent-foreground' : 'hover:bg-accent',
                            ]"
                        >
                            <component :is="item.icon" class="size-4" />
                            {{ item.label }}
                        </button>
                    </template>
                </nav>
            </aside>

            <!-- Main content -->
            <div class="flex-1 overflow-auto p-6">
                <!-- Overview -->
                <div v-if="activeTab === 'overview'" class="space-y-6">
                    <h2 class="text-xl font-semibold">Overview</h2>

                    <!-- Stat cards -->
                    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader class="pb-2">
                                <CardTitle class="text-sm font-medium text-muted-foreground">Total Files</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p class="text-2xl font-bold">{{ project.storage_files_count }}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader class="pb-2">
                                <CardTitle class="text-sm font-medium text-muted-foreground">Storage Used</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p class="text-2xl font-bold">{{ project.storage_used_mb }} MB</p>
                                <p class="text-xs text-muted-foreground">of {{ project.storage_limit_mb }} MB</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader class="pb-2">
                                <CardTitle class="text-sm font-medium text-muted-foreground">Buckets</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p class="text-2xl font-bold">{{ project.buckets_count }}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader class="pb-2">
                                <CardTitle class="text-sm font-medium text-muted-foreground">Active Tokens</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p class="text-2xl font-bold">{{ project.api_tokens_count }}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <!-- Storage stats widget -->
                    <StorageStats
                        :storage-used-mb="project.storage_used_mb"
                        :storage-limit-mb="project.storage_limit_mb"
                        :storage-percentage="project.storage_percentage"
                        :buckets="buckets"
                        :files-by-type="filesByType"
                    />

                    <!-- Buckets list -->
                    <div>
                        <h3 class="mb-3 text-lg font-medium">Buckets</h3>
                        <div v-if="buckets.length === 0" class="rounded-lg border border-dashed p-8 text-center">
                            <Database class="mx-auto mb-2 size-8 text-muted-foreground" />
                            <p class="text-sm text-muted-foreground">No buckets yet.</p>
                        </div>
                        <div v-else class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <Card v-for="bucket in buckets" :key="bucket.id" class="cursor-pointer transition-colors hover:border-primary/50">
                                <Link :href="`/dashboard/projects/${project.id}/storage/${bucket.slug}`">
                                    <CardHeader class="pb-2">
                                        <CardTitle class="flex items-center gap-2 text-sm">
                                            <Database class="size-4" />
                                            {{ bucket.name }}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div class="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span>{{ bucket.file_count }} files</span>
                                            <span>{{ formatBytes(bucket.total_size_bytes) }}</span>
                                            <span :class="bucket.is_public ? 'text-green-500' : 'text-yellow-500'">
                                                {{ bucket.is_public ? 'Public' : 'Private' }}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Link>
                            </Card>
                        </div>
                    </div>
                </div>

                <!-- Settings -->
                <div v-if="activeTab === 'settings'" class="max-w-xl space-y-6">
                    <h2 class="text-xl font-semibold">Settings</h2>

                    <Card>
                        <CardHeader>
                            <CardTitle>Project Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form @submit.prevent="saveSettings" class="space-y-4">
                                <div class="space-y-2">
                                    <Label for="edit-name">Name</Label>
                                    <Input id="edit-name" v-model="editForm.name" required />
                                </div>
                                <div class="space-y-2">
                                    <Label for="edit-description">Description</Label>
                                    <Input id="edit-description" v-model="editForm.description" />
                                </div>
                                <div class="space-y-2">
                                    <Label for="edit-limit">Storage Limit (MB)</Label>
                                    <Input id="edit-limit" v-model.number="editForm.storage_limit_mb" type="number" min="100" max="50000" />
                                </div>
                                <Button type="submit" :disabled="editForm.processing">Save Changes</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <!-- Danger zone -->
                    <Card class="border-destructive/50">
                        <CardHeader>
                            <CardTitle class="text-destructive">Danger Zone</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p class="mb-4 text-sm text-muted-foreground">
                                Deleting this project will permanently remove all buckets, files, and API tokens.
                            </p>
                            <Dialog v-model:open="showDeleteConfirm">
                                <DialogTrigger as-child>
                                    <Button variant="destructive">
                                        <Trash2 class="mr-2 size-4" />
                                        Delete Project
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Delete Project</DialogTitle>
                                        <DialogDescription>
                                            Are you sure? This will permanently delete "{{ project.name }}" and all associated data.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant="outline" @click="showDeleteConfirm = false">Cancel</Button>
                                        <Button variant="destructive" @click="deleteProject">Delete</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
