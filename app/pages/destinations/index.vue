<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Destinations Hero -->
    <section class="relative min-h-[60vh] flex items-center justify-center bg-foreground text-background overflow-hidden pb-16 pt-8">
      <div class="absolute inset-0">
        <Glow variant="center" class="opacity-30" />
      </div>
      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1 class="text-5xl md:text-6xl font-light leading-tight font-serif">
          Our <span class="text-primary">Destinations</span>
        </h1>
        <p class="text-lg md:text-xl text-background/80 leading-relaxed max-w-2xl mx-auto font-sans">
          Discover Kenya, Tanzania, Uganda, and Botswana with curated luxury safaris and unforgettable wildlife experiences.
        </p>
      </div>
    </section>

    <!-- Destinations Grid -->
    <section class="py-24 bg-background">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card v-for="country in destinations" :key="country.name" class="group cursor-pointer overflow-hidden border-primary/20 hover:border-primary transition-all">
            <CardHeader class="p-0">
              <NuxtImg :src="country.image" :alt="country.name" class="w-full h-48 object-cover rounded-t-md" />
            </CardHeader>
            <CardContent class="p-4 flex flex-col gap-3 items-center">
              <CardTitle class="text-lg font-semibold text-foreground mb-2 font-serif">{{ country.name }}</CardTitle>
              <CardDescription class="text-foreground/70 text-sm font-sans text-center">{{ country.description }}</CardDescription>
              <div class="w-full flex justify-center">
                <template v-if="country.name === 'Kenya'">
                  <Button size="sm" class="mt-2 bg-primary text-foreground rounded-full px-6 py-2 font-medium shadow hover:bg-primary/90 transition">Explore Kenya</Button>
                </template>
                <template v-else>
                  <span class="inline-block mt-2 px-4 py-2 rounded-full bg-primary/10 border border-primary text-primary text-xs font-semibold shadow">Coming Soon</span>
                </template>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

// Destinations data: can be extended for filtering, dynamic loading, etc.
const destinations = [
  {
    name: 'Kenya',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop',
    description: 'Experience the iconic Maasai Mara and witness the Great Migration',
    available: true
  },
  {
    name: 'Tanzania',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
    description: 'Discover the Serengeti and climb Mount Kilimanjaro',
    available: false
  },
  {
    name: 'Uganda',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop',
    description: 'Encounter mountain gorillas in their natural habitat',
    available: false
  },
  {
    name: 'Botswana',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=600&fit=crop',
    description: 'Explore the pristine Okavango Delta wilderness',
    available: false
  }
]

// Future logic: filtering, sorting, API integration, etc. can be added here
</script>
