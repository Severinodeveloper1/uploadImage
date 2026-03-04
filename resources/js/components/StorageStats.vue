<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, FileText, Image } from 'lucide-vue-next';
import { computed } from 'vue';

interface BucketData {
    id: number;
    name: string;
    slug: string;
    file_count: number;
    total_size_bytes: number;
}

const props = defineProps<{
    storageUsedMb: number;
    storageLimitMb: number;
    storagePercentage: number;
    buckets: BucketData[];
    filesByType: Record<string, number>;
}>();

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

const gaugePercent = computed(() => Math.min(props.storagePercentage, 100));
const circumference = 2 * Math.PI * 45;
const strokeOffset = computed(() => circumference - (gaugePercent.value / 100) * circumference);

// Max bar height for bucket chart
const maxBucketSize = computed(() => {
    if (props.buckets.length === 0) return 1;
    return Math.max(...props.buckets.map((b) => b.total_size_bytes), 1);
});
</script>

<template>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Gauge -->
        <Card>
            <CardHeader class="pb-2">
                <CardTitle class="text-sm font-medium text-muted-foreground">Storage Usage</CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col items-center">
                <div class="relative mb-3">
                    <svg width="120" height="120" class="-rotate-90">
                        <circle
                            cx="60" cy="60" r="45"
                            fill="none"
                            stroke="currentColor"
                            class="text-muted"
                            stroke-width="10"
                        />
                        <circle
                            cx="60" cy="60" r="45"
                            fill="none"
                            stroke="currentColor"
                            :class="gaugePercent > 90 ? 'text-destructive' : gaugePercent > 70 ? 'text-yellow-500' : 'text-primary'"
                            stroke-width="10"
                            stroke-linecap="round"
                            :stroke-dasharray="circumference"
                            :stroke-dashoffset="strokeOffset"
                            class="transition-all duration-500"
                        />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <span class="text-lg font-bold">{{ gaugePercent.toFixed(0) }}%</span>
                    </div>
                </div>
                <p class="text-sm text-muted-foreground">
                    {{ storageUsedMb }} MB / {{ storageLimitMb }} MB
                </p>
            </CardContent>
        </Card>

        <!-- Buckets chart -->
        <Card>
            <CardHeader class="pb-2">
                <CardTitle class="text-sm font-medium text-muted-foreground">Storage by Bucket</CardTitle>
            </CardHeader>
            <CardContent>
                <div v-if="buckets.length === 0" class="flex h-32 items-center justify-center text-sm text-muted-foreground">
                    No buckets
                </div>
                <div v-else class="flex h-32 items-end gap-2">
                    <div
                        v-for="bucket in buckets"
                        :key="bucket.id"
                        class="group relative flex flex-1 flex-col items-center"
                    >
                        <div
                            class="w-full rounded-t bg-primary transition-all"
                            :style="{
                                height: Math.max((bucket.total_size_bytes / maxBucketSize) * 100, 4) + '%',
                                minHeight: '4px',
                            }"
                        />
                        <p class="mt-1 max-w-full truncate text-center text-[10px] text-muted-foreground">
                            {{ bucket.name }}
                        </p>
                        <!-- Tooltip -->
                        <div class="absolute -top-8 hidden whitespace-nowrap rounded bg-popover px-2 py-1 text-xs shadow group-hover:block">
                            {{ formatBytes(bucket.total_size_bytes) }}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Files by type -->
        <Card>
            <CardHeader class="pb-2">
                <CardTitle class="text-sm font-medium text-muted-foreground">Files by Type</CardTitle>
            </CardHeader>
            <CardContent>
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-sm">
                            <Image class="size-4 text-blue-500" />
                            <span>Images</span>
                        </div>
                        <span class="text-sm font-medium">{{ filesByType.images || 0 }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-sm">
                            <FileText class="size-4 text-green-500" />
                            <span>Documents</span>
                        </div>
                        <span class="text-sm font-medium">{{ filesByType.documents || 0 }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-sm">
                            <Database class="size-4 text-orange-500" />
                            <span>Other</span>
                        </div>
                        <span class="text-sm font-medium">{{ filesByType.other || 0 }}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
