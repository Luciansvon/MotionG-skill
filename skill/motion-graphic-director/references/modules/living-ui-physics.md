# Module: Living UI Physics — Idle Breathing & Elastic Bounce

Camera motion alone is not enough. During the `60%–83%` calm reading holds, the UI itself must stay subtly alive (**Breathing**), and every interaction must respond physically (**Elastic Bounce & Continuity Morph**) instead of feeling like static PowerPoint slides.

---

## 1. Two-Layer Motion Philosophy

1. **Layer A — Camera Guides the Eye:** Macro zooms into dropdowns/sidebars, curved pointer sweeps, pull-backs to show context, and crisp `11x–118x` contrast cuts.
2. **Layer B — Living UI Keeps Components Alive:** Driven strictly by Remotion frame helpers in [motion_primitives.ts](../../templates/motion_primitives.ts) (zero CSS transitions, zero `Math.random()`).

---

## 2. Idle Breathing UI (Alive During Calm Holds)

Apply restrained continuous life so calm holds never freeze like dead screenshots:
- **Gentle Ambient Float (`ambientBreath`):** `±1%–1.5%` scale breathing and `±4–6px` vertical drift over `100–140` frames (`~1.7–2.3s` cycle) for hero cards, widget clusters, and floating depth layers.
- **Reactive Edge & Aura Glow (`pulseGlow`):**
  - When a dragged image hovers over a prompt input, brighten the dropzone rim with a smooth glowing aura (`0.35 -> 0.95` alpha) before drop.
  - Pulse active voice orbs, dark ember light arcs, or status dots smoothly without harsh neon strobing.
- **Live Micro-Progress:** Ticking countdown rings (`19:24 -> 19:23`), rotating gradient halos, or subtle background card drift during reading holds.

---

## 3. Elastic Bounce & Continuity Morph (Tactile Reactions)

Replace stiff linear fades with physical spring mechanics:
- **Spring Pop-In & Squash-Stretch (`elasticPop` / `squashStretch`):** Cards, prompt bars, and floating icons overshoot briefly (`1.04–1.08x`) before settling cleanly, or compress slightly (`scaleX 1.12, scaleY 0.88`) on impact.
- **Bouncy Notification Badges (`badgeBounce`):** App icons landing on a home screen pop their unread counter badge with a crisp vertical hop and micro-tilt rebound.
- **Stateful Capsule & Card Morph (`morphBox`):**
  - Expand a compact circular/square icon (e.g., heart button or timer badge) smoothly into a full wide status card, then collapse cleanly back into the icon.
  - Morph thinking status pills (`Analyzing -> Creating Image`) directly into the bounding box of the generated result.
- **Playing-Card Fan Spread (`cardFanPose`):** Fan `3–5` rounded cards/widgets outward from a single stacked anchor (`rotZ` spread `±18deg`, crisp `zIndex` ordering) instead of popping flat grids abruptly.
- **Split-Sentence Prompt Insert (`splitInsertGap`):** Part a headline cleanly left and right (`Imagine [...] anything`) while a glowing prompt bar springs into the newly opened gap.
- **Drag-and-Drop Choreography:**
  1. Curved pointer (`evalCursorPos`) picks up thumbnail with slight tilt.
  2. Target input rim widens and lights up (`pulseGlow`).
  3. Photo drops inside, triggering `squashStretch` + subtle camera recoil (`cameraRecoil`).
