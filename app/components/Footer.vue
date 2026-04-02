<script setup lang="ts">
const route = useRoute()
const { nodes, findNode, visitedNodeSlugs } = useUniverse()

const registryNodes = computed(() => nodes.filter(node => !node.isHorizon))
const horizonNodes = computed(() => nodes.filter(node => node.isHorizon))
const isStoryRoute = computed(() => route.path.startsWith('/stories/'))
const currentSlug = computed(() => String(route.params.slug ?? ''))

const randomStarSlug = useState<string>('footer-random-star-slug', () => '')

const randomPool = computed(() => {
  const unvisited = nodes.filter(node => !visitedNodeSlugs.value.includes(node.slug))
  return unvisited.length ? unvisited : [...nodes]
})

const pickRandomStar = () => {
  const pool = randomPool.value
  if (!pool.length) return
  const randomNode = pool[Math.floor(Math.random() * pool.length)]
  if (!randomNode) return
  randomStarSlug.value = randomNode.slug
}

watch([() => route.fullPath, visitedNodeSlugs], pickRandomStar, { immediate: true })

const randomStar = computed(() => {
  return findNode(randomStarSlug.value) || randomPool.value[0] || null
})

const stitchedPreviewSlug = computed(() => {
  if (!isStoryRoute.value || !currentSlug.value) {
    return randomStar.value?.slug || ''
  }

  const currentIndex = registryNodes.value.findIndex(node => node.slug === currentSlug.value)
  if (currentIndex === -1) {
    return randomStar.value?.slug || ''
  }

  const nextIndex = (currentIndex + 1) % registryNodes.value.length
  return registryNodes.value[nextIndex]?.slug || randomStar.value?.slug || ''
})

const stitchedPreviewNode = computed(() => {
  if (!stitchedPreviewSlug.value) return null
  return findNode(stitchedPreviewSlug.value) || null
})
</script>

<template>
  <footer class="relative overflow-hidden border-t border-primary/20 bg-midnight text-bone">
    <div class="horizon-grain absolute inset-0 pointer-events-none" />
    <div class="absolute inset-0 pointer-events-none horizon-fade" />

    <section
      v-if="isStoryRoute && stitchedPreviewNode"
      class="relative z-10 mx-auto max-w-7xl border-b border-primary/20 px-6 py-14"
    >
      <p class="text-[10px] uppercase tracking-celestial text-primary">Celestial Preview</p>
      <h3 class="mt-4 font-serif text-4xl italic">The horizon is opening toward {{ stitchedPreviewNode.name }}.</h3>
      <p class="mt-4 max-w-2xl text-sm uppercase tracking-monograph text-bone/70">
        You have reached the edge of this chapter. Continue into the next constellation and keep the narrative in motion.
      </p>
      <NuxtLink
        :to="`/stories/${stitchedPreviewNode.slug}`"
        class="mt-8 inline-block border border-primary px-8 py-3 text-[10px] uppercase tracking-celestial text-primary transition hover:bg-primary hover:text-background"
      >
        Continue to {{ stitchedPreviewNode.name }}
      </NuxtLink>
    </section>

    <section class="relative z-10 mx-auto max-w-7xl px-6 py-16">
      <div class="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p class="text-[10px] uppercase tracking-celestial text-primary">Next Journey</p>
          <div class="mt-5 flex items-center gap-4">
            <span class="pulse-star h-5 w-5 rounded-full bg-primary" />
            <p class="font-serif text-2xl italic text-bone">
              The horizon is calling: Have you witnessed {{ randomStar?.name || 'this constellation' }}?
            </p>
          </div>
        </div>

        <div>
          <h4 class="text-[10px] uppercase tracking-celestial text-bone/75">The Registry</h4>
          <ul class="mt-4 space-y-2 text-sm text-bone/90">
            <li v-for="node in registryNodes" :key="node.slug">
              <NuxtLink :to="`/stories/${node.slug}`" class="hover:text-primary transition-colors">{{ node.name }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-[10px] uppercase tracking-celestial text-bone/75">The Horizon</h4>
          <ul class="mt-4 space-y-2 text-sm text-bone/78">
            <li v-for="node in horizonNodes" :key="node.slug" class="flex items-center gap-2">
              <NuxtLink :to="`/stories/${node.slug}`" class="hover:text-primary transition-colors">{{ node.name }}</NuxtLink>
              <span class="text-[10px] uppercase tracking-celestial text-primary/75">Coming Soon</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-[10px] uppercase tracking-celestial text-bone/75">The Studio</h4>
          <ul class="mt-4 space-y-2 text-sm text-bone/90">
            <li><NuxtLink to="/about" class="hover:text-primary transition-colors">The Vision</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-primary transition-colors">The Briefing</NuxtLink></li>
            <li><NuxtLink to="/journal" class="hover:text-primary transition-colors">Field Journals</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="relative mt-16 border-t border-primary/20 pt-12 text-center">
        <NuxtImg
          src="/nyota_logo.png"
          alt="Nyota watermark"
          width="900"
          height="250"
          class="pointer-events-none absolute left-1/2 top-1/2 h-[122px] w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.08]"
        />
        <p class="relative z-10 font-serif text-lg">&copy; {{ new Date().getFullYear() }} Nyota Safari. All rights reserved.</p>
      </div>
    </section>
  </footer>
</template>

<style scoped>
.horizon-fade {
  background: radial-gradient(circle at 50% 28%, rgba(87, 72, 32, 0.45) 0%, rgba(19, 17, 13, 0.62) 35%, var(--triad-midnight) 100%);
}

.horizon-grain {
  opacity: 0.15;
  mix-blend-mode: soft-light;
  background-image:
    radial-gradient(circle at 26% 20%, rgba(255, 255, 255, 0.18) 0 1px, transparent 1px 4px),
    radial-gradient(circle at 74% 72%, rgba(197, 170, 94, 0.2) 0 1px, transparent 1px 5px),
    repeating-radial-gradient(circle at 48% 52%, rgba(255, 255, 255, 0.12) 0 1px, transparent 1px 3px);
}

.pulse-star {
  box-shadow: 0 0 18px rgba(197, 170, 94, 0.8);
  animation: horizonPulse 2.8s ease-in-out infinite;
}

@keyframes horizonPulse {
  0%, 100% {
    transform: scale(0.85);
    opacity: 0.78;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
}
</style>
