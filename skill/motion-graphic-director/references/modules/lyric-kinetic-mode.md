# Module: Pure-Music Lyric Kinetic Mode, Anti-Monotony & Three.js Rules

Use this module when editing **music videos, lyric edits, or song-driven promos** where the track itself carries 100% of the audio energy and typography must own the stage.

---

## 1. Pure-Music Audio Protocol (Zero Synthetic SFX)

When the owner specifies a lyric or song edit (no product UI demo SFX):
1. **Zero Added SFX & Zero Artificial Silent Drops:** Do NOT synthesize or overlay clicks, whooshes, thocks, chimes, or artificial `230–240ms` silent cutouts over music. Let the original track breathe untouched.
2. **Gentle Stereo Peak-Safety Limiting:** Commercial masters frequently decode above `1.0` float peak on climax drums. Slice the target clip cleanly with `ffmpeg` (`-ac 2 -ar 48000`) using gentle peak safety + brief edge fades:
   `-af "volume=-2.5dB,alimiter=limit=0.90:level=false:attack=1:release=45,afade=t=in:st=0:d=0.15,afade=t=out:st=<end_minus_0.7>:d=0.70"`
   Verify `peak <= 0.92` via [audit_pacing_and_audio.py](../../scripts/audit_pacing_and_audio.py).
3. **Real 60 FPS Audio Envelope Extraction (`audio-envelope.json`):** Extract per-frame `rms` and low-passed `bass` (`lowpass=f=180`) directly from the sliced WAV so visual pulses, 3D crystals, and mini bars sync to actual drum transients.
4. **Quiet-Section Visual Sensitivity:** In soft intros/bridges, raw normalized RMS stays low (`0.1–0.25`). Apply visual gain compression (`Math.pow(clamp(v * sensitivity), 0.55)` with `sensitivity ~ 1.35–1.75`) so waveform bars remain expressive without inflating loud drops.

---

## 2. Typography-First Anti-Monotony Law

1. **75%–80% Spacious Typography Ownership:** Keep the stage clean, high-contrast, and ruled by display typography. Never park a giant `500px+` player card or static 3-card wall on screen across multiple beats (`> 1.5s`), and avoid thick cluttered waveform walls.
2. **Supporting Elements Must Be Brief & Purposeful:** Pointers, vinyl discs, album photos, 3D props, and mini player pills enter for one concrete interaction or spatial accent, then exit cleanly. Close with an ultra-slim capsule (`height ~68px`) if track metadata is shown. **Ban unrequested VU meters / audio gauges:** Never park decorative orchestral gauges or fake level widgets in a storytelling opening unless explicitly requested by the owner.
3. **Aggressive Camera & Beat Variety (`1.0–2.5s` cadence):** Vary scale, rotation, polarity, or interactive trick every beat while keeping `near_static_pct < 28%` and readable `calm_float_or_read_pct` in `55%–83%`.

### 2.1 Eye-Trace Text Anchor Consistency & Outgoing Clearance
- **Maximum `2–3` Deliberate Anchor Zones:** Keep primary verse phrases along a predictable reading rhythm (`1` consistent editorial rail such as `X = 110..740px` + `1` optical climax center `X = 960px`, shifting right only when an intentional camera glide guides the eye there). Hold verse vertical baselines steadily inside a comfortable reading band (`Y ~ 34%–62%`) instead of scattering lines randomly across top-left, bottom-right, top-right, and bottom-left corners.
- **Zero Edge-Clipped Trailing Words:** Always fade outgoing phrases smoothly down to `opacity: 0` BEFORE the camera pans or zooms away to the next phrase so stray sliced letters never linger at screen borders.
- **Focal Subject Breathing Room:** Maintain `>= 80px` visual clearance between headline bounding boxes and key illustration silhouettes/focal objects (e.g., baroque mirror frames, crowns, spotlight figures).

### 2.2 Non-Sliding Transition Diversity & Zero-Blank-Wall Law
- **Zero Opaque Blank Flash Walls:** Never drop full-screen solid-color rectangle/circle wipes between acts that briefly leave the screen empty; bridge acts with overlapping visual continuity.
- **Never Repeat Flat Directional Slides:** Do not stack vertical/horizontal slides back-to-back across consecutive cuts. Combine distinct non-sliding cinema techniques matched to the lyric:
  1. **Pixel-Locked Letter-Hole Dive:** Lock glyph center via `gridTemplateColumns: "1fr auto 1fr"` (or fixed focus point), zoom camera `1.2x -> 9.8x` straight into `"O"`, while expanding a pixel-exact `clipPath: circle(rPx at 50% 50%)` + matching gold rim into the next world.
  2. **Focal-Object Dive -> Shaped Oval Iris:** Zoom into a scene centerpiece (e.g., antique mirror glass) and reveal the incoming scene through a tall expanding `clipPath: ellipse(rx ry at 50% 50%)` with glowing border rim.
  3. **Cascading Multi-Column Louver Reveal:** Split the incoming scene into `5` vertical strips via `clipPath: inset(0 R% 0 L%)` (`0.2%` strip overlap to prevent hairline seams) staggered `3` frames apart, with thin illuminated gold leading-edge glints.
  4. **True 3D Perspective Sleeve/Card Flip:** Rotate outgoing scene (`perspective(2200px) rotateY(0 -> -90deg)`) up to exact `CUT - 1` (strictly unmounted at `CUT`) and swing incoming scene (`rotateY(+90deg -> 0deg)`) synchronized with any `Three.js` prop Y-rotation over a soft stage spotlight backing.
  5. **Diagonal Kintsugi Shatter-Split:** On heavy drum transients, slice a frozen frame of the outgoing scene into `2` `clipPath: polygon(...)` shards blasting apart diagonally while an illuminated molten-gold fault SVG flashes along the split line.
  6. **Opposing Split-Text Snap -> Center Curtain Seam:** Drive upper/lower letter halves (`clipPath: inset(0 0 49.5% 0)` vs `inset(49.5% 0 0 0)`) together on impact, then zoom into an igniting vertical gold seam that parts stage curtains cleanly.
  7. **Concentric 3D Match-Cut + Optic Rack-Focus:** Contract 3D tunnel rings inward (`scale: 1.95 -> 1.24`) as they optically cross-dissolve (`blur` + `opacity` + subtle additive screen bloom) straight into circular clockwork geometry.

### Proven 7-Trick Kinetic Catalog (Deterministic 60 FPS)
1. **Magnifying Lens & 3D Echo Clones:** Glide a circular lens (`clipPath: circle(R at X Y)`) across blurred base type revealing a razor-sharp `1.22x` scaled clone inside, followed by concentric stroked echo outlines (`-webkit-text-stroke`) on vocal harmonies.
2. **90-Degree Whip, 3D Collision & Letter Portal:** Whip-rotate camera `-90deg -> 0deg`, knock a small setup word sideways (`squashStretch`) as a 3D prop collides, then zoom `1.0x -> 6.8x` centered directly through the hole of `O` (`transformOrigin`) into the next dark stage.
3. **Design-Editor Drag-Select & Split-Screen Stutter:** Sweep a cursor (`evalCursorPos` + `inspectorBoxPose`) dragging a dashed selection frame with 4 corner handles, physically stretching the target word (`1.0x -> 1.44x`), fire one crisp `cursorContactPose` click on a compact heart pill, then trigger 2-panel and 3-column vertical split-screen stutter cuts (`#0F1115` | `#C81932` | `#F5F1E8`).
4. **Zoom-Out Climax & Counter-Scrolling Ribbons:** Slam from `3.4x -> 1.0x` via `maskedSlidePose` onto a bold solid stage with faint (`0.20` opacity) counter-scrolling marquee ribbons and rubber-bouncing punctuation (`!`) on drum hits.
5. **Virtual-Canvas Red-Thread Camera Flight (`3600x2600`):** Draw a glowing SVG `stroke-dashoffset` path linking spaced stations (`I THINK -> I'M A -> LITTLE BIT -> OBSESSED`) while flying the camera via inverse transform (`evalCameraTrack` including `90deg` rotation). Fade out earlier wide stations before zooming to the next station so wide wipe boxes never overlap prior words.
6. **Per-Beat Interactive Variety (4 Rapid Names):** Alternate tricks per beat: vertical slot-reel spin with brief flying disc, cursor highlighter swipe (`clipPath: inset(...)` color flip), split word opening a capsule window portal (`MO [capsule] LLY`) zoomed through `1.0x -> 5.4x`, and falling stamp collision (`squashStretch` + `impactShake`).
7. **Split Curtains & Opposing Cross-Slide:** Split a phrase into top/bottom halves (`clipPath: inset(0 0 50% 0)` / `inset(50% 0 0 0)`), cross-slide opposing lines left vs right, and settle into an ultra-slim closing capsule.

---

## 3. Three.js + Remotion 4 + React 19 + 4 GB VRAM Production Rules

1. **Verified React 19 Dependency Set:** Pair `remotion` `4.0.547` with `@remotion/three` `4.0.547`, `@react-three/fiber@^9.0.0`, `three@^0.170.0`, and `@types/three@^0.170.0` (avoid older R3F v8 with React 19).
2. **One Persistent `<ThreeCanvas>` With `<group visible={...}>`:** Never mount/unmount `<ThreeCanvas>` across acts (recreating WebGL contexts per frame slows rendering and risks GPU stalls). Mount one full-bleed `<ThreeCanvas width={1920} height={1080} gl={{ alpha: true, antialias: true }}>` and toggle each act's 3D props via `<group visible={...}>`, driving 100% of positions/rotations from `useCurrentFrame()`.
3. **Keep Stage Backgrounds Behind `<ThreeCanvas>`:** Opaque backgrounds inside foreground act wrappers hide `<ThreeCanvas>` completely. Paint solid/flash stage colors on the outer root behind `<ThreeCanvas>` and keep foreground act containers `background: "transparent"` whenever 3D objects should appear behind text.
4. **Bundle Once & Cap WebGL Concurrency on 4 GB VRAM GPUs:**
   - Bundle once with explicit flag (`npx remotion bundle src/index.tsx --out-dir=out/bundle`, NOT positional!) and reuse `out/bundle` for all `remotion still` and `remotion render` commands.
   - Pass `--gl=angle --hardware-acceleration=if-possible --concurrency=6` when WebGL `<ThreeCanvas>` is active on 4 GB VRAM GPUs (e.g., RTX 3050 Laptop), dropping to `--concurrency=4` if VRAM errors occur.
