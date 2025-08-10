<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Packages Hero -->
    <section class="relative min-h-[60vh] flex items-center justify-center bg-foreground text-background overflow-hidden pb-16 pt-8">
      <div class="absolute inset-0">
        <Glow variant="center" class="opacity-30" />
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1 class="text-5xl md:text-6xl font-light leading-tight font-serif">
          Safari <span class="text-primary">Packages</span>
        </h1>
        <p class="text-lg md:text-xl text-background/80 leading-relaxed max-w-2xl mx-auto font-sans">
          Choose from luxury, budget, family, and adventure safaris tailored for every traveler.
        </p>
      </div>
    </section>

    <!-- Packages Grid -->
    <section class="py-24 bg-background">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card v-for="pkg in packages" :key="pkg.name" class="group cursor-pointer overflow-hidden border-primary/20 hover:border-primary transition-all">
            <CardHeader class="p-0 flex flex-col items-center">
              <component :is="pkg.icon" class="w-8 h-8 text-primary mb-4" />
              <NuxtImg :src="pkg.image" :alt="pkg.name" class="w-full h-40 object-cover rounded-t-md" />
            </CardHeader>
            <CardContent class="p-4 flex flex-col gap-3 items-center">
              <CardTitle class="text-lg font-semibold text-foreground mb-2 font-serif text-center">{{ pkg.name }}</CardTitle>
              <CardDescription class="text-foreground/70 text-sm font-sans text-center">{{ pkg.description }}</CardDescription>
              <Button size="sm" class="mt-2 bg-primary text-foreground rounded-full px-6 py-2 font-medium shadow hover:bg-primary/90 transition">View Details</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { LucideAward, LucideHeart, LucideUsers, LucideMountain } from 'lucide-vue-next'

// Packages data: placeholder logic referencing both variants
// Extend with more fields, filtering, or API integration as needed
const packages = [
  {
    name: 'Luxury Safari',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
    description: 'Premium accommodations and exclusive game drives',
    icon: LucideAward,
    price: 'From $3,500',
    available: true,
    features: ['Private guide', 'Luxury lodge', 'All meals', 'Game drives'],
    variant: 'gold',
  },
  {
    name: 'Budget Safari',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop',
    description: 'Affordable adventures without compromising on experience',
    icon: LucideHeart,
    price: 'From $1,200',
    available: true,
    features: ['Group tours', 'Comfortable camps', 'Meals included'],
    variant: 'silver',
  },
  {
    name: 'Family Safari',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=600&fit=crop',
    description: 'Kid-friendly activities and family accommodations',
    icon: LucideUsers,
    price: 'From $2,000',
    available: false,
    features: ['Family suites', 'Child activities', 'Flexible schedule'],
    variant: 'bronze',
  },
  {
    name: 'Adventure Safari',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
    description: 'Thrilling experiences for the adventurous spirit',
    icon: LucideMountain,
    price: 'From $2,500',
    available: false,
    features: ['Hiking', 'Wildlife tracking', 'Camping'],
    variant: 'adventure',
  }
]
</script>
