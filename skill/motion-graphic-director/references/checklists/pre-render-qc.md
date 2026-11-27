# Pre-Render & Pre-Delivery Quality Checklist

Do NOT declare a render complete until every single gate below is empirically verified from actual files and rendered images.

## Phase A: Before Full 60 FPS Video Render
- [ ] **Scope Q&A & Storyboard Approved:** Gate 1 Q&A completed and Gate 2 segmented storyboard approved by owner (`2–6` words/beat visual-explain budget honored).
- [ ] **Design Lock & Liveliness (`DESIGN.md`):** Includes 1-line **Design Read**, **`ENERGY / RHYTHM / MOTION` (1–3)** dials, `R-29` palette cap (`<= 2–3` inks/surfaces + `1` accent), and `R-31` 1-line rationales for every major design choice.
- [ ] **Computed WCAG AA Contrast Verified (`R-25`):** `python scripts/check_contrast.py` exits `0` across all text (`>= 4.5:1`), large display type (`>= 3.0:1`), and non-text UI boundaries (`>= 3.0:1`) tested against worst-case background pixels.
- [ ] **Dose Caps & Anti-Card-Cage (`R-10..14`):** Max `1–2` frosted glass surfaces, max `1–2` focal glows, zero nested cards inside glass, zero traffic-light dots/sparkle glyphs, and **zero card cages around 3D hero models**.
- [ ] **Zero Dead UI Controls (`R-26 / C-2`):** Every visible button, tab, dropdown, or chapter rail is clicked/used during the video — zero unclicked decorative chrome remains.
- [ ] **Act Rhythm, Mockup Approval & Swap-Logo Test (`R-05 / R-20`):** Owner explicitly approved 3 compositionally distinct Gate 3 PNG mockups, and the style still passes the Swap-Logo distinctiveness test.
- [ ] **Living UI & Visible Bounce Check:**
  - Calm holds use staggered `ambientBreath` (`>= 8px` drift / `±1.8–2.2%` scale, distinct `phaseOffset`) — zero dead slides.
  - **Symmetric Split-Insert & Zero Premature Chrome:** Split-sentence prompt bars lock `cam.x = 0` with equal left/right clearance; zero decorative status dot-pills (`• Tag`) and zero premature CTAs before the Outro.
  - Elastic entrances apply `springBounce` / `elasticPop` directly (`12%–22%` overshoot, NOT crushed via `lerp(0.86, 1, pop)`) and drops trigger visible `squashStretch` + `cameraRecoil`.
- [ ] **Kinetic Typography & Zero 1-Frame Teleports Check:**
  - Primary headlines and outro lockups use `maskedWordRise` / staggered kinetic word motion (zero flat whole-block opacity fades), and real metrics/progress animate with `rollingNumber`.
  - Segmented/tab controls glide with `slidingPillPose` + `tactileTilt`, dropped slots expand via `slotExpandSpring`, and each click uses one press driver with a shared contact cue. Use `cursorPressState` + `clickRipple` for the standard click or `cursorContactPose` for paired cursor and target compression. Add a ripple on that same cue when the shot needs a stronger click signal. [UI editing recipes](../modules/ui-editing-recipes.md)
- [ ] **Masked Slide & Diverse Transition Seams Verified:** Confirm zero solid opaque blank transition screens, zero repeated consecutive slides, and inspect 3 stills around every transition seam (`CUT - 4`, `CUT`, `CUT + 4`) via `read_file` to verify continuous visual continuity without overlap ghosting or cropped corners.
- [ ] **Eye-Trace Text Anchors & Outgoing Word Clearance:** Verify headlines stay within `2–3` consistent reading zones with `>= 80px` clearance from illustration focal objects, outgoing lyrics fade to `opacity: 0` before camera pans away (zero edge-clipped half-words), and unrequested VU meters/gauges are absent.
- [ ] **Asset Hierarchy & Anti-Primitive-3D Check:** All UI/buttons/charts built in code and sleek mechanical/hardware props in `Three.js` (zero lazy `PNG` UI shortcuts, and **zero crude primitive 3D geometry** standing in for organic/storytelling illustrations); every optional/graded `PNG`/`JPG`/`WebP` visually inspected via `read_file` (sharp, palette-matched, zero watermarks).
- [ ] **Copy & Anti-Slop Spelling Check:** Copy completed `Draft -> Audit -> Final` (zero em dashes `—`, zero AI vocabulary/negative parallelism/staccato drama/generic CTAs/headline emojis) AND proofread character-by-character directly on rendered PNG stills.
- [ ] **Portrait `9:16` Reflow Check (`C-4`):** Split-insert transitions use vertical/diagonal reflow when wide prompt bars appear, macro pans stay free of horizontal edge clipping (`X = 72..1008px`), and tall 3D props clear top/bottom copy.
- [ ] **Typecheck Clean:** `npx tsc --noEmit` exits `0`.
- [ ] **Backdrop Bleed Guard:** Extreme camera pans/zooms clamp `AmbientBackdrop` parallax (`<= ±34px`) — inspect macro pan stills to verify zero border seams.
- [ ] **IG Story Safe Zones Verified visually (`read_file`):**
  - [ ] Act 1 opener top header clears `Y >= 245px`.
  - [ ] Act 3 3D phone showcase clears top title (`top >= 245px`) AND bottom pill (`bottom >= 268px`) with breathing space.
  - [ ] Act 3 lean-in button tap frame (`f<phoneClick>`) shows bottom HUD faded cleanly out (no overlap over phone screen footer).
  - [ ] Act 4 top heading (`top >= 255px`) & bottom line (`bottom >= 290px`) sit cleanly inside `Y = 245..1655px`.
  - [ ] Act 5 grid caption (`top >= 255px`) and Act 6 outro card sit comfortably inside safe center.
- [ ] **3D Clearance & CTA Pixel-Lock Verified:**
  - [ ] Background orbital rings sit completely behind device back (`max_z < -0.5`), zero lines cutting through OLED screen.
  - [ ] Cursor tip + click burst land dead-center on the white 3D CTA pill center `cy` measured from rendered PNG.
- [ ] **Portal Transition Clean:** Check frame mid-zoom (`f<zoomThrough+25>`) to confirm clean dive without camera near-plane slicing or ugly black artifacting.

## Phase B: Audio Mix & Master WAV Verification
- [ ] Zero harsh metallic/cartoon FX; typing uses soft per-character creamy switches + spacebar; BGM + SFX peaks normalized smoothly.
- [ ] Verify `final_v4.wav` with `python scripts/audit_pacing_and_audio.py`:
  - [ ] Exact duration match (`dur_s == timeline TOTAL_SEC`).
  - [ ] Stereo (`-ac 2`) `peak <= 0.92`, `crest_db >= 14.0`, `dyn_p95_p10_db >= 12.0`.

## Phase C: Dual-Output MP4 Verification
- [ ] Master MP4 (`60 FPS`): `1080x1920` (portrait) or `1920x1080` (landscape), `60/1` fps, `< 72 MB`, `AAC 48kHz stereo`, stereo `peak <= 0.96`.
- [ ] **Anti-Freeze Pacing Verified (`audit_pacing_and_audio.py`):** `near_static_pct < 28%` on the rendered MP4 (zero 3–5s frozen slides while keeping `calm_float_or_read_pct` comfortable to read).
- [ ] WA / IG Story MP4 (`30 FPS`): strictly **`< 10,000,000` bytes**, `1080x1920` (portrait) or `1920x1080` (landscape), `30/1` fps, stereo `peak <= 0.96`.
- [ ] Visually inspect 2 stills extracted from `< 10 MB` MP4 (`ss=2.2` & `ss=13.0`) via `read_file` to confirm crisp typography and band-free dark cobalt gradients.
- [ ] Both files copied with exact verified byte parity to the target delivery folders.

## Phase D: 4-Block Evidence-Backed Delivery Gate Report
Before delivering final MP4s to the owner, confirm all 4 summary blocks pass with observed command output or inspected PNG filenames (see [ui-antislop-gate.md](../modules/ui-antislop-gate.md)):
- [ ] **Block 1 (Hard Gates & Contrast):** `0` em dashes, `0` fabricated claims, `0` dead UI controls, `check_contrast.py` PASS output logged, stills visually checked.
- [ ] **Block 2 (Purpose-Gate & Dose Caps):** Glass `<= 2`, glow `<= 2`, purposeful shadows, `0` card cages around 3D heroes.
- [ ] **Block 3 (Liveliness & Rhythm):** Design Read + `ENERGY/RHYTHM/MOTION` dials honored, 5 liveliness levers active, consecutive acts visually varied.
- [ ] **Block 4 (Craftsmanship, Copy & Reflow):** `C-1..C-5` satisfied, Swap-Logo Test (`R-20`) passed, `R-29` palette cap (`<= 3+1`), `R-31` rationales complete, `9:16` reflow verified clean.
