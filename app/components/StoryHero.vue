<script setup lang="ts">
defineProps<{
  collection?: string
  headline?: string
  subHeadline?: string
  videoSrc: string
}>()
</script>

<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <video
      :src="videoSrc"
      autoplay
      loop
      muted
      playsinline
      class="story-hero-video absolute inset-0 h-full w-full object-cover opacity-55 scale-110"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-background opacity-95" />

    <div class="relative z-10 max-w-5xl px-6 text-center">
      <span class="mb-6 block text-[10px] uppercase tracking-celestial text-foreground/70">
        {{ collection }}
      </span>
      <h1 class="mb-8 font-serif text-6xl italic leading-tight md:text-9xl">
        {{ headline }}
      </h1>
      <p class="mx-auto max-w-2xl text-sm uppercase tracking-monograph opacity-80 md:text-base">
        {{ subHeadline }}
      </p>
    </div>
  </section>
</template>
