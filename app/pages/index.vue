<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import gsap from 'gsap'

const { nodes, navigateToNode } = useUniverse()

const activeNodes = computed(() => nodes.filter(node => !node.isHorizon))
const featuredSlug = ref(activeNodes.value[0]?.slug ?? '')

const heroRef = ref<HTMLElement | null>(null)
const mapRef = ref<HTMLElement | null>(null)

const beginJourney = () => {
  if (featuredSlug.value) {
    navigateToNode(featuredSlug.value)
  }
}

onMounted(async () => {
  const scrollPlugin = await import('gsap/ScrollTrigger')
  const ScrollTrigger = scrollPlugin.ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  const reveal = gsap.timeline({ defaults: { ease: 'power2.out' } })

  reveal.from('[data-reveal="hero-eyebrow"]', { opacity: 0, y: 24, duration: 1.1 })
    .from('[data-reveal="hero-title"]', { opacity: 0, y: 28, duration: 1.2 }, '-=0.75')
    .from('[data-reveal="hero-body"]', { opacity: 0, y: 20, duration: 1.0 }, '-=0.85')
    .from('[data-reveal="hero-cta"]', { opacity: 0, y: 18, duration: 0.9 }, '-=0.75')
    .from(mapRef.value, { opacity: 0, y: 40, duration: 1.4 }, '-=0.45')

  const breaths = gsap.utils.toArray<HTMLElement>('.entry-breath')
  breaths.forEach((block, index) => {
    gsap.fromTo(
      block,
      { opacity: 0, y: 34 },
      {
        opacity: 1,
        y: 0,
        duration: 1.9,
        delay: index * 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 88%',
          end: 'top 44%',
          scrub: 0.95
        }
      }
    )
  })
})
</script>

<template>
  <main class="dark min-h-screen bg-background text-foreground relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 opacity-60">
      <div class="absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(197,170,94,0.09),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(247,246,243,0.06),transparent_28%)]" />
      <div class="manifesto-grain absolute inset-0" />
      <div class="manifesto-vignette absolute inset-0" />
    </div>

    <section class="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-12 pt-18 md:px-10 lg:px-12">
      <header ref="heroRef" class="max-w-4xl">
        <p data-reveal="hero-eyebrow" class="mb-5 text-[10px] uppercase tracking-celestial text-primary">
          Nyota Safari 2026
        </p>
        <h1 data-reveal="hero-title" class="font-serif text-5xl italic leading-tight text-foreground md:text-7xl lg:text-8xl">
          Celestial Entry
        </h1>
        <p data-reveal="hero-body" class="mt-8 max-w-2xl text-sm uppercase tracking-monograph text-foreground/72 md:text-base">
          A monograph in motion. Trace the constellation to discover each sanctuary, each narrative, and each chapter of the journey.
        </p>
        <button
          data-reveal="hero-cta"
          type="button"
          @click="beginJourney"
          class="mt-10 inline-flex items-center border border-primary px-8 py-3 text-[10px] uppercase tracking-celestial text-primary transition hover:bg-primary hover:text-background"
        >
          Begin the Journey
        </button>
      </header>

      <section ref="mapRef" class="entry-breath mt-14 grid flex-1 gap-6 lg:grid-cols-[1fr_290px]">
        <div class="entry-breath h-[60vh] min-h-[460px] rounded-lg border border-primary/25 bg-background/60 p-3 md:h-[66vh]">
          <CelestialMap
            :current-coords="{ x: 500, y: 500 }"
            :target-slug="featuredSlug"
          />
        </div>

        <aside class="entry-breath rounded-lg border border-border/45 bg-background/45 p-5 backdrop-blur-sm">
          <p class="text-[10px] uppercase tracking-celestial text-primary">Story Index</p>
          <ul class="mt-5 space-y-3">
            <li v-for="node in activeNodes" :key="node.slug">
              <button
                type="button"
                @click="featuredSlug = node.slug"
                class="w-full border px-3 py-3 text-left transition"
                :class="featuredSlug === node.slug
                  ? 'border-primary bg-primary/12 text-foreground'
                  : 'border-border/60 text-foreground/75 hover:border-primary/60 hover:text-foreground'"
              >
                <span class="block font-serif text-lg italic">{{ node.name }}</span>
                <span class="mt-1 block text-[10px] uppercase tracking-monograph text-primary">{{ node.sub }}</span>
              </button>
            </li>
          </ul>
        </aside>
      </section>
    </section>
  </main>
</template>

<style scoped>
.manifesto-grain {
  background-image:
    radial-gradient(circle at 24% 24%, rgba(197, 170, 94, 0.08) 0%, transparent 42%),
    radial-gradient(circle at 78% 76%, rgba(247, 246, 243, 0.05) 0%, transparent 34%),
    repeating-radial-gradient(circle at 44% 58%, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 4px);
}

.manifesto-vignette {
  background: radial-gradient(circle at center, transparent 52%, rgba(0, 0, 0, 0.3) 100%);
}
</style>
