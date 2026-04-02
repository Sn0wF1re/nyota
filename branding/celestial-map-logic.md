# Celestial Map: Visual Routing Logic

## 1. SVG Coordinate System
- **ViewBox:** `0 0 1000 1000` (Relative scaling for responsive screens).
- **Nodes:** Every `NyotaStory` has a `{x, y}` coordinate. 
- **Drawing:** Use a Quadratic Bezier curve for paths to avoid "stiff" straight lines.

## 2. GSAP Motion Logic
```javascript
// Example Path Calculation for the Coding AI
const getCurvedPath = (start, end) => {
  const cx = (start.x + end.x) / 2;
  const cy = (start.y + end.y) / 2 - 50; // Offset for the "Constellation" curve
  return `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`;
};
```

## 3. Interaction States
- Hover: The targeted "Star" (Node) pulses and reveals the hero.subHeadline.

- Active: The pairsWellWith path illuminates in #C5A059 with a stroke-dashoffset animation.

- Horizon Click: Triggers a "Join the Expedition Waitlist" modal instead of navigating to a story page.