<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed, watch } from 'vue'
import gsap from 'gsap'
import { useRoute } from '#imports'

const props = defineProps({
  currentCoords: {
    type: Object,
    required: true,
    default: () => ({ x: 500, y: 500 })
  },
  targetSlug: {
    type: String,
    required: false,
    default: ''
  },
  focusSlug: {
    type: String,
    required: false,
    default: ''
  },
  pulseSlug: {
    type: String,
    required: false,
    default: ''
  }
})

const route = useRoute()
const { nodes, findNode, navigateToNode } = useUniverse()

const svgRoot = ref<SVGSVGElement | null>(null)
const pathLine = ref<SVGPathElement | null>(null)
const hoveredNode = ref<any>(null)

const runAmbientFlicker = () => {
  if (!svgRoot.value) return
  const cores = svgRoot.value.querySelectorAll<SVGCircleElement>('.ember-core')

  cores.forEach((core, index) => {
    gsap.to(core, {
      opacity: gsap.utils.random(0.62, 0.98),
      duration: gsap.utils.random(1.8, 3.2),
      repeat: -1,
      yoyo: true,
      delay: index * 0.07,
      ease: 'sine.inOut'
    })
  })
}

// 1. Dynamic Constellation Path Calculation based on the global Star Chart
const pathD = computed(() => {
  const target = findNode(props.targetSlug)
  if (!target) return ''
  
  // Calculate a mid-point for the arc to give it that "Celestial" curve
  const cx = (props.currentCoords.x + target.x) / 2
  const cy = (props.currentCoords.y + target.y) / 2 - 100 
  
  return `M ${props.currentCoords.x} ${props.currentCoords.y} Q ${cx} ${cy} ${target.x} ${target.y}`
})

// 2. GSAP Animation for the Path
const drawConstellation = () => {
  if (!pathLine.value) return
  const length = pathLine.value.getTotalLength()
  
  gsap.fromTo(pathLine.value, 
    { strokeDasharray: length, strokeDashoffset: length },
    { strokeDashoffset: 0, duration: 2.5, ease: "expo.out", delay: 0.5 }
  )
}

const pulseStar = (slug: string) => {
  if (!slug || !svgRoot.value) return

  const pulseTarget = svgRoot.value.querySelector<SVGCircleElement>(`[data-pulse-slug="${slug}"]`)
  if (!pulseTarget) return

  gsap.killTweensOf(pulseTarget)
  gsap.fromTo(
    pulseTarget,
    { attr: { r: 8 }, opacity: 0.2 },
    { attr: { r: 18 }, opacity: 0.9, duration: 0.42, yoyo: true, repeat: 1, ease: 'power1.inOut' }
  )
}

const handleAction = (node: any) => {
  if (node.isHorizon) {
    // Logic for "Waitlist" or teaser can be added here
    return
  }
  navigateToNode(node.slug)
}

onMounted(() => {
  nextTick(runAmbientFlicker)
  if (props.targetSlug) {
    nextTick(drawConstellation)
  }
})

onBeforeUnmount(() => {
  if (!svgRoot.value) return
  const cores = svgRoot.value.querySelectorAll<SVGCircleElement>('.ember-core')
  gsap.killTweensOf(cores)
})

watch(() => props.targetSlug, () => {
  nextTick(drawConstellation)
})

watch(() => props.pulseSlug, (slug) => {
  if (!slug) return
  nextTick(() => pulseStar(slug))
})
</script>

<template>
  <div class="relative w-full h-full bg-background/54 backdrop-blur-sm rounded-lg border border-border/10 overflow-hidden">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_64%_70%,rgba(197,170,94,0.12)_0%,transparent_30%),radial-gradient(circle_at_24%_24%,rgba(247,240,235,0.04)_0%,transparent_35%)]" />
    
    <Transition name="fade">
      <div v-if="hoveredNode" class="absolute top-6 left-6 z-10 pointer-events-none">
        <p class="font-serif text-xl text-foreground italic">{{ hoveredNode.name }}</p>
        <p class="text-primary tracking-monograph uppercase text-[9px] mt-1">{{ hoveredNode.sub }}</p>
      </div>
    </Transition>

    <svg ref="svgRoot" viewBox="0 0 1000 1000" class="w-full h-full overflow-visible p-12">
      <defs>
        <filter id="celestialGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="horizonDust" x="-50%" y="-50%" width="200%" height="200%">
          <feColorMatrix
            type="matrix"
            values="0.35 0 0 0 0 0 0.35 0 0 0 0 0 0.35 0 0 0 0 0 1 0"
          />
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
      </defs>
      
      <path 
        v-if="pathD" 
        ref="pathLine" 
        :d="pathD" 
        stroke="var(--primary)" 
        stroke-width="1.5"
        fill="none" 
        class="opacity-30" 
        stroke-dasharray="4 4"
      />

      <g 
        v-for="node in nodes" 
        :key="node.slug" 
        @mouseenter="hoveredNode = node" 
        @mouseleave="hoveredNode = null" 
        @click="handleAction(node)"
        class="cursor-pointer group"
      >
        <circle :cx="node.x" :cy="node.y" r="25" fill="transparent" />
        
        <circle 
          :cx="node.x" :cy="node.y" 
          r="8" 
          fill="none" 
          stroke="var(--primary)" 
          stroke-width="0.5"
          :data-pulse-slug="node.slug"
          class="transition-all duration-700 opacity-0 group-hover:opacity-40 group-hover:r-12"
        />

        <circle 
          :cx="node.x" :cy="node.y" 
          :r="node.slug === route.params.slug || node.slug === focusSlug ? 6 : 3" 
          :fill="node.isHorizon ? 'var(--muted)' : 'var(--primary)'"
          :filter="node.isHorizon ? 'url(#horizonDust)' : node.slug === route.params.slug || node.slug === focusSlug ? 'url(#celestialGlow)' : ''"
          class="ember-core transition-all duration-500 group-hover:scale-150"
          :class="[
            { 'opacity-40': node.isHorizon },
            node.slug === route.params.slug || node.slug === focusSlug ? 'animate-pulse' : ''
          ]"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { 
  transition: opacity 0.4s ease; 
}
.fade-enter-from, .fade-leave-to { 
  opacity: 0; 
}

@keyframes starPulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.6; }
}

.animate-pulse {
  animation: starPulse 3s infinite ease-in-out;
}
</style>