# Module: Scope Q&A & Segmented Storyboard Architecture (Gates 1 & 2)

Never start generating mockups, sourcing assets, or writing Remotion code with fuzzy requirements. Lock scope via a brief owner Q&A first, then map every second into clean visual-explain segments.

---

## 1. Gate 1 — Mandatory Scope Q&A (NEVER SKIP)

Before drafting a storyboard, conduct a concise, plain-language Q&A (1 compact round; confirm any details the owner already gave and only ask what is missing):

1. **Product & Core Message:** What product/feature are we showcasing, and what is the **1 key takeaway** the viewer must remember?
2. **Screen Format & Destination:** Vertical mobile `9:16` (`1080x1920` IG Story/Reels/TikTok/Shorts), landscape `16:9` (`1920x1080` Web/YouTube), or dual-format?
3. **Runtime Tier:** Quick hook (`10–15s`), punchy promo (`18–25s`), or full walkthrough (`30–45s`)?
4. **Visual Direction:** Custom reference images/videos supplied (triggers Style `06`), or select/blend from Styles `01–05` and `07–10`?
5. **Audio Direction:** Non-VO + ASMR tactile SFX (default), or ultra-short micro-VO (`3–6 words` per beat) + custom or curated BGM?
6. **Existing Brand Assets:** Does the owner already have authentic brand logos, real app screenshots, or product photos?

**Hard Rule:** Do NOT skip Gate 1 Q&A or jump straight to UI mockups/code without explicit owner confirmation.

---

## 2. Gate 2 — 8 Standard Storyboard Segments & Visual-Explain Rule

- **Visual-Explain First:** Keep screen copy ultra-concise (**`2–6 words` max per beat**, excluding authentic live UI copy inside the app demo itself). Replace prose explanations with real on-screen actions: drag-and-drop, dropdown switching, morphing status pills, card fans, or live counters.

| # | Segment | Ideal Duration | Role & Visual Pattern |
|---|---|---|---|
| 1 | **Hook** | `1.5–3.5s` | Arrest attention in frame 1 (light-arc logo reveal, split-sentence prompt insert, or bold 3-word claim). |
| 2 | **Problem Agitation** | `2.5–5.0s` *(optional)* | Show old-way friction visually (strikethrough critique, jumping icons, or rapid contrast stage flip). |
| 3 | **Product Reveal** | `2.0–4.0s` | Preceded by a brief Silent Drop (`230–240ms`): 3D hardware rise, angled UI plane entry, or centered icon bounce. |
| 4 | **Core Feature Demo #1** | `4.0–7.0s` | Macro interactive flow: `2.4x` typing rail, drag-drop photo into glowing input, live dropdown switch, or catalog card selection. |
| 5 | **Core Feature Demo #2** | `4.0–7.0s` *(optional)* | Secondary capability: continuity card morph to tracker, 3D card wall tap, or voice-mode orb pulse. |
| 6 | **Tangible Proof / Transformation** | `2.5–5.0s` | Concrete output: structured answer table, before-to-after image transformation, or completed status stroke. |
| 7 | **Message Lockup** | `2.0–3.0s` | Memorable 2–5 word anchor statement or rhythmic 3-beat word swap (`Brand Code -> Build -> Learn`). |
| 8 | **Outro & CTA** | `2.0–4.0s` | Symmetric brand lockup (matching opener motif) + crisp action pill or creator handle. |

---

## 3. Three Runtime Presets

- **Micro-Promo (`10–15s` · `3–4` segments):** Hook -> Product Reveal / Feature Demo #1 -> Message Lockup / Outro *(benchmarks: Claude `12.0s`, ChatGPT Elastic `10.9s`, Apple Widgets `12.2s`, Gojek `14.3s`)*.
- **Punchy Promo (`18–25s` · `5` segments):** Hook -> Product Reveal -> Feature Demo #1 -> Tangible Proof -> Outro *(benchmarks: Starbucks Corpius.ae `19.8s`, Pinterest `20.8s` & `22.8s`)*.
- **Full Walkthrough (`30–45s` · `6–8` segments):** Uses 6–8 segments including Problem Agitation & Feature Demo #2 *(benchmarks: TA Modular Mentor v4 `34.0s`, Sleeko `44.4s`, ChatGPT HusniXD `45.0s`, Apple Minimal Bart_VFX `46.5s`)*.

---

## 4. Mandatory Gate 2 Storyboard Table Format

Present this 6-column table for **explicit owner approval** before building Gate 3 mockups or sourcing Tier 3 assets:

| Segment | Time | Screen Copy (2–6 words) | Visual Action & Medium (`Code` / `Three.js` / `Optional PNG`) | Camera + Living UI (`Breath` / `Bounce`) | Audio & Drop |
|---|---|---|---|---|---|
| *(e.g., Hook)* | `0.0–2.4s` | *"Still wasting time?"* | Word splits cleanly (`Code`) as prompt bar pops inside | Macro zoom-out + `splitInsertGap` + `elasticPop` | Soft whoosh + Topre thock |
