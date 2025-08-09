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
    '@vueuse/motion',
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
  }
})