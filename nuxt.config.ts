// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    pageTransition: {
      name: 'nyota-page',
      mode: 'out-in'
    }
  },
  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt',
    '@nuxt/test-utils',
    '@nuxt/content',
    'shadcn-nuxt'
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English' }
    ]
  },
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },
  motion: {
    directives: {
      // Fade In
      'fade-in': {
        initial: { opacity: 0, y: 30 },
        enter: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
      },
      // Staggered Fade (for lists)
      'stagger-fade': {
        initial: { opacity: 0, y: 30 },
        enter: { opacity: 1, y: 0, transition: { duration: 0.8 } } // Use delay in template for stagger
      },
      // Drag X (carousel/slider)
      'drag-x': {
        initial: { x: 0 },
        enter: {
          transition: { type: 'spring', damping: 18, stiffness: 90, duration: 0.2 }
        }
      }
    }
  },
  runtimeConfig: {
    public: {
    }
  }
})