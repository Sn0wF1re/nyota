<script setup lang="ts">
import type { PropType } from 'vue'

type UspItem = {
  label: string
  iconName: string
}

defineProps({
  architectNote: {
    type: String,
    required: true
  },
  uspIcons: {
    type: Array as PropType<UspItem[]>,
    required: true
  },
  resolveFeatureIcon: {
    type: Function as PropType<(iconName: string) => unknown>,
    required: true
  }
})
</script>

<template>
  <section class="px-6 py-32 md:px-24">
    <div class="mx-auto max-w-4xl border-b border-primary/10 pb-32 text-center">
      <h2 class="mb-12 text-[10px] uppercase tracking-celestial text-foreground/65">The Nyota Lens</h2>
      <p class="font-serif text-2xl italic leading-relaxed text-primary md:text-4xl">
        "{{ architectNote }}"
      </p>
    </div>
  </section>

  <section class="px-6 pb-24 md:px-24">
    <div class="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
      <article
        v-for="(usp, idx) in uspIcons"
        :key="usp.label"
        class="border border-primary/20 bg-card/45 p-5"
      >
        <p class="text-[10px] uppercase tracking-celestial text-primary">Feature 0{{ idx + 1 }}</p>
        <component :is="resolveFeatureIcon(usp.iconName)" class="mt-4 h-5 w-5 text-primary" />
        <p class="mt-3 font-serif text-2xl italic text-foreground">{{ usp.label }}</p>
        <p class="mt-3 text-[10px] uppercase tracking-monograph text-foreground/62">Editorial Marker</p>
      </article>
    </div>
  </section>
</template>
