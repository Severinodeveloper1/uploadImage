<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { CloudUpload, FileIcon, ImageIcon, Trash2, X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ref, computed } from 'vue';

const props = defineProps<{
    projectId: number;
    bucketSlug: string;
    currentFolder?: string;
}>();

const emit = defineEmits<{
    done: [];
}>();

interface PreviewFile {
    file: File;
    preview: string | null;
    name: string;
    size: number;
    type: string;
}

const files = ref<PreviewFile[]>([]);
const uploading = ref(false);
const uploadProgress = ref(0);
const dragOver = ref(false);
const folder = ref(props.currentFolder || '');

function handleDrop(e: DragEvent) {
    dragOver.value = false;
    if (e.dataTransfer?.files) {
        addFiles(e.dataTransfer.files);
    }
}

function handleFileInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
        addFiles(input.files);
    }
    input.value = '';
}

function addFiles(fileList: FileList) {
    for (const file of Array.from(fileList)) {
        const preview = file.type.startsWith('image/')
            ? URL.createObjectURL(file)
            : null;
        files.value.push({
            file,
            preview,
            name: file.name,
            size: file.size,
            type: file.type,
        });
    }
}

function removeFile(index: number) {
    const removed = files.value.splice(index, 1);
    if (removed[0]?.preview) {
        URL.revokeObjectURL(removed[0].preview);
    }
}

function uploadFiles() {
    if (files.value.length === 0) return;
    uploading.value = true;

    const formData = new FormData();
    files.value.forEach((f) => {
        formData.append('files[]', f.file);
    });
    if (folder.value) {
        formData.append('folder', folder.value);
    }

    router.post(
        `/dashboard/projects/${props.projectId}/storage/${props.bucketSlug}/upload`,
        formData,
        {
            forceFormData: true,
            preserveScroll: true,
            onProgress: (p) => {
                if (p.percentage) uploadProgress.value = p.percentage;
            },
            onSuccess: () => {
                files.value.forEach((f) => {
                    if (f.preview) URL.revokeObjectURL(f.preview);
                });
                files.value = [];
                uploading.value = false;
                uploadProgress.value = 0;
                emit('done');
            },
            onError: () => {
                uploading.value = false;
                uploadProgress.value = 0;
            },
        },
    );
}

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
</script>

<template>
    <div class="space-y-4">
        <!-- Folder input -->
        <div class="space-y-2">
            <Label>Target folder (optional)</Label>
            <Input v-model="folder" placeholder="e.g. images/avatars" />
        </div>

        <!-- Drop zone -->
        <div
            @drop.prevent="handleDrop"
            @dragover.prevent="dragOver = true"
            @dragleave="dragOver = false"
            :class="[
                'flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors',
                dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
            ]"
        >
            <CloudUpload class="mb-3 size-10 text-muted-foreground" />
            <p class="mb-1 text-sm font-medium">Drag & drop files here</p>
            <p class="mb-3 text-xs text-muted-foreground">or click to browse</p>
            <label class="cursor-pointer">
                <Button as="span" variant="outline" size="sm">Browse Files</Button>
                <input type="file" multiple class="hidden" @change="handleFileInput" />
            </label>
        </div>

        <!-- File list -->
        <div v-if="files.length > 0" class="space-y-2">
            <div
                v-for="(f, idx) in files"
                :key="idx"
                class="flex items-center gap-3 rounded-md border p-2"
            >
                <!-- Preview -->
                <div class="size-10 shrink-0 overflow-hidden rounded bg-muted">
                    <img v-if="f.preview" :src="f.preview" class="size-full object-cover" />
                    <div v-else class="flex size-full items-center justify-center">
                        <FileIcon class="size-4 text-muted-foreground" />
                    </div>
                </div>
                <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-medium">{{ f.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ formatBytes(f.size) }} · {{ f.type }}</p>
                </div>
                <Button variant="ghost" size="icon-sm" @click="removeFile(idx)">
                    <X class="size-3" />
                </Button>
            </div>
        </div>

        <!-- Progress -->
        <div v-if="uploading" class="space-y-1">
            <div class="flex items-center justify-between text-xs text-muted-foreground">
                <span>Uploading...</span>
                <span>{{ uploadProgress }}%</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                    class="h-full rounded-full bg-primary transition-all"
                    :style="{ width: uploadProgress + '%' }"
                />
            </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2">
            <Button
                :disabled="files.length === 0 || uploading"
                @click="uploadFiles"
            >
                <CloudUpload class="mr-2 size-4" />
                Upload {{ files.length }} file{{ files.length !== 1 ? 's' : '' }}
            </Button>
        </div>
    </div>
</template>
