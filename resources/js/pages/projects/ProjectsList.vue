<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { FolderPlus, HardDrive, Key, LayoutGrid, Plus } from 'lucide-vue-next';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BreadcrumbItem } from '@/types';
import { ref } from 'vue';

interface Project {
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
    projects: Project[];
}>();

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/dashboard/projects' },
];

const showCreate = ref(false);

const form = useForm({
    name: '',
    description: '',
    storage_limit_mb: 1000,
});

function createProject() {
    form.post('/dashboard/projects', {
        preserveScroll: true,
        onSuccess: () => {
            showCreate.value = false;
            form.reset();
        },
    });
}

function formatBytes(mb: number): string {
    if (mb >= 1000) return (mb / 1000).toFixed(1) + ' GB';
    return mb + ' MB';
}
</script>

<template>
    <Head title="Projects" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-semibold tracking-tight">Projects</h1>
                    <p class="text-sm text-muted-foreground">Manage your storage projects</p>
                </div>

                <Dialog v-model:open="showCreate">
                    <DialogTrigger as-child>
                        <Button>
                            <Plus class="mr-2 size-4" />
                            New Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create Project</DialogTitle>
                            <DialogDescription>Create a new storage project to organize your files.</DialogDescription>
                        </DialogHeader>
                        <form @submit.prevent="createProject" class="space-y-4">
                            <div class="space-y-2">
                                <Label for="name">Name</Label>
                                <Input id="name" v-model="form.name" placeholder="My Project" required />
                                <p v-if="form.errors.name" class="text-sm text-destructive">{{ form.errors.name }}</p>
                            </div>
                            <div class="space-y-2">
                                <Label for="description">Description</Label>
                                <Input id="description" v-model="form.description" placeholder="Optional description" />
                            </div>
                            <div class="space-y-2">
                                <Label for="storage_limit_mb">Storage Limit (MB)</Label>
                                <Input id="storage_limit_mb" v-model.number="form.storage_limit_mb" type="number" min="100" max="50000" />
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" @click="showCreate = false">Cancel</Button>
                                <Button type="submit" :disabled="form.processing">Create</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <!-- Empty state -->
            <div v-if="projects.length === 0" class="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed p-12">
                <FolderPlus class="mb-4 size-12 text-muted-foreground" />
                <h3 class="mb-1 text-lg font-medium">No projects yet</h3>
                <p class="mb-4 text-sm text-muted-foreground">Create your first project to start uploading files.</p>
                <Button @click="showCreate = true">
                    <Plus class="mr-2 size-4" />
                    New Project
                </Button>
            </div>

            <!-- Project grid -->
            <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                    v-for="project in projects"
                    :key="project.id"
                    :href="`/dashboard/projects/${project.id}`"
                    class="group"
                >
                    <Card class="transition-colors hover:border-primary/50">
                        <CardHeader class="pb-3">
                            <CardTitle class="flex items-center justify-between">
                                <span class="truncate">{{ project.name }}</span>
                                <span
                                    :class="[
                                        'inline-block size-2 rounded-full',
                                        project.is_active ? 'bg-green-500' : 'bg-red-500',
                                    ]"
                                />
                            </CardTitle>
                            <p class="text-xs text-muted-foreground font-mono">{{ project.slug }}</p>
                        </CardHeader>
                        <CardContent>
                            <p v-if="project.description" class="mb-4 text-sm text-muted-foreground line-clamp-2">
                                {{ project.description }}
                            </p>

                            <!-- Storage bar -->
                            <div class="mb-4">
                                <div class="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                                    <span>Storage</span>
                                    <span>{{ formatBytes(project.storage_used_mb) }} / {{ formatBytes(project.storage_limit_mb) }}</span>
                                </div>
                                <div class="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                    <div
                                        class="h-full rounded-full bg-primary transition-all"
                                        :style="{ width: Math.min(project.storage_percentage, 100) + '%' }"
                                    />
                                </div>
                            </div>

                            <!-- Stats -->
                            <div class="flex items-center gap-4 text-xs text-muted-foreground">
                                <span class="flex items-center gap-1">
                                    <HardDrive class="size-3" />
                                    {{ project.storage_files_count }} files
                                </span>
                                <span class="flex items-center gap-1">
                                    <LayoutGrid class="size-3" />
                                    {{ project.buckets_count }} buckets
                                </span>
                                <span class="flex items-center gap-1">
                                    <Key class="size-3" />
                                    {{ project.api_tokens_count }} keys
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    </AppLayout>
</template>
