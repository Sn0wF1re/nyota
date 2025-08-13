<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#121820]/90 backdrop-blur-sm border-b border-[#c5aa5e]/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="w-18 h-18 flex items-center justify-center">
            <NuxtImg src="/nyota_logo.png" alt="Nyota Logo" width="400" height="400" />
          </div>
        </div>
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink v-for="item in navItems" :key="item.url" :to="item.url" class="text-sm transition-colors" :class="$route.path === item.url ? 'text-primary' : 'text-background hover:text-primary'">
            {{ item.name }}
          </NuxtLink>
        </div>
        <!-- Book Now Button -->
        <div class="hidden md:block">
          <Button variant="outline" class="border-primary text-primary hover:bg-primary hover:text-foreground rounded-full cursor-pointer">
            Book Now
          </Button>
        </div>
        <!-- Mobile Menu Button -->
        <button class="md:hidden text-background" @click="isMenuOpen = !isMenuOpen">
          <component :is="isMenuOpen ? X : Menu" class="w-6 h-6" />
        </button>
      </div>
      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden bg-foreground border-t border-primary/20">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink v-for="item in navItems" :key="item.url" :to="item.url" class="block text-background py-2 px-4 rounded hover:bg-primary/10" @click="isMenuOpen = false">
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
const isMenuOpen = ref(false)
const navItems = [
  { name: 'Home', url: '/' },
  { name: 'Destinations', url: '/destinations' },
  { name: 'Packages', url: '/packages' },
  { name: 'About Us', url: '/about' },
  { name: 'Contact', url: '/contact' }
]
</script>
