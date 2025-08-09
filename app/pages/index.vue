<template>
  <div class="min-h-screen bg-[#f7f6f3] text-[#121820]">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center bg-[#121820] text-[#f7f6f3] overflow-hidden">
      <div class="absolute inset-0">
        <!-- Glow effect component (to be implemented or imported) -->
        <!-- <Glow variant="center" class="opacity-30" /> -->
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <div class="text-[#c5aa5e] text-sm font-medium tracking-widest uppercase">
            Discover the Heart of Africa
          </div>
          <h1 class="text-5xl md:text-7xl font-light leading-tight font-serif">
            Adventure Awaits.<br>
            <span class="text-[#c5aa5e]">Experience</span> Nyota Safari Luxury.
          </h1>
          <p class="text-lg text-[#f7f6f3]/80 max-w-xl">
            Luxury safari experiences in Kenya and beyond. Explore the wild, connect with nature, and create unforgettable memories.
          </p>
          <Button variant="outline" class="border-[#c5aa5e] text-[#c5aa5e] hover:bg-[#c5aa5e] hover:text-[#121820] rounded-full px-6 py-3 font-medium">
            Book Now
          </Button>
        </div>
        <div class="relative">
          <!-- Hero image or mockup can be added here -->
        </div>
      </div>
    </section>

    <!-- Destinations Preview Section -->
    <section class="py-20 bg-[#f7f6f3]">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl text-[#121820] font-light mb-4 font-serif">
            Our Destinations
          </h2>
          <p class="text-[#121820]/70 text-lg max-w-2xl mx-auto">
            Discover the most spectacular safari destinations across East Africa.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Use shadcn-vue Card for each destination -->
          <Card v-for="destination in destinations" :key="destination.name" class="group cursor-pointer overflow-hidden border-[#c5aa5e]/20 hover:border-[#c5aa5e] transition-all">
            <img :src="destination.image" :alt="destination.name" class="w-full h-40 object-cover rounded-t-md" />
            <div class="p-4">
              <h3 class="text-xl font-semibold text-[#121820]">{{ destination.name }}</h3>
              <p class="text-[#121820]/70 text-sm">{{ destination.description }}</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
// import Glow from '@/components/ui/Glow.vue' // Uncomment if Glow is implemented

const destinations = [
  {
    name: 'Kenya',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop',
    description: 'Experience the iconic Maasai Mara and witness the Great Migration'
  },
  {
    name: 'Tanzania',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
    description: 'Discover the Serengeti and climb Mount Kilimanjaro'
  },
  {
    name: 'Uganda',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop',
    description: 'Encounter mountain gorillas in their natural habitat'
  },
  {
    name: 'Botswana',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=600&fit=crop',
    description: 'Explore the pristine Okavango Delta wilderness'
  }
]
</script>
