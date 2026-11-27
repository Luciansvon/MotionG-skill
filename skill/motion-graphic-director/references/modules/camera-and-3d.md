# Module: Interactive Camera Rig, Macro Typing & Three.js 3D Rules

Dead "tripod" compositions feel flat and amateur. Every act needs spatial depth, physical UI response, and verified pixel coordinates.

## 1. Interactive Camera Grammar (`templates/motion_primitives.ts`)

Pair these deterministic 60 FPS primitives (zero CSS transitions, zero `Math.random()`):
- **Keyframe Camera Track (`evalCameraTrack`):** Drive `x`, `y`, `scale`, `rotX`, `rotY`, `rotZ` smoothly via `snappyOut`, `snappyInOut`, `cubicInOut`, or `linear` tracking pans.
- **Physical Click Coupling:** Every cursor tap combines:
  1. Curved arc approach (`evalCursorPos` with sinusoidal `arc` lift),
  2. Target magnet glow (`hoverProximity` smoothly brightening rim/pill before contact),
  3. Tactile target rebound with `buttonPressScale` (0.84 at +5 frames, 1.10 at +14, back to 1.00 at +26), or paired cursor and target compression with `cursorContactPose`. [UI editing recipes](ui-editing-recipes.md)
  4. Camera recoil (`cameraRecoil`: `-0.04` scale dip, `+10px` downward kick, `-2.2deg` pitch tilt over ~18 frames).
- **3-Plane Depth Rack-Focus (`rackFocusMetrics`):** Offset inactive cards along Z (`zPx: -130 -> +84px`), blur (`blurPx: 9 -> 0px`), and opacity (`0.42 -> 1.0`) to simulate real shallow-depth camera lens pulling focus between stacked slabs.

## 2. Macro Typing Camera Rail (~2.4x Zoom + Horizontal Pan)

Standard `1.15x` zoom makes typing scenes feel distant. For true tactile typing drama:
1. Zoom deeply (**`scale: 2.35–2.45`**) framing the left bezel + first 2 typed characters (`🔍 Ce|`) filling `~40%` of the frame width cleanly.
2. Pan **linearly rightward (`ease: "linear"`)** in exact lockstep from `typeStart` (`x: +645` at `scale: 2.38`) through `typeEnd` (`x: -290`), tracking cursor and emerging letters all the way to the Send button (`x: -650`) before zooming back out (`scale: 1.00`) for the AI reply.
3. **CRITICAL Edge-Leak Guard:** Always clamp backdrop parallax passed to `AmbientBackdrop` (`parallaxX = clamp(camX * 0.055, -34, 34)`, `parallaxY = clamp(camY * 0.14, -34, 34)`). Passing unclamped `±650px` camera shifts directly into a backdrop with `40px` bleed exposes raw canvas borders!

## 3. Remotion `<CameraMotionBlur>` Critical Laws

- **Mount `<ThreeCanvas>` OUTSIDE `<CameraMotionBlur>`:** Wrapping WebGL Three.js canvases inside Remotion's multi-sample `<CameraMotionBlur>` breaks frames or degrades render consistency. Keep `<Phone3DStage />` as a sibling beneath `<CameraMotionBlur shutterAngle={135} samples={4}>`.
- **Internal Frame Reads Only:** NEVER pass `frame` as a prop to components rendered inside `<CameraMotionBlur>`. Remotion evaluates sub-frames by changing `useCurrentFrame()` across shutter samples — any stage inside `<CameraMotionBlur>` that receives a fixed parent `frame` prop freezes without motion blur! Every stage child must call `const frame = useCurrentFrame()` itself.
- **Persistent `<ThreeCanvas>` & Layering Discipline:** Keep **1 persistent `<ThreeCanvas>`** (`gl={{ alpha: true, antialias: true }}`) mounted across acts and toggle per-act `<group visible={...}>` instead of tearing down WebGL contexts mid-timeline. Paint solid/flash stage backgrounds **behind** `<ThreeCanvas>` (keeping foreground act overlays `background: "transparent"`) so 3D elements remain visible behind typography.
- **Bundle Reuse & 4 GB VRAM Concurrency:** Bundle once via `npx remotion bundle src/index.tsx --out-dir=out/bundle` (never positional) to reuse across stills/renders, and cap `--concurrency=6` (or `4`) when `<ThreeCanvas>` is active on 4 GB VRAM GPUs (see [lyric-kinetic-mode.md](./lyric-kinetic-mode.md)).

## 4. Three.js 3D Hardware Scale, Z-Clearance & CTA Pixel-Lock

1. **Measure Ground-Truth Rendered Size from Stills:**
   - Do not assume naive FOV math equals `ThreeCanvas` portrait projection (`1080x1920`). Always render `npx remotion still` and measure actual screen pixel height of the 3D device (`target ~57%–60%` of `1920px`, i.e. `~1090–1150px`), cleanly balanced between lowered IG Story top title (`top: 245px`) and raised bottom pill (`bottom: 268px`).
2. **Enforce Orbital Geometry Z-Clearance (`max_z < -0.5`):**
   - When enlarging the 3D device (`phoneScale ~ 1.48–1.56`), large tilted background torus rings (`radius: 2.58 * scale`) swing closer to `+Z` as they rotate around Y!
   - Always enforce: `ring_center_z + max_radius * ring_scale <= -0.5` (e.g., `z = -4.9`, `scale = 1.60`, `max_z = -4.9 + 4.13 = -0.77`, safely behind phone back `-0.18` so rings NEVER stab through the OLED screen).
3. **Pixel-Lock the 2D Cursor Tap on 3D Buttons:**
   - Any change to `phoneScale`, `posY`, or `camY`/`camZ` shifts where the 3D bottom CTA pill projects onto 2D (`1080x1920`). Render the click frame still (`f<phoneClick>.png`), detect the white CTA button vertical bounds in Python, and update `Act3OverlayHUD`'s `CursorPointer` waypoint `y` to exact button center `cy`.
4. **Fade Both Top & Bottom HUD Overlays Before Zoom-In:**
   - Apply both `topApproachFade` and `bottomApproachFade` (~30–48 frames before `phoneClick`) so floating IG Story pills fade out before the zooming 3D phone expands across `bottom: 268px`.

## 5. Bright UI Pop-Out Layering, Tilt-to-Flat Sweep & Continuity Morph (Style 07)

1. **Pop-Out Product Layering:**
   - Layer clean cutout product PNGs so they break above the card's top border while sitting cleanly in front of oversized muted display text (`card surface -> giant back type -> popped-out cutout -> crisp card copy`).
2. **Skeleton-to-Live 3D Tilt-to-Flat Sweep:**
   - Enter the UI container on a tilted 3D perspective plane (`rotateX`/`rotateY`/`rotateZ`) with brief gray skeleton placeholders (`~0.35s`) resolving into live product cards; pan horizontally tracking the cursor across 2–3 selections, then zoom out and flatten to `0deg` when the final choice commits.
3. **Continuity Card Morph:**
   - Dismiss unselected sibling cards cleanly while keeping the clicked product card alive on screen across the act transition, sliding it into the left slot of the next status/tracking component.
4. **Perimeter Border Progress:**
   - Animate an `SVG` `<rect>` `stroke-dashoffset` (or conic border mask) from `0% -> 100%` around the rounded outer card perimeter in sync with sequential live state text rather than adding redundant inner progress bars.

## 6. Eye-Guiding Macro UI Focus & Contrast Flip Patterns (Styles 08–10)

1. **Macro Control & Sidebar Zoom:**
   - Zoom cleanly (`1.9x–2.4x`) directly onto micro UI controls — such as an open model dropdown (`Sonnet -> Opus`) or a left sidebar navigation item (`New chat`) on hover — before pulling back to reveal the transformed workspace.
2. **Curved Pointer Sweep Between Chained Micro-Actions:**
   - Chain 2 adjacent interactions in one continuous shot (e.g., cursor taps `Like` heart -> camera pans laterally following cursor -> cursor taps `Save` pill triggering color/label toggle and spring rebound).
3. **Extreme Monochrome/Brand Stage Flips (`90x–118x` Burst):**
   - Snap cleanly across opposite luminance stages (`off-white <-> obsidian` or `white <-> crimson`) using crisp `0.25–0.40s` transitions that immediately settle into calm `1.8s+` holds so visual shock never hurts readability.

## 7. Cursor-Tethered Follow, Optic Focus Bloom & Halftone Transitions (Style 11 & V1/V3/V6)

1. **Cursor-Tethered Macro UI Follow (`tetheredCameraFollow`):**
   - Instead of showing an entire SaaS settings screen at `1.0x` where form labels turn unreadable, lock zoom at **`1.8x–2.2x`** and feed cursor `(x, y)` into `tetheredCameraFollow(...)` so the camera glides continuously with the pointer across `3–4` form steps (name input -> type dropdown -> toggle -> save) in one uninterrupted shot. Always clamp backdrop parallax (`<= ±34px`) to prevent edge leaks.
2. **Optic Rack-Focus Bloom Reveal (`V1 Vercel`):**
   - On dark monochrome beats, transition hero UI cards and pill CTAs (`Visit ↗`) from soft optic defocus (`blur(12px) -> blur(0px)`) paired with restrained rim bloom (`max 1–2` glowing targets per frame) so depth reads like a real cinema lens.
3. **Halftone Dot-Matrix Transformation (`halftoneWaveCell` — `V6 Supabase`):**
   - When morphing a natural-language prompt into live SQL/code or data tables, drive a radial grid of glowing dots via `halftoneWaveCell(col, row, cols, rows, frame, triggerFrame)` so the sweeping dot wave masks the underlying swap cleanly without an abrupt hard cut.

## 8. Unified Single-World 2.5D Camera & Focus-Locked Zoom Math

Disconnected camera rigs make backgrounds look frozen while foreground words and 3D primitives drift randomly:

1. **Wrap All Layers in One Synchronized Camera World:** Never freeze the stage illustration/backdrop while CSS-translating typography alone, and never add random object jitter just to lower static percentages. Nest:
   - **Layer 0 (Overscanned Backdrop/Painting `134%` wide/tall, `-17%` offset):** Moves at `0.65x` camera translation (`tx`, `ty`), `1 + (scale - 1) * 0.88` zoom, and `rotZ` — zero exposed border seams.
   - **Layer 1 (Atmosphere / Floating Dust / Lighting Rays):** Moves at `0.85x` translation, `1 + (scale - 1) * 0.95` zoom, and `rotZ`.
   - **Layer 2 (Hero Typography & Story Accents):** Moves at full `1.0x` (`tx`, `ty`, `scale`, `rotZ`), staying anchored calmly in world space while the cinema camera glides between beats.
2. **Use Drift-Free `focusToTransform` + `evalFocusTrack` (`motion_primitives.ts`):** Instead of guessing manual `x/y` offsets during zoom-ins (where targets drift off-screen as `scale` climbs from `1.0x -> 9.8x`), specify world anchor `(focusX, focusY)` and desired screen target `(screenX, screenY)` so `tx = screenX - cx - (focusX - cx) * scale` keeps the exact letter hole or artwork centerpiece pixel-locked at any magnification.
3. **Lock 3D Camera & 2D Flip Tempo Together:** Whenever `ThreeStage3D` shares an act with 2D layers (e.g., `VinylRecord3D` during a `rotateY` sleeve flip or `ACT6` rings contracting into `ACT7` astrolabes), match camera keyframes, Y-angles, and push/pull speeds identically across 2D and 3D rigs.
