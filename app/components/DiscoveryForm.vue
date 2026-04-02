<script setup lang="ts">
const { nodes } = useUniverse()
const activeDestinations = nodes.filter(n => !n.isHorizon)

const selectedDestinations = ref<string[]>([])
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <label v-for="dest in activeDestinations" :key="dest.slug" class="flex items-center gap-3 cursor-pointer group">
      <input type="checkbox" v-model="selectedDestinations" :value="dest.slug" class="hidden" />
      <div class="w-4 h-4 border border-primary group-hover:bg-primary/20 transition-all" :class="{'bg-primary': selectedDestinations.includes(dest.slug)}"></div>
      <span class="font-serif text-sm italic">{{ dest.name }}</span>
    </label>
  </div>
</template>