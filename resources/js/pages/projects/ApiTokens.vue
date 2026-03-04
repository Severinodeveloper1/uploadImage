<script setup lang="ts">
import { Head, router, useForm } from '@inertiajs/vue3';
import {
    AlertTriangle,
    Check,
    Copy,
    Key,
    Plus,
    Shield,
    Trash2,
} from 'lucide-vue-next';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { BreadcrumbItem } from '@/types';
import { ref, computed } from 'vue';

interface TokenData {
    id: number;
    name: string;
    token_prefix: string;
    permissions: string[];
    last_used_at: string | null;
    expires_at: string | null;
    is_active: boolean;
    created_at: string;
}

interface PaginatedTokens {
    data: TokenData[];
    current_page: number;
    last_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface ProjectInfo {
    id: number;
    name: string;
    slug: string;
}

const props = defineProps<{
    project: ProjectInfo;
    tokens: PaginatedTokens;
    newToken: string | null;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/dashboard/projects' },
    { title: props.project.name, href: `/dashboard/projects/${props.project.id}` },
    { title: 'API Keys', href: `/dashboard/projects/${props.project.id}/tokens` },
];

const showCreate = ref(false);
const showRevoke = ref<number | null>(null);
const copiedToken = ref(false);
const showNewTokenBanner = ref(!!props.newToken);

const form = useForm({
    name: '',
    permissions: ['read'] as string[],
    expires_at: '',
});

function createToken() {
    form.post(`/dashboard/projects/${props.project.id}/tokens`, {
        preserveScroll: true,
        onSuccess: () => {
            showCreate.value = false;
            showNewTokenBanner.value = true;
            form.reset();
        },
    });
}

function revokeToken(tokenId: number) {
    router.delete(`/dashboard/projects/${props.project.id}/tokens/${tokenId}`, {
        preserveScroll: true,
        onSuccess: () => {
            showRevoke.value = null;
        },
    });
}

function togglePermission(perm: string) {
    const idx = form.permissions.indexOf(perm);
    if (idx >= 0) {
        form.permissions.splice(idx, 1);
    } else {
        form.permissions.push(perm);
    }
}

async function copyToken() {
    if (props.newToken) {
        await navigator.clipboard.writeText(props.newToken);
        copiedToken.value = true;
        setTimeout(() => (copiedToken.value = false), 2000);
    }
}

function formatDate(dateStr: string | null): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

const permissionLabels: Record<string, string> = {
    read: 'Read',
    write: 'Write',
    delete: 'Delete',
};
</script>

<template>
    <Head title="API Keys" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex-1 p-6">
            <!-- New token alert -->
            <div v-if="showNewTokenBanner && newToken" class="mb-6 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                <div class="mb-2 flex items-center gap-2">
                    <AlertTriangle class="size-5 text-yellow-500" />
                    <h4 class="font-semibold text-yellow-500">New API Token Created</h4>
                </div>
                <p class="mb-3 text-sm text-muted-foreground">
                    Make sure to copy your token now. You won't be able to see it again.
                </p>
                <div class="flex items-center gap-2">
                    <Input :model-value="newToken" readonly class="font-mono text-xs" />
                    <Button variant="outline" size="sm" @click="copyToken">
                        <Copy v-if="!copiedToken" class="mr-1 size-3" />
                        <Check v-else class="mr-1 size-3 text-green-500" />
                        {{ copiedToken ? 'Copied!' : 'Copy' }}
                    </Button>
                </div>
                <Button variant="ghost" size="sm" class="mt-2" @click="showNewTokenBanner = false">
                    Dismiss
                </Button>
            </div>

            <div class="mb-6 flex items-center justify-between">
                <div>
                    <h2 class="text-xl font-semibold">API Keys</h2>
                    <p class="text-sm text-muted-foreground">Manage API tokens for {{ project.name }}</p>
                </div>
                <Dialog v-model:open="showCreate">
                    <Button @click="showCreate = true">
                        <Plus class="mr-2 size-4" />
                        Create Token
                    </Button>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create API Token</DialogTitle>
                            <DialogDescription>Tokens are used to authenticate API requests.</DialogDescription>
                        </DialogHeader>
                        <form @submit.prevent="createToken" class="space-y-4">
                            <div class="space-y-2">
                                <Label>Name</Label>
                                <Input v-model="form.name" placeholder="My API Token" required />
                                <p v-if="form.errors.name" class="text-sm text-destructive">{{ form.errors.name }}</p>
                            </div>
                            <div class="space-y-2">
                                <Label>Permissions</Label>
                                <div class="flex gap-3">
                                    <button
                                        v-for="perm in ['read', 'write', 'delete']"
                                        :key="perm"
                                        type="button"
                                        @click="togglePermission(perm)"
                                        :class="[
                                            'flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors',
                                            form.permissions.includes(perm)
                                                ? 'border-primary bg-primary/10 text-primary'
                                                : 'hover:bg-accent',
                                        ]"
                                    >
                                        <Shield class="size-3" />
                                        {{ permissionLabels[perm] }}
                                    </button>
                                </div>
                                <p v-if="form.errors.permissions" class="text-sm text-destructive">{{ form.errors.permissions }}</p>
                            </div>
                            <div class="space-y-2">
                                <Label>Expiration (optional)</Label>
                                <Input v-model="form.expires_at" type="date" />
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" @click="showCreate = false">Cancel</Button>
                                <Button type="submit" :disabled="form.processing">Create Token</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <!-- Tokens table -->
            <Card v-if="tokens.data.length > 0">
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="border-b text-left text-muted-foreground">
                                    <th class="px-4 py-3 font-medium">Name</th>
                                    <th class="px-4 py-3 font-medium">Token</th>
                                    <th class="px-4 py-3 font-medium">Permissions</th>
                                    <th class="px-4 py-3 font-medium">Last Used</th>
                                    <th class="px-4 py-3 font-medium">Expires</th>
                                    <th class="px-4 py-3 font-medium">Status</th>
                                    <th class="px-4 py-3 font-medium"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="token in tokens.data" :key="token.id" class="border-b transition-colors hover:bg-accent/50">
                                    <td class="px-4 py-3 font-medium">{{ token.name }}</td>
                                    <td class="px-4 py-3 font-mono text-xs text-muted-foreground">{{ token.token_prefix }}</td>
                                    <td class="px-4 py-3">
                                        <div class="flex gap-1">
                                            <Badge v-for="perm in token.permissions" :key="perm" variant="secondary" class="text-xs">
                                                {{ perm }}
                                            </Badge>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 text-muted-foreground">{{ formatDate(token.last_used_at) }}</td>
                                    <td class="px-4 py-3 text-muted-foreground">{{ formatDate(token.expires_at) }}</td>
                                    <td class="px-4 py-3">
                                        <Badge :variant="token.is_active ? 'default' : 'destructive'">
                                            {{ token.is_active ? 'Active' : 'Revoked' }}
                                        </Badge>
                                    </td>
                                    <td class="px-4 py-3">
                                        <Dialog :open="showRevoke === token.id" @update:open="(v: boolean) => showRevoke = v ? token.id : null">
                                            <Button variant="ghost" size="icon-sm" @click="showRevoke = token.id">
                                                <Trash2 class="size-3 text-destructive" />
                                            </Button>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Revoke Token</DialogTitle>
                                                    <DialogDescription>
                                                        Are you sure you want to revoke "{{ token.name }}"? This cannot be undone.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button variant="outline" @click="showRevoke = null">Cancel</Button>
                                                    <Button variant="destructive" @click="revokeToken(token.id)">Revoke</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <!-- Empty state -->
            <div v-else class="flex flex-col items-center justify-center rounded-xl border border-dashed p-16">
                <Key class="mb-4 size-12 text-muted-foreground" />
                <h3 class="mb-1 text-lg font-medium">No API tokens</h3>
                <p class="mb-4 text-sm text-muted-foreground">Create an API token to access your project's storage via REST API.</p>
                <Button @click="showCreate = true">
                    <Plus class="mr-2 size-4" />
                    Create Token
                </Button>
            </div>

            <!-- Pagination -->
            <div v-if="tokens.last_page > 1" class="mt-4 flex items-center justify-center gap-2">
                <Button
                    v-if="tokens.prev_page_url"
                    variant="outline"
                    size="sm"
                    @click="router.get(tokens.prev_page_url!, {}, { preserveState: true })"
                >
                    Previous
                </Button>
                <span class="text-sm text-muted-foreground">Page {{ tokens.current_page }} / {{ tokens.last_page }}</span>
                <Button
                    v-if="tokens.next_page_url"
                    variant="outline"
                    size="sm"
                    @click="router.get(tokens.next_page_url!, {}, { preserveState: true })"
                >
                    Next
                </Button>
            </div>
        </div>
    </AppLayout>
</template>
