"""Audit pacing (calm vs kinetic motion ratio), video specs, and stereo (-ac 2) audio metrics.

Usage:
    python audit_pacing_and_audio.py path/to/video_or_audio.mp4
"""

import argparse
import json
import subprocess
from pathlib import Path
import numpy as np

SR = 48000


def analyze_audio(path: Path) -> dict | None:
    """Measure true stereo (-ac 2) audio peak, RMS, crest factor, quiet hold ratio, and dynamics."""
    try:
        raw = subprocess.check_output(
            ["ffmpeg", "-v", "error", "-i", str(path), "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
        )
    except subprocess.CalledProcessError:
        return None
    if not raw:
        return None
    st = np.frombuffer(raw, dtype=np.float32).reshape(-1, 2)
    peak = float(np.max(np.abs(st)))
    rms = float(np.sqrt(np.mean(st**2)) + 1e-12)
    crest_db = float(20.0 * np.log10((peak + 1e-12) / rms))
    hop = int(0.05 * SR)
    frames = np.array([float(np.sqrt(np.mean(st[i : i + hop] ** 2))) for i in range(0, max(1, len(st) - hop), hop)])
    quiet_pct = float(np.mean(frames < 0.05) * 100.0)
    dyn_db = float(20.0 * np.log10((np.percentile(frames, 95) + 1e-6) / (np.percentile(frames, 10) + 1e-6)))
    return {
        "dur_s": round(len(st) / SR, 3),
        "peak": round(peak, 3),
        "rms": round(rms, 3),
        "crest_db": round(crest_db, 2),
        "quiet50ms_pct": round(quiet_pct, 2),
        "dyn_p95_p10_db": round(dyn_db, 2),
    }


def analyze_video_pacing(path: Path, sample_fps: int = 4) -> dict | None:
    """Estimate calm vs rapid kinetic frame percentage by sampling grayscale frame differences."""
    w, h = 135, 240
    try:
        raw = subprocess.check_output(
            [
                "ffmpeg", "-v", "error", "-i", str(path),
                "-vf", f"fps={sample_fps},scale={w}:{h},format=gray",
                "-f", "rawvideo", "-",
            ]
        )
    except subprocess.CalledProcessError:
        return None
    frame_bytes = w * h
    n_frames = len(raw) // frame_bytes
    if n_frames < 2:
        return None
    arr = np.frombuffer(raw[: n_frames * frame_bytes], dtype=np.uint8).reshape(n_frames, frame_bytes).astype(np.float32)
    diffs = np.mean(np.abs(np.diff(arr, axis=0)), axis=1)
    near_static_pct = float(np.mean(diffs < 2.2) * 100.0)
    calm_read_pct = float(np.mean(diffs < 10.0) * 100.0)
    rapid_pct = float(100.0 - calm_read_pct)
    p25 = float(np.percentile(diffs, 25))
    p90 = float(np.percentile(diffs, 90))
    return {
        "sampled_frames": int(n_frames),
        "mean_motion_diff": round(float(np.mean(diffs)), 2),
        "p25_motion_diff": round(p25, 2),
        "p90_motion_diff": round(p90, 2),
        "burst_ratio_p90_p25": round(p90 / max(p25, 0.2), 2),
        "near_static_pct": round(near_static_pct, 1),
        "calm_float_or_read_pct": round(calm_read_pct, 1),
        "rapid_transition_pct": round(rapid_pct, 1),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Audit video pacing, stream format, and stereo audio quality.")
    parser.add_argument("media_path", type=Path, help="Path to MP4/MOV/WAV/MP3 file")
    args = parser.parse_args()

    p = args.media_path
    if not p.exists():
        raise SystemExit(f"File not found: {p}")

    info = json.loads(
        subprocess.check_output(
            [
                "ffprobe", "-v", "error",
                "-show_entries", "stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels:format=duration,size,bit_rate",
                "-of", "json", str(p),
            ]
        ).decode()
    )
    streams = info.get("streams", [])
    has_video = any(s.get("codec_type") == "video" for s in streams)
    sz = p.stat().st_size
    report = {
        "file": str(p),
        "bytes": sz,
        "mb_decimal": round(sz / 1_000_000, 2),
        "mib": round(sz / (1024 * 1024), 2),
        "ffprobe": info,
        "audio_stereo": analyze_audio(p),
        "visual_pacing": analyze_video_pacing(p) if has_video else None,
    }
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
