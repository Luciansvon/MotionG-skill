---
name: motion-graphic-director
description: >-
  Modular director and production runbook for diverse vertical 9:16 and
  multi-style motion graphic videos (Remotion, Three.js 3D hardware,
  anti-slop UI mockups, Slow-Fast-Slow pacing, macro interactive camera
  choreography, ASMR tactile sound design, universal IG Story/Reels/TikTok
  safe zones, and dual-output <10 MB WA + 60 FPS master delivery). Use when
  designing, auditing, or producing kinetic product promos, UI demos, or
  diverse-style motion graphic videos.
---

# Motion Graphic Director (Multi-Style 6-Gate Runbook)

Use this skill to direct, audit, and produce vertical 9:16 (and multi-format) non-VO or rhythm-driven motion graphic promo videos. **Never default blindly to one visual template** — pick the style module matching the brief or decompose the owner's custom reference first, pass anti-slop visual mockup approval, and verify rendered frames and stereo audio before full export.

## Core Multi-Style Routing Rule

- When the user supplies images/videos as creative direction, ALWAYS load [06-custom-reference-adapter.md](./references/styles/06-custom-reference-adapter.md) and measure reference pacing with [audit_pacing_and_audio.py](./scripts/audit_pacing_and_audio.py).
- When no custom reference is given, choose or intentionally blend from the 6 distinct art directions in `references/styles/` (mix styles across acts only when dramatic contrast strengthens the story, e.g. calm light editorial intro -> crimson kinetic strike -> dark 3D showcase).
- Communicate progress and design choices clearly in plain language matching the user's preferred tongue without dumping raw coding jargon on non-programmer owners.

---

## 6-Gate Production Pipeline

Follow these gates in order. Never skip Gate 1 mockup approval or Gate 4 still inspection.

### Gate 0: Audit Local Capabilities First
Before suggesting paid SaaS tools, cloud generators, or claiming a limitation:
1. Check `package.json` (`@remotion/three`, `@remotion/motion-blur`, `@remotion/google-fonts`, `three`), installed `ffmpeg`/`ffprobe`, headless Chrome, and local/workspace SFX folders.
2. Check existing local projects or style specs (`DESIGN.md`, shared audio libraries).

### Gate 1: Style Selection & Anti-Slop UI Approval
1. Load the target style playbook from `references/styles/` (see Style Index below).
2. Read [ui-antislop-gate.md](./references/modules/ui-antislop-gate.md).
3. Lock typography, palette, glass/surface budget, and product copy in `DESIGN.md`.
4. Render **3 static `1080x1920` PNG UI mockups** (serve local assets via ephemeral `http://127.0.0.1` + fresh Chrome `--user-data-dir`), verify WCAG AA pixel contrast (`>= 4.5:1`), inspect via `read_file`, and **obtain explicit owner approval** before writing Remotion scenes.

### Gate 2: Slow-Fast-Slow Pacing & 3D/Macro Camera Choreography
1. Read [pacing-choreography.md](./references/modules/pacing-choreography.md):
   - Default to **no voiceover** for kinetic app/product promos unless explicitly requested.
   - Maintain a true **Slow-Fast-Slow** contrast ratio (`55%–81%` calm readable holds at `1.8–2.2s` per card/statement, balanced with `0.3–0.8s` crisp transitions; `~30–36s` for 6 full acts).
2. Read [camera-and-3d.md](./references/modules/camera-and-3d.md) and reuse deterministic primitives in [motion_primitives.ts](./templates/motion_primitives.ts):
   - Use macro typing rails (`2.35x–2.45x` zoom + linear pan with clamped backdrop parallax `<= ±34px`).
   - Mount `<ThreeCanvas>` **OUTSIDE** `<CameraMotionBlur>`; every child inside `<CameraMotionBlur>` must call `useCurrentFrame()` internally.
   - Keep hero 3D phones sized cleanly around `57%–60%` of frame height with background orbital geometry strictly behind `max_z < -0.5`.

### Gate 3: ASMR Tactile Sound Design & Audio Mastering
1. Read [sound-asmr-engine.md](./references/modules/sound-asmr-engine.md) and adapt [mix_asmr_template.py](./templates/mix_asmr_template.py).
2. Replace harsh metallic shutters, cartoon slaps, and clattering typewriters with pleasant ASMR textures (`Topre` / `Gateron Ink Black` keystrokes, soft low-passed mouse clicks, pentatonic water/liquid drops, trimmed airy whooshes, warm low-passed sub-thumps).
3. Carve `2` brief **Silent Drops (`230–240 ms`)** before major reveals and measure stereo (`-ac 2`) output: `peak <= 0.92`, `crest_db >= 14.0`, `dyn_p95_p10_db >= 12.0`.

### Gate 4: Universal Safe Zones & Visual Still Inspection
1. Read [export-safezones.md](./references/modules/export-safezones.md) and run every check in [pre-render-qc.md](./references/checklists/pre-render-qc.md).
2. Keep all critical headlines, captions, and pills inside **`Y = 245..1655px`** (`1080x1920`), safe simultaneously for IG Story, Reels, TikTok, and YouTube Shorts.
3. Fade both top and bottom floating HUD overlays smoothly before 3D lean-in zooms.
4. Render keyframe stills (`npx remotion still`), measure the rendered 3D CTA button center in pixels to **pixel-lock** cursor taps, and visually inspect every still via `read_file`.

### Gate 5: Dual-Output Rendering & Final Verification
1. Render full **`1080x1920 @ 60 FPS`** master (`--crf=18 --audio-bitrate=192k`).
2. Encode crisp **`< 10 MB`** WA & IG Story version (`1080x1920 @ 30 FPS`) using [export_wa_igstory_10mb.py](./scripts/export_wa_igstory_10mb.py) (`aq-mode=3` dark-gradient protection, target `~8.5–9.3 MB`).
3. Verify BOTH MP4s with [audit_pacing_and_audio.py](./scripts/audit_pacing_and_audio.py) and inspect 2 extracted stills from the `< 10 MB` file before delivery.

---

## Module & Asset Directory

### Editing Style Playbooks (`references/styles/`)
| Style ID | Aesthetic & When to Pick | Playbook |
|---|---|---|
| **01 · Liquid Glass Ambient** | Translucent refractive crystal glass over dark cobalt-periwinkle velvet folds; ideal for AI tools, flagship SaaS, modern sleek promos. | [01-liquid-glass-ambient.md](./references/styles/01-liquid-glass-ambient.md) |
| **02 · Clean Editorial App** | Warm ivory/off-white ground, airy typography, 80% calm breathing holds (Gojek-style); ideal for productivity, consumer apps, clarity-first explainers. | [02-clean-editorial-app.md](./references/styles/02-clean-editorial-app.md) |
| **03 · Kinetic Brand Pop** | Bold solid-color stage switches, punchy 3-beat text stamps, 3D tilted card wall (Pinterest-style); ideal for high-energy brand launches and feature walls. | [03-kinetic-brand-pop.md](./references/styles/03-kinetic-brand-pop.md) |
| **04 · Dark Studio Hardware** | Obsidian studio sweep, precision metallic/glass rim lighting, dominant 3D device hero (`57%–60%` height) & portal UI dive; ideal for hardware/mobile demos. | [04-dark-studio-hardware.md](./references/styles/04-dark-studio-hardware.md) |
| **05 · Bold Typography Story** | Expressive scale-contrasted statements, wipe-stamp reveals, rhythmic impact shakes & silent drops; ideal for manifesto hooks, copy-heavy stories, fast campaigns. | [05-bold-typography-story.md](./references/styles/05-bold-typography-story.md) |
| **06 · Custom Reference Adapter** | Mandatory workflow when the owner uploads screenshots, moodboards, or reference videos — extracts palette, pacing ratio, and camera language without cloning copy. | [06-custom-reference-adapter.md](./references/styles/06-custom-reference-adapter.md) |
| **07 · Bright Interactive UI Morph** | Daylight brand-mist canvas, pop-out cutout products over giant type, 3D tilt-to-flat catalog sweep, continuity card-to-tracker morph & perimeter border progress (Starbucks/Corpius.ae-style); works in 16:9 & 9:16. | [07-bright-interactive-ui-morph.md](./references/styles/07-bright-interactive-ui-morph.md) |

### Production Modules (`references/modules/` & `references/checklists/`)
- [pacing-choreography.md](./references/modules/pacing-choreography.md) — Slow-Fast-Slow timing ratios, reading hold budgets, act segmentation.
- [camera-and-3d.md](./references/modules/camera-and-3d.md) — Interactive camera keyframes, macro typing rail (`2.4x`), Three.js 3D sizing, Z-clearance, `<CameraMotionBlur>` rules, CTA pixel-lock.
- [sound-asmr-engine.md](./references/modules/sound-asmr-engine.md) — Legal royalty-free ASMR SFX sourcing, 0ms onset trim, `lowpass` warmth shaping, Silent Drops, `-ac 2` stereo metering.
- [ui-antislop-gate.md](./references/modules/ui-antislop-gate.md) — Banned AI tropes, HTML mockup verification workflow, Headless Chrome localhost/temp-profile rules.
- [export-safezones.md](./references/modules/export-safezones.md) — `Y = 245..1655px` universal IG Story/Reels/TikTok map, 2-pass `< 10 MB` anti-banding encoding, WA Document transfer note.
- [pre-render-qc.md](./references/checklists/pre-render-qc.md) — Mandatory go/no-go verification gate before full rendering and delivery.

### Reusable Templates & Tools (`templates/` & `scripts/`)
- [motion_primitives.ts](./templates/motion_primitives.ts) — Ready-to-copy 60 FPS deterministic easing, camera rail, recoil, impact shake, rack-focus, and cursor arc helpers.
- [mix_asmr_template.py](./templates/mix_asmr_template.py) — Parameterized Python ASMR + BGM mixing & R128 mastering pipeline.
- [audit_pacing_and_audio.py](./scripts/audit_pacing_and_audio.py) — CLI analyzer measuring calm-vs-motion pacing ratio, `ffprobe` streams, and stereo audio peaks/crest/dynamics.
- [export_wa_igstory_10mb.py](./scripts/export_wa_igstory_10mb.py) — CLI 2-pass encoder producing razor-sharp `< 10 MB` dark-safe MP4s with preview still extraction.
