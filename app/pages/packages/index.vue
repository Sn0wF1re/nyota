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
          <NuxtLink
            v-for="pkg in Object.values(packages)"
            :key="pkg.name"
            class="block w-full h-full"
          >
            <Card class="group overflow-hidden border-primary/20 hover:border-primary transition-all">
              <CardHeader class="p-0 flex flex-col items-center">
                <NuxtImg :src="pkg.image" :alt="pkg.name" class="w-full h-40 object-cover rounded-t-md" />
              </CardHeader>
              <CardContent class="p-4 flex flex-col gap-3 items-center">
                <CardTitle class="text-lg font-semibold text-foreground mb-2 font-serif text-center">{{ pkg.name }}</CardTitle>
                <CardDescription class="text-foreground/70 text-sm font-sans text-center">{{ pkg.description }}</CardDescription>
                <div class="w-full flex flex-wrap justify-center gap-2 mt-2 min-h-[40px]">
                  <span v-for="highlight in pkg.highlights" :key="highlight" class="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary text-primary text-xs font-semibold shadow whitespace-nowrap">{{ highlight }}</span>
                </div>
                <NuxtLink
                  :to="`/packages/${pkg.name.toLowerCase().replace(/\s+/g, '-')}`"
                  class="w-full flex justify-center"
                >
                  <Button
                    size="sm"
                    class="mt-4 cursor-pointer bg-primary text-foreground rounded-full px-6 py-2 font-medium shadow hover:bg-primary/90 transition"
                  >
                    View Details
                  </Button>
                </NuxtLink>
              </CardContent>
            </Card>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { packages } from '@/data/packages'
</script>
