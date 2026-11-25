"""Reusable ASMR Tactile & Dynamic BGM Audio Mixer Template.

Adapts clean stereo mixing, 0ms SFX onset auto-trim, low-pass warmth shaping,
BGM warm/bright crossfades with Silent Drops, EBU R128 mastering, and stereo
(-ac 2) verification. Copy into a Remotion project root and customize `schedule_cues`.
"""

import json
import subprocess
import wave
from pathlib import Path
import numpy as np

SR = 48000


def load_ffmpeg_stereo(
    path: Path,
    ss: float | None = None,
    dur: float | None = None,
    af_filter: str | None = None,
    target_len: int | None = None,
) -> np.ndarray:
    """Decode any audio file to 48 kHz float64 stereo array."""
    if not path.exists():
        raise FileNotFoundError(f"Audio asset missing: {path}")
    cmd = ["ffmpeg", "-v", "error"]
    if ss is not None:
        cmd += ["-ss", f"{ss:.4f}"]
    if dur is not None:
        cmd += ["-t", f"{dur:.4f}"]
    cmd += ["-i", str(path)]
    if af_filter:
        cmd += ["-af", af_filter]
    cmd += ["-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    x = np.frombuffer(raw, dtype=np.float32).astype(np.float64).reshape(-1, 2)
    if target_len is not None:
        if len(x) < target_len:
            x = np.vstack([x, np.zeros((target_len - len(x), 2), dtype=np.float64)])
        else:
            x = x[:target_len]
    return x


def load_sliced_sfx(
    path: Path,
    start_ms: float | None = None,
    end_ms: float | None = None,
    pitch_ratio: float = 1.0,
    fade_in_ms: float = 2.0,
    fade_out_ms: float = 14.0,
    af_extra: str | None = None,
) -> np.ndarray:
    """Load an SFX slice, auto-trim leading silence to 0ms onset, and shape edges."""
    ss = start_ms / 1000.0 if start_ms is not None else None
    dur = (end_ms - start_ms) / 1000.0 if (start_ms is not None and end_ms is not None) else None
    af_filter = f"highpass=f=28,{af_extra}" if af_extra else "highpass=f=28"
    clip = load_ffmpeg_stereo(path, ss=ss, dur=dur, af_filter=af_filter)
    if len(clip) < 16:
        return clip

    mono_abs = np.max(np.abs(clip), axis=1)
    pk = float(np.max(mono_abs))
    if pk > 1e-6:
        hit_idx = int(np.argmax(mono_abs >= 0.08 * pk))
        clip = clip[max(0, hit_idx - int(0.002 * SR)) :].copy()

    if pk > 1e-6 and len(clip) > int(0.04 * SR):
        mono_abs = np.max(np.abs(clip), axis=1)
        active = np.where(mono_abs >= 0.005 * pk)[0]
        if len(active) > 0:
            clip = clip[: min(len(clip), int(active[-1]) + int(0.025 * SR))].copy()

    if abs(pitch_ratio - 1.0) > 1e-4 and len(clip) > 8:
        new_len = max(8, int(round(len(clip) / pitch_ratio)))
        old_idx = np.linspace(0.0, len(clip) - 1, new_len)
        base_idx = np.arange(len(clip), dtype=np.float64)
        clip = np.column_stack([
            np.interp(old_idx, base_idx, clip[:, 0]),
            np.interp(old_idx, base_idx, clip[:, 1]),
        ])

    clip_pk = float(np.max(np.abs(clip)))
    if clip_pk > 1e-9:
        clip *= 1.0 / clip_pk

    fi = min(int(round(fade_in_ms / 1000.0 * SR)), len(clip) // 4)
    fo = min(int(round(fade_out_ms / 1000.0 * SR)), len(clip) // 2)
    if fi > 1:
        clip[:fi] *= np.linspace(0.0, 1.0, fi)[:, None]
    if fo > 1:
        clip[-fo:] *= np.linspace(1.0, 0.0, fo)[:, None]
    return clip


def place_sfx(
    track: np.ndarray,
    duck_mask: np.ndarray,
    clip_path: Path,
    at_sec: float,
    start_ms: float | None = None,
    end_ms: float | None = None,
    gain: float = 0.8,
    duck_depth: float = 0.4,
    pitch_ratio: float = 1.0,
    af_extra: str | None = None,
) -> None:
    """Mix one SFX slice at `at_sec` and carve a transient ducking curve into BGM."""
    clip = load_sliced_sfx(
        clip_path,
        start_ms=start_ms,
        end_ms=end_ms,
        pitch_ratio=pitch_ratio,
        af_extra=af_extra,
    )
    start = int(round(at_sec * SR))
    end = min(len(track), start + len(clip))
    if start < 0:
        clip = clip[-start:]
        start = 0
        end = min(len(track), len(clip))
    if start >= len(track) or end <= start:
        return

    track[start:end] += clip[: end - start] * gain

    if duck_depth > 0.0:
        d_start = max(0, start - int(0.010 * SR))
        d_end = min(len(duck_mask), start + int(0.180 * SR))
        span = d_end - d_start
        if span > 4:
            curve = np.ones(span, dtype=np.float64)
            actual_atk = max(1, start - d_start)
            if actual_atk < span:
                curve[:actual_atk] = np.linspace(1.0, 1.0 - duck_depth, actual_atk)
                curve[actual_atk:] = np.linspace(1.0 - duck_depth, 1.0, span - actual_atk)
            duck_mask[d_start:d_end] = np.minimum(duck_mask[d_start:d_end], curve)


def build_envelope(total_samples: int, points: list[tuple[float, float]]) -> np.ndarray:
    """Interpolate piecewise-linear automation points (sec, gain) across total_samples."""
    t_pts = np.array([p[0] * SR for p in points], dtype=np.float64)
    v_pts = np.array([p[1] for p in points], dtype=np.float64)
    return np.interp(np.arange(total_samples, dtype=np.float64), t_pts, v_pts)


def master_and_verify(
    bgm_shaped: np.ndarray,
    sfx: np.ndarray,
    duck: np.ndarray,
    final_out: Path,
) -> dict:
    """Sum stems with soft-knee protection, apply EBU R128 + limiter, and verify stereo (-ac 2)."""
    sfx_peak = float(np.max(np.abs(sfx)))
    if sfx_peak > 1e-9:
        sfx = sfx * (0.85 / sfx_peak)

    mix = bgm_shaped * duck[:, None] + sfx
    over = np.abs(mix) > 0.92
    if np.any(over):
        mix[over] = np.sign(mix[over]) * (0.92 + 0.075 * np.tanh((np.abs(mix[over]) - 0.92) / 0.08))

    raw_out = final_out.with_name(f"_{final_out.stem}_raw.wav")
    final_out.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(raw_out), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((np.clip(mix, -1.0, 1.0) * 32767.0).astype(np.int16).tobytes())

    subprocess.run(
        [
            "ffmpeg", "-y", "-v", "error", "-i", str(raw_out),
            "-af", "loudnorm=I=-15.5:TP=-1.0:LRA=13:linear=false,alimiter=limit=0.90:level=false:attack=1:release=45",
            "-ar", str(SR), "-ac", "2", str(final_out),
        ],
        check=True,
    )
    raw_out.unlink(missing_ok=True)

    raw_st = subprocess.check_output(
        ["ffmpeg", "-v", "error", "-i", str(final_out), "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"]
    )
    st = np.frombuffer(raw_st, dtype=np.float32).reshape(-1, 2)
    peak = float(np.max(np.abs(st)))
    rms = float(np.sqrt(np.mean(st**2)) + 1e-12)
    crest_db = float(20.0 * np.log10((peak + 1e-12) / rms))
    hop = int(0.05 * SR)
    frames = np.array([float(np.sqrt(np.mean(st[i : i + hop] ** 2))) for i in range(0, len(st) - hop, hop)])
    return {
        "dur_s": round(len(st) / SR, 3),
        "peak": round(peak, 3),
        "rms": round(rms, 3),
        "crest_db": round(crest_db, 2),
        "quiet50ms_pct": round(float(np.mean(frames < 0.05) * 100.0), 2),
        "dyn_p95_p10_db": round(float(20.0 * np.log10((np.percentile(frames, 95) + 1e-6) / (np.percentile(frames, 10) + 1e-6))), 2),
    }


def schedule_example_cues(bgm_path: Path, key_paths: list[Path], out_wav: Path, total_sec: float = 34.0) -> None:
    """Example entry point showing warm/bright BGM curve + ASMR typing schedule."""
    n = int(round(total_sec * SR))
    bgm_full = load_ffmpeg_stereo(bgm_path, dur=total_sec + 0.5, af_filter="highpass=f=32", target_len=n)
    bgm_warm = load_ffmpeg_stereo(bgm_path, dur=total_sec + 0.5, af_filter="highpass=f=45,lowpass=f=850", target_len=n)
    scale = 0.140 / max(float(np.sqrt(np.mean(bgm_full**2))), 1e-9)
    bgm_full *= scale
    bgm_warm *= scale

    vol_env = build_envelope(n, [(0.0, 0.0), (0.3, 0.36), (6.7, 0.42), (6.95, 0.02), (7.6, 1.0), (total_sec, 0.0)])
    bright_env = build_envelope(n, [(0.0, 0.42), (6.95, 0.18), (7.6, 1.0), (total_sec, 0.48)])
    bgm_shaped = bgm_full * (vol_env * bright_env)[:, None] + bgm_warm * (vol_env * (1.0 - bright_env))[:, None]

    sfx = np.zeros((n, 2), dtype=np.float64)
    duck = np.ones(n, dtype=np.float64)
    prompt = "Example prompt"
    for i, _ in enumerate(prompt):
        place_sfx(
            sfx, duck, key_paths[i % len(key_paths)],
            1.72 + (i + 0.35) * (1.5 / len(prompt)),
            gain=0.55, duck_depth=0.14, pitch_ratio=0.98 + (i % 3) * 0.025, af_extra="lowpass=f=5200",
        )
    print(json.dumps(master_and_verify(bgm_shaped, sfx, duck, out_wav), indent=2))
