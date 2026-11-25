# Style 03: Kinetic Brand Pop (Pinterest-Inspired High Contrast)

Use this direction for consumer apps, multi-feature product announcements, creative platforms, and social campaigns that need memorable rhythm switching between vibrant solid stages and 3D card grids.

## Visual Signature & Surface Physics

1. **Crisp Solid-Color Stage Switches:**
   - Instead of staying on one static background for 30 seconds, morph or wipe boldly across intentional brand stages: crisp canvas white (`#FFFFFF`) -> saturated brand punch (`#E60023` crimson, `#1438E6` cobalt, or `#111827` charcoal) -> vibrant card-wall showcase.
   - Solid flat ink backgrounds make text cutouts (`wipe-reveal` pill masks with inverted brand text color) pop cleanly without gradients or mud.
2. **3-Beat Kinetic Typography Strikes:**
   - Split a core problem or promise into 3 escalating beats (`Word1 lead-in -> Word2 bold punch -> Word3 wiped pill stamp`), paired with subtle micro camera tilts (`±2deg` `rotZ`, `±8deg` `rotY`) and damped `impactShake`.
3. **3D Tilted Feature / Module Wall:**
   - Present breadth (`6–12` compact tiles in a 3-column angled grid under `perspective: 1100px`, `rotateX ~ 13deg`, `rotateY ~ -12deg`), keeping background tiles muted and flat while **only 1 hero tile** elevates forward (`translateZ(36px+)`) for the cursor tap into detail view.

## Pacing, Camera & Audio Fit

- **Reference Benchmark (Pinterest `20.8s` promo):** **`54%` calm reading holds / `46%` punchy kinetic transitions** (`3–3.5s` settle -> `1–2s` rapid multi-beat burst -> `3s` settle).
- Always precede the primary crimson/solid punch with a **Silent Drop (`230–240 ms` BGM dip to `0.02`)** so the visual slam hits with maximum rhythm contrast without clipping audio peaks.
- Audio match: warm low-passed sub-thump (`<= 240 Hz`) + crisp dry bubble/message pops + airy transition whooshes (`lowpass=f=5500`) + pentatonic ascending chimes for grid/score sequences.
