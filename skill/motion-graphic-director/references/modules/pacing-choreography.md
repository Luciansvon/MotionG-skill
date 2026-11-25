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
