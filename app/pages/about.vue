<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- About Hero Section (variant 2 style) -->
    <section class="relative min-h-[60vh] flex items-center justify-center bg-foreground text-background overflow-hidden pb-16 pt-8">
      <div class="absolute inset-0">
        <Glow variant="center" class="opacity-30" />
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1 class="text-5xl md:text-6xl font-light leading-tight font-serif">
          About <span class="text-primary">Nyota Safari</span>
        </h1>
        <p class="text-lg md:text-xl text-background/80 leading-relaxed max-w-2xl mx-auto font-sans">
          Our mission is to craft unforgettable journeys through Africa's wild heart, blending luxury, adventure, and local expertise.
        </p>
      </div>
    </section>

    <!-- Reviews Section (variant 1 style) -->
    <section class="py-24 bg-background">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-light mb-6 text-foreground font-serif">
            What Our Guests Say
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="review in reviews" :key="review.id" class="p-6 flex flex-col items-center border-primary/20 bg-background shadow">
            <CardHeader class="flex flex-col items-center p-0 mb-2">
              <User class="w-16 h-16 rounded-full object-cover mb-4 text-primary" />
              <CardTitle class="text-lg font-semibold text-primary mb-2 font-serif text-center">{{ review.name }}</CardTitle>
              <CardDescription class="text-foreground/70 text-sm text-center font-sans">{{ review.username }}</CardDescription>
              <div class="flex gap-1 mt-2">
                <Star v-for="n in review.rating" :key="n" class="w-4 h-4 text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <p class="text-foreground/80 text-base text-center font-sans italic">“{{ review.quote }}”</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { User, Star } from 'lucide-vue-next'

const reviews = [
  {
    id: 1,
    name: 'Amina K.',
    username: '@amina_k',
    quote: 'Nyota made my dream trip a reality. The team was attentive and the experience was unforgettable!',
    icon: User,
    rating: 5
  },
  {
    id: 2,
    name: 'David M.',
    username: '@davidm',
    quote: 'Professional, friendly, and truly unique packages. Highly recommended for any traveler.',
    icon: User,
    rating: 5
  },
  {
    id: 3,
    name: 'Sofia L.',
    username: '@sofia.l',
    quote: 'The destinations were stunning and the service exceeded my expectations. Will book again!',
    icon: User,
    rating: 4
  }
]
// About page logic will be added during migration
</script>
