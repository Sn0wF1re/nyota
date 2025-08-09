// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt',
    '@nuxt/test-utils'
  ],
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  shadcn: {
    prefix: '',
  },
  alias: {
    '@components': fileURLToPath(new URL('./app/components', import.meta.url)),
  },
  runtimeConfig: {
    public: {
      motion: {
        directives: {
          // Fade In
          'fade-in': {
            initial: { opacity: 0, y: 30 },
            enter: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
          },
          // Slide Left
          'slide-left': {
            initial: { opacity: 0, x: -50 },
            enter: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
          },
          // Staggered Fade (for lists)
          'stagger-fade': {
            initial: { opacity: 0, y: 30 },
            enter: { opacity: 1, y: 0, transition: { duration: 0.8 } } // Use delay in template for stagger
          },
          // Drag X (carousel/slider)
          'drag-x': {
            initial: { x: 0 },
            drag: 'x',
            transition: { type: 'spring', damping: 18, stiffness: 90, duration: 0.2 }
          }
        }
      }
    }
  }
})