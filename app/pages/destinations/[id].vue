<template>
  <div v-if="country" class="min-h-screen bg-background text-foreground">
    <section class="relative min-h-[60vh] flex items-center justify-center bg-foreground text-background overflow-hidden pb-16 pt-8">
      <div class="absolute inset-0">
        <Glow variant="center" class="opacity-30" />
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1 class="text-5xl md:text-6xl font-light leading-tight font-serif">
          {{ country.name }} Safari
        </h1>
        <p class="text-lg md:text-xl text-background/80 leading-relaxed max-w-2xl mx-auto font-sans">
          {{ country.description }}
        </p>
        <NuxtImg :src="country.image" :alt="country.name" class="rounded-md object-cover w-full h-64 mx-auto mt-8" />
      </div>
    </section>
    <section class="py-24 bg-background">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-light mb-6 text-foreground font-serif">
            Highlights
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="highlight in country.highlights" :key="highlight" class="p-6 flex flex-col items-center border-primary/20 bg-background shadow">
            <CardTitle class="text-lg font-semibold text-primary mb-2 font-serif text-center">{{ highlight }}</CardTitle>
          </Card>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-background text-foreground">
    <h1 class="text-3xl font-light">Country not found.</h1>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { countries } from '@/data/countries'

const route = useRoute()
const country = countries[route.params.id]
</script>
