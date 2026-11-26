# Module: Slow-Fast-Slow Pacing Choreography

Never pace a UI/product promo evenly from start to finish. Rushing 6 full acts into `20–22s` destroys readability; dragging every transition slowly feels like a PowerPoint slideshow. The proven secret from top consumer-app promos is **high contrast between calm holds and crisp kinetic transitions**.

## Quantitative Reference Benchmarks

Measured directly on verified vertical app promo references:

| Benchmark | Total Duration | Calm / Floating Time | Rapid Kinetic Time | Narrative Style |
|---|---|---|---|---|
| **Gojek Reference** | `14.3s` | **81.2%** (`~11.6s`) | `18.8%` | Single crisp interactive flow, 3.7s calm opener, 4.0s relaxed outro |
| **Pinterest Reference** | `20.8s` | **54.0%** (`~11.2s`) | `46.0%` | Rhythmic alternation: 3–3.5s calm read -> 1–2s snap burst -> 3s settle |
| **6-Act Full Product Demo** *(TA Modular Mentor v4)* | **`34.0s`** (`2040f @ 60fps`) | **`~65%`** | `~35%` | Relaxed macro opener (`5.0s`), crisp 3-beat critique (`5.8s`), 3D showcase (`5.7s`), calm 3-card rack-focus (`7.2s`), grid->modal (`6.3s`), serene outro (`4.0s`) |
| **Starbucks Delivery Ref** *(Corpius.ae, 16:9)* | `19.8s` | **62.8%** (`~12.4s`) | `37.2%` (`22.7x` burst) | Macro logo play (`3s`) -> tilted 3D catalog sweep (`5s`) -> card-to-tracker morph (`5s`) -> symmetric outro (`6s`) |
| **Claude Dark Ref** *(16:9)* | `12.0s` | **68.1%** | `31.9%` | Light-arc logo -> macro dropdown switch -> pull-back stream -> 3-beat verb swap |
| **Apple Minimal Ref** *(Bart_VFX, 16:9)* | `46.5s` | **82.7%** | `17.3%` (`92.5x` burst) | Visual-explain metaphors + elastic heart/capsule morphs on monochrome flips |
| **Sleeko HowDo Ref** *(4:3)* | `44.4s` | **78.0%** | `22.0%` (`14.2x` burst) | Persistent 4-chapter bottom rail (`Intro -> Problem -> Use Case -> CTA`) |
| **Pinterest Graphic Ref** *(16:9)* | `22.8s` | **57.8%** | `42.2%` (`38.4x` burst) | Depth-blur floating posters -> bouncing pills -> curved Like-to-Save pointer sweep |
| **ChatGPT Elastic Ref** *(16:9)* | `10.9s` | **42.9%** | `57.1%` (`11.1x` burst) | Rapid spring-physics icons, App Store peek, home-screen badge bounce |
| **Apple Widgets Ref** *(dnyxstudios, 16:9)* | `12.2s` | **64.6%** | `35.4%` (`118.7x` burst) | Split-sentence prompt insert -> floating widgets -> 5-card fan spread |
| **ChatGPT HusniXD Ref** *(16:9)* | `45.0s` | **78.8%** | `21.2%` (`11.8x` burst) | Minimal copy + drag-drop glow, sidebar/table pan, morphing image pill, voice orb |
| **Vercel / v0 Ref** *(`@__mcvisuals__`, 16:9)* | `9.37s` | `52.8%` | `47.2%` (`3.07x` burst) | Dark macro navbar -> optic blur-to-sharp card -> score ring (`16->96`) -> prompt -> `Visit` CTA |
| **Apple Store AirPods Ref** *(`@apollox_ae`, 1:1)* | `8.60s` | **66.7%** | `33.3%` (`6.56x` burst) | Particle logo -> 3D device burst -> mood-shifting variant card -> wide feature spec (`peak 0.398`, `81.9%` quiet) |
| **Grok Bots Ref** *(`@stepan.straufvfx`, 16:9)* | `10.03s` | **64.1%** | `35.9%` (`3.69x` burst) | Wavy dark cloth + macro typing -> 5 eyed sticker bots -> blue bot hops spelling `G-r-o-k.` |
| **Lovable Ref** *(`@rawedits.10`, 16:9)* | `21.50s` | `35.3%` *(hyper-dense)* | `64.7%` (`18.11x` burst) | Petal wipe -> giant brand prompt -> 3D screen galaxy -> aurora auth -> visual inspector (`Header` box) |
| **Spotify UI Ref** *(`@apollox_ae`, 1:1)* | `12.70s` | `34.0%` *(beat-cut)* | `66.0%` (`5.57x` burst) | Dock zoom -> app icon morphs into searchbar -> dark player + lyrics -> beat-synced whip reprise |
| **Supabase Ref** *(`@refined.motion`, 16:9)* | `22.03s` | **80.5%** (`40.2%` near-static) | `19.5%` (`14.66x` burst) | Diagonal emerald beams -> halftone prompt-to-SQL -> cursor-tethered table edit -> multi-cursor `Build together` (`93.2%` quiet) |
| **Polifurneka Kendal Promo** *(16:9, 60 FPS)* | `36.01s` | **90.2%** (`23.1%` near-static; cut from `49.0%`) | `9.8%` (`4.1x` burst) | Minimal 1–4 word beats -> symmetric split prompt -> official crest -> 3D PNG chameleon deck -> `70%` vs `30%` collision bounce -> multi-cursor collab |

## Non-Negotiable Pacing Rules

1. **No Voiceover (VO) Default:** Omit narrator speech on kinetic UI/product promos unless explicitly asked. Long VO sentences force visuals to freeze unnaturally while waiting for speech completion. Let visuals, cursor interaction, concise copy, and ASMR SFX drive comprehension. When VO is explicitly requested (like the 19.8s Starbucks reference), cap spoken phrases to 3–6 words per beat so motion stays crisp and never stalls.
2. **Minimum Calm Reading Hold (`>= 1.8s`):**
   - Any quoted text, card headline + description, or punchy claim must stay readable for **`1.8s` to `2.2s`** before morphing, striking through, or scrolling away (never `0.76s`–`1.1s`).
3. **Separate Fast Transitions (`0.35s–0.85s`) from Calm Holds:**
   - Slow doesn't mean sluggish transitions: keep camera snaps, button rebounds, portal dives, and color wipes crisp (`snappyInOut`, `snappyOut`, `overshoot`), then let the composition breathe cleanly.
4. **Budget Total Duration by Act Count:**
   - `1–2` features: `12s–18s`.
   - `3–4` features: `22s–26s`.
   - `5–6` acts: **`30s–36s`** (stays well below Instagram Stories `60s` max card and YouTube Shorts `179s` hard cap).
5. **Dual-File Master Lock:** Keep `timeline.ts` constants (`FPS`, `ACTS`, `CUES`) locked 1:1 with timestamps in `mix.py` so every click, keystroke, drop, and Silent Drop lands within `±16 ms` (1 frame @ 60 FPS).
6. **Visual-Explain Copy Budget (`2–6` Words Max Per Beat):** Never dump explanatory sentences on screen. Pair `2–6` short bridge words with real visual demonstrations (drag-drop, dropdown pick, morphing status, or card fan).
7. **Fast-Motion Cap (`> 60%` Kinetic Warning):** Measurements on `Lovable` (`64.7%` kinetic, `2.8%` quiet audio) and `Spotify UI` (`66.0%` kinetic) confirm that sustained `> 60%` rapid motion fatigues viewers when explaining real product info. Reserve high-kinetic ratios strictly for `<= 12s` music-synced teasers; keep multi-feature product demos anchored inside **`55%–83%` calm holds** (like `Supabase`'s `80.5%` calm / `93.2%` quiet headroom) with `2` brief Silent Drops.
8. **Hard Dead-Freeze Ceiling (`near_static_pct < 28%`):** High readable calm time (`calm_float_or_read_pct ~80%–92%`) does **NOT** mean frozen screenshots. Never let any scene sit completely motionless for `> 1.2s` (avoid `3–5s` static holds). Keep subtle background drift (panning grid or sweeping light beams), slow camera push/orbit, rotating halos, or staggered `ambientBreath` alive continuously so `audit_pacing_and_audio.py` measures **`near_static_pct < 28%`**.
