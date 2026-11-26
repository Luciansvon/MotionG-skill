# Style 06: Custom Reference Adapter (Owner Visual / Video Decomposer)

**Mandatory Activation:** Whenever Bima or the user supplies custom reference screenshots, UI inspirations, moodboards, or competitor promo videos, DO NOT force any preset style above. Decompose the supplied reference systematically using these 4 steps before writing `DESIGN.md` or motion code.

## Step 1: Extract Physical Aesthetic (`R-30` & `R-37` Rule)

From uploaded images or extracted video keyframes (`ffmpeg` + `read_file`):
1. **Background Physics:** Solid matte flat, multi-stage color flips, warm paper editorial, dark hardware studio, or 3D draped ambient waves? Sample exact dominant hex palette.
2. **Surface Medium & Restraint:** How do cards/containers separate from the background? (Glass refraction/bevel, soft shadow elevation, hairline borders, or raw open type?) Count max simultaneous elevated elements per frame (`<= 2` glass/elevated slabs).
3. **Typography Weight & Contrast:** Bold vs light pairing, serif vs sans vs mono ratio, average words per beat, and safe text-over-background contrast (`>= 4.5:1`).
4. **Physical Medium Only (`R-30`):** Adopt the *physical medium, spacing, lighting, and motion physics* of the reference while writing 100% original product copy, UI structures, and brand facts (never clone competitor UI or generic scores).

## Step 2: Measure Quantitative Pacing & Frame-Exact Motion (`audit_pacing_and_audio.py` + `rea-video`)

When the reference includes a `.mp4`/`.mov` video, run our pacing/audio audit first and optionally pair it with `rea-video` (see [reference-video-extractor.md](../modules/reference-video-extractor.md)) inside a scratch folder:
```bash
python scripts/audit_pacing_and_audio.py "<reference_video_path>"
rea-video --lang en decompose "<reference_video_path>" -o "<scratch_out_dir>"
```
Record and honor (after visual verification via `read_file`):
- **Total Duration & `@frame` Beat Map:** Average seconds per beat and exact `@frame` transition indices from `video/rhythm.md` (target `>= 1.8s` calm hold on key readable lines).
- **Calm vs. Kinetic Motion Ratio:** Match the reference's actual energy profile (e.g., `80%` calm like Gojek/Supabase vs `54%` calm / `46%` punchy like Pinterest) — never convert a relaxed reference into a frantic hyper-cut edit, and cap `> 60%` rapid motion to `<= 12s` teasers.
- **Camera Velocity & Audio Stems:** Extract measured `zoom/pan` rates + background glow coordinates from `frames/scenes.json`, BPM + SFX timestamps from `video/sound.md`, and verify peak/crest/quiet ratio (`quiet50ms_pct`) plus true presence or absence of voiceover (never trust offline TTS guesses blindly).

## Step 3: Capture Spatial Framing Annotations (Red Boxes / Crop Guides)

When the user sends annotated screenshots (such as red boxes/arrows indicating zoom magnification, object size, or pan direction):
- **Measure pixel proportions precisely in Python** (`box_width / video_width`, `box_height / video_height`, center `(cx, cy)` relative to 9:16 frame) instead of guessing by eye.
- Translate target width ratios directly into CSS/3D scale multipliers (`target_zoom = video_width / box_width`) and verify via rendered stills (`read_file`).

## Step 4: Verify Before Full Production

Produce 3 `1080x1920` UI mockups (plus quick motion timing breakdown in `DESIGN.md`) grounded in the decomposed reference and request owner confirmation before full video generation.
