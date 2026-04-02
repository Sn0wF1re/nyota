# Nyota Safari 2026: Master System Architecture (PRD)

## 1. Core Philosophy
- **Identity:** High-end Travel Sanctuary & Discovery Front-end.
- **Persona:** Editor-in-Chief of an elite architectural monograph.
- **Performance:** Near-instant (LCP < 1.0s), fluid animations, and data-integrity.

## 2. Visual System (Tailwind v4)
- **Theme Variables:** - `--color-gold: #C5A059` (Accents, Navigation Paths)
  - `--color-midnight: #000000` (Primary Background)
  - `--color-bone: #F9F9F9` (Primary Typography)
- **Typography:** Serif headlines (*Playfair Display*) paired with high-tracking Sans-serif body (*Inter*).

## 3. The "Celestial Map" Logic
- **Component:** `CelestialMap.vue` (SVG Canvas 0-1000 relative grid).
- **Navigation:** GSAP-animated "Constellation" lines drawn between `currentStory.mapCoords` and `pairsWellWith.mapCoords`.
- **Horizon State:** Destinations with `isHorizon: true` use `grayscale(100%)` and `opacity: 0.4` to signify upcoming expansion (Tanzania, Uganda, Botswana).

## 4. The Discovery Engine (The Handshake)
- **Flow:** 4-Stage Pinia-powered form (Intent -> Geography -> Logistics -> Contact).
- **Integration:** Plugs into the existing Nairobi HQ/Global Grab logistics backend.
- **Trigger:** Submission calls `/server/api/briefing.ts` to generate the Digital Lookbook.

## 5. Content Schema
All stories located in `/content/stories/*.json` must strictly adhere to the `NyotaStory` interface, utilizing the "Sensory Chapter" (I, II, III) narrative structure.