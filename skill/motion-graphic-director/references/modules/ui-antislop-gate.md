# Module: UI Anti-Slop Quality Gate (Before Motion Coding)

Jumping straight into Remotion animation without verifying static UI aesthetics wastes full render cycles on generic "AI slop" templates. Lock aesthetics via `anti-slop` + visual mockup approval first.

## 1. Hard Anti-Slop Ban List (Never Allow in UI Mockups or Video)

Reject any frame containing these generic AI clichés:
1. **Glowing Traffic-Light Status Dots (`🔴 🟡 🟢`):** Use clean typography contrast and restrained neutral dividers or 1 subtle semantic tint word (`#FFC7BF`) instead of neon status bulbs.
2. **Nested Cards Inside Glass:** Max **2 elevated/glass elements per screen**. Never put glowing pill badges or boxy sub-cards inside an already frosted glass container — use crisp `1px` architectural hairlines (`rgba(255, 255, 255, 0.18)`).
3. **Generic AI Icon & Badge Clutter:** Zero 4-point Gemini sparkle glyphs next to titles, zero uppercase wide-tracked eyebrow pills floating above H1 headlines, zero decorative trailing arrows (`→`) inside CTA pills unless functionally required.
4. **Invented Metric Slop:** Zero fake `4/5` readiness bars, fake percentage dials, or decorative progress gauges not backed by genuine data.
5. **Typography Slop:** Zero generic purple-cyan-pink rainbow blobs behind white cards, zero em dashes (`—`) in UI microcopy; prefer clear visual hierarchy via bold/light weight contrast and calm spacing.

## 2. Mandatory 3-Mockup Approval Flow (Gate 1)

1. Write `DESIGN.md` locking palette tokens, contrast ratios, typography families/weights, and authentic brand copy rules (`R-30` & `R-37`).
2. Build **3 static `1080x1920` HTML mockups** covering opening hero, core interactive detail/phone UI, and closing lockup.
3. Render PNG screenshots using Headless Chrome (`--headless=new`) and verify:
   - Run `antislop-human/contrast-check.py` (or direct pixel sampling) ensuring **`>= 4.5:1`** contrast across all foreground ink over rendered backdrop pixels.
   - Inspect all 3 PNGs visually via `read_file`.
4. **Present mockups to Bima for explicit approval** (remember `jangan auto approve`). Do not change choreography or pacing when restyling approved mockups unless requested.

## 3. Windows Headless Chrome Rendering Pitfalls

- **Canvas `SecurityError` over `file://`:** Opening local `.html` containing `<canvas>` textures or pixel readback directly via `file:///` taints the canvas and fails scripts. Always spin up an ephemeral local server (`python -m http.server` on `127.0.0.1:<random_port>`) during capture!
- **Blank Screenshot Without `--user-data-dir`:** On Windows, `chrome.exe --headless=new --screenshot=...` can fail or exit silently without writing PNGs unless passed a fresh temporary `--user-data-dir=<temp_dir>` per run. Always supply `--window-size=1080,1920 --force-device-scale-factor=1 --hide-scrollbars`.
