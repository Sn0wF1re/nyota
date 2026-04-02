<script setup lang="ts">
import { computed } from 'vue'
import { useJournals } from '@/composables/useJournals'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const { fetchJournalBySlug, asJournalRecord } = useJournals()

const { data: journal } = await useAsyncData(
  `journal-${slug.value}`,
  () => fetchJournalBySlug(slug.value),
  { watch: [slug] }
)

if (!journal.value) {
  throw createError({ statusCode: 404, statusMessage: 'Journal not found' })
}

type StoryItem = {
  slug: string
  hero?: {
    headline?: string
  }
}

const journalData = computed(() => asJournalRecord(journal.value))

const relatedStorySlug = computed(() => {
  return typeof journalData.value.relatedStory === 'string' ? journalData.value.relatedStory : ''
})

const { data: relatedStory } = await useAsyncData(
  `journal-story-${slug.value}`,
  async () => {
    if (!relatedStorySlug.value) return null
    return await queryCollection('stories').where('slug', '=', relatedStorySlug.value).first()
  },
  { watch: [relatedStorySlug] }
)
</script>

<template>
  <main class="dark relative min-h-screen bg-background text-foreground overflow-hidden">
    <div class="pointer-events-none absolute inset-0 opacity-55">
      <div class="manifesto-grain absolute inset-0" />
      <div class="manifesto-vignette absolute inset-0" />
    </div>

    <section class="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-28 md:px-10">
      <p class="text-[10px] uppercase tracking-celestial text-primary">
        {{ journalData.category || 'Field Journal' }}
      </p>
      <h1 class="mt-7 font-serif text-5xl italic leading-tight md:text-7xl">
        {{ journalData.title }}
      </h1>
      <p class="mt-6 text-[10px] uppercase tracking-monograph text-foreground/70">
        {{ journalData.readingTime || 'Editorial Read' }}
        <span v-if="journalData.geographicFocus">• {{ journalData.geographicFocus }}</span>
      </p>
    </section>

    <section class="relative z-10 mx-auto max-w-5xl px-6 pb-20 md:px-10">
      <article class="journal-content border-y border-primary/15 py-10">
        <ContentRenderer v-if="journal" :value="journal" />
      </article>
    </section>

    <section class="relative z-10 mx-auto max-w-5xl border-t border-primary/20 px-6 pb-24 pt-12 md:px-10">
      <div class="flex flex-wrap gap-4">
        <NuxtLink
          to="/about"
          class="inline-block border border-primary px-6 py-3 text-[10px] uppercase tracking-celestial text-primary transition hover:bg-primary hover:text-background"
        >
          Enter The Vision
        </NuxtLink>

        <NuxtLink
          to="/contact"
          class="inline-block border border-primary px-6 py-3 text-[10px] uppercase tracking-celestial text-primary transition hover:bg-primary hover:text-background"
        >
          Continue To Briefing
        </NuxtLink>

        <NuxtLink
          v-if="relatedStory"
          :to="`/stories/${(relatedStory as StoryItem).slug}`"
          class="inline-block border border-primary px-6 py-3 text-[10px] uppercase tracking-celestial text-primary transition hover:bg-primary hover:text-background"
        >
          Return To {{ (relatedStory as StoryItem).hero?.headline || (relatedStory as StoryItem).slug }}
        </NuxtLink>
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

.journal-content :deep(h1),
.journal-content :deep(h2),
.journal-content :deep(h3) {
  font-family: var(--font-serif);
  font-style: italic;
  line-height: 1.2;
  color: var(--foreground);
  margin-top: 2.4rem;
}

.journal-content :deep(h1) {
  font-size: clamp(2rem, 4vw, 3.75rem);
}

.journal-content :deep(h2) {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
}

.journal-content :deep(h3) {
  font-size: clamp(1.4rem, 2.2vw, 2rem);
}

.journal-content :deep(p) {
  margin-top: 1.2rem;
  color: color-mix(in oklab, var(--foreground) 88%, transparent);
  line-height: 1.8;
}
</style>
