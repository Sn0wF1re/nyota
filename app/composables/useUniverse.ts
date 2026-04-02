export const useUniverse = () => {
  const router = useRouter()
  const visitedNodeSlugs = useState<string[]>('visited-node-slugs', () => [])
  const visitedNodeHydrated = useState<boolean>('visited-node-slugs-hydrated', () => false)

  type StoryContent = {
    slug: string
    isHorizon: boolean
    mapCoords: { x: number; y: number }
    hero?: {
      headline?: string
      subHeadline?: string
    }
  }

  const storyModules = import.meta.glob('../../content/stories/*.json', {
    eager: true,
    import: 'default'
  }) as Record<string, StoryContent>

  const labelOverrides: Record<string, { name: string; sub: string }> = {
    'maasai-mara-the-great-theatre': { name: 'Maasai Mara', sub: 'The Great Theatre' },
    'the-hidden-north-samburu': { name: 'Samburu', sub: 'The Hidden North' },
    'southern-giants-amboseli': { name: 'Amboseli', sub: 'Southern Giants' },
    'roof-of-africa-mt-kenya': { name: 'Mt Kenya', sub: 'Roof of Africa' },
    'the-great-rift-valley': { name: 'Rift Valley', sub: 'The Great Rift' },
    'the-desert-cradle-turkana': { name: 'Turkana', sub: 'The Desert Cradle' },
    'azure-ancient-lamu': { name: 'Lamu', sub: 'Azure & Ancient' },
    'western-waters-and-wood': { name: 'Western Kenya', sub: 'Waters and Wood' },
    'serengeti-the-endless-plains': { name: 'Serengeti', sub: 'Tanzania Horizon' },
    'uganda-the-gorilla-mist': { name: 'Uganda', sub: 'Gorilla Mist Horizon' },
    'botswana-the-jade-delta': { name: 'Botswana', sub: 'Jade Delta Horizon' }
  }

  const preferredOrder = [
    'maasai-mara-the-great-theatre',
    'the-hidden-north-samburu',
    'southern-giants-amboseli',
    'roof-of-africa-mt-kenya',
    'the-great-rift-valley',
    'the-desert-cradle-turkana',
    'azure-ancient-lamu',
    'western-waters-and-wood',
    'serengeti-the-endless-plains',
    'uganda-the-gorilla-mist',
    'botswana-the-jade-delta'
  ]

  const orderByPreferred = (a: string, b: string) => {
    const aIndex = preferredOrder.indexOf(a)
    const bIndex = preferredOrder.indexOf(b)
    const aRank = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex
    const bRank = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex
    return aRank - bRank
  }

  const nodes = readonly(
    Object.values(storyModules)
      .filter((story) => story?.slug && story?.mapCoords)
      .sort((a, b) => orderByPreferred(a.slug, b.slug))
      .map((story) => {
        const override = labelOverrides[story.slug]
        return {
          slug: story.slug,
          name: override?.name || story.hero?.headline || story.slug,
          sub: override?.sub || story.hero?.subHeadline || 'Story Chapter',
          x: story.mapCoords.x,
          y: story.mapCoords.y,
          isHorizon: story.isHorizon
        }
      })
  )

  const findNode = (slug: string) => nodes.find(n => n.slug === slug)

  const persistVisited = () => {
    if (!process.client) return
    localStorage.setItem('nyota-visited-slugs', JSON.stringify(visitedNodeSlugs.value))
  }

  if (process.client && !visitedNodeHydrated.value) {
    const raw = localStorage.getItem('nyota-visited-slugs')
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          visitedNodeSlugs.value = parsed.filter((item): item is string => typeof item === 'string')
        }
      } catch {
        visitedNodeSlugs.value = []
      }
    }
    visitedNodeHydrated.value = true
  }

  const markVisited = (slug: string) => {
    if (!slug || visitedNodeSlugs.value.includes(slug)) return
    visitedNodeSlugs.value = [...visitedNodeSlugs.value, slug]
    persistVisited()
  }

  const navigateToNode = (slug: string) => {
    const node = findNode(slug)
    if (!node || node.isHorizon) return
    markVisited(slug)
    router.push(`/stories/${slug}`)
  }

  return {
    nodes,
    findNode,
    navigateToNode,
    markVisited,
    visitedNodeSlugs
  }
}