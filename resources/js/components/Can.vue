<script setup lang="ts">
import { usePermissions } from '@/composables/usePermissions';

const props = defineProps<{
    permission?: string;
    role?: string;
}>();

const { can, hasRole } = usePermissions();

const isAllowed = (): boolean => {
    if (props.permission && props.role) {
        return can(props.permission) || hasRole(props.role);
    }
    if (props.permission) {
        return can(props.permission);
    }
    if (props.role) {
        return hasRole(props.role);
    }
    return false;
};
</script>

<template>
    <slot v-if="isAllowed()" />
</template>
