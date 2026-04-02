<script setup lang="ts">
defineProps<{
  reasoning: string
  relatedStorySlug: string
  relatedStoryHeadline?: string
}>()
</script>

<template>
  <section class="border-t border-primary/20 bg-background/86 px-6 py-24 md:px-24">
    <div class="mx-auto max-w-5xl">
      <p class="text-[10px] uppercase tracking-celestial text-primary">Celestial Progression</p>
      <h3 class="mt-4 font-serif text-5xl italic text-foreground">
        {{ reasoning }}
      </h3>
      <p class="mt-6 max-w-3xl text-sm uppercase tracking-monograph text-foreground/74">
        Rust on the horizon now turns toward {{ relatedStoryHeadline || relatedStorySlug }}. Continue the manuscript.
      </p>
      <NuxtLink
        :to="`/stories/${relatedStorySlug}`"
        class="mt-9 inline-block border border-primary px-7 py-3 text-[10px] uppercase tracking-celestial text-primary transition hover:bg-primary hover:text-background"
      >
        Enter {{ relatedStoryHeadline || relatedStorySlug }}
      </NuxtLink>
    </div>
  </section>
</template>
