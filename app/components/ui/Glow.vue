<template>
  <div
    :class="[
      'absolute w-full',
      variant === 'top' ? 'top-0' : '',
      variant === 'above' ? '-top-[128px]' : '',
      variant === 'bottom' ? 'bottom-0' : '',
      variant === 'below' ? '-bottom-[128px]' : '',
      variant === 'center' ? 'top-1/2' : '',
      props.class
    ]"
    v-bind="props"
    ref="root"
  >
    <div
      :class="[
        'absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(45_85%_60%/.5)_10%,_hsl(45_85%_60%/0)_60%)] sm:h-[512px]',
        variant === 'center' ? '-translate-y-1/2' : ''
      ]"
    />
    <div
      :class="[
        'absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(45_85%_60%/.3)_10%,_hsl(45_85%_60%/0)_60%)] sm:h-[256px]',
        variant === 'center' ? '-translate-y-1/2' : ''
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
const props = defineProps<{ variant?: 'top' | 'above' | 'bottom' | 'below' | 'center'; class?: string }>()
const variant = props.variant ?? 'top'
const root = ref<HTMLElement | null>(null)
</script>
