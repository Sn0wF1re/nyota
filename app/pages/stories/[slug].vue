<script setup lang="ts">
import { computed, ref } from 'vue'
import gsap from 'gsap'
import {
  ShieldCheck,
  Eye,
  Map,
  Ship,
  Landmark,
  Palmtree,
  Waves,
  Tent,
  Fish,
  Mountain,
  House,
  MountainSnow,
  Footprints,
  Plane,
  Skull,
  Users,
  Cloud,
  Heart,
  Binoculars,
  Brush,
  Clock,
  PawPrint,
  Baby,
  Lock
} from 'lucide-vue-next'

const route = useRoute()
const { markVisited } = useUniverse()
const storySlug = computed(() => String(route.params.slug))

// 1. Dynamic Data Fetching strictly from the Stories collection
const { data: story } = await useAsyncData(`story-${route.params.slug}`, () =>
  queryCollection('stories').where('slug', '=', storySlug.value).first()
)

const relatedStorySlug = computed(() => story.value?.pairsWellWith?.targetSlug || '')

const { data: relatedStory } = await useAsyncData(
  `story-next-${route.params.slug}`,
  async () => {
    if (!relatedStorySlug.value) return null
    return await queryCollection('stories').where('slug', '=', relatedStorySlug.value).first()
  },
  { watch: [relatedStorySlug] }
)

const { data: relatedJournal } = await useAsyncData(
  `journal-related-${route.params.slug}`,
  () => queryCollection('journal').where('relatedStory', '=', storySlug.value).first(),
  { watch: [storySlug] }
)

if (!story.value) {
  throw createError({ statusCode: 404, statusMessage: 'Sanctuary not found' })
}

// 2. Scroll Pacing Logic for Sensory Chapters
const chapterRefs = useTemplateRef<HTMLElement[]>('chapterRefs')
const heroVideoRef = ref<HTMLVideoElement | null>(null)

const cinematicVideoSrc = computed(() => {
  if (story.value?.hero?.videoSrc) return story.value.hero.videoSrc
  return 'https://res.cloudinary.com/dx2quobqu/video/upload/v1754663776/nyota_bg_video_trim.mp4'
})

const iconMap = {
  'shield-check': ShieldCheck,
  eye: Eye,
  map: Map,
  ship: Ship,
  landmark: Landmark,
  palmtree: Palmtree,
  waves: Waves,
  tent: Tent,
  fish: Fish,
  mountain: Mountain,
  home: House,
  'mountain-snow': MountainSnow,
  elephant: PawPrint,
  footprints: Footprints,
  plane: Plane,
  skull: Skull,
  users: Users,
  cloud: Cloud,
  heart: Heart,
  binoculars: Binoculars,
  brush: Brush,
  clock: Clock,
  paw: PawPrint,
  baby: Baby,
  lock: Lock,
  'palm-tree': Palmtree,
  cat: PawPrint
} as const

const resolveFeatureIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Map
}

const relatedJournalPath = computed(() => {
  const journal = relatedJournal.value as Record<string, unknown> | null
  if (!journal) return ''
  if (typeof journal.path === 'string') return journal.path
  if (typeof journal._path === 'string') return journal._path
  if (typeof journal.slug === 'string') return `/journal/${journal.slug}`
  return ''
})

onMounted(async () => {
  markVisited(String(route.params.slug))

  const scrollPlugin = await import('gsap/ScrollTrigger')
  const ScrollTrigger = scrollPlugin.ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0')
        entry.target.classList.remove('opacity-0', 'translate-y-12')
      }
    });
  }, { threshold: 0.1 });

  chapterRefs.value?.forEach((el) => observer.observe(el));

  if (heroVideoRef.value) {
    gsap.to(heroVideoRef.value, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: heroVideoRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })
  }

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})
</script>

<template>
  <main v-if="story" class="dark bg-background text-foreground min-h-screen selection:bg-primary selection:text-background editorial-atmosphere gold-mist-bg">
    
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <video 
        ref="heroVideoRef"
        :src="cinematicVideoSrc" 
        autoplay loop muted playsinline 
        class="absolute inset-0 w-full h-full object-cover opacity-55 scale-110" 
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-background opacity-95" />
      
      <div class="relative z-10 text-center px-6 max-w-5xl">
        <span class="text-foreground/70 tracking-celestial uppercase text-[10px] mb-6 block">
          {{ story.collection }}
        </span>
        <h1 class="font-serif text-6xl md:text-9xl mb-8 leading-tight italic">
          {{ story.hero.headline }}
        </h1>
        <p class="tracking-monograph uppercase text-sm md:text-base max-w-2xl mx-auto opacity-80">
          {{ story.hero.subHeadline }}
        </p>
      </div>
    </section>

    <section class="py-32 px-6 md:px-24">
      <div class="max-w-4xl mx-auto text-center border-b border-primary/10 pb-32">
        <h2 class="text-foreground/65 tracking-celestial uppercase text-[10px] mb-12">The Nyota Lens</h2>
        <p class="font-serif text-2xl md:text-4xl leading-relaxed italic text-primary">
          "{{ story.theNyotaLens.architectNote }}"
        </p>
      </div>
    </section>

    <section class="px-6 pb-24 md:px-24">
      <div class="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        <article
          v-for="(usp, idx) in story.theNyotaLens.uspIcons"
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

    <section v-if="relatedJournal && relatedJournalPath" class="border-y border-primary/15 bg-card/36 px-6 py-16 md:px-24">
      <div class="mx-auto max-w-5xl">
        <p class="text-[10px] uppercase tracking-celestial text-primary">Field Editorial</p>
        <h3 class="mt-4 font-serif text-4xl italic text-foreground">{{ relatedJournal.title }}</h3>
        <NuxtLink
          :to="relatedJournalPath"
          class="mt-7 inline-block border border-primary px-6 py-3 text-[10px] uppercase tracking-celestial text-primary transition hover:bg-primary hover:text-background"
        >
          Read the Journal Note
        </NuxtLink>
      </div>
    </section>

    <section class="py-24 px-6 md:px-24 space-y-48 overflow-hidden">
      <div 
        v-for="(chapter, i) in story.sensoryChapters" 
        :key="i" 
        ref="chapterRefs" 
        class="relative flex flex-col md:flex-row items-center gap-16 md:even:flex-row-reverse opacity-0 translate-y-12 transition-all duration-[1500ms] ease-out"
      >
        <span class="absolute -top-10 right-0 text-[10px] uppercase tracking-celestial text-primary/80">
          Chapter {{ i + 1 }} of {{ story.sensoryChapters.length }}
        </span>

        <div class="w-full md:w-1/2 aspect-[4/5] overflow-hidden bg-card group shadow-2xl">
          <img 
            v-if="chapter.type === 'image'" 
            :src="chapter.mediaUrl" 
            class="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-1000 group-hover:scale-105" 
          />
          <video 
            v-else 
            :src="chapter.mediaUrl" 
            autoplay loop muted playsinline 
            class="w-full h-full object-cover" 
          />
        </div>
        
        <div class="w-full md:w-1/2 max-w-lg">
          <h3 class="font-serif text-3xl md:text-5xl mb-8">{{ chapter.chapterTitle }}</h3>
          <p class="mb-5 text-[10px] uppercase tracking-celestial text-primary/80">
            {{ chapter.type === 'video' ? 'Moving Interlude' : 'Still Interlude' }}
          </p>
          <p class="tracking-widest leading-loose opacity-70 italic">{{ chapter.narrativeBody }}</p>
        </div>
      </div>
    </section>

    <section v-if="relatedStory && story.pairsWellWith" class="border-t border-primary/20 bg-background/86 px-6 py-24 md:px-24">
      <div class="mx-auto max-w-5xl">
        <p class="text-[10px] uppercase tracking-celestial text-primary">Celestial Progression</p>
        <h3 class="mt-4 font-serif text-5xl italic text-foreground">
          {{ story.pairsWellWith.reasoning }}
        </h3>
        <p class="mt-6 max-w-3xl text-sm uppercase tracking-monograph text-foreground/74">
          Rust on the horizon now turns toward {{ relatedStory.hero?.headline || relatedStory.slug }}. Continue the manuscript.
        </p>
        <NuxtLink
          :to="`/stories/${relatedStory.slug}`"
          class="mt-9 inline-block border border-primary px-7 py-3 text-[10px] uppercase tracking-celestial text-primary transition hover:bg-primary hover:text-background"
        >
          Enter {{ relatedStory.hero?.headline || relatedStory.slug }}
        </NuxtLink>
      </div>
    </section>

  </main>
</template>