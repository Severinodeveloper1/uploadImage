<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import SignaturePad from 'signature_pad';
import { Button } from '@/components/ui/button';

const props = defineProps<{
    modelValue: string;
    label?: string;
    disabled?: boolean;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let signaturePad: SignaturePad | null = null;

function resizeCanvas() {
    if (!canvasRef.value || !signaturePad) return;
    const canvas = canvasRef.value;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(ratio, ratio);
    signaturePad.clear();
}

onMounted(() => {
    if (!canvasRef.value) return;
    signaturePad = new SignaturePad(canvasRef.value, {
        backgroundColor: 'rgb(255, 255, 255)',
        penColor: 'rgb(0, 0, 0)',
    });

    signaturePad.addEventListener('endStroke', () => {
        if (signaturePad && !signaturePad.isEmpty()) {
            emit('update:modelValue', signaturePad.toDataURL('image/png'));
        }
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (props.disabled) {
        signaturePad.off();
    }
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCanvas);
    if (signaturePad) {
        signaturePad.off();
    }
});

watch(() => props.disabled, (val) => {
    if (!signaturePad) return;
    val ? signaturePad.off() : signaturePad.on();
});

function clear() {
    if (signaturePad) {
        signaturePad.clear();
        emit('update:modelValue', '');
    }
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <label v-if="label" class="text-sm font-medium">{{ label }}</label>
        <div class="rounded-lg border bg-white" :class="{ 'opacity-50': disabled }">
            <canvas
                ref="canvasRef"
                class="w-full cursor-crosshair"
                style="height: 150px; touch-action: none;"
            />
        </div>
        <div class="flex justify-end">
            <Button type="button" size="sm" variant="outline" @click="clear" :disabled="disabled">
                Limpiar
            </Button>
        </div>
    </div>
</template>
