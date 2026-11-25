# Pre-Render & Pre-Delivery Quality Checklist

Do NOT declare a render complete until every single gate below is empirically verified from actual files and rendered images.

## Phase A: Before Full 60 FPS Video Render
- [ ] **Scope Q&A & Storyboard Approved:** Gate 1 Q&A completed and Gate 2 segmented storyboard approved by owner (`2–6` words/beat visual-explain budget honored).
- [ ] **UI Anti-Slop Check:** `DESIGN.md` updated, zero glowing traffic-light dots, zero nested cards inside glass, zero fake scores/sparkle glyphs, owner approved 3 HTML->PNG mockups.
- [ ] **Living UI Check:** Calm holds feature subtle idle breathing (float/glow/pulse), while interactive beats use elastic spring bounce or continuity morph — zero frozen-slide frames.
- [ ] **Asset Hierarchy & Quality Check:** All UI/buttons/charts built in code and 3D devices in `Three.js` (zero lazy `PNG` UI shortcuts); every optional `PNG`/`WebP` visually inspected via `read_file` (sharp, aspect-locked, zero watermarks, clean cutout edges).
- [ ] **Copy & Spelling Check:** Proofread every rendered headline, sublabel, and CTA character-by-character directly on rendered PNG stills (catches live typos like `"favortie"` before full render).
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
- [ ] Master MP4 (`60 FPS`): `1080x1920`, `60/1` fps, `< 72 MB`, `AAC 48kHz stereo`, stereo `peak <= 0.96`.
- [ ] WA / IG Story MP4 (`30 FPS`): strictly **`< 10,000,000` bytes**, `1080x1920`, `30/1` fps, stereo `peak <= 0.96`.
- [ ] Visually inspect 2 stills extracted from `< 10 MB` MP4 (`ss=2.2` & `ss=13.0`) via `read_file` to confirm crisp typography and band-free dark cobalt gradients.
- [ ] Both files copied with exact verified byte parity to the target delivery folders.
