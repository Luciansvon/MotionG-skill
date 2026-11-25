"""Encode a sharp <10 MB MP4 suitable for WhatsApp transfer and Instagram Story.

Uses 2-pass libx264 (30 FPS, 1080x1920) with aq-mode=3 dark-gradient protection,
auto-retrying once at 93% video bitrate if output exceeds 9.9 MB, verifying stereo
audio peak and optionally extracting inspection stills.
"""

import argparse
import json
import os
import subprocess
from pathlib import Path
from audit_pacing_and_audio import analyze_audio


def probe_duration(path: Path) -> float:
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", str(path)]
    ).decode()
    return float(json.loads(out)["format"]["duration"])


def run_two_pass(
    src: Path,
    dst: Path,
    vb_kbps: int,
    fps: int,
    audio_kbps: int,
    pass_prefix: Path,
) -> None:
    null_sink = "NUL" if os.name == "nt" else "/dev/null"
    maxrate_kbps = int(round(vb_kbps * 1.26))
    bufsize_kbps = int(round(vb_kbps * 2.0))
    common_v = [
        "-r", str(fps),
        "-c:v", "libx264",
        "-preset", "slow",
        "-profile:v", "high",
        "-level", "4.1",
        "-pix_fmt", "yuv420p",
        "-b:v", f"{vb_kbps}k",
        "-maxrate", f"{maxrate_kbps}k",
        "-bufsize", f"{bufsize_kbps}k",
        "-x264-params", "aq-mode=3:aq-strength=0.9:deblock=-1,-1",
    ]
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", str(src), *common_v, "-pass", "1", "-passlogfile", str(pass_prefix), "-an", "-f", "mp4", null_sink],
        check=True,
    )
    subprocess.run(
        [
            "ffmpeg", "-y", "-v", "error", "-i", str(src), *common_v,
            "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
            "-pass", "2", "-passlogfile", str(pass_prefix),
            "-c:a", "aac", "-b:a", f"{audio_kbps}k", "-ar", "48000", "-ac", "2",
            "-movflags", "+faststart", str(dst),
        ],
        check=True,
    )
    for leftover in pass_prefix.parent.glob(f"{pass_prefix.name}*"):
        leftover.unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Encode sharp <10 MB 2-pass MP4 for WhatsApp & IG Story.")
    parser.add_argument("input_mp4", type=Path, help="High-quality 60 FPS source MP4")
    parser.add_argument("-o", "--output", type=Path, required=True, help="Target <10 MB MP4 path")
    parser.add_argument("--target-mb", type=float, default=9.0, help="Target output size in decimal MB (default: 9.0)")
    parser.add_argument("--fps", type=int, default=30, help="Output framerate (default: 30)")
    parser.add_argument("--audio-kbps", type=int, default=128, help="AAC audio bitrate kbps (default: 128)")
    parser.add_argument("--check-stills-dir", type=Path, default=None, help="Optional dir to save 2 inspection stills")
    args = parser.parse_args()

    src = args.input_mp4
    dst = args.output
    if not src.exists():
        raise SystemExit(f"Source MP4 not found: {src}")
    dst.parent.mkdir(parents=True, exist_ok=True)

    dur = probe_duration(src)
    total_kbps = (args.target_mb * 8_000_000.0) / max(dur, 1.0) / 1000.0
    vb_kbps = max(450, int(round(total_kbps - args.audio_kbps)))
    pass_prefix = dst.with_name(f"_{dst.stem}_passlog")

    run_two_pass(src, dst, vb_kbps, args.fps, args.audio_kbps, pass_prefix)
    if dst.stat().st_size >= 9_900_000:
        vb_retry = max(400, int(round(vb_kbps * 0.93)))
        run_two_pass(src, dst, vb_retry, args.fps, args.audio_kbps, pass_prefix)
        vb_kbps = vb_retry

    stills_written = []
    if args.check_stills_dir is not None:
        args.check_stills_dir.mkdir(parents=True, exist_ok=True)
        for sec in [round(min(2.2, dur * 0.15), 2), round(dur * 0.38, 2)]:
            out_png = args.check_stills_dir / f"{dst.stem}_t{sec}s.png"
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(sec), "-i", str(dst), "-frames:v", "1", str(out_png)], check=True)
            stills_written.append(str(out_png))

    sz = dst.stat().st_size
    print(json.dumps({
        "output": str(dst),
        "video_kbps": vb_kbps,
        "bytes": sz,
        "mb_decimal": round(sz / 1_000_000, 2),
        "mib": round(sz / (1024 * 1024), 2),
        "under_10mb": sz < 10_000_000,
        "audio_stereo": analyze_audio(dst),
        "stills": stills_written,
    }, indent=2))


if __name__ == "__main__":
    main()
