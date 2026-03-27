<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { HardDrive, LayoutGrid, Users, ClipboardList } from 'lucide-vue-next';
import AppLogo from '@/components/AppLogo.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { usePermissions } from '@/composables/usePermissions';
import type { NavItem } from '@/types';

const { can } = usePermissions();

const mainNavItems: NavItem[] = [

    {
        title: 'Projects',
        href: '/dashboard/projects',
        icon: HardDrive,
    },
];

if (can('tickets.view_any') || can('tickets.view_own')) {
    mainNavItems.push({
        title: 'Fichas de Servicio',
        href: '/dashboard/tickets',
        icon: ClipboardList,
    });
}

const adminNavItems: NavItem[] = [];

if (can('users.view_any')) {
    adminNavItems.push({
        title: 'Usuarios',
        href: '/dashboard/admin/users',
        icon: Users,
    });
}
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="dashboard()">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
            <NavMain v-if="adminNavItems.length > 0" :items="adminNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
