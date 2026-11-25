#!/usr/bin/env python3
"""Standalone WCAG 2.x contrast checker for motion-graphic-director.

Zero external dependencies. Evaluates verdicts against the unrounded contrast
ratio so near-threshold pairings like 4.498:1 never pass 4.5:1 by rounding.

Usage:
    python scripts/check_contrast.py "#FFFFFF" "#0369A1"
    python scripts/check_contrast.py "#FFFFFF" "#0284C7" --mode large
    python scripts/check_contrast.py --batch "#FFFFFF:#0369A1" "#082F49:#38BDF8"
    python scripts/check_contrast.py --selftest
"""

import argparse
import re
import sys

NAMED_COLORS = {
    "black": (0, 0, 0),
    "white": (255, 255, 255),
}

MODE_THRESHOLDS = {
    "normal": 4.5,
    "large": 3.0,
    "ui": 3.0,
}

# Expected values checked against the unrounded WCAG 2.x ratio.
SELFTEST_CASES = [
    ("#777777", "#070707", "4.50", False, True, True),
    ("#FFFFFF", "#0284C7", "4.10", False, True, True),
    ("#FFFFFF", "#0369A1", "5.93", True, True, True),
    ("#082F49", "#38BDF8", "6.48", True, True, True),
    ("#767676", "#FFFFFF", "4.54", True, True, True),
    ("#000000", "#FFFFFF", "21.00", True, True, True),
]


def parse_color(value):
    """Parse #RRGGBB, RRGGBB, #RGB, RGB, or named black/white into RGB tuple."""
    cleaned = value.strip()
    lower = cleaned.lower()
    if lower in NAMED_COLORS:
        return NAMED_COLORS[lower]

    hex_part = cleaned.lstrip("#")
    if len(hex_part) == 3 and re.fullmatch(r"[0-9A-Fa-f]{3}", hex_part):
        hex_part = "".join(ch * 2 for ch in hex_part)
    if not re.fullmatch(r"[0-9A-Fa-f]{6}", hex_part):
        raise ValueError(f"Expected hex color (#RRGGBB or #RGB) or white/black, got {value!r}")
    return tuple(int(hex_part[i:i + 2], 16) for i in (0, 2, 4))


def linearize(channel):
    """Convert an 8-bit sRGB channel to linear luminance component."""
    c = channel / 255.0
    if c <= 0.03928:
        return c / 12.92
    return ((c + 0.055) / 1.055) ** 2.4


def luminance(rgb):
    """Compute relative luminance per WCAG 2.x."""
    r, g, b = (linearize(ch) for ch in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast_ratio(color_a, color_b):
    """Return the exact unrounded WCAG 2.x contrast ratio between two RGB colors."""
    lum_a = luminance(color_a)
    lum_b = luminance(color_b)
    lighter, darker = sorted((lum_a, lum_b), reverse=True)
    return (lighter + 0.05) / (darker + 0.05)


def evaluate_pair(fg_raw, bg_raw, mode):
    """Compute contrast ratio and verdicts for a single foreground/background pair."""
    fg_rgb = parse_color(fg_raw)
    bg_rgb = parse_color(bg_raw)
    raw = contrast_ratio(fg_rgb, bg_rgb)
    verdicts = {
        "normal": raw >= MODE_THRESHOLDS["normal"],
        "large": raw >= MODE_THRESHOLDS["large"],
        "ui": raw >= MODE_THRESHOLDS["ui"],
    }
    passed = verdicts[mode]
    return raw, verdicts, passed


def run_selftest():
    """Verify exact unrounded WCAG 2.x math against built-in reference pairings."""
    failures = 0
    for fg, bg, expected_2dp, exp_norm, exp_large, exp_ui in SELFTEST_CASES:
        raw, verdicts, _ = evaluate_pair(fg, bg, "normal")
        rounded_2dp = f"{round(raw, 2):.2f}"
        if rounded_2dp != expected_2dp:
            failures += 1
            print(f"FAIL {fg} on {bg}: expected {expected_2dp}, got {rounded_2dp} (raw {raw:.4f})")
        if verdicts["normal"] != exp_norm or verdicts["large"] != exp_large or verdicts["ui"] != exp_ui:
            failures += 1
            print(
                f"FAIL {fg} on {bg}: verdict mismatch "
                f"normal={verdicts['normal']} (exp {exp_norm}), "
                f"large={verdicts['large']} (exp {exp_large}), "
                f"ui={verdicts['ui']} (exp {exp_ui})"
            )

    if failures:
        print(f"SELFTEST FAILED ({failures} issue(s))")
        return 1

    print(f"SELFTEST PASS: {len(SELFTEST_CASES)}/{len(SELFTEST_CASES)} WCAG 2.x reference cases verified (unrounded)")
    return 0


def run_batch(pairs, mode):
    """Check multiple FG:BG pairs in one invocation."""
    all_ok = True
    for item in pairs:
        if ":" not in item:
            print(f"error: batch item must use FG:BG format, got {item!r}")
            return 2
        fg_raw, bg_raw = item.split(":", 1)
        try:
            raw, verdicts, passed = evaluate_pair(fg_raw, bg_raw, mode)
        except ValueError as exc:
            print(f"error: {exc}")
            return 2

        status = "PASS" if passed else "FAIL"
        if not passed:
            all_ok = False
        print(
            f"[{status}] {fg_raw} on {bg_raw} -> {raw:.3f}:1 ({raw:.2f}:1) | "
            f"normal(4.5)={'PASS' if verdicts['normal'] else 'FAIL'} "
            f"large(3.0)={'PASS' if verdicts['large'] else 'FAIL'} "
            f"ui(3.0)={'PASS' if verdicts['ui'] else 'FAIL'}"
        )
    return 0 if all_ok else 1


def build_parser():
    parser = argparse.ArgumentParser(
        description="WCAG 2.x exact unrounded contrast verifier for motion-graphic-director."
    )
    parser.add_argument("colors", nargs="*", help="Foreground and background colors: <fg> <bg>")
    parser.add_argument(
        "--mode",
        choices=("normal", "large", "ui"),
        default="normal",
        help="Target gate threshold for exit code: normal (4.5:1), large (3.0:1), ui (3.0:1).",
    )
    parser.add_argument(
        "--batch",
        nargs="+",
        metavar="FG:BG",
        help="Check multiple FG:BG pairs in one run.",
    )
    parser.add_argument(
        "--selftest",
        action="store_true",
        help="Verify built-in WCAG 2.x reference cases including near-threshold 4.498:1.",
    )
    return parser


def main(argv):
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.selftest:
        return run_selftest()

    if args.batch:
        return run_batch(args.batch, args.mode)

    if len(args.colors) != 2:
        parser.print_help()
        return 2

    fg_raw, bg_raw = args.colors
    try:
        raw, verdicts, passed = evaluate_pair(fg_raw, bg_raw, args.mode)
    except ValueError as exc:
        print(f"error: {exc}")
        return 2

    print(f"pair: {fg_raw} on {bg_raw}")
    print(f"ratio: {raw:.3f}:1 ({raw:.2f}:1)")
    print(f"normal text (4.5:1): {'PASS' if verdicts['normal'] else 'FAIL'}")
    print(f"large text  (3.0:1): {'PASS' if verdicts['large'] else 'FAIL'}")
    print(f"ui boundary (3.0:1): {'PASS' if verdicts['ui'] else 'FAIL'}")
    print(f"gate ({args.mode}): {'PASS' if passed else 'FAIL'}")
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
