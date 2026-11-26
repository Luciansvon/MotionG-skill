# Module: ASMR Tactile Sound Design & Audio Mastering

Harsh stock FX (metallic camera shutters, classic clacking typewriters, cartoonish slaps/dashes, unfiltered plastic clicks) ruin premium minimalist visuals. Replace every UI cue with pleasant, rounded **ASMR tactile textures** inspired by glossy pentatonic water drops.

## 1. Forbidden Audio Traps (Learned from Failed Audits)

1. **NEVER apply `highpass > 80 Hz` to UI/impact SFX:** A vocal highpass (`f=140`) quietly stripped `-13.5 dB` off soft clicks and `-21.4 dB` off card snaps in earlier mixes. Keep only sub-rumble protection (`highpass=f=28`).
2. **Ban Harsh / Metal / Cartoon FX:** Replace `classic_typewriter`, `camera_shutter`, harsh `punch`, and `cartoon_dash` with velvety mechanical *thock*, soft mouse presses, water/bubble pops, and warm low-passed air whooshes.
3. **NEVER Bypass Anti-Bot Walls:** If a stock site like Pixabay returns HTTP `403`/Cloudflare during automated fetching, NEVER attempt workarounds/bypasses. Use clean open-license sources below or existing verified local libraries.
4. **NEVER Measure Peak with Downmixed Mono (`-ac 1`):** `ffmpeg -ac 1` sums `0.707*(L+R)` and produces fake `peak > 1.0` alerts on clean stereo WAV/MP4 files. ALWAYS verify stereo tracks using `-ac 2`.

## 2. Verified Royalty-Free ASMR Sound Sourcing

| Sonic Role | Verified Source / Recipe | Acoustic Tuning (`af_extra` / Envelope) |
|---|---|---|
| **Creamy Mechanical Typing (Per-Letter + Space)** | Open-source MIT packs from [`kamillobinski/thock-soundpacks`](https://github.com/kamillobinski/thock-soundpacks): **Topre** (`~550 Hz` creamy deep thock `1.wav–5.wav`, spacebar `201.wav`) + **Gateron Ink Black** | Fire 1 hit per typed character (`gain 0.50–0.66`, subtle pitch variation `[0.97..1.03]`, `lowpass=f=5200`; spacebar `gain 0.66`, `pitch 0.95`, `lowpass=f=4600`) |
| **Soft Glassy Cursor Click** | CC0 `mouse_orochi` / Pixabay-licensed `mouse_pixabay` via `thock-soundpacks` (`1.wav` press only — never key-up clicks) + Mixkit `select_click.mp3` | Trim silence, gentle `lowpass=f=4800` so plastic harshness becomes glass-like (`gain 0.68–0.80`) |
| **Velvet Pop / Water Drops** | Mixkit `liquid_bubble.mp3` (`455 Hz`), `water_bubble.mp3` (`912 Hz`), `dry_pop.mp3` (`825 Hz`), `message_pop.mp3`, `bubble_pop_alert.mp3`, `soap_bubble.mp3` (slice single hit `135–280ms`), + `sfx1_water_drop.wav` | Pitch `sfx1_water_drop.wav` cleanly along pentatonic ratios (`[1.0, 1.1225, 1.2599, 1.4983]`) for sequential examiner tabs / rows |
| **Silky Air Whoosh** | Mixkit `air_whoosh.mp3` (`centroid 194 Hz`), `fast_whoosh.mp3`, `sparkle_whoosh.mp3` | Slice right around peak energy (`air_whoosh`: `480–1220ms`; `fast_whoosh`: `460–850ms`) + `lowpass=f=5500` so sweeps glide without hiss |
| **Warm Sub-Thump Impact** | Deep cinema boom tail (`sfx2_cinematic_boom.wav`) paired under a soft dry pop | Strip upper transient edge with **`lowpass=f=240`** (`gain 0.74–0.78`) -> feels warm in headphones without sharp transient slap |
| **Serene Outro Chime** | Mixkit `relaxing_chime.mp3` (`0–1350ms`) / `correct_tone.mp3` (`0–750ms`) | Gentle `lowpass=f=6800–7200`, warm fade out |

## 3. Onset Trim, Silent Drops & Mastering Discipline

1. **Zero-Latency Onset Trim:** Inspect envelope first (`hit_idx = argmax(mono_abs >= 0.08 * peak)` minus `2 ms`). Mixkit whooshes often have `450+ ms` of quiet buildup before peak impact — slice `start_ms`/`end_ms` explicitly so motion and peak hit in sync!
2. **Dynamic BGM Crossfade & 2 Silent Drops:**
   - Blend full-spectrum BGM (`bgm_full`) with warm low-passed BGM (`bgm_warm`, `lowpass=f=850`) via `vol_env * bright_env`: calm reading sections drop warm and quiet (`0.30–0.44`), kinetic punches open bright (`0.84–1.00`).
   - Carve **`2` brief Silent Drops (`230–240 ms` @ `0.02` gain)** right before major narrative turns (e.g., critique strike & anti-joki stamp).
3. **Final Stereo Mastering Chain (`ffmpeg`):**
   - Normalize SFX bus to `0.85` peak, mix with `duck`-modulated BGM, apply smooth soft-knee tanh > `0.92`, then master:
     `loudnorm=I=-15.5:TP=-1.0:LRA=13:linear=false,alimiter=limit=0.90:level=false:attack=1:release=45`
   - Verified targets (`-ac 2`): **`peak <= 0.92`**, **`crest_db >= 14.0 dB`**, **`dyn_p95_p10_db >= 12.0 dB`**.

## 4. Exception: Pure-Music Lyric & Song Edits
For lyric videos or song-driven edits, **omit all synthetic ASMR SFX and artificial Silent Drops** — use 100% original music audio only. Apply gentle stereo peak-safety limiting (`<= 0.92`) plus brief edge fades (`0.15s` in / `0.70s` out), and extract a 60 FPS `audio-envelope.json` (`rms` + low-passed `bass`) for exact beat reactivity (see [lyric-kinetic-mode.md](./lyric-kinetic-mode.md)).
