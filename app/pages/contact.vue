<script setup lang="ts">
import { computed, ref } from 'vue'

const { nodes } = useUniverse()

const activeNodes = computed(() => nodes.filter(node => !node.isHorizon))
const horizonNodes = computed(() => nodes.filter(node => node.isHorizon))

const selectedActive = ref<string[]>([])
const selectedHorizon = ref<string[]>([])

const form = ref({
  firstName: '',
  email: '',
  message: ''
})

const toggleActive = (slug: string) => {
  selectedActive.value = selectedActive.value.includes(slug)
    ? selectedActive.value.filter(item => item !== slug)
    : [...selectedActive.value, slug]
}

const toggleHorizon = (slug: string) => {
  selectedHorizon.value = selectedHorizon.value.includes(slug)
    ? selectedHorizon.value.filter(item => item !== slug)
    : [...selectedHorizon.value, slug]
}

const selectedNodeCoords = computed(() =>
  activeNodes.value
    .filter(node => selectedActive.value.includes(node.slug))
    .map(node => ({ x: node.x, y: node.y }))
)

const selectedPathD = computed(() => {
  if (selectedNodeCoords.value.length < 2) return ''
  const [first, ...rest] = selectedNodeCoords.value
  return `M ${first.x} ${first.y} ${rest.map(point => `L ${point.x} ${point.y}`).join(' ')}`
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-midnight pt-16 text-bone">
    <div class="pointer-events-none absolute inset-0 opacity-60">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(166,139,76,0.22),transparent_35%),radial-gradient(circle_at_78%_72%,rgba(232,228,216,0.08),transparent_32%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.35)_100%)]" />
    </div>

    <section class="relative z-10 mx-auto max-w-7xl px-6 py-16">
      <div class="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div class="rounded-lg border border-primary/25 bg-black/25 p-6 md:p-8">
          <h1 class="font-serif text-4xl font-light tracking-[0.08em] md:text-6xl">
            Briefing: Select the Horizons That Called to You.
          </h1>
          <p class="mt-5 max-w-2xl text-sm uppercase tracking-monograph text-primary">
            Defining your path in the Nyota Universe starts with the places that already echo in your memory.
          </p>

          <div class="mt-10">
            <h2 class="font-serif text-2xl font-light tracking-[0.08em] text-bone">Active Journeys</h2>
            <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                v-for="node in activeNodes"
                :key="node.slug"
                type="button"
                class="border px-4 py-4 text-left transition bg-black/15"
                :class="selectedActive.includes(node.slug)
                  ? 'border-primary bg-primary/12 shadow-[0_0_14px_rgba(197,170,94,0.45)]'
                  : 'border-primary/30 hover:border-primary/60 hover:bg-primary/8'"
                @click="toggleActive(node.slug)"
              >
                <span class="block font-serif text-xl italic">{{ node.name }}</span>
                <span class="mt-1 block text-[10px] uppercase tracking-celestial text-primary">{{ node.sub }}</span>
              </button>
            </div>
          </div>

          <div class="mt-10">
            <h2 class="font-serif text-2xl font-light tracking-[0.08em] text-bone">Horizon Interest</h2>
            <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                v-for="node in horizonNodes"
                :key="node.slug"
                type="button"
                class="border px-4 py-4 text-left transition bg-black/15"
                :class="selectedHorizon.includes(node.slug)
                  ? 'border-primary/80 bg-primary/12 shadow-[0_0_12px_rgba(197,170,94,0.35)]'
                  : 'border-primary/25 opacity-85 hover:border-primary/45 hover:opacity-100'"
                @click="toggleHorizon(node.slug)"
              >
                <span class="block font-serif text-xl italic">{{ node.name }}</span>
                <span class="mt-1 block text-[10px] uppercase tracking-celestial text-primary">Horizon Expedition</span>
              </button>
            </div>
          </div>

          <form class="mt-12 space-y-8">
            <div>
              <label class="block font-serif text-xl font-light tracking-[0.08em] text-bone">First Name</label>
              <input
                v-model="form.firstName"
                type="text"
                placeholder="Your first name"
                class="mt-2 w-full border-b border-primary/30 bg-transparent px-0 py-2 text-bone placeholder:text-bone/40 focus:border-primary focus:outline-none"
              >
            </div>

            <div>
              <label class="block font-serif text-xl font-light tracking-[0.08em] text-bone">Email</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="your.email@example.com"
                class="mt-2 w-full border-b border-primary/30 bg-transparent px-0 py-2 text-bone placeholder:text-bone/40 focus:border-primary focus:outline-none"
              >
            </div>

            <div>
              <label class="block font-serif text-xl font-light tracking-[0.08em] text-bone">Message</label>
              <textarea
                v-model="form.message"
                placeholder="Tell us the mood, pace, and wild chapter you want to live next..."
                rows="4"
                class="mt-2 w-full resize-y border-b border-primary/30 bg-transparent px-0 py-2 text-bone placeholder:text-bone/40 focus:border-primary focus:outline-none"
              />
            </div>

            <Button type="submit" class="rounded-none border border-primary bg-primary/10 px-8 py-3 text-[10px] uppercase tracking-celestial text-bone hover:bg-primary hover:text-midnight">
              Submit Briefing to the Concierge.
            </Button>
          </form>
        </div>

        <aside class="rounded-lg border border-primary/35 bg-black/45 p-5 backdrop-blur-sm">
          <p class="text-[10px] uppercase tracking-celestial text-primary">Celestial Path Summary</p>
          <div class="relative mt-4 h-[640px] overflow-hidden rounded-md border border-primary/20 bg-midnight/80">
            <svg viewBox="0 0 1000 1000" class="h-full w-full p-8">
              <defs>
                <filter id="briefingStarGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                v-if="selectedPathD"
                :d="selectedPathD"
                fill="none"
                stroke="var(--primary)"
                stroke-width="1.5"
                stroke-dasharray="6 5"
                class="opacity-65"
              />

              <g v-for="node in activeNodes" :key="node.slug">
                <circle :cx="node.x" :cy="node.y" r="18" fill="transparent" />
                <circle
                  :cx="node.x"
                  :cy="node.y"
                  :r="selectedActive.includes(node.slug) ? 7 : 3"
                  :fill="selectedActive.includes(node.slug) ? 'var(--primary)' : 'rgba(197,170,94,0.35)'"
                  filter="url(#briefingStarGlow)"
                  :style="selectedActive.includes(node.slug) ? 'filter: drop-shadow(0 0 10px var(--primary));' : ''"
                />
              </g>
            </svg>

            <div class="absolute bottom-4 left-4 right-4 border border-primary/25 bg-black/45 px-4 py-3">
              <p class="text-[10px] uppercase tracking-celestial text-primary">
                {{ selectedActive.length }} Active Destinations Marked
              </p>
              <p class="mt-1 text-xs text-bone/72">
                Stars illuminate and routes connect as your path takes shape.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>
