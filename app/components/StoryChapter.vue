<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import gsap from 'gsap'

type Chapter = {
  chapterTitle: string
  narrativeBody: string
  mediaUrl: string
  type: 'image' | 'video'
}

defineProps<{
  chapters: Chapter[]
}>()

const chapterRefs = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

const setChapterRef = (el: Element | ComponentPublicInstance | null) => {
  if (!(el instanceof HTMLElement)) return
  if (!chapterRefs.value.includes(el)) {
    chapterRefs.value.push(el)
  }
}

onMounted(async () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0')
        entry.target.classList.remove('opacity-0', 'translate-y-12')
      }
    })
  }, { threshold: 0.1 })

  chapterRefs.value.forEach((el) => observer?.observe(el))

  const scrollPlugin = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(scrollPlugin.ScrollTrigger)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section class="space-y-48 overflow-hidden px-6 py-24 md:px-24">
    <div
      v-for="(chapter, i) in chapters"
      :key="i"
      :ref="setChapterRef"
      class="relative flex translate-y-12 flex-col items-center gap-16 opacity-0 transition-all duration-[1500ms] ease-out md:flex-row md:even:flex-row-reverse"
    >
      <span class="absolute -top-10 right-0 text-[10px] uppercase tracking-celestial text-primary/80">
        Chapter {{ i + 1 }} of {{ chapters.length }}
      </span>

      <div class="group aspect-[4/5] w-full overflow-hidden bg-card shadow-2xl md:w-1/2">
        <img
          v-if="chapter.type === 'image'"
          :src="chapter.mediaUrl"
          class="h-full w-full object-cover mix-blend-luminosity transition-all duration-1000 group-hover:scale-105 group-hover:mix-blend-normal"
        >
        <video
          v-else
          :src="chapter.mediaUrl"
          autoplay
          loop
          muted
          playsinline
          class="h-full w-full object-cover"
        />
      </div>

      <div class="w-full max-w-lg md:w-1/2">
        <h3 class="mb-8 font-serif text-3xl md:text-5xl">{{ chapter.chapterTitle }}</h3>
        <p class="mb-5 text-[10px] uppercase tracking-celestial text-primary/80">
          {{ chapter.type === 'video' ? 'Moving Interlude' : 'Still Interlude' }}
        </p>
        <p class="italic tracking-widest leading-loose opacity-70">{{ chapter.narrativeBody }}</p>
      </div>
    </div>
  </section>
</template>
