import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

export function usePermissions() {
    const page = usePage();

    const permissions = computed<string[]>(
        () => (page.props.auth as any).permissions ?? [],
    );

    const roles = computed<string[]>(
        () => (page.props.auth as any).roles ?? [],
    );

    const can = (permission: string): boolean =>
        roles.value.includes('super_admin') || permissions.value.includes(permission);

    const hasRole = (role: string): boolean =>
        roles.value.includes(role);

    const canAny = (perms: string[]): boolean =>
        roles.value.includes('super_admin') || perms.some((p) => permissions.value.includes(p));

    return { can, hasRole, canAny, permissions, roles };
}
