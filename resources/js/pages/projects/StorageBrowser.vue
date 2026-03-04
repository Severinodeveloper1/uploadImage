<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import {
    ArrowLeft,
    ChevronRight,
    Copy,
    Database,
    Download,
    Eye,
    File as FileIcon,
    Folder,
    Grid3X3,
    Image,
    List,
    Lock,
    Plus,
    Search,
    Trash2,
    Upload,
    X,
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
} from '@/components/ui/dialog';
import FileUploader from '@/components/FileUploader.vue';
import type { BreadcrumbItem } from '@/types';
import { ref, computed } from 'vue';

interface BucketInfo {
    id: number;
    name: string;
    slug: string;
    is_public: boolean;
    file_count: number;
    total_size_bytes: number;
    max_file_size_mb?: number;
    allowed_mime_types?: string[] | null;
}

interface ProjectInfo {
    id: number;
    name: string;
    slug: string;
    storage_limit_mb: number;
    storage_used_mb: number;
    storage_percentage: number;
}

interface StorageFileData {
    id: number;
    original_name: string;
    filename: string;
    path: string;
    folder: string | null;
    url: string;
    size_bytes: number;
    mime_type: string;
    width: number | null;
    height: number | null;
    is_public: boolean;
    download_count: number;
    created_at: string;
}

interface PaginatedFiles {
    data: StorageFileData[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

const props = defineProps<{
    project: ProjectInfo;
    buckets: BucketInfo[];
    currentBucket: BucketInfo | null;
    files: PaginatedFiles | null;
    folders: string[];
    currentFolder: string | null;
}>();

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Projects', href: '/dashboard/projects' },
        { title: props.project.name, href: `/dashboard/projects/${props.project.id}` },
        { title: 'Storage', href: `/dashboard/projects/${props.project.id}/storage` },
    ];
    if (props.currentBucket) {
        items.push({
            title: props.currentBucket.name,
            href: `/dashboard/projects/${props.project.id}/storage/${props.currentBucket.slug}`,
        });
    }
    return items;
});

const viewMode = ref<'grid' | 'list'>('grid');
const showUploader = ref(false);
const showNewBucket = ref(false);
const showNewFolder = ref(false);
const selectedFile = ref<StorageFileData | null>(null);
const searchQuery = ref('');
const newFolderName = ref('');
const copiedUrl = ref(false);

const bucketForm = useForm({
    name: '',
    is_public: true,
    max_file_size_mb: 5,
});

function createBucket() {
    bucketForm.post(`/dashboard/projects/${props.project.id}/buckets`, {
        preserveScroll: true,
        onSuccess: () => {
            showNewBucket.value = false;
            bucketForm.reset();
        },
    });
}

function deleteBucket(slug: string) {
    if (!confirm('Delete this bucket and all its files?')) return;
    router.delete(`/dashboard/projects/${props.project.id}/buckets/${slug}`);
}

function deleteFile(fileId: number) {
    if (!confirm('Delete this file?')) return;
    if (!props.currentBucket) return;
    router.delete(`/dashboard/projects/${props.project.id}/storage/${props.currentBucket.slug}/files/${fileId}`, {
        preserveScroll: true,
        onSuccess: () => {
            selectedFile.value = null;
        },
    });
}

function navigateFolder(folder: string) {
    if (!props.currentBucket) return;
    router.get(`/dashboard/projects/${props.project.id}/storage/${props.currentBucket.slug}`, {
        folder,
    }, { preserveState: true });
}

function searchFiles() {
    if (!props.currentBucket) return;
    const params: Record<string, string> = {};
    if (searchQuery.value) params.search = searchQuery.value;
    if (props.currentFolder) params.folder = props.currentFolder;
    router.get(`/dashboard/projects/${props.project.id}/storage/${props.currentBucket.slug}`, params, {
        preserveState: true,
    });
}

function createFolder() {
    if (!newFolderName.value.trim()) return;
    // Folders are created implicitly by uploading to them
    showNewFolder.value = false;
    showUploader.value = true;
}

async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    copiedUrl.value = true;
    setTimeout(() => (copiedUrl.value = false), 2000);
}

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function isImage(mimeType: string): boolean {
    return mimeType.startsWith('image/');
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
</script>

<template>
    <Head title="Storage Browser" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col">
            <!-- Bucket list view -->
            <div v-if="!currentBucket" class="flex-1 p-6">
                <div class="mb-6 flex items-center justify-between">
                    <div>
                        <h2 class="text-xl font-semibold">Storage</h2>
                        <p class="text-sm text-muted-foreground">{{ project.storage_used_mb }} MB / {{ project.storage_limit_mb }} MB used</p>
                    </div>
                    <Dialog v-model:open="showNewBucket">
                        <Button @click="showNewBucket = true">
                            <Plus class="mr-2 size-4" />
                            New Bucket
                        </Button>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Bucket</DialogTitle>
                                <DialogDescription>Buckets are containers for your files.</DialogDescription>
                            </DialogHeader>
                            <form @submit.prevent="createBucket" class="space-y-4">
                                <div class="space-y-2">
                                    <Label>Name</Label>
                                    <Input v-model="bucketForm.name" placeholder="my-bucket" required />
                                    <p v-if="bucketForm.errors.name" class="text-sm text-destructive">{{ bucketForm.errors.name }}</p>
                                </div>
                                <div class="space-y-2">
                                    <Label>Max File Size (MB)</Label>
                                    <Input v-model.number="bucketForm.max_file_size_mb" type="number" min="1" max="100" />
                                </div>
                                <div class="flex items-center gap-2">
                                    <input id="is_public" type="checkbox" v-model="bucketForm.is_public" class="rounded border-input" />
                                    <Label for="is_public">Public bucket</Label>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" @click="showNewBucket = false">Cancel</Button>
                                    <Button type="submit" :disabled="bucketForm.processing">Create</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div v-if="buckets.length === 0" class="flex flex-col items-center justify-center rounded-xl border border-dashed p-16">
                    <Database class="mb-4 size-12 text-muted-foreground" />
                    <p class="text-sm text-muted-foreground">No buckets yet. Create one to start uploading files.</p>
                </div>

                <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div
                        v-for="bucket in buckets"
                        :key="bucket.id"
                        class="group relative"
                    >
                        <Link
                            :href="`/dashboard/projects/${project.id}/storage/${bucket.slug}`"
                            class="block"
                        >
                            <Card class="transition-colors hover:border-primary/50">
                                <CardHeader class="pb-2">
                                    <CardTitle class="flex items-center gap-2 text-sm">
                                        <Database class="size-5 text-primary" />
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
                            </Card>
                        </Link>
                        <!-- Delete bucket button — visible on hover -->
                        <Button
                            variant="destructive"
                            size="icon-sm"
                            class="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                            @click.prevent="deleteBucket(bucket.slug)"
                            title="Delete bucket"
                        >
                            <Trash2 class="size-3" />
                        </Button>
                    </div>
                </div>
            </div>

            <!-- Bucket file browser -->
            <div v-else class="flex flex-1 flex-col">
                <!-- Toolbar -->
                <div class="flex items-center gap-3 border-b px-6 py-3">
                    <Link :href="`/dashboard/projects/${project.id}/storage`" class="text-muted-foreground hover:text-foreground">
                        <ArrowLeft class="size-4" />
                    </Link>

                    <!-- Breadcrumb folders -->
                    <div class="flex items-center gap-1 text-sm">
                        <button
                            @click="navigateFolder('')"
                            class="text-muted-foreground hover:text-foreground"
                        >
                            {{ currentBucket.name }}
                        </button>
                        <template v-if="currentFolder">
                            <ChevronRight class="size-3 text-muted-foreground" />
                            <span class="font-medium">{{ currentFolder }}</span>
                        </template>
                    </div>

                    <div class="flex-1" />

                    <!-- Search -->
                    <div class="relative w-64">
                        <Search class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                        <Input
                            v-model="searchQuery"
                            placeholder="Search files..."
                            class="pl-9"
                            @keyup.enter="searchFiles"
                        />
                    </div>

                    <!-- View toggles -->
                    <Button variant="ghost" size="icon-sm" @click="viewMode = 'grid'" :class="viewMode === 'grid' ? 'bg-accent' : ''">
                        <Grid3X3 class="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" @click="viewMode = 'list'" :class="viewMode === 'list' ? 'bg-accent' : ''">
                        <List class="size-4" />
                    </Button>

                    <Button variant="outline" size="sm" @click="showNewFolder = true">
                        <Folder class="mr-1 size-3" />
                        New Folder
                    </Button>

                    <Button size="sm" @click="showUploader = true">
                        <Upload class="mr-1 size-3" />
                        Upload
                    </Button>
                </div>

                <div class="flex flex-1 overflow-hidden">
                    <!-- File list -->
                    <div class="flex-1 overflow-auto p-6">
                        <!-- Folders -->
                        <div v-if="folders.length > 0 && !currentFolder" class="mb-4">
                            <h4 class="mb-2 text-xs font-medium uppercase text-muted-foreground">Folders</h4>
                            <div class="grid gap-2 sm:grid-cols-4 lg:grid-cols-6">
                                <button
                                    v-for="folder in folders"
                                    :key="folder"
                                    @click="navigateFolder(folder)"
                                    class="flex items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-accent"
                                >
                                    <Folder class="size-5 text-primary" />
                                    <span class="truncate">{{ folder }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Empty state -->
                        <div v-if="!files || files.data.length === 0" class="flex flex-col items-center justify-center py-16">
                            <FileIcon class="mb-4 size-12 text-muted-foreground" />
                            <p class="text-sm text-muted-foreground">No files here yet.</p>
                            <Button size="sm" class="mt-3" @click="showUploader = true">
                                <Upload class="mr-1 size-3" />
                                Upload Files
                            </Button>
                        </div>

                        <!-- Grid view -->
                        <div v-else-if="viewMode === 'grid'" class="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            <div
                                v-for="file in files.data"
                                :key="file.id"
                                @click="selectedFile = file"
                                :class="[
                                    'cursor-pointer rounded-lg border p-2 transition-colors hover:border-primary/50',
                                    selectedFile?.id === file.id ? 'border-primary ring-1 ring-primary' : '',
                                ]"
                            >
                                <div class="relative mb-2 aspect-square overflow-hidden rounded bg-muted">
                                    <img
                                        v-if="isImage(file.mime_type)"
                                        :src="file.url"
                                        :alt="file.original_name"
                                        class="size-full object-cover"
                                        loading="lazy"
                                    />
                                    <div v-else class="flex size-full items-center justify-center">
                                        <FileIcon class="size-8 text-muted-foreground" />
                                    </div>
                                </div>
                                <p class="truncate text-xs font-medium">{{ file.original_name }}</p>
                                <p class="text-xs text-muted-foreground">{{ formatBytes(file.size_bytes) }}</p>
                            </div>
                        </div>

                        <!-- List view -->
                        <div v-else class="rounded-lg border">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b text-left text-muted-foreground">
                                        <th class="px-4 py-2 font-medium">Name</th>
                                        <th class="px-4 py-2 font-medium">Size</th>
                                        <th class="px-4 py-2 font-medium">Type</th>
                                        <th class="px-4 py-2 font-medium">Created</th>
                                        <th class="px-4 py-2 font-medium"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="file in files.data"
                                        :key="file.id"
                                        @click="selectedFile = file"
                                        :class="[
                                            'cursor-pointer border-b transition-colors hover:bg-accent/50',
                                            selectedFile?.id === file.id ? 'bg-accent' : '',
                                        ]"
                                    >
                                        <td class="flex items-center gap-2 px-4 py-2">
                                            <Image v-if="isImage(file.mime_type)" class="size-4 text-muted-foreground" />
                                            <FileIcon v-else class="size-4 text-muted-foreground" />
                                            <span class="truncate">{{ file.original_name }}</span>
                                        </td>
                                        <td class="px-4 py-2 text-muted-foreground">{{ formatBytes(file.size_bytes) }}</td>
                                        <td class="px-4 py-2 text-muted-foreground">{{ file.mime_type }}</td>
                                        <td class="px-4 py-2 text-muted-foreground">{{ formatDate(file.created_at) }}</td>
                                        <td class="px-4 py-2">
                                            <Button variant="ghost" size="icon-sm" @click.stop="deleteFile(file.id)">
                                                <Trash2 class="size-3 text-destructive" />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div v-if="files && files.last_page > 1" class="mt-4 flex items-center justify-center gap-2">
                            <Button
                                v-if="files.prev_page_url"
                                variant="outline"
                                size="sm"
                                @click="router.get(files.prev_page_url!, {}, { preserveState: true })"
                            >
                                Previous
                            </Button>
                            <span class="text-sm text-muted-foreground">Page {{ files.current_page }} / {{ files.last_page }}</span>
                            <Button
                                v-if="files.next_page_url"
                                variant="outline"
                                size="sm"
                                @click="router.get(files.next_page_url!, {}, { preserveState: true })"
                            >
                                Next
                            </Button>
                        </div>
                    </div>

                    <!-- File detail panel -->
                    <aside v-if="selectedFile" class="w-80 shrink-0 overflow-auto border-l p-4">
                        <div class="mb-4 flex items-center justify-between">
                            <h3 class="text-sm font-semibold">File Details</h3>
                            <Button variant="ghost" size="icon-sm" @click="selectedFile = null">
                                <X class="size-4" />
                            </Button>
                        </div>

                        <!-- Preview -->
                        <div class="mb-4 overflow-hidden rounded-lg bg-muted">
                            <img
                                v-if="isImage(selectedFile.mime_type)"
                                :src="selectedFile.url"
                                :alt="selectedFile.original_name"
                                class="w-full object-contain"
                            />
                            <div v-else class="flex h-32 items-center justify-center">
                                <FileIcon class="size-12 text-muted-foreground" />
                            </div>
                        </div>

                        <div class="space-y-3 text-sm">
                            <div>
                                <p class="text-muted-foreground">Name</p>
                                <p class="font-medium">{{ selectedFile.original_name }}</p>
                            </div>
                            <div>
                                <p class="text-muted-foreground">Size</p>
                                <p>{{ formatBytes(selectedFile.size_bytes) }}</p>
                            </div>
                            <div>
                                <p class="text-muted-foreground">Type</p>
                                <p>{{ selectedFile.mime_type }}</p>
                            </div>
                            <div v-if="selectedFile.width && selectedFile.height">
                                <p class="text-muted-foreground">Dimensions</p>
                                <p>{{ selectedFile.width }} × {{ selectedFile.height }}</p>
                            </div>
                            <div>
                                <p class="text-muted-foreground">Path</p>
                                <p class="font-mono text-xs break-all">{{ selectedFile.path }}</p>
                            </div>
                            <div>
                                <p class="mb-1 text-muted-foreground">
                                    {{ selectedFile.is_public ? 'Public URL' : 'Protected URL' }}
                                </p>
                                <div v-if="!selectedFile.is_public" class="mb-2 flex items-center gap-1.5 rounded bg-yellow-500/10 px-2 py-1 text-xs text-yellow-600 dark:text-yellow-400">
                                    <Lock class="size-3 shrink-0" />
                                    Private — requires authentication to access
                                </div>
                                <div class="flex gap-1">
                                    <Input :model-value="selectedFile.url" readonly class="text-xs" />
                                    <Button variant="outline" size="icon-sm" @click="copyUrl(selectedFile.url)">
                                        <Copy class="size-3" />
                                    </Button>
                                </div>
                                <p v-if="copiedUrl" class="mt-1 text-xs text-green-500">Copied!</p>
                            </div>
                            <div>
                                <p class="text-muted-foreground">Created</p>
                                <p>{{ formatDate(selectedFile.created_at) }}</p>
                            </div>
                        </div>

                        <div class="mt-6 flex flex-col gap-2">
                            <a :href="selectedFile.url" target="_blank" download>
                                <Button variant="outline" class="w-full" size="sm">
                                    <Download class="mr-2 size-3" />
                                    Download
                                </Button>
                            </a>
                            <Button variant="destructive" class="w-full" size="sm" @click="deleteFile(selectedFile.id)">
                                <Trash2 class="mr-2 size-3" />
                                Delete
                            </Button>
                        </div>
                    </aside>
                </div>
            </div>

            <!-- Upload dialog -->
            <Dialog v-model:open="showUploader">
                <DialogContent class="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Upload Files</DialogTitle>
                        <DialogDescription>Upload files to {{ currentBucket?.name || 'bucket' }}</DialogDescription>
                    </DialogHeader>
                    <FileUploader
                        v-if="currentBucket"
                        :project-id="project.id"
                        :bucket-slug="currentBucket.slug"
                        :current-folder="currentFolder || newFolderName || ''"
                        @done="showUploader = false"
                    />
                </DialogContent>
            </Dialog>

            <!-- New Folder dialog -->
            <Dialog v-model:open="showNewFolder">
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New Folder</DialogTitle>
                        <DialogDescription>Folders are created when you upload files to a path.</DialogDescription>
                    </DialogHeader>
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <Label>Folder Name</Label>
                            <Input v-model="newFolderName" placeholder="my-folder" />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" @click="showNewFolder = false">Cancel</Button>
                            <Button @click="createFolder">Upload to this folder</Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </AppLayout>
</template>
