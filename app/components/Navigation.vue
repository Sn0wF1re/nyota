<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 bg-midnight/10 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <NuxtLink to="/" class="w-24 h-11 flex items-center justify-center">
            <NuxtImg src="/nyota_logo.png" alt="Nyota Gold Mark" width="640" height="300" class="h-10 w-auto object-contain" />
          </NuxtLink>
        </div>
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="item in navItems"
            :key="item.url"
            :to="item.url"
            :ref="(el) => setNavRef(el, item.url)"
            class="group relative text-sm tracking-wide transition-colors"
            :class="route.path === item.url ? 'text-primary' : 'text-background/92 hover:text-primary'"
          >
            <span>{{ item.name }}</span>
            <span
              class="pointer-events-none absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-primary opacity-0"
              :data-underline="item.url"
            />
          </NuxtLink>
        </div>
        <!-- Story CTA -->
        <div class="hidden md:block">
          <NuxtLink to="/contact">
            <Button variant="outline" class="cursor-pointer rounded-none border-bone/60 text-foreground hover:text-primary">
              Craft Your Path
            </Button>
          </NuxtLink>
        </div>
        <!-- Mobile Menu Button -->
        <button class="md:hidden text-background" @click="isMenuOpen = !isMenuOpen">
          <component :is="isMenuOpen ? X : Menu" class="w-6 h-6" />
        </button>
      </div>
      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="border-t border-primary/20 bg-midnight/85 backdrop-blur-md md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.url"
            :to="item.url"
            class="block text-background py-2 px-4 rounded hover:bg-primary/10"
            @click="isMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
          <NuxtLink to="/contact" class="inline-block mt-2 ml-4" @click="isMenuOpen = false">
            <Button variant="outline" class="cursor-pointer rounded-none border-bone/60 text-foreground hover:text-primary">
              Craft Your Path
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import gsap from 'gsap'

const isMenuOpen = ref(false)
const route = useRoute()

const navRefs = ref<Record<string, HTMLElement>>({})

const setNavRef = (el: Element | { $el?: Element } | null, url: string) => {
  if (!el) return
  const resolved = '$el' in el ? el.$el : el
  if (resolved instanceof HTMLElement) {
    navRefs.value[url] = resolved
  }
}

const navItems = [
  { name: 'Home', url: '/' },
  { name: 'The Star Chart', url: '/destinations' },
  { name: 'Field Journals', url: '/journal' },
  { name: 'The Vision', url: '/about' },
  { name: 'The Briefing', url: '/contact' }
]

onMounted(() => {
  Object.values(navRefs.value).forEach((link) => {
    const underline = link.querySelector<HTMLElement>('[data-underline]')
    if (!underline) return

    link.addEventListener('mouseenter', () => {
      gsap.killTweensOf(underline)
      gsap.fromTo(
        underline,
        { width: 0, opacity: 0 },
        { width: '100%', opacity: 1, duration: 0.45, ease: 'power2.out' }
      )
    })

    link.addEventListener('mouseleave', () => {
      gsap.killTweensOf(underline)
      gsap.to(underline, { width: 0, opacity: 0, duration: 0.32, ease: 'power2.in' })
    })
  })
})
</script>
