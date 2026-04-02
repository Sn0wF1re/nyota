<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import gsap from 'gsap'

const { nodes, navigateToNode } = useUniverse()

const registry = computed(() => [...nodes])
const focusedSlug = ref(registry.value[0]?.slug ?? '')

const setFocus = (slug: string) => {
  focusedSlug.value = slug
}

const handleRegistryClick = (slug: string, isHorizon: boolean) => {
  if (isHorizon) return
  navigateToNode(slug)
}

onMounted(async () => {
  const scrollPlugin = await import('gsap/ScrollTrigger')
  const ScrollTrigger = scrollPlugin.ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  const breaths = gsap.utils.toArray<HTMLElement>('.registry-breath')
  breaths.forEach((block, index) => {
    gsap.fromTo(
      block,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        delay: index * 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 88%',
          end: 'top 44%',
          scrub: 1
        }
      }
    )
  })
})
</script>

<template>
  <main class="dark relative min-h-screen bg-background text-foreground overflow-hidden">
    <div class="pointer-events-none absolute inset-0 opacity-60">
      <div class="manifesto-grain absolute inset-0" />
      <div class="manifesto-vignette absolute inset-0" />
    </div>

    <section class="relative z-10 mx-auto grid min-h-screen max-w-[1800px] grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[1.8fr_1fr] lg:gap-8 lg:px-8">
      <div class="registry-breath relative rounded-xl border border-primary/20 bg-background/70 p-3">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(197,170,94,0.15),transparent_35%),radial-gradient(circle_at_82%_82%,rgba(247,246,243,0.06),transparent_28%)]" />
        <CelestialMap
          :current-coords="{ x: 500, y: 500 }"
          :target-slug="focusedSlug"
          :focus-slug="focusedSlug"
          :pulse-slug="focusedSlug"
        />
      </div>

      <aside class="registry-breath flex h-[88vh] flex-col rounded-xl border border-border/45 bg-background/45 p-5 backdrop-blur-sm lg:h-[calc(100vh-3rem)]">
        <header class="registry-breath border-b border-border/35 pb-4">
          <p class="text-[10px] uppercase tracking-celestial text-primary">Grand Star Chart Registry</p>
          <h1 class="mt-3 font-serif text-4xl italic text-foreground">Destinations</h1>
        </header>

        <div class="registry-breath mt-4 overflow-y-auto pr-1">
          <ul class="space-y-2">
            <li
              v-for="node in registry"
              :key="node.slug"
            >
              <button
                type="button"
                class="w-full border px-3 py-3 text-left transition"
                :class="[
                  node.isHorizon
                    ? 'border-border/35 text-muted italic opacity-70 hover:border-primary/40 hover:opacity-90'
                    : 'border-border/55 text-foreground hover:border-primary/65',
                  focusedSlug === node.slug ? 'border-primary bg-primary/10' : ''
                ]"
                @mouseenter="setFocus(node.slug)"
                @focus="setFocus(node.slug)"
                @click="handleRegistryClick(node.slug, node.isHorizon)"
              >
                <span
                  class="block font-serif text-2xl"
                  :class="node.isHorizon ? 'italic text-muted' : 'text-foreground'"
                >
                  {{ node.name }}
                </span>
                <span class="mt-1 block text-[10px] uppercase tracking-monograph text-primary/90">{{ node.sub }}</span>
                <span
                  class="mt-2 inline-block text-[10px] uppercase tracking-celestial"
                  :class="node.isHorizon ? 'text-muted/80' : 'text-primary'"
                >
                  {{ node.isHorizon ? 'Horizon Expedition' : 'Active Journey' }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
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
