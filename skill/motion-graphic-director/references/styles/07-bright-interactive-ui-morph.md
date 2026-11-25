# Style 07: Bright Interactive UI & Continuity Morph (Starbucks / Corpius.ae Inspired)

Use this direction for food/beverage delivery, e-commerce catalogs, interactive product selectors, and checkout or order-tracking demos. Works seamlessly in both **landscape `16:9` (`1920x1080`)** and **vertical `9:16` (`1080x1920`)** compositions.

## Visual Signature & Surface Physics

1. **Daylight Brand-Mist Canvas:**
   - Soft daylight off-white ground (`#F3F5F4` / `#EFF4F3`) framed by **2 subtle diagonally opposed radial brand-color mists** (top-left & bottom-right corners) for airy atmosphere without harsh glare or busy backgrounds.
2. **Pop-Out Product Depth Layering:**
   - Place clean cutout product PNGs breaking past the top edge of catalog cards in front of oversized muted display typography (`card base -> giant back display type -> popped-out product PNG -> crisp foreground title`) to achieve physical multi-plane depth without heavy 3D geometry.
3. **Tactile Active Card Swap:**
   - Inactive catalog cards rest in a deep muted brand tone (e.g., `#0F382B`); on cursor hover/selection, the active card warms into a complementary light surface (e.g., cream `#F4E2C6`), subtly scales up, and reveals crisp option metadata (size/variant).
4. **Perimeter Border Progress Stroke:**
   - Instead of adding an extra horizontal progress bar inside a status card, animate the rounded card's own outer border stroke (`SVG stroke-dashoffset` or conic progress border) in brand color from `0% -> 100%` synced to live status copy (`Out for Delivery -> Anytime -> Delivered`).

## Camera Choreography & Continuity Transitions

1. **Opener-to-Closer Logo Symmetry:**
   - Open with macro zoom-out wordmark -> bouncing rounded-square icon -> arcing accent dot landing onto a letterform (`i`) triggering a color flip; close by returning to the centered icon morphing cleanly into the final brand/CTA lockup.
2. **Brief Skeleton Load + 3D Tilt-to-Flat Sweep:**
   - Enter the UI surface on a tilted 3D perspective plane with brief gray skeleton placeholders (`~0.35s`) resolving into live product cards; pan horizontally following the 3D pointer across 2–3 selections, then zoom out and flatten to `0deg` when the final choice commits.
3. **Continuity Card Morph (Zero Hard Cut):**
   - On final click, dismiss unselected sibling cards cleanly while keeping the chosen product card **alive on screen**, sliding it left to become the left thumbnail slot of the pill-shaped order-tracking card.

## Pacing, Audio & Quality Upgrades (Over Original Reference)

- **Measured Benchmark (`Starbucks Delivery` / `Corpius.ae`, `19.82s`):** **`62.8%` calm readable holds** (`25.6%` near-static) vs **`37.2%` rapid transitions** with an extreme **`22.7x` burst ratio (`p90/p25`)** — explosive cuts snapping cleanly into steady reading holds.
- **Micro-VO Rule:** Non-VO + ASMR stays default; if VO is explicitly requested, cap spoken lines to `3–6 words` per beat so visuals never freeze waiting on narration.
- **4 Mandatory Upgrades over Raw Reference:**
  1. Render master at **`60 FPS`** (reference was `29.97 FPS`) for silky 3D tilt-to-flat pans.
  2. Master stereo (`-ac 2`) audio to **`peak <= 0.92`**, `crest_db >= 14.0`, with crisp soft ASMR cursor clicks (original reference clipped at `1.076` peak with only `1.52%` quiet room).
  3. **Anti-Slop Rule:** Never render decorative 5-star review badges on an active in-transit order card; show genuine ETA or step status instead.
  4. **Strict Copy QC:** Proofread every rendered headline character-by-character on Gate 4 PNG stills (original reference shipped a `"favortie"` typo).
