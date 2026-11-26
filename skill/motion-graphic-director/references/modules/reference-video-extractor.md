# Module: Reference Video Frame & Audio Extractor (`rea-video` Curated Workflow)

When the owner supplies a reference video (`.mp4` / `.mov`) for **Style 06 (`Custom Reference Adapter`)** or any new reference study, pair our quantitative pacing audit with **`rea-video`** to extract exact `@frame` timings, transitions, camera speeds, background glow coordinates, and separated audio stems (`music.wav`, `sfx/*.wav`, BPM).

> **Strict Motion-Graphic Scope (Bloat Excluded):** Use `rea-video` ONLY as a **forensic timing, camera, color, and audio-stem extractor** for UI/motion-graphic references. **Ignore** all upstream `rea-video` workflows for live-action camera/lighting rigs, AI film/short-drama remakes, paid third-party remake SaaS (`Capsule Cinema` / `ChatCut`), dance/face drivers, and default TTS voice-overs.

---

## 1. Dual-Tool Offline Extraction Pipeline

Run both tools from a **scratch/temp directory** (never store third-party `.mp4` files or raw `rea-video` output folders inside the project git repository):

1. **Macro Pacing & True Stereo Audit (Our Benchmark Standard):**
   ```bash
   python scripts/audit_pacing_and_audio.py "<reference_video_path>"
   ```
   Records exact calm-vs-rapid percentage, `burst_ratio_p90_p25`, stereo (`-ac 2`) peak, `crest_db`, and quiet room ratio (`quiet50ms_pct`).

2. **Frame-Accurate Shot, Camera & Audio Stem Extraction (`rea-video`):**
   ```bash
   rea-video --lang en decompose "<reference_video_path>" -o "<scratch_out_dir>"
   ```
   Produces per-frame timing maps (`video/rhythm.md`), separated audio stems (`stems/music.wav`, `stems/vocals.wav`, `stems/effects.wav`) + isolated SFX clips (`sfx/sfx_XX.wav`), scene-by-scene background/glow colors & camera zoom/pan velocities (`frames/scenes.json`), and element crops (`shots/shot_XXX_elements.jpg`).

---

## 2. Token-Safe Reading Order (Never Read Raw `breakdown.json`)

Read ONLY the structured summary layers via `read_file` in this order:
1. `VIDEO.md` — overall duration, FPS, shot count, and high-level mix.
2. `video/rhythm.md` — exact `@frame` indices (`0, 18, 37...`), transition types/durations, and motion beat timestamps.
3. `video/sound.md` + `audio.png` — detected BPM, musical key, section changes, and exact SFX timestamps aligned to visual events.
4. `frames/scenes.json` — ground hex, radial glow hex + normalized `(cx, cy, radius)`, drawn palette, bounding area, and camera `zoom %/s` + `pan %/s` + rotation speed.
5. `storyboard.jpg` and relevant `shots/shot_XXX_elements.jpg` — visual inspection of cropped UI controls, cursors, and layouts.

**Hard Rule:** NEVER load `breakdown.json` or full `report.md` directly into model context when `VIDEO.md` + `video/*.md` suffice.

---

## 3. Mandatory Verification & Visual Override Rules

Offline signal forensics are **measurements to inspect, never blind truth**. Always verify visually using `read_file` on the video/contact sheets before encoding into `DESIGN.md` or `timeline.ts`:

1. **Use `@frame` Indices, Not Rounded Seconds:**
   - Map motion cues directly from `video/rhythm.md` `@frame` integers (scaling `×2` when converting a `30 FPS` reference to our `60 FPS` Remotion master) so easing hits on exact beats.
2. **Override Label & OCR Misreads:**
   - `rea-video` often labels UI/motion graphics with dark particles or halftone dots as `"particles / point cloud"` or brief clean frames as `"still_motion"`, and its offline OCR sometimes misreads tiny UI labels as `"subtitles"`. Keep all UI inside **Code (Tier 1)** / **`Three.js` (Tier 2)** and proofread every word visually.
3. **Verify Audio Stems Manually (Watch for False TTS Alerts):**
   - Crisp high-pitched synths, UI pops, or mechanical typing transients frequently leak into `stems/vocals.wav` and trigger false `"TTS voice-over"` detections, while ultra-soft ASMR clicks can be missed. Always confirm presence/absence of voiceover and subtle SFX by inspecting `audio.png` and playing the reference video directly via `read_file`.
4. **Split Smooth-Transition Mega-Shots:**
   - References without hard cuts (e.g., morphing dark openers) are often merged into one long shot (`0–8.5s`). Break them cleanly into our **8 standard storyboard segments** using `frames/scenes.json` scene bounds and `change` markers in `video/rhythm.md`.
5. **Enforce `R-30` Originality & Safe Standards:**
   - Extract **only** timing ratios, camera speeds, color/glow geometry, and SFX rhythm. Rebuild 100% original copy, brand assets, `>= 4.5:1` WCAG contrast, `<= 0.92` stereo peak, and `55%–83%` calm holds (`2` Silent Drops) in Remotion.
