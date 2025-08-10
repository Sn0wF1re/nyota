<template>
  <div class="min-h-screen bg-background text-foreground pt-16">
    <!-- Hero Section -->
    <section class="relative min-h-[40vh] flex items-center justify-center bg-foreground text-background overflow-hidden pb-16 pt-8">
      <div class="absolute inset-0">
        <Glow variant="center" class="opacity-30" />
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
        <h1 class="text-4xl md:text-6xl font-light mb-6 font-serif">
          Plan Your Journey
        </h1>
        <p class="text-background/70 text-lg max-w-2xl mx-auto">
          Ready to embark on your African adventure? Get in touch with our safari experts to start planning your unforgettable experience.
        </p>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div>
            <h2 class="text-3xl font-light text-foreground mb-8 font-serif">
              Send us a Message
            </h2>
            <Form class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <FormField name="firstName" v-slot="{ field }">
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input v-bind="field" placeholder="Your first name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField name="lastName" v-slot="{ field }">
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input v-bind="field" placeholder="Your last name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <FormField name="email" v-slot="{ field }">
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input v-bind="field" type="email" placeholder="your.email@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField name="phone" v-slot="{ field }">
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input v-bind="field" type="tel" placeholder="+1 (555) 123-4567" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField name="message" v-slot="{ field }">
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea v-bind="field" placeholder="Tell us about your dream safari experience..." class="min-h-[120px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <Button type="submit" class="w-full mt-4 bg-primary text-background rounded-full py-4 text-lg">
                Send Message
              </Button>
            </Form>
          </div>

          <!-- Contact Info & Social -->
          <div class="space-y-8">
            <div>
              <h2 class="text-3xl font-light text-foreground mb-8 font-serif">
                Get in Touch
              </h2>
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail class="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 class="font-medium text-foreground mb-1">Email</h3>
                    <p class="text-foreground/70">info@nyotasafari.com</p>
                    <p class="text-foreground/70">bookings@nyotasafari.com</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone class="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 class="font-medium text-foreground mb-1">Phone</h3>
                    <p class="text-foreground/70">+254 (0) 700 123 456</p>
                    <p class="text-foreground/70">+1 (555) 987-6543</p>
                  </div>
                </div>
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin class="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 class="font-medium text-foreground mb-1">Office</h3>
                    <p class="text-foreground/70">Nairobi, Kenya</p>
                    <p class="text-foreground/70">East Africa</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="font-medium text-foreground mb-4">Follow Us</h3>
              <div class="flex space-x-4">
                <Button variant="outline" size="sm" class="border-primary text-primary hover:bg-primary hover:text-background rounded-full">
                  <Facebook class="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" class="border-primary text-primary hover:bg-primary hover:text-background rounded-full">
                  <Instagram class="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" class="border-primary text-primary hover:bg-primary hover:text-background rounded-full">
                  <Twitter class="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div class="aspect-[4/3] bg-foreground/10 rounded-lg flex items-center justify-center">
              <div class="text-center space-y-2">
                <MapPin class="w-12 h-12 text-primary mx-auto" />
                <p class="text-foreground/70">Interactive Map</p>
                <p class="text-foreground/40 text-sm">Kenya & East Africa Focus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-vue-next'
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})
</script>
