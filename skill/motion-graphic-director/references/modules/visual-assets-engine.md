# Module: Visual Asset Hierarchy & Sourcing Engine (Code & 3D First, PNG/WebP Only When Needed)

High-craft promos combine crisp code-driven UI with realistic cutouts or photography — **but never abuse PNGs as a lazy replacement for real UI or 3D code**. Follow this strict 3-tier medium hierarchy on every storyboard.

---

## 1. Strict 3-Tier Medium Hierarchy

| Tier | Medium | Mandatory Scope | Why |
|---|---|---|---|
| **Tier 1 (Default)** | **Live Code (`HTML/CSS/SVG/Remotion`)** | ALL UI cards, buttons, pills, prompt bars, dropdowns, sidebars, tables, charts, progress borders, simple vector icons, and typography. | Stays vector-sharp at `2.4x` macro zoom and supports breathing, squash-stretch bounce, text typing, and live `morphBox` transitions. |
| **Tier 2 (3D Hero)** | **Real 3D (`Three.js` / `@remotion/three`)** | Rotating 3D smartphones, laptops, tablets, watches, metallic rim-lit hardware, orbital halos, and 3D portal screen dives. | Real perspective lighting, reflections, and seamless zoom-through into live UI screens. |
| **Tier 3 (Optional Only)** | **`PNG` / `WebP` Visual Assets** | **ONLY** when code/`Three.js` is impractical or overly complex: real food/beverages (pop-out cutouts), human hands holding devices, physical products (furniture, antiques, packaging), editorial posters, complex character art, or natural photography. | Adds tactile realism and pop-out depth where photographic/organic detail matters. |

**Anti-Lazy-PNG Ban:** NEVER flatten UI screens, buttons, dropdowns, tables, charts, or 3D phone frames into static `PNG` screenshots just to skip building them in code or `Three.js`.

---

## 2. Four-Step Sourcing Fallback (When Tier 3 Is Truly Needed)

Whenever the approved Gate 2 storyboard explicitly calls for a Tier 3 `PNG`/`WebP` asset:

1. **Owner's Authentic Assets First:** Always use real brand logos, authentic product photos, or supplied screenshots in the workspace before generating or searching anything else.
2. **AI Image Generation (`image-generator` / installed generator):** Generate lighting-, angle-, and palette-matched visuals aligned with `DESIGN.md`; export clean alpha-transparent **`PNG`** for pop-out cutouts or high-efficiency **`WebP`** for full-bleed photos/posters.
3. **Royalty-Free Commercial Stock:** When real-world photography fits better or generation is unavailable, fetch free commercial-safe stock from **Unsplash, Pexels, Wikimedia Commons, or Pixabay**.
   - **Anti-Bot Compliance:** NEVER bypass CAPTCHAs or Cloudflare gates (if Pixabay or another site blocks automated fetching, switch immediately to Unsplash/Pexels/Wikimedia or request from owner).
   - **Pinterest Copyright Rule:** Treat Pinterest strictly as **visual moodboard / inspiration reference ONLY** (most pins carry third-party copyright). Do NOT pull Pinterest images into public/commercial exports unless the owner explicitly provides them for private/internal mockups.
4. **Honest Stop & Owner Request:** If automated generation and safe stock cannot provide the exact subject (e.g., a specific physical product), stop honestly and ask the owner — never ship ugly blank gray placeholder boxes.

---

## 3. Asset Format & Visual Inspection Gate

- **Formats:** Transparent `PNG` for floating/pop-out cutouts (`>= 800px` subject height); `WebP` (`>= 1000px` long edge) for posters, scenes, and thumbnails.
- **Mandatory `read_file` Check:** Visually inspect every generated or downloaded asset before Gate 3 mockups:
  - Zero watermarks or stock badges.
  - Zero distorted AI fingers, garbled background text, or jagged alpha halos around cutouts.
  - Aspect ratio locked (`object-fit: cover/contain`, never squashed or stretched).
  - **Seamless 3D Studio PNG Card Blending:** When placing AI-generated 3D studio illustrations on colored cards (without alpha cutout), sample the image's **actual median border RGB hex** to set the card background color (never guess a nearby dark hex) and apply a soft radial vignette mask (`radial-gradient(ellipse 68% 68% at 50% 50%, black 46%, transparent 90%)`) so zero faint rectangular edge halo remains visible.
