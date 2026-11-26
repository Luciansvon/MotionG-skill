# Module: Living UI Physics — Elastic Bounce, Kinetic Type & Tactile UI

Camera motion alone is not enough. During the `60%–83%` calm reading holds, **every visible layer must breathe with staggered life**, primary typography must launch cinematically rather than fade in like flat slides, and UI controls must react physically instead of snapping in 1 frame.

---

## 1. Two-Layer + Anti-Timid Bounce Philosophy

1. **Layer A — Camera Guides the Eye:** Macro zooms into dropdowns/sidebars, curved pointer sweeps (`evalCursorPos`), pull-backs to show context, and crisp `11x–118x` contrast cuts.
2. **Layer B — Every Element Alive & Calibrated Bounce:** Driven strictly by deterministic Remotion helpers in [motion_primitives.ts](../../templates/motion_primitives.ts) (zero CSS transitions, zero `Math.random()`).

### Anti-Timid Bounce Bug Warning
Never crush an elastic curve inside a narrow interpolation like `lerp(0.86, 1, elasticPop(...))` — flattening `1.0 -> 1.20` down to `0.98 -> 1.028` across `~0.03s` destroys bounce visibility on both 60 FPS and 30 FPS renders!
- Always apply `springBounce(frame, trigger, dur, overshootAmount)` or `elasticPop(...)` directly to scale/position so the overshoot (`12%–22%`) and secondary rebound read unmistakably to the human eye.

---

## 2. Visible Living Idle Breathing (Zero Frozen Screenshots)

Keep calm holds subtly alive so still segments never resemble static screenshots:
- **Staggered Ambient Float (`ambientBreath`):** Default `±2.2%` scale, `8–12px` vertical drift, and `±1.2deg` micro-tilt over `~110` frames (`1.8s` cycle). Always pass **distinct `phaseOffset` values** (e.g., `0`, `1.4`, `2.7`) to neighboring elements so they float organically instead of moving in lockstep.
- **Reactive Edge & Aura Glow (`pulseGlow`):**
  - When a dragged image hovers near a prompt input (`hoverProximity`), brighten and widen the dropzone rim (`0.35 -> 0.95` alpha) before impact.
  - Pulse active voice orbs, dark ember arcs, or primary focal rims smoothly without harsh neon strobing.
- **Live Micro-Progress:** Ticking counters, rotating gradient halos, or flowing studio grids during character walks.

---

## 3. Kinetic Typography Laws — Zero Flat PowerPoint Fades

**Hard Rule:** Never reveal primary headlines, key phrases, or closing lockups using a plain whole-block `opacity 0->1` + small `translateY` fade.

- **Word-by-Word Masked Baseline Launch (`maskedWordRise`):** Wrap each word in an `overflow: hidden` inline-block box and stagger words (`4–6` frames apart). Each word shoots up with launch tilt (`~4.5deg`), stretches vertically mid-flight, overshoots baseline cleanly, and squashes gently into position.
- **Kinetic Exit (`kineticExit`):** Departing headings dip briefly (20% anticipation) before sweeping smoothly off stage.
- **Accent Keyword Choreography (`shimmerSweep` / `underlineDraw`):** Highlight at most 1 focal word per beat with a crisp self-drawing underline or subtle light shimmer sweep (strictly respecting `antislop` glow/color caps).
- **Live Numeric Proofs (`rollingNumber`):** Genuine counts, percentages, and completion progress (`10/10`, `89%`, `7.152`, `0% -> 100%`) must roll upward via `rollingNumber` and pop (`settleScale`) on lock — never pop in dead static strings.

---

## 4. Tactile "Wow" UI Micro-Interactions (Zero 1-Frame Teleports)

**Zero Teleport Law:** Never swap an active pill highlight with a 1-frame boolean color flip (`isActive ? blue : transparent`), and never spawn a dropped image slot instantaneously (`width: dropped ? 132 : 0`).

1. **Physical Pointer + Click Ripples:**
   - Move smoothly along curved arcs (`evalCursorPos`), pinch the arrow (`cursorPressState`) on grabs and clicks, and emit an expanding sonar ring (`clickRipple`) at the exact tap coordinate.
2. **Magnetic Hover & Elastic Drop Chain:**
   - Approaching cursor triggers `hoverProximity` glow/lift on target button or dropzone.
   - Dropping a photo opens its thumbnail slot with `slotExpandSpring` (pushing `"Buat 3D"` text aside smoothly with overshoot), compressing the bar (`squashStretch`) + firing `cameraRecoil`.
3. **Liquid Segmented / Clip Controls:**
   - Slide active highlights smoothly with velocity-based horizontal stretch (`slidingPillPose`: stretches wider mid-flight, squashes on arrival).
   - Rock the entire capsule in 3D like a real seesaw (`tactileTilt`) toward left (`-1`), center (`0`), or right (`+1`) on click.
4. **Satisfying Completion Lockup:**
   - Perimeter progress stroke draws around capsule -> `rollingNumber` counts `0% -> 100%` -> crisp completion checkmark springs in (`springBounce`) + restrained geometric burst (`burstParticlePose`, `6–8` ticks in one accent hue — zero confetti clutter).

---

## 5. Extended Micro-Interaction & Brand-Play Patterns (TikTok 6-Ref Studies)

Use these deterministic helpers from [motion_primitives.ts](../../templates/motion_primitives.ts) when a scene calls for collaborative workflows, variant showcases, or brand-led UI morphs:

1. **Icon-to-Input Morph (`iconToBarMorph` — Spotify UI style):**
   - Stretch an app icon elastically in-place into the live search/prompt bar (`w`, `h`, `radius`, `stretchX/Y`, crossfading `iconOpacity -> inputOpacity`) instead of cutting to an empty screen first.
2. **Mascot Letter-Hop Lockup (`mascotLetterHop` — Grok Bots style):**
   - Bounce a compact eyed mascot/brand dot (`squashStretch` + parabolic arc) along the baseline to reveal each character sequentially (`revealedLetters`), then land cleanly as the final period (`isSettledAsPeriod`).
3. **Mood-Shifting Variant Card (`moodCardBlend` — Apple Store style):**
   - When clicking a product color swatch, smoothly interpolate the entire card's surface palette (`fromHex -> toHex`) while rotating/scaling the hero product (`productRotDeg`, `productScale`) inside the same container.
4. **Multi-Cursor Named Collaboration (`evalMultiCursors` — Supabase style):**
   - Show live multi-user or multi-agent teamwork without prose by driving `3–4` distinct color-coded named pointers (`Alan`, `Jonny`, `Copple`, `Terry`) simultaneously across separate UI zones, pairing curved `evalCursorPos` arcs with `cursorPressState`.
5. **Visual Inspector Bounding Box (`inspectorBoxPose` — Lovable style):**
   - On editor/builder beats, snap a crisp `1–2px` bounding box + floating component tag pill (e.g., `Header`) onto the hovered target element so live visual editing reads instantly.
6. **Symmetric Split-Insert Centering Law (Zero Off-Center Prompts):**
   - When splitting a sentence around an inserted prompt bar (e.g., `"Industri"` + `[Prompt]` + `"Menunggu."`), **never** apply asymmetric horizontal camera pan (`cam.x != 0`) or equal `translateX(±halfGap)` offsets to unequal-width flex words (which creates lopsided gaps). Lock `cam.x = 0`, center the prompt bar at `left: 50%; top: 50%; transform: translate(-50%, -50%)`, and anchor the left/right words symmetrically from center (`right: calc(50% + halfGap)` right-aligned; `left: calc(50% + halfGap)` left-aligned, where `halfGap = pillWidth / 2 + equalMargin`).
7. **Collision-Bounce & Auto-Settle Physics (Metric Pairing):**
   - Instead of leaving a lone stat ring sitting idle for 3 seconds (e.g., `70% Praktik`), launch its complementary partner (e.g., `30% Teori`) from off-screen to physically collide at the rim: fire `squashStretch` + rotational wobble + `clickRipple` shockwave + `burstParticlePose` sparks + `cameraRecoil` + impact thump SFX, then rebound both via `springBounce` into balanced side-by-side resting positions with opposing `ambientBreath` phases.

---

## 6. Calibration Table by Gate 3 `MOTION` Dial (`1–3`)

| Gate 3 Dial | Spring Overshoot | Squash-Stretch | Idle Float (`ambientBreath`) | Recommended Text & UI Set |
|---|---|---|---|---|
| **`MOTION 1` (Restrained Editorial)** | `0.08–0.10` | `0.08` | `ampY: 6px`, `ampScale: 0.014` | Gentle `maskedWordRise`, `underlineDraw`, clean `slidingPillPose`. |
| **`MOTION 2` (Crisp Product Demo — Default)** | `0.14–0.16` | `0.16` | `ampY: 10px`, `ampScale: 0.022` | Full `maskedWordRise`, `rollingNumber`, `slidingPillPose` + `tactileTilt` + `clickRipple` + `slotExpandSpring`. |
| **`MOTION 3` (Playful Elastic Pop)** | `0.20–0.24` | `0.22` | `ampY: 12px`, `ampScale: 0.028` | Punchy `cardFanPose`, `badgeBounce`, `shimmerSweep`, `burstParticlePose`, bold `squashStretch`. |
