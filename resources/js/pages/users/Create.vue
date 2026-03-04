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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Create User', href: '/dashboard/users/create' },
];

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

function submit() {
    form.post('/dashboard/users', {
        onSuccess: () => form.reset(),
    });
}
</script>

<template>
    <Head title="Create User" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-1 items-start justify-center p-8">
            <Card class="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create New User</CardTitle>
                    <CardDescription>Add a new user account to the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="submit" class="flex flex-col gap-5">
                        <div class="grid gap-2">
                            <Label for="name">Full name</Label>
                            <Input
                                id="name"
                                v-model="form.name"
                                type="text"
                                required
                                autofocus
                                autocomplete="off"
                                placeholder="John Doe"
                            />
                            <InputError :message="form.errors.name" />
                        </div>

                        <div class="grid gap-2">
                            <Label for="email">Email address</Label>
                            <Input
                                id="email"
                                v-model="form.email"
                                type="email"
                                required
                                autocomplete="off"
                                placeholder="email@example.com"
                            />
                            <InputError :message="form.errors.email" />
                        </div>

                        <div class="grid gap-2">
                            <Label for="password">Password</Label>
                            <Input
                                id="password"
                                v-model="form.password"
                                type="password"
                                required
                                autocomplete="new-password"
                                placeholder="Password"
                            />
                            <InputError :message="form.errors.password" />
                        </div>

                        <div class="grid gap-2">
                            <Label for="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                v-model="form.password_confirmation"
                                type="password"
                                required
                                autocomplete="new-password"
                                placeholder="Confirm password"
                            />
                            <InputError :message="form.errors.password_confirmation" />
                        </div>

                        <Button type="submit" class="mt-2 w-full" :disabled="form.processing">
                            <Spinner v-if="form.processing" />
                            Create account
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
