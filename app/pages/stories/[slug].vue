<script setup lang="ts">
import { computed } from 'vue'
import gsap from 'gsap'
import { useJournals } from '@/composables/useJournals'
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
const { fetchRelatedJournalForStory, resolveJournalPath, asJournalRecord } = useJournals()
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
  () => fetchRelatedJournalForStory(storySlug.value),
  { watch: [storySlug] }
)

if (!story.value) {
  throw createError({ statusCode: 404, statusMessage: 'Sanctuary not found' })
}

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
  helicopter: Plane,
  tree: Palmtree,
  'palm-tree': Palmtree,
  cat: PawPrint
} as const

const resolveFeatureIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Map
}

const relatedJournalPath = computed(() => {
  return resolveJournalPath(asJournalRecord(relatedJournal.value))
})

const relatedJournalData = computed(() => asJournalRecord(relatedJournal.value))

onMounted(async () => {
  markVisited(String(route.params.slug))

  const scrollPlugin = await import('gsap/ScrollTrigger')
  const ScrollTrigger = scrollPlugin.ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  const heroVideoEl = document.querySelector<HTMLVideoElement>('.story-hero-video')

  if (heroVideoEl) {
    gsap.to(heroVideoEl, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: heroVideoEl,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })
  }
})
</script>

<template>
  <main v-if="story" class="dark bg-background text-foreground min-h-screen selection:bg-primary selection:text-background editorial-atmosphere gold-mist-bg">
    <StoryHero
      :collection="story.collection"
      :headline="story.hero.headline"
      :sub-headline="story.hero.subHeadline"
      :video-src="cinematicVideoSrc"
    />

    <StoryLens
      :architect-note="story.theNyotaLens.architectNote"
      :usp-icons="story.theNyotaLens.uspIcons"
      :resolve-feature-icon="resolveFeatureIcon"
    />

    <section v-if="relatedJournal && relatedJournalPath" class="border-y border-primary/15 bg-card/36 px-6 py-16 md:px-24">
      <div class="mx-auto max-w-5xl">
        <p class="text-[10px] uppercase tracking-celestial text-primary">Field Editorial</p>
        <h3 class="mt-4 font-serif text-4xl italic text-foreground">{{ relatedJournalData.title }}</h3>
        <NuxtLink
          :to="relatedJournalPath"
          class="mt-7 inline-block border border-primary px-6 py-3 text-[10px] uppercase tracking-celestial text-primary transition hover:bg-primary hover:text-background"
        >
          Read the Journal Note
        </NuxtLink>
      </div>
    </section>

    <StoryChapter :chapters="story.sensoryChapters" />

    <StoryPair
      v-if="relatedStory && story.pairsWellWith"
      :reasoning="story.pairsWellWith.reasoning"
      :related-story-slug="relatedStory.slug"
      :related-story-headline="relatedStory.hero?.headline"
    />

  </main>
</template>