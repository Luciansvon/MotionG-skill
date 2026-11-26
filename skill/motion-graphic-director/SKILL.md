---
name: motion-graphic-director
description: >-
  Modular 8-gate director and production runbook for vertical 9:16 and
  landscape 16:9 multi-style motion graphic videos (mandatory scope Q&A,
  segmented visual-explain storyboards, Code -> Three.js -> optional PNG/WebP
  asset hierarchy, eye-guiding camera + breathing/bouncy Living UI, ASMR
  tactile audio, universal safe zones, and 60 FPS + <10 MB delivery). Use
  when designing, auditing, or producing kinetic product promos, UI demos, or
  diverse-style motion graphic videos.
---

# Motion Graphic Director (8-Gate Living-UI & Visual-Explain Runbook)

Use this skill to direct, audit, and produce vertical `9:16` and landscape `16:9` motion graphic promo videos. **Never skip Gate 1 Scope Q&A, Gate 2 Segmented Storyboard approval, or Gate 3 mockup approval**, and never default blindly to one visual template.

## Core Multi-Style & Visual-Explain Rules

- **Custom Reference First:** When the owner supplies images or videos as creative direction, ALWAYS load [06-custom-reference-adapter.md](./references/styles/06-custom-reference-adapter.md) + [reference-video-extractor.md](./references/modules/reference-video-extractor.md) and measure reference pacing/frames with [audit_pacing_and_audio.py](./scripts/audit_pacing_and_audio.py) (plus `rea-video` when installed).
- **10 Built-In Art Directions (`01–05`, `07–11`):** When no custom reference is given, choose or intentionally blend across acts (mix styles only when dramatic contrast strengthens the story).
- **Visual-Explain First (`2–6 words/beat`):** Show actions visually (drag-and-drop, dropdown pick, morphing pills, fan spreads) instead of text walls.
- **Two-Layer Motion:** Pair eye-guiding camera moves with **Living UI** (idle breathing during calm holds + elastic squash-stretch bounce/morph on reactions).
- **Strict Medium Hierarchy:** Build UI in **Code**, 3D devices in **`Three.js`**, and use **`PNG`/`WebP` ONLY when genuinely needed** for complex photographic/organic subjects.
- Communicate progress and design choices clearly in plain language matching the owner's preferred tongue without raw coding jargon.

---

## 8-Gate Production Pipeline

Follow these gates strictly in order.

### Gate 0: Audit Local Capabilities & Asset Tools First
Before suggesting paid SaaS tools or claiming a limitation:
1. Check `package.json` (`@remotion/three`, `@remotion/motion-blur`, `@remotion/google-fonts`, `three`), installed `ffmpeg`/`ffprobe`, headless Chrome, and local SFX/asset folders.
2. Check available image generation tools (`image-generator` or local media tools) and existing style specs (`DESIGN.md`).

### Gate 1: Mandatory Scope Q&A (NEVER SKIP)
Read [storyboard-segments.md](./references/modules/storyboard-segments.md) Section 1 and lock scope with the owner in 1 concise plain-language round (confirm stated items, ask only what is missing):
1. Product & single core takeaway.
2. Screen format & destination (`9:16`, `16:9`, or dual).
3. Runtime tier (`10–15s` micro, `18–25s` punchy, `30–45s` walkthrough).
4. Visual direction (custom reference vs Styles `01–05`, `07–11`).
5. Audio direction (non-VO + ASMR default vs `3–6` words/beat micro-VO; BGM choice).
6. Existing authentic brand logos, screenshots, or product photos.

### Gate 2: Segmented Storyboard & Asset Medium Manifest (Owner Approval Required)
1. Read [storyboard-segments.md](./references/modules/storyboard-segments.md) and [visual-assets-engine.md](./references/modules/visual-assets-engine.md).
2. Map the video across the **8 standard segments** (`Hook`, `Problem Agitation`, `Product Reveal`, `Feature Demo #1`, `Feature Demo #2`, `Tangible Proof`, `Message Lockup`, `Outro & CTA`), keeping copy within `2–6` words per beat. For each product action, name the visible result and the element the viewer follows from setup through proof. [UI editing recipes](./references/modules/ui-editing-recipes.md)
3. Declare the medium per element (**Tier 1 Code -> Tier 2 `Three.js` -> Tier 3 Optional `PNG`/`WebP` only if needed**; never flatten UI/buttons/3D hardware into lazy PNGs).
4. Present the **6-column storyboard table** and obtain explicit owner approval before Gate 3.

### Gate 3: Style Selection, Tier-3 Asset Prep & 3 Anti-Slop Mockups (Owner Approval Required)
1. Load the chosen style playbook(s) from `references/styles/` and read [ui-antislop-gate.md](./references/modules/ui-antislop-gate.md).
2. If Tier 3 `PNG`/`WebP` assets are approved in Gate 2, follow the 4-step sourcing fallback (Owner assets -> AI generate -> Royalty-free Unsplash/Pexels/Wikimedia/Pixabay without anti-bot bypass; Pinterest moodboard-only -> Honest request) and inspect every asset via `read_file`.
3. Lock the 1-line **Design Read**, **`ENERGY / RHYTHM / MOTION` (1–3)** dials, palette/surface dose caps (`R-29`, `R-31` 1-line rationales), and `Draft -> Audit -> Final` anti-slop copy in `DESIGN.md`.
4. Render **3 compositionally distinct static mockups** (`R-05`, zero card cages around 3D heroes `R-14`, zero dead UI controls `R-26`) at target aspect ratio (ephemeral `127.0.0.1` server + Chrome `--user-data-dir`), verify exact unrounded contrast via [check_contrast.py](./scripts/check_contrast.py) (`>= 4.5:1` normal text / `>= 3.0:1` large & UI boundaries), inspect all 3 PNGs via `read_file`, and **obtain explicit owner approval** before Remotion coding.

### Gate 4: Two-Layer Choreography — Eye-Guiding Camera, Kinetic Type & Living UI
1. Read [pacing-choreography.md](./references/modules/pacing-choreography.md), [camera-and-3d.md](./references/modules/camera-and-3d.md), and [living-ui-physics.md](./references/modules/living-ui-physics.md).
2. Reuse deterministic 60 FPS primitives in [motion_primitives.ts](./templates/motion_primitives.ts):
   - Maintain `55%–83%` calm readable holds (`1.8–2.2s` per key line) contrasted against crisp `0.35–0.85s` transitions (`11x–118x` burst contrast), while keeping **`near_static_pct < 28%`** via continuous subtle background/camera/idle life (zero `3–5s` frozen holds).
   - **Visible Bounce & Staggered Idle Life:** Drive entrances with full `springBounce` / `elasticPop` (`12%–22%` overshoot; never dilute via `lerp(0.86, 1, pop)`), drops and metric collision-bounce pairings (`70%` vs `30%`) with `squashStretch` + `cameraRecoil`, and calm holds with staggered `ambientBreath` / `pulseGlow`.
   - **Zero Flat Headline Fades:** Animate key copy word-by-word via `maskedWordRise` + `kineticExit`, accent keywords via `shimmerSweep` / `underlineDraw`, and real stats/progress via `rollingNumber`.
   - **Zero 1-Frame UI Teleports:** Pair curved pointer sweeps (`evalCursorPos`) with one press driver per click. Use `cursorPressState` + `clickRipple` or `cursorContactPose` for paired compression. Keep smooth `slotExpandSpring` drops, liquid `slidingPillPose` + `tactileTilt` tab clicks, `morphBox`, `iconToBarMorph`, `moodCardBlend`, `mascotLetterHop`, `evalMultiCursors`, `inspectorBoxPose`, `cardFanPose`, `splitInsertGap`, and restrained completion `burstParticlePose`.
   - For paired click compression or a two-scene slide with a masked cut, use `cursorContactPose` and `maskedSlidePose`. Set the contact and cut frames in the storyboard and use the [UI editing recipes](./references/modules/ui-editing-recipes.md) checks.
   - Use `2.35x–2.45x` macro zooms or `tetheredCameraFollow` pans with clamped backdrop parallax (`<= ±34px`) and optional `halftoneWaveCell` transitions, mount `<ThreeCanvas>` **OUTSIDE** `<CameraMotionBlur>`, never pass `frame` as a prop inside `<CameraMotionBlur>`, keep hero 3D phones around `57%–60%` height (`max_z < -0.5` for orbital rings).

### Gate 5: ASMR Tactile Sound Design & Audio Mastering
1. Read [sound-asmr-engine.md](./references/modules/sound-asmr-engine.md) and adapt [mix_asmr_template.py](./templates/mix_asmr_template.py).
2. Sync tactile ASMR cues (`Topre`/`Gateron` typing, soft glassy clicks, pentatonic drops, trimmed air whooshes, warm low-passed sub-thumps) to every bounce, drag-drop, and transition.
3. Carve `2` brief **Silent Drops (`230–240 ms`)** before major turns and verify stereo (`-ac 2`) mastering: `peak <= 0.92`, `crest_db >= 14.0`, `dyn_p95_p10_db >= 12.0`.

### Gate 6: Safe Zones, `9:16` Reflow, Copy Spelling & Visual Still Inspection
1. Read [export-safezones.md](./references/modules/export-safezones.md) and run Phases A–B in [pre-render-qc.md](./references/checklists/pre-render-qc.md).
2. For vertical `9:16`, keep critical text/pills inside **`Y = 245..1655px`** (`X = 72..1008px`), reflow horizontal splits into vertical/diagonal moves when prompt bars are wide, pull 3D geometry clear of captions, and fade floating HUDs before 3D lean-in zooms.
3. Render keyframe stills (`npx remotion still`), proofread **all copy character-by-character**, verify asset sharpness/proportions, pixel-lock 2D cursor taps to 3D CTA centers, and inspect every still via `read_file`.

### Gate 7: Dual-Output Rendering & 4-Block Delivery Gate Verification
1. Render **`60 FPS`** master using GPU acceleration (`--gl=angle --hardware-acceleration=if-possible --concurrency=8`; `--video-bitrate=12M --audio-bitrate=192k` for end-to-end GPU encoding, or `--crf=18 --audio-bitrate=192k` for software x264 quality).
2. When targeting mobile sharing/WhatsApp Status (`<= 90s` limit) or IG Story in either `9:16` or `16:9`, also encode **`< 10 MB`** `30 FPS` version via [export_wa_igstory_10mb.py](./scripts/export_wa_igstory_10mb.py) or `ffmpeg` (`aq-mode=3` dark-gradient protection, auto-fallback from `h264_nvenc` to `libx264`).
3. Verify output MP4(s) with [audit_pacing_and_audio.py](./scripts/audit_pacing_and_audio.py), inspect extracted stills, and complete the **4-Block Evidence-Backed Delivery Gate** ([ui-antislop-gate.md](./references/modules/ui-antislop-gate.md) & [pre-render-qc.md](./references/checklists/pre-render-qc.md)) before delivery.

---

## Module & Asset Directory

### Editing Style Playbooks (`references/styles/`)
| Style ID | Aesthetic & When to Pick | Playbook |
|---|---|---|
| **01 · Liquid Glass Ambient** | Translucent refractive crystal glass over dark cobalt-periwinkle velvet folds; ideal for AI tools, flagship SaaS, modern sleek promos. | [01-liquid-glass-ambient.md](./references/styles/01-liquid-glass-ambient.md) |
| **02 · Clean Editorial App** | Warm ivory/off-white ground, airy typography, ~80% calm breathing holds (Gojek-style); ideal for productivity, consumer apps, clarity-first explainers. | [02-clean-editorial-app.md](./references/styles/02-clean-editorial-app.md) |
| **03 · Kinetic Brand Pop** | Bold solid-color stage switches, punchy 3-beat text stamps, 3D tilted card wall (Pinterest-style); ideal for high-energy brand launches and feature walls. | [03-kinetic-brand-pop.md](./references/styles/03-kinetic-brand-pop.md) |
| **04 · Dark Studio Hardware** | Obsidian studio sweep, precision metallic/glass rim lighting, dominant 3D device hero (`57%–60%` height) & portal UI dive; ideal for hardware/mobile demos. | [04-dark-studio-hardware.md](./references/styles/04-dark-studio-hardware.md) |
| **05 · Bold Typography Story** | Expressive scale-contrasted statements, wipe-stamp reveals, rhythmic impact shakes & silent drops; ideal for manifesto hooks, copy-heavy stories, fast campaigns. | [05-bold-typography-story.md](./references/styles/05-bold-typography-story.md) |
| **06 · Custom Reference Adapter** | Mandatory workflow when the owner uploads screenshots, moodboards, or reference videos — extracts palette, pacing ratio, and camera language without cloning copy. | [06-custom-reference-adapter.md](./references/styles/06-custom-reference-adapter.md) |
| **07 · Bright Interactive UI Morph** | Daylight brand-mist canvas, pop-out cutout products over giant type, 3D tilt-to-flat catalog sweep, continuity card-to-tracker morph & perimeter border progress (Starbucks/Corpius.ae-style); works in 16:9 & 9:16. | [07-bright-interactive-ui-morph.md](./references/styles/07-bright-interactive-ui-morph.md) |
| **08 · Apple Minimal Elastic** | Crisp monochrome off-white/black flips, architectural grid lines, 1 vibrant accent/beat, elastic morphing capsules, split-sentence prompt inserts, bouncy icons & 5-card widget fans (`Bart_VFX`/`dnyxstudios`-style). | [08-apple-minimal-elastic.md](./references/styles/08-apple-minimal-elastic.md) |
| **09 · Living Product Walkthrough** | Clean daylight canvas, optional bottom chapter rail, drag-drop photo into breathing glowing input, macro sidebar/table zoom, morphing status pills & live voice orb (`Sleeko`/`HusniXD`-style). | [09-living-product-walkthrough.md](./references/styles/09-living-product-walkthrough.md) |
| **10 · Dark Ember Editorial** | Pure obsidian ground with slow-breathing crimson-terracotta glow waves, luminous serif display type, macro dropdown UI focus & rapid 3-beat verb swap (`Claude`-style). | [10-dark-ember-editorial.md](./references/styles/10-dark-ember-editorial.md) |
| **11 · Dark Tech Beam & Halftone** | Charcoal-obsidian canvas with diagonal emerald/brand light beams, optic rack-focus bloom, prompt-to-code halftone dot waves, cursor-tethered form follow & multi-cursor named collaboration (`Supabase`/`Vercel`-style). | [11-dark-tech-beam-halftone.md](./references/styles/11-dark-tech-beam-halftone.md) |

### Production Modules (`references/modules/` & `references/checklists/`)
- [storyboard-segments.md](./references/modules/storyboard-segments.md) — Gate 1 mandatory Q&A + Gate 2 8-segment storyboard builder & 2–6 word visual-explain budget.
- [living-ui-physics.md](./references/modules/living-ui-physics.md) — Two-layer motion rules: staggered breathing UI, calibrated elastic bounce, kinetic typography (`maskedWordRise`/`rollingNumber`), liquid sliding pills, tactile tilts, drag-drop springs, and `MOTION` 1–3 calibration.
- [visual-assets-engine.md](./references/modules/visual-assets-engine.md) — Strict `Code -> Three.js -> Optional PNG/WebP` hierarchy, 4-step sourcing fallback, anti-lazy-PNG & copyright rules.
- [pacing-choreography.md](./references/modules/pacing-choreography.md) — Slow-Fast-Slow timing ratios, 10+ measured reference benchmarks, reading hold budgets.
- [reference-video-extractor.md](./references/modules/reference-video-extractor.md) — Curated `rea-video` workflow for `@frame`-exact reference timing, camera speeds, glow colors, and SFX/stem extraction (excluding live-action/AI-film bloat).
- [ui-editing-recipes.md](./references/modules/ui-editing-recipes.md) — Setup, action and visual proof, paired tactile clicks, two-part masked slides, and frame-level review.
- [camera-and-3d.md](./references/modules/camera-and-3d.md) — Eye-guiding camera keyframes, macro UI focus, `2.4x` typing rail, Three.js 3D rules, CTA pixel-lock, continuity morphs.
- [sound-asmr-engine.md](./references/modules/sound-asmr-engine.md) — Royalty-free ASMR SFX sourcing, 0ms onset trim, `lowpass` warmth shaping, Silent Drops, `-ac 2` stereo metering.
- [ui-antislop-gate.md](./references/modules/ui-antislop-gate.md) — 3-tier anti-slop rules & dose caps, Liveliness 3 Dials + 5 Levers, anti-card-cage 3D rule, copy filter, 4-Block Delivery Gate, and Windows Headless Chrome capture rules.
- [export-safezones.md](./references/modules/export-safezones.md) — `Y = 245..1655px` universal IG Story/Reels/TikTok map, `9:16` vs `16:9` reflow rules (`C-4`), 2-pass `< 10 MB` anti-banding encoding, WA Document transfer note.
- [pre-render-qc.md](./references/checklists/pre-render-qc.md) — Mandatory Phases A–D go/no-go verification checklist and 4-Block Delivery Gate before delivery.

### Reusable Templates & Tools (`templates/` & `scripts/`)
- [motion_primitives.ts](./templates/motion_primitives.ts) — Ready-to-copy 60 FPS deterministic easing, camera rig, `tetheredCameraFollow`, recoil, shake, rack-focus, cursor arc + `evalMultiCursors` + pinch/ripples, calibrated springs (`springBounce`/`elasticPop`/`squashStretch`), kinetic typography (`maskedWordRise`/`rollingNumber`/`shimmerSweep`/`mascotLetterHop`), and tactile UI helpers (`slidingPillPose`/`tactileTilt`/`slotExpandSpring`/`iconToBarMorph`/`moodCardBlend`/`halftoneWaveCell`/`inspectorBoxPose`).
- [mix_asmr_template.py](./templates/mix_asmr_template.py) — Parameterized Python ASMR + BGM mixing & R128 mastering pipeline.
- [check_contrast.py](./scripts/check_contrast.py) — Standalone exact-unrounded WCAG 2.x contrast checker (`4.5:1` text, `3.0:1` large display & UI boundaries, batch + `--selftest`).
- [audit_pacing_and_audio.py](./scripts/audit_pacing_and_audio.py) — CLI analyzer measuring calm-vs-motion pacing ratio, `ffprobe` streams, and stereo audio peaks/crest/dynamics.
- [export_wa_igstory_10mb.py](./scripts/export_wa_igstory_10mb.py) — CLI 2-pass encoder producing razor-sharp `< 10 MB` dark-safe MP4s with preview still extraction.
