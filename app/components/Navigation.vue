<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#121820]/90 backdrop-blur-sm border-b border-[#c5aa5e]/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-[#c5aa5e] rounded-full flex items-center justify-center">
            <!-- Replace with lucide-vue-next Star icon -->
            <Icon name="lucide:star" class="w-5 h-5 text-[#121820]" />
          </div>
          <span class="text-[#c5aa5e] text-xl font-light font-serif">
            Nyota
          </span>
        </div>
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink v-for="item in navItems" :key="item.url" :to="item.url" class="text-sm transition-colors" :class="$route.path === item.url ? 'text-[#c5aa5e]' : 'text-[#f7f6f3] hover:text-[#c5aa5e]'">
            {{ item.name }}
          </NuxtLink>
        </div>
        <!-- Book Now Button -->
        <div class="hidden md:block">
          <Button variant="outline" class="border-[#c5aa5e] text-[#c5aa5e] hover:bg-[#c5aa5e] hover:text-[#121820] rounded-full">
            Book Now
          </Button>
        </div>
        <!-- Mobile Menu Button -->
        <button class="md:hidden text-[#f7f6f3]" @click="isMenuOpen = !isMenuOpen">
          <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
        </button>
      </div>
      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden bg-[#121820] border-t border-[#c5aa5e]/20">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink v-for="item in navItems" :key="item.url" :to="item.url" class="block text-[#f7f6f3] py-2 px-4 rounded hover:bg-[#c5aa5e]/10" @click="isMenuOpen = false">
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const isMenuOpen = ref(false)
const navItems = [
  { name: 'Home', url: '/' },
  { name: 'Destinations', url: '/destinations' },
  { name: 'Packages', url: '/packages' },
  { name: 'About Us', url: '/about' },
  { name: 'Contact', url: '/contact' }
]
</script>
