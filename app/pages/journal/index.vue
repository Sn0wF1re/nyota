<script setup lang="ts">
import { computed } from 'vue'

const { data: journals } = await useAsyncData('journal-index', () =>
  queryCollection('journal').all()
)

type JournalRecord = {
  title?: string
  path?: string
  slug?: string
  readingTime?: string
  category?: string
  geographicFocus?: string
}

const journalItems = computed(() => (journals.value || []) as JournalRecord[])

const resolveJournalPath = (journal: JournalRecord) => {
  if (typeof journal.path === 'string') return journal.path
  if (typeof journal.slug === 'string') return `/journal/${journal.slug}`
  return '/journal'
}
</script>

<template>
  <main class="dark relative min-h-screen bg-background text-foreground overflow-hidden">
    <div class="pointer-events-none absolute inset-0 opacity-55">
      <div class="manifesto-grain absolute inset-0" />
      <div class="manifesto-vignette absolute inset-0" />
    </div>

    <section class="relative z-10 mx-auto max-w-7xl px-6 pb-14 pt-28 md:px-10 lg:px-14">
      <p class="text-[10px] uppercase tracking-celestial text-primary">Editorial Authority</p>
      <h1 class="mt-6 max-w-5xl font-serif text-5xl italic leading-tight md:text-7xl lg:text-8xl">
        Field Journals
      </h1>
      <p class="mt-8 max-w-3xl text-sm uppercase tracking-monograph text-foreground/72 md:text-base">
        Intelligence in long form. Each entry extends the universe with context, philosophy, and precise field logic.
      </p>
    </section>

    <section class="relative z-10 mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-14">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="journal in journalItems"
          :key="journal.slug || journal.path || journal.title"
          class="border border-primary/20 bg-card/50 p-6 backdrop-blur-sm"
        >
          <p class="text-[10px] uppercase tracking-celestial text-primary">{{ journal.category || 'Field Note' }}</p>
          <h2 class="mt-4 font-serif text-3xl italic leading-tight text-foreground">
            {{ journal.title || 'Untitled Journal' }}
          </h2>
          <p class="mt-4 text-[10px] uppercase tracking-monograph text-foreground/65">
            {{ journal.readingTime || 'Editorial Read' }}
            <span v-if="journal.geographicFocus">• {{ journal.geographicFocus }}</span>
          </p>
          <NuxtLink
            :to="resolveJournalPath(journal)"
            class="mt-8 inline-block border border-primary px-6 py-3 text-[10px] uppercase tracking-celestial text-primary transition hover:bg-primary hover:text-background"
          >
            Read Journal
          </NuxtLink>
        </article>
      </div>

      <div class="mt-16 border-t border-primary/20 pt-10">
        <NuxtLink
          to="/contact"
          class="inline-block border border-primary px-7 py-3 text-[10px] uppercase tracking-celestial text-primary transition hover:bg-primary hover:text-background"
        >
          Continue to Discovery Briefing
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
</style>
