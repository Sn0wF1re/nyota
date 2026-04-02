<script setup lang="ts">
import { computed, onMounted } from 'vue'
import gsap from 'gsap'

const { nodes } = useUniverse()

const horizonStories = computed(() =>
  nodes.filter(node => node.slug === 'serengeti-the-endless-plains' || node.slug === 'uganda-the-gorilla-mist')
)

const letters = [
  {
    id: 1,
    author: 'Amina K.',
    origin: 'Mara Conservancies',
    quote: 'Nyota did not rush us through a checklist. They let us feel the land breathe, and suddenly the journey became personal history.'
  },
  {
    id: 2,
    author: 'David M.',
    origin: 'Samburu North',
    quote: 'Every day felt editorial rather than touristic. The stories of the people and the geometry of the landscape stayed with us long after landing home.'
  },
  {
    id: 3,
    author: 'Sofia L.',
    origin: 'Lamu Coast',
    quote: 'It felt like writing in a private guestbook of East Africa. Quiet, precise, and profoundly human.'
  }
]

onMounted(async () => {
  const scrollPlugin = await import('gsap/ScrollTrigger')
  const ScrollTrigger = scrollPlugin.ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  const blocks = gsap.utils.toArray<HTMLElement>('.manifesto-breath')
  blocks.forEach((block, index) => {
    gsap.fromTo(
      block,
      { opacity: 0, y: 44 },
      {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: 'power2.out',
        delay: index * 0.08,
        scrollTrigger: {
          trigger: block,
          start: 'top 84%',
          end: 'top 46%',
          scrub: 0.95
        }
      }
    )
  })

  const letters = gsap.utils.toArray<HTMLElement>('.letter-breath')
  letters.forEach((letter, index) => {
    gsap.fromTo(
      letter,
      { opacity: 0, y: 30, filter: 'blur(5px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 2.4,
        delay: index * 0.12,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: letter,
          start: 'top 88%',
          end: 'top 42%',
          scrub: 1.1
        }
      }
    )
  })
})
</script>

<template>
  <main class="dark relative min-h-screen bg-background text-foreground overflow-hidden">
    <div class="pointer-events-none absolute inset-0 opacity-55">
      <div class="manifesto-grain absolute inset-0" />
      <div class="manifesto-vignette absolute inset-0" />
    </div>

    <section class="relative border-b border-primary/20 px-6 pb-24 pt-28 md:px-10 lg:px-16">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(197,170,94,0.16),transparent_48%)]" />
      <div class="relative mx-auto max-w-6xl manifesto-breath">
        <p class="text-[10px] uppercase tracking-celestial text-primary">The Nyota Perspective</p>
        <h1 class="mt-8 max-w-5xl font-serif text-5xl italic leading-tight md:text-7xl lg:text-8xl">
          We do not just curate safaris; we archive the soul of East Africa.
        </h1>
      </div>
    </section>

    <section class="px-6 py-24 md:px-10 lg:px-16">
      <div class="mx-auto max-w-6xl">
        <p class="manifesto-breath text-[10px] uppercase tracking-celestial text-primary">Pulse of the Land</p>
        <div class="mt-10 grid gap-8 lg:grid-cols-3">
          <article class="manifesto-breath border border-primary/20 p-7">
            <h2 class="font-serif text-4xl italic text-foreground">Beauty</h2>
            <p class="mt-6 text-sm uppercase tracking-monograph text-foreground/72">
              The architectural symmetry of escarpments, savannah lines, and coastlight. We frame landscape as design, not backdrop.
            </p>
          </article>
          <article class="manifesto-breath border border-primary/20 p-7">
            <h2 class="font-serif text-4xl italic text-foreground">People</h2>
            <p class="mt-6 text-sm uppercase tracking-monograph text-foreground/72">
              The living legacy of the communities we walk with. Every journey is built with local custodianship at its center.
            </p>
          </article>
          <article class="manifesto-breath border border-primary/20 p-7">
            <h2 class="font-serif text-4xl italic text-foreground">Culture</h2>
            <p class="mt-6 text-sm uppercase tracking-monograph text-foreground/72">
              The ancient rhythms that define the East African horizon. We preserve narrative memory through movement, ritual, and place.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="border-y border-border/35 px-6 py-24 md:px-10 lg:px-16">
      <div class="mx-auto max-w-6xl">
        <p class="manifesto-breath text-[10px] uppercase tracking-celestial text-primary">Voices of the Journey</p>
        <div class="mt-10 grid gap-8 lg:grid-cols-3">
          <article
            v-for="letter in letters"
            :key="letter.id"
            class="manifesto-breath letter-breath border-l border-primary/45 pl-6"
          >
            <p class="font-serif text-2xl italic leading-relaxed text-foreground/92 quote-letter">
              "{{ letter.quote }}"
            </p>
            <p class="mt-6 text-[10px] uppercase tracking-celestial text-primary guestbook-signature">{{ letter.author }}</p>
            <p class="mt-1 text-xs italic text-muted">{{ letter.origin }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="px-6 py-24 md:px-10 lg:px-16">
      <div class="mx-auto max-w-6xl">
        <p class="manifesto-breath text-[10px] uppercase tracking-celestial text-primary">Horizon</p>
        <div class="manifesto-breath mt-8 border border-primary/20 p-8">
          <h3 class="font-serif text-4xl italic">From Kenya, Toward the Next Constellations</h3>
          <p class="mt-6 max-w-3xl text-sm uppercase tracking-monograph text-foreground/72">
            Our foundations are rooted in Kenya, yet the perspective is already extending across East Africa. The next chapters are being drawn on the Tanzania and Uganda horizon.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <span
              v-for="story in horizonStories"
              :key="story.slug"
              class="border border-primary/45 px-4 py-2 text-[10px] uppercase tracking-celestial text-primary"
            >
              {{ story.name }}: Horizon Expedition
            </span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.manifesto-grain {
  background-image:
    radial-gradient(circle at 20% 20%, rgba(197, 170, 94, 0.08) 0%, transparent 45%),
    radial-gradient(circle at 75% 70%, rgba(247, 246, 243, 0.05) 0%, transparent 35%),
    repeating-radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 4px);
}

.manifesto-vignette {
  background: radial-gradient(circle at center, transparent 48%, rgba(0, 0, 0, 0.35) 100%);
}

.quote-letter {
  text-wrap: pretty;
}

.guestbook-signature {
  letter-spacing: 0.34em;
}
</style>
