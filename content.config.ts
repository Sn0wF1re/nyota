import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    stories: defineCollection({
      type: 'data',
      source: 'stories/**/*.json',
      schema: z.object({
        slug: z.string(),
        collection: z.string().optional(),
        isHorizon: z.boolean(),
        mapCoords: z.object({
          x: z.number(),
          y: z.number()
        }),
        hero: z.object({
          headline: z.string(),
          subHeadline: z.string(),
          videoSrc: z.string().optional()
        }),
        theNyotaLens: z.object({
          architectNote: z.string(),
          uspIcons: z.array(
            z.object({
              label: z.string(),
              iconName: z.string()
            })
          )
        }),
        sensoryChapters: z.array(
          z.object({
            chapterTitle: z.string(),
            narrativeBody: z.string(),
            mediaUrl: z.string(),
            type: z.enum(['image', 'video'])
          })
        ),
        pairsWellWith: z.object({
          targetSlug: z.string(),
          reasoning: z.string()
        })
      })
    }),
    journal: defineCollection({
      type: 'page',
      source: 'journal/**/*.md'
    })
  }
})