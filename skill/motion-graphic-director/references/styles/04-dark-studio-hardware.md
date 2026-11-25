# Style 04: Dark Studio Hardware (3D Device Hero & Portal Dive)

Use this direction for mobile apps, flagship product reveals, and tech hardware spotlights where a physical 3D smartphone, laptop, or tablet acts as the centerpiece bridge between teaser hook and live UI walkthrough.

## Visual Signature & Surface Physics

1. **Obsidian Studio Sweep Lighting:**
   - Deep dark ground (`#050714` to `#090D24`) illuminated by controlled directional key + cool rim lighting (`#6E8BFF` left rim, `#C9C5FF` warm-cool back kick) sculpted around anodized aluminum/titanium hardware chamfers (`metalness: 0.86–0.94`, `roughness: 0.14–0.22`).
   - Keep **physical orbital halos or subtle light arcs strictly behind** the device body (`max_z < -0.5` behind screen/back) so geometry never slices across the screen display.
2. **Hero Scale & Screen Legibility Lock:**
   - Size the 3D device hero cleanly around **`57%–60%` of vertical frame height** (`~1090–1150px` on `1080x1920`) so on-screen headlines and buttons remain genuinely readable at phone viewing distance without touching top/bottom safe-zone headers.
   - Texture the OLED screen cleanly at high canvas resolution (`>= 768x1560`, `anisotropy: 8`, `toneMapped: false` on `<meshBasicMaterial>`) using clean typographic hierarchy matching `DESIGN.md`.

## Camera Choreography & Remotion 3D Rules

- **Mandatory Layering Rule:** Always mount `<ThreeCanvas>` **OUTSIDE** `<CameraMotionBlur>` (`@remotion/motion-blur`) and never pass `frame` as a prop inside `<CameraMotionBlur>` children (stages must call `useCurrentFrame()` internally).
- **Orbital Showcase -> Lean-In Tap -> Portal Dive:**
  1. Smooth rise (`riseP`) into gentle horizontal arc (`showcaseOrbit`) showing hardware depth & rim shine while clean top title sits safely at `top >= 245px`.
  2. Approach-fade BOTH top title and bottom caption (`bottom >= 268px`) right before camera leans into the OLED screen (`leanInP`) so overlays never overlap zoomed device UI.
  3. Recompute/measure exact rendered CTA button screen coordinates (`cy` in pixels) for `CursorPointer` so cursor lands dead-center on click, triggering elastic spring recoil + glowing portal expansion (`zoomThrough`) cleanly into the next act.
