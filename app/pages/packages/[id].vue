<template>
  <div v-if="pkg" class="min-h-screen bg-background text-foreground">
    <section class="relative min-h-[60vh] flex items-center justify-center bg-foreground text-background overflow-hidden pb-16 pt-8">
      <div class="absolute inset-0">
        <Glow variant="center" class="opacity-30" />
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 pt-16">
        <h1 class="text-5xl md:text-6xl font-light leading-tight font-serif">
          {{ pkg.name }} Safari Package
        </h1>
        <p class="text-lg md:text-xl text-background/80 leading-relaxed max-w-2xl mx-auto font-sans">
          {{ pkg.description }}
        </p>
        <div v-if="pkg.writeup" class="mt-8 text-base md:text-lg text-background/90 leading-relaxed max-w-3xl mx-auto font-sans">
          {{ pkg.writeup }}
        </div>
        <NuxtImg :src="pkg.image" :alt="pkg.name" class="rounded-md object-cover w-full h-64 mx-auto mt-8" />
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
          <Card v-for="highlight in pkg.highlights" :key="highlight" class="p-6 flex flex-col items-center border-primary/20 bg-background shadow">
            <CardTitle class="text-lg font-semibold text-primary mb-2 font-serif text-center">{{ highlight }}</CardTitle>
          </Card>
        </div>
      </div>
    </section>
    <section class="py-16 bg-foreground text-background">
      <div class="max-w-3xl mx-auto px-6 text-center space-y-8">
        <h2 class="text-3xl md:text-4xl font-light mb-4 font-serif">Ready to Book?</h2>
        <p class="text-lg text-background/80 mb-8 font-sans">Contact us to reserve your spot or customize your safari experience.</p>
        <Button size="lg" class="bg-primary text-foreground rounded-full px-10 py-4 font-medium shadow hover:bg-primary/90 transition">Book This Package</Button>
      </div>
    </section>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-background text-foreground">
    <h1 class="text-3xl font-light">Package not found.</h1>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { packages } from '@/data/packages'

const route = useRoute()
const pkg = packages[route.params.id]
</script>
