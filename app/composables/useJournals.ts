export type JournalRecord = {
  title?: string
  path?: string
  _path?: string
  slug?: string
  readingTime?: string
  category?: string
  geographicFocus?: string
  relatedStory?: string
}

export const useJournals = () => {
  const fetchAllJournals = async () => {
    return await queryCollection('journal').all()
  }

  const fetchJournalBySlug = async (slug: string) => {
    if (!slug) return null
    return await queryCollection('journal').path(`/journal/${slug}`).first()
  }

  const fetchRelatedJournalForStory = async (storySlug: string) => {
    if (!storySlug) return null
    return await queryCollection('journal').where('relatedStory', '=', storySlug).first()
  }

  const resolveJournalPath = (journal: JournalRecord | null | undefined) => {
    if (!journal) return ''
    if (typeof journal.path === 'string') return journal.path
    if (typeof journal._path === 'string') return journal._path
    if (typeof journal.slug === 'string') return `/journal/${journal.slug}`
    return ''
  }

  const asJournalRecord = (value: unknown) => (value || {}) as JournalRecord
  const asJournalList = (value: unknown) => (value || []) as JournalRecord[]

  return {
    fetchAllJournals,
    fetchJournalBySlug,
    fetchRelatedJournalForStory,
    resolveJournalPath,
    asJournalRecord,
    asJournalList
  }
}
