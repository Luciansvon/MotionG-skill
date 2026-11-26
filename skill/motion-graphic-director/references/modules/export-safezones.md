# Module: Universal Vertical Safe Zones & Dual-Output Export (`< 10 MB` + `60 FPS`)

One master composition must play cleanly across **Instagram Story**, **Instagram Reels**, **TikTok**, and **YouTube Shorts**, while providing a crisp lightweight version under **10 MB** so WhatsApp transfers never stall or blur dark gradients.

## 1. Universal Safe-Zone Coordinate Map (`1080 x 1920`)

Because IG Story reserves heavy header/footer bars even without social side buttons:

| Screen Zone | Pixel Y Range (`1920px` height) | Platform Overlay Risk | Composition Rule |
|---|---|---|---|
| **Top Header** | `Y = 0 .. 245 px` | IG Story profile avatar, username, mute/close (`0..250px`), Shorts search bar | Keep clean ambient background ONLY. Start top wordmarks & titles at **`top >= 245px`** (`255px` preferred). |
| **Golden Safe Canvas** | **`Y = 245 .. 1655 px`** (`X = 72 .. 1008 px`) | Minimal obstruction (keep key copy/buttons left of `x = 880` for Reels/TikTok side icons when possible) | Place ALL headlines, liquid glass cards, macro prompt bars, 3D phone hero, and bottom pills strictly inside **`Y = 245..1655px`**. |
| **Bottom Reply/CTA Bar** | `Y = 1655 .. 1920 px` | IG Story `"Send message"` input (`~250px`), Reels/TikTok captions & usernames | Place lowest captions/pills at **`bottom >= 268px`** (`bottom: 268` to `290`, ending around `Y <= 1652px`). |

- **Approach-Fade Safety Rule:** Any floating HUD caption above (`top: 245`) or below (`bottom: 268`) an interactive 3D phone MUST smoothly fade out (`topApproachFade` + `bottomApproachFade`) before the camera leans into the OLED button so HUD overlays never overlap zoomed 3D device text!
- **Platform Duration & Master Caps:** WhatsApp Status supports up to **90s** on current versions (2025–2026), IG Story up to **60s**, and YouTube Shorts up to **179s**; keep master bitrate well under TikTok's **`72 MB`** hard compression trigger.

## 2. Portrait `9:16` vs Landscape `16:9` Reflow Law (`C-4`)

**Portrait `9:16` is a distinct layout, NOT a squeezed-down `16:9` composition.** Never port horizontal desktop choreography directly onto a `1080px`-wide mobile canvas without redesigning axis, spacing, and camera pullback:

- **Kinetic Axis Reflow:** Wide horizontal splits (`splitInsertGap` separating words left/right by `±400px`) collide with `800–900px` prompt bars on a `1080px` vertical screen. Reflow portrait split inserts into **vertical or vertical-diagonal splits** (`translateY` separation) so both word halves clear the inserted bar cleanly.
- **Zero Horizontal Edge Clipping:** Audit zoomed macro frames (`2.3x–2.45x` camera pans) on rendered PNG stills so oversized display text never clips past `X = 0` or `X = 1080`; maintain **`X = 72 .. 1008 px`** breathing margin on key readable type.
- **3D Pull-Back & Tall Geometry Clearance:** Tall 3D props (e.g., robot antennas, vertical stands, phone headers) eat into `9:16` vertical safe bounds much faster than `16:9`. Pull camera distance back cleanly (`~3.1–3.4m` for tabletop characters) or adjust camera `Y` offset so props never collide with top/bottom display lines.
- **Mobile-Calibrated Padding & Bars:** Bottom bars, pills, or step indicators must stay strictly below focal subjects or fade out cleanly (`Approach-Fade`) — never crowd or clip behind 3D geometry or lower copy.

## 3. Dual-Output Encoding Strategy

Always deliver **2 verified MP4 files** for distribution:

1. **Master Full Quality (`60 FPS` · `~25–58 MB`):**
   - Rendered natively from Remotion with **GPU acceleration** (`--gl=angle --hardware-acceleration=if-possible --concurrency=8`, calibrated to VRAM/threads — cuts render time ~5x vs low-concurrency CPU defaults). Note: Remotion disables hardware-accelerated video encoding when `--crf` is passed; use `--video-bitrate=12M --audio-bitrate=192k` to engage full hardware GPU encoding end-to-end, or `--crf=18 --audio-bitrate=192k` when prioritizing software x264 quality for crisp Reels, TikTok, YouTube Shorts, and `16:9` widescreen masters.
2. **WhatsApp & IG Story Lightweight (`< 10 MB` · `30 FPS` · `~7–9.3 MB` — Both `9:16` and `16:9`):**
   - Re-encoded cleanly via [scripts/export_wa_igstory_10mb.py](../../scripts/export_wa_igstory_10mb.py) or `ffmpeg` at **30 FPS** (`1080x1920` portrait or `1920x1080` landscape) using **2-pass `libx264 -preset slow`** (fallback automatically from `h264_nvenc` if an older NVIDIA driver rejects FFmpeg's NVENC API version) with:
     `-x264-params "aq-mode=3:aq-strength=0.9:deblock=-1,-1"` `-pix_fmt yuv420p -movflags +faststart`
   - **Why 30 FPS + `aq-mode=3`?** Splitting ~9 MB across 30 frames/sec instead of 60 gives each frame **twice the bits**, while `aq-mode=3` automatically shifts extra bits to dark cobalt/midnight areas — preventing ugly blocky compression or color banding while staying strictly **`< 10,000,000` bytes** (`AAC 128k` stereo, `+faststart`).
   - **WhatsApp Transfer Advice:** Always remind the owner to send `.mp4` files from PC to phone via WhatsApp **Document** (never Gallery/Photo compression) before uploading to IG Story so phone-side quality matches pixel-for-pixel.
