<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center bg-foreground text-background overflow-hidden pb-16 pt-8">
      <!-- Video Background -->
      <video
        class="absolute inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dx2quobqu/video/upload/v1754663776/nyota_bg_video_trim.mp4"
        autoplay
        loop
        muted
        playsinline
      ></video>
      <!-- Tint Overlay -->
      <div class="absolute inset-0 bg-foreground/70 z-0"></div>
      <!-- Glow -->
      <div class="absolute inset-0">
        <Glow variant="center" class="opacity-30" />
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <div class="text-primary text-sm font-medium tracking-widest uppercase pt-16">
            Discover the Heart of Africa
          </div>
          <h1 class="text-5xl md:text-6xl font-light leading-tight font-serif">
            Adventure Awaits. <span class="text-primary">Experience</span> Nyota Safari Luxury.
          </h1>
          <p class="text-lg md:text-xl text-background/80 leading-relaxed max-w-2xl font-sans">
            Embark on a journey through Kenya's iconic landscapes with curated safari experiences crafted for the discerning traveler. From the majestic Maasai Mara to the breathtaking Great Rift Valley, every detail is designed to captivate your soul.
          </p>
          <div>
            <Button variant="outline" class="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-foreground rounded-full px-8 py-6 text-lg font-medium transition-all duration-300">
              Book Now
            </Button>
          </div>
        </div>
        <!-- <div class="relative">
          <Mockup type="responsive" class="w-full aspect-video bg-primary/10 border-primary/20">
            <div class="w-full h-full bg-gradient-to-br from-primary/20 to-foreground/20 flex items-center justify-center">
              <NuxtImg src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop" alt="Kenya Safari" class="rounded-md object-cover w-full h-64" />
            </div>
          </Mockup>
        </div> -->
      </div>
      <div class="absolute top-4 right-4 z-20">
        <Button variant="outline" class="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-foreground rounded-full px-6 py-3 font-medium">
          Book Now
        </Button>
      </div>
    </section>

    <!-- Destinations Preview -->
    <section class="py-24 bg-background">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-light mb-6 text-foreground font-serif">
            Our <span class="text-primary">Destinations</span>
          </h2>
          <p class="text-lg text-foreground/70 max-w-3xl mx-auto font-sans">
            Discover safari tours Kenya, African safari experiences, and luxury safari Kenya adventures across East Africa's most spectacular wildlife destinations.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card
            v-for="([key, country], idx) in Object.entries(countries)"
            :key="country.name"
            class="group cursor-pointer overflow-hidden border-primary/20 hover:border-primary transition-all"
          >
            <NuxtLink :to="`/destinations/${key}`" class="block w-full h-full">
              <CardHeader class="p-0">
                <NuxtImg :src="country.image" :alt="country.name" class="w-full h-40 object-cover rounded-t-md" />
              </CardHeader>
              <CardContent class="p-4 flex flex-col gap-3 items-center">
                <CardTitle class="text-lg font-semibold text-foreground mb-2 font-serif">{{ country.name }}</CardTitle>
                <CardDescription class="text-foreground/70 text-sm font-sans text-center">{{ country.description }}</CardDescription>
                <div class="w-full flex justify-center">
                  <template v-if="key === 'kenya'">
                    <Button size="sm" class="mt-2 bg-primary text-foreground rounded-full px-6 py-2 font-medium shadow hover:bg-primary/90 transition">Explore Kenya</Button>
                  </template>
                  <template v-else>
                    <span class="inline-block mt-2 px-4 py-2 rounded-full bg-primary/10 border border-primary text-primary text-xs font-semibold shadow">Coming Soon</span>
                  </template>
                </div>
              </CardContent>
            </NuxtLink>
          </Card>
        </div>
      </div>
    </section>

    <!-- Why Travel with Nyota -->
    <section class="py-24 bg-foreground text-background">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-light mb-6 font-serif">
            Why Travel with Nyota
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card v-for="item in whyChooseUs" :key="item.title" class="flex flex-col items-center p-6 border-primary/20 bg-foreground">
            <CardHeader class="flex flex-col items-center p-0 mb-2">
              <component :is="item.icon" class="w-8 h-8 text-primary mb-4" />
              <CardTitle class="text-lg font-semibold text-primary mb-2 font-serif text-center">{{ item.title }}</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <CardDescription class="text-background/80 text-sm text-center font-sans">{{ item.description }}</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Floating Contact -->
    <div class="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      <Button size="sm" class="bg-primary hover:bg-primary/90 text-foreground rounded-full shadow-lg">
        <LucideMail class="w-4 h-4 mr-2" />
        Email
      </Button>
      <Button size="sm" class="bg-primary hover:bg-primary/90 text-foreground rounded-full shadow-lg">
        <LucidePhone class="w-4 h-4 mr-2" />
        Contact
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LucidePhone, LucideMail, LucideAward, LucideUsers, LucideShield, LucideCamera } from 'lucide-vue-next'
import { countries } from '@/data/countries'

const whyChooseUs = [
  {
    icon: LucideAward,
    title: 'Luxury Lodges',
    description: 'Premium accommodations in pristine locations'
  },
  {
    icon: LucideUsers,
    title: 'Expert Guides',
    description: 'Local expertise and wildlife knowledge'
  },
  {
    icon: LucideShield,
    title: 'Tailored Experiences',
    description: 'Customized itineraries for your preferences'
  },
  {
    icon: LucideCamera,
    title: 'Wildlife Encounters',
    description: 'Unforgettable moments with African wildlife'
  }
]
</script>
