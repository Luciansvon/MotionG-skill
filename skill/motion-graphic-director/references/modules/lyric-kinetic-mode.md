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
2. **Supporting Elements Must Be Brief & Purposeful:** Pointers, vinyl discs, album photos, 3D props, and mini player pills enter for one concrete interaction or spatial accent, then exit cleanly. Close with an ultra-slim capsule (`height ~68px`) if track metadata is shown.
3. **Aggressive Camera & Beat Variety (`1.0–2.5s` cadence):** Vary scale, rotation, polarity, or interactive trick every beat while keeping `near_static_pct < 28%` and readable `calm_float_or_read_pct` in `55%–83%`.

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
