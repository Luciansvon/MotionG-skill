# Module: UI Anti-Slop Quality Gate (Gate 3 Visual Lock & Gate 6–7 Delivery Gate)

Jumping straight into Remotion coding without locking taste, composition variety, measured contrast, and liveliness wastes full render cycles on generic "AI slop" templates.

> **Attribution:** The 3-tier anti-slop filter, Liveliness toolkit, craftsmanship criteria (`C-1..C-5`), copy audit flow, and exact unrounded WCAG contrast discipline in this module are adapted for motion graphics from **[miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop)** (MIT License, `v3.2.32`).

This module replaces simple negative-only checklists with a **Filter + Liveliness Balance**: eliminate AI slop without flattening the video into a sterile, lifeless slide deck. Visual techniques (frosted glass, shadows, glows, gradients, grids) are tools — every one is allowed **only when it earns its place with a written reason and stays within dose caps**.

---

## 1. Three-Tier Rule System & Dose Caps

### Tier 1 — Hard Gates (Absolute, Zero Exceptions)
Fail the gate immediately if any frame or `DESIGN.md` breaks these rules:
1. **`R-02` Zero Em Dashes (`—`):** Never use em dashes in headlines, sublabels, pills, CTAs, or voiceover captions. Use clean punctuation, spacing, or separate beats instead.
2. **`R-17 / R-18 / R-36 / R-38` Evidence Over Fabricated Claims:** Zero fake `4/5` readiness bars, invented percentage dials, made-up testimonials, unverified speed multipliers, or decorative gauges not backed by real measured data.
3. **`R-23` Brand Integrity:** Never invent or synthesize final company logos or official product marks unless explicitly approved by the owner.
4. **`R-25` Computed WCAG AA Contrast (`scripts/check_contrast.py`):** Never eyeball contrast ("grey on dark" or "white on blue pill"). Compute the exact **unrounded** contrast ratio via [scripts/check_contrast.py](../../scripts/check_contrast.py) against the **worst-case background pixel** behind any text or UI border:
   - Normal body/pill text: **`>= 4.5:1`**
   - Large display text (`>= 18px` bold / `>= 24px` regular): **`>= 3.0:1`**
   - Non-text UI boundaries (borders, strokes, focal controls): **`>= 3.0:1`**
5. **`R-26` Zero Dead Controls:** Never draw decorative toolbars, clickable-looking buttons, dropdowns, tabs, or chapter rails that the animation/cursor never actually interacts with. If it appears in the UI demo, interact with it — otherwise remove it.
6. **`R-35` Empirical Visual Inspection:** Never claim PASS from code compilation alone; inspect rendered PNG stills via `read_file` first.
7. **`R-37` Direction & Conflict Protocol:** Never render without a locked visual direction in `DESIGN.md`. If a requested style or color collides with a Hard Gate (e.g., light text fails `4.5:1` on brand sky blue `#0284C7` = `4.10:1`), report the exact conflict and fix the ink/fill (`#0369A1` = `5.93:1`, or dark `#082F49` on `#38BDF8` = `6.48:1`) before proceeding.

### Tier 2 — Purpose-Gate & Dose Caps (Written 1-Line Reason Required in `DESIGN.md`)
Allowed **only** when serving a clear compositional or story job:
- **`R-01` Gradients & Blobs:** Zero default blue-purple-pink rainbow blobs behind white cards. Background color transitions must come from deliberate studio lighting or authentic brand surfaces.
- **`R-04` Icons & Emoji Hygiene:** Zero glowing traffic-light status dots (`🔴 🟡 🟢`), zero 4-point Gemini sparkle glyphs next to titles, zero scattered generic icons or trailing arrows (`→`) in CTAs unless functionally earned.
- **`R-06 / R-09` Typography & Eyebrow Discipline:** Zero unreasoned font picks, zero uppercase wide-tracked eyebrow pills floating above H1 headlines repeating what the headline already says. Also ban decorative status dot-pills (e.g., `"• Agency Name"` beneath a hero title) and premature mid-video CTA buttons — reserve CTAs strictly for the closing Outro act, and showcase the owner's authentic logo as the centerpiece hero rather than generic placeholder illustrations.
- **`R-07` Grids:** Zero unmotivated background architectural grids unless structuring real modular or geometric content.
- **`R-10` Frosted Glass Dose Cap:** Maximum **1–2 glass elements per screen**. Never nest pill badges or boxed sub-cards inside an already frosted glass container — divide with crisp `1px` architectural hairlines (`rgba(255, 255, 255, 0.18)` on dark, subtle ink hairlines on light).
- **`R-12` Shadow Discipline:** Use drop shadows only as deliberate depth separation between layers, never muddy smeared halos everywhere.
- **`R-13` Glow Dose Cap:** Maximum **1–2 focal glows per screen** (e.g., active prompt rim or portal core).
- **`R-14` Anti-Card-Cage Law (Critical for 3D & Hero Products):** Not every object belongs inside a card! **NEVER cage a 3D hero model, mascot, or hardware piece inside a boxy dark/glass card.** Let 3D subjects stand directly on the color-matched studio floor or full-bleed `<ThreeCanvas>` stage.
- **`R-19` Purposeful Motion:** Every motion drives eye guidance, state response, or subtle `ambientBreath` life — zero restless endless wallpaper loops that distract from reading.

### Tier 3 — Quality Locks (What Makes It Feel Designed, Not Templated)
- **`R-05` Anti-Uniform Act Rhythm:** Never repeat the exact same visual composition across consecutive beats/acts (e.g., centered headline + middle card + bottom 5-step bar on all three mockups). Vary framing, scale, background polarity, or camera plane intentionally between acts.
- **`R-20` Swap-Logo Test:** Ask honestly: *"If the brand name and logo were swapped for a competitor, would this video still feel uniquely authored, or like a blank template?"* If generic, redesign layout + motif before rendering.
- **`R-29` Palette Cap:** Maximum **2–3 core surfaces/inks + 1 deliberate accent** color per video (unless executing explicit multi-brand act flips in Styles `03` or `08`).
- **`R-31` Keystone Rule:** Every major design decision in `DESIGN.md` (palette, font pairing, accent, surface treatment, animation motif) must include a **1-line rationale** explaining why it serves this product and story.

---

## 2. Liveliness Toolkit (Preventing Sterile, Lifeless Defaults)

Deleting slop without adding authorship produces boring slides. Lock these in `DESIGN.md` **before** building Gate 3 mockups:

1. **Mandatory 1-Line Design Read:**
   > `"Reading this as: <video type> for <audience>, in <visual language>, dial ENERGY X / RHYTHM Y / MOTION Z"`
2. **Three Expressive Dials (`1–3`):**
   - **`ENERGY` (`1` calm editorial -> `2` crisp product demo -> `3` punchy kinetic pop)**
   - **`RHYTHM` (`1` steady uniform pacing -> `2` calm holds + tactile snaps -> `3` strong compositional & polarity shifts across acts)**
   - **`MOTION` (`1` clean slide & fade -> `2` ambient breathing + elastic spring clicks -> `3` expressive squash-stretch, continuity morphs & 3D sweeps)**
3. **Five Positive Liveliness Levers:**
   - **One clear focal point per beat** (the viewer's eye knows immediately where to land).
   - **Sharp typographic contrast** (dramatic weight/scale gap between hero headline and sparse micro-label).
   - **Intentional whitespace** (breathing room used as structure, not leftover margins).
   - **One disciplined accent** (draws focus strictly to the active click, state change, or CTA).
   - **Recurring identity motif** (e.g., studio floor shadow + orbital ring + cursor bounce tying all acts into one film).

---

## 3. Five Craftsmanship Criteria (`C-1` to `C-5`)

| Criterion | Meaning in Motion Graphic Production |
|---|---|
| **`C-1` Intentionality** | Every element on screen has a written 1-line reason (`R-31`). Zero filler badges or leftover template bars. |
| **`C-2` Functional Completeness** | Every shown UI control (`button`, `dropdown`, `tab`, `chapter pill`) is actively used on screen, or removed cleanly (`R-26`). |
| **`C-3` Content-Driven Composition** | Each act's layout grows out of what the beat must prove (e.g., 3D turnaround needs full canvas; CLI step needs clean prompt bar), never forced into uniform cards (`R-05`, `R-14`). |
| **`C-4` Multi-Aspect Resilience** | Vertical `9:16` uses its own reflowed choreography, spacing, and pull-back camera framing rather than squeezing `16:9` horizontal moves (see [export-safezones.md](./export-safezones.md)). |
| **`C-5` Evidence Over Claims** | Show actual product output, verified renders, real geometry counts, or genuine interactions (`R-17`, `R-38`). |

---

## 4. On-Screen Copywriting Anti-Slop Filter

Short video copy (`2–6 words/beat`) magnifies AI clichés instantly. Ban these patterns in all on-screen text and micro-VO:
- **Empty AI Vocabulary:** *unlock, elevate, seamless, revolutionary, cutting-edge, game-changer, supercharge, next-level, effortless magic*.
- **Significance Inflation:** *"the future of..."*, *"a new era of..."*, *"redefining how..."*.
- **Negative Parallelism:** *"It's not just X, it's Y"* / *"Bukan sekadar X, tapi Y"*.
- **Staccato Drama:** *"No guesswork. No delays. Pure power."*
- **Theatrical Takeaways & Temporal Clichés:** *"Read that again."*, *"In today's fast-paced world..."*.
- **Generic CTAs & Ornamentation:** Avoid vague *"Get Started"* or *"Learn More"* when a concrete action works (*"Clone Skill"*, *"Coba Sekarang"*, *"Open Repo"*). Zero emojis in headlines; zero em dashes (`—`).

**Mandatory 3-Pass Copy Loop in `DESIGN.md`:**
`Draft` -> `Audit` (cut excess words to `2–6/beat`, strip AI phrasing, verify factual claims) -> `Final`.

---

## 5. Mandatory Gate 3 Workflow & Windows Headless Chrome Rules

1. **Write `DESIGN.md`:** Include the 1-line **Design Read**, **`ENERGY / RHYTHM / MOTION`** dials, palette + font tokens with `R-31` rationales, surface/glow dose inventory, `Draft -> Audit -> Final` copy table, and exact contrast check table.
2. **Build 3 Static Mockups (`HTML` -> `PNG`):** Cover opening hero, core interactive/3D stage, and closing lockup at target aspect ratio, ensuring **3 visibly distinct compositions (`R-05`)**.
3. **Run `scripts/check_contrast.py`:** Test every foreground-ink / background-pixel pair (including worst-case gradient/image spots) and focal UI boundaries:
   ```bash
   python scripts/check_contrast.py --batch "#111827:#F5F5F3" "#082F49:#38BDF8"
   ```
   Use `--mode large` or `--mode ui` only for `>= 18px` bold / `>= 24px` display text or borders. Both must report **PASS**.
4. **Capture PNGs Safely on Windows:**
   - **Avoid `file://` `SecurityError`:** `<canvas>` readback or local asset textures taint under `file:///`. Always serve via ephemeral local HTTP (`python -m http.server` on `127.0.0.1:<random_port>`) during capture.
   - **Avoid Blank Chrome Screenshots:** On Windows, `chrome.exe --headless=new --screenshot=...` requires a fresh temporary `--user-data-dir=<temp_dir>` plus `--window-size=1080,1920 --force-device-scale-factor=1 --hide-scrollbars`.
5. **Inspect Visually & Lock Owner Approval:** Read all 3 PNGs via `read_file`, then present them to the owner for **explicit approval** before coding Remotion timelines. When restyling approved mockups, preserve pacing/choreography unless asked.

---

## 6. Four-Block Evidence-Backed Delivery Gate (Gate 6–7)

Before marking any video ready in Gate 6–7, verify and report these 4 concrete blocks citing actual tool outputs and inspected PNGs:

1. **Block 1 — Hard Gates & Contrast Evidence:** `0` em dashes (`R-02`), `0` fabricated claims (`R-17..38`), `0` dead buttons (`R-26`), `check_contrast.py` exact ratios logged (`>= 4.5:1` / `>= 3.0:1`), stills inspected (`R-35`).
2. **Block 2 — Purpose-Gate & Dose Caps:** Glass `<= 2`, glow `<= 2`, shadow purposeful (`R-10..13`), zero card cages around 3D heroes (`R-14`), all deviations justified in 1 line.
3. **Block 3 — Liveliness & Rhythm:** Design Read & `ENERGY/RHYTHM/MOTION` dials honored, 5 liveliness levers active, consecutive acts vary layout (`R-05`).
4. **Block 4 — Craftsmanship, Copy & Reflow:** `C-1..C-5` pass, Swap-Logo Test (`R-20`) pass, `R-29` palette cap (`<= 3+1`), `R-31` rationales complete, Copy `Draft -> Audit -> Final` clean, `9:16` reflow stills clean (`0` edge clip / overlap).

---

## 7. Scope Boundary (Intentionally Excluded Web-DOM Rules)

DOM-specific rules from web-page anti-slop checklists (interactive FAQ accordions `R-28`, `Tab`/`Escape` keyboard trapping `R-32`, semantic `<a href>`/`aria-label` tags `R-39`, Core Web Vitals `LCP`/`CLS` `R-40`, and inline source-comment hygiene) are intentionally **omitted** here so this runbook stays focused on kinetic video craft. Only visual interaction truthfulness (`R-26` / `C-2`: never drawing dead UI controls) applies to motion graphics.
