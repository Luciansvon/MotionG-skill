/**
 * Deterministic 60 FPS kinetic motion, elastic bounce physics, kinetic typography,
 * interactive camera rig, cursor arc, rack-focus, and tactile UI micro-interaction
 * primitives for Remotion motion graphics.
 *
 * Rules:
 * - Zero CSS transitions (every motion property driven strictly by Remotion frame).
 * - Zero Math.random() (always deterministic across parallel Chromium render workers).
 * - When used inside <CameraMotionBlur>, every child stage must call
 *   useCurrentFrame() internally and NEVER receive frame via parent props.
 */
export const clamp = (v: number, min = 0, max = 1): number =>
  Math.min(Math.max(v, min), max);

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const progress = (frame: number, startFrame: number, durationFrames: number): number => {
  if (durationFrames <= 0) return frame >= startFrame ? 1 : 0;
  return clamp((frame - startFrame) / durationFrames, 0, 1);
};

export const snappyOut = (t: number): number => {
  const p = clamp(t);
  return p >= 1 ? 1 : 1 - Math.pow(2, -11 * p);
};

export const snappyInOut = (t: number): number => {
  const p = clamp(t);
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  return p < 0.5 ? 0.5 * Math.pow(2, 14 * p - 7) : 1 - 0.5 * Math.pow(2, -14 * p + 7);
};

export const overshoot = (t: number, s = 1.85): number => {
  const p = clamp(t) - 1;
  return p * p * ((s + 1) * p + s) + 1;
};

export const cubicInOut = (t: number): number => {
  const p = clamp(t);
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
};

/**
 * Overshoot-calibrated harmonic spring for unmistakable elastic entrances and settles.
 * Returns 0 before triggerFrame, rises past 1.0 by roughly `overshootAmount`, rebounds,
 * and lands on exact 1.000 at p = 1.
 */
export const springBounce = (
  frame: number,
  triggerFrame: number,
  durationFrames = 36,
  overshootAmount = 0.16,
  cycles = 1.5
): number => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  const zeta = -Math.log(clamp(overshootAmount, 0.02, 0.45)) / Math.PI;
  const omega = Math.max(0.5, cycles) * 2 * Math.PI;
  const tail = 1 - p * p * p;
  return 1 - Math.exp(-zeta * omega * p) * Math.cos(omega * p) * tail;
};

/**
 * Tactile click squeeze and rebound (1.0 -> 0.84 -> 1.10 -> 0.98 -> 1.0 over 26 frames).
 */
export const buttonPressScale = (frame: number, clickFrame: number): number => {
  const d = frame - clickFrame;
  if (d < 0 || d > 26) return 1;
  if (d <= 5) return lerp(1.0, 0.84, snappyOut(d / 5));
  if (d <= 14) return lerp(0.84, 1.1, overshoot((d - 5) / 9, 1.5));
  if (d <= 21) return lerp(1.1, 0.98, cubicInOut((d - 14) / 7));
  return lerp(0.98, 1.0, snappyOut((d - 21) / 5));
};

export const impactShake = (
  frame: number,
  triggerFrame: number,
  ampPx = 14,
  durationFrames = 14
): { sx: number; sy: number; rot: number } => {
  const d = frame - triggerFrame;
  if (d < 0 || d > durationFrames) return { sx: 0, sy: 0, rot: 0 };
  const decay = Math.exp(-d * 0.28);
  return {
    sx: Math.sin(d * 1.45) * ampPx * decay,
    sy: Math.cos(d * 1.85) * ampPx * 0.72 * decay,
    rot: Math.sin(d * 1.6) * 0.9 * decay,
  };
};

export const rackFocusMetrics = (focusAmount: number) => {
  const f = clamp(focusAmount);
  return {
    scale: lerp(0.84, 1.05, f),
    zPx: lerp(-130, 84, f),
    blurPx: lerp(9, 0, Math.pow(f, 0.72)),
    opacity: lerp(0.42, 1, clamp(f * 1.45)),
  };
};

export const typedSubstring = (
  text: string,
  frame: number,
  startFrame: number,
  durationFrames: number
): string => {
  const p = progress(frame, startFrame, durationFrames);
  const count = Math.floor(clamp(p) * text.length);
  return text.slice(0, count);
};

export type CameraPose = {
  x: number;
  y: number;
  scale: number;
  rotX: number;
  rotY: number;
  rotZ: number;
};

export type CameraEase = "snappyInOut" | "snappyOut" | "cubicInOut" | "linear";

export type CameraKeyframe = CameraPose & {
  frame: number;
  ease?: CameraEase;
};

const applyEase = (t: number, ease: CameraEase = "snappyInOut"): number => {
  switch (ease) {
    case "snappyOut":
      return snappyOut(t);
    case "cubicInOut":
      return cubicInOut(t);
    case "linear":
      return clamp(t);
    case "snappyInOut":
    default:
      return snappyInOut(t);
  }
};

export const evalCameraTrack = (
  frame: number,
  kfs: readonly CameraKeyframe[]
): CameraPose => {
  if (!kfs.length) {
    return { x: 0, y: 0, scale: 1, rotX: 0, rotY: 0, rotZ: 0 };
  }
  if (frame <= kfs[0].frame) {
    const k = kfs[0];
    return { x: k.x, y: k.y, scale: k.scale, rotX: k.rotX, rotY: k.rotY, rotZ: k.rotZ };
  }
  const last = kfs[kfs.length - 1];
  if (frame >= last.frame) {
    return { x: last.x, y: last.y, scale: last.scale, rotX: last.rotX, rotY: last.rotY, rotZ: last.rotZ };
  }
  for (let i = 0; i < kfs.length - 1; i++) {
    const a = kfs[i];
    const b = kfs[i + 1];
    if (frame >= a.frame && frame <= b.frame) {
      const rawT = progress(frame, a.frame, Math.max(1, b.frame - a.frame));
      const t = applyEase(rawT, b.ease ?? "snappyInOut");
      return {
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        scale: lerp(a.scale, b.scale, t),
        rotX: lerp(a.rotX, b.rotX, t),
        rotY: lerp(a.rotY, b.rotY, t),
        rotZ: lerp(a.rotZ, b.rotZ, t),
      };
    }
  }
  return { x: last.x, y: last.y, scale: last.scale, rotX: last.rotX, rotY: last.rotY, rotZ: last.rotZ };
};

export const cameraRecoil = (
  frame: number,
  triggerFrame: number,
  zoomDip = 0.038,
  shiftY = 10
): { dScale: number; dY: number; dRotX: number } => {
  const d = frame - triggerFrame;
  if (d < 0 || d > 18) return { dScale: 0, dY: 0, dRotX: 0 };
  if (d <= 5) {
    const t = snappyOut(d / 5);
    return {
      dScale: -zoomDip * t,
      dY: shiftY * t,
      dRotX: -2.2 * t,
    };
  }
  const t = snappyOut((d - 5) / 13);
  const env = 1 - t;
  const bounce = Math.sin(t * Math.PI) * 0.35;
  return {
    dScale: -zoomDip * env + zoomDip * 0.45 * bounce,
    dY: shiftY * env - shiftY * 0.3 * bounce,
    dRotX: -2.2 * env,
  };
};

export const cameraTransform = (pose: CameraPose, perspectivePx = 1250): string =>
  `perspective(${perspectivePx}px) translate3d(${pose.x.toFixed(2)}px, ${pose.y.toFixed(2)}px, 0px) scale(${pose.scale.toFixed(4)}) rotateX(${pose.rotX.toFixed(2)}deg) rotateY(${pose.rotY.toFixed(2)}deg) rotateZ(${pose.rotZ.toFixed(2)}deg)`;

export type CursorWaypoint = {
  frame: number;
  x: number;
  y: number;
  arc?: number;
};

export const evalCursorPos = (
  frame: number,
  waypoints: readonly CursorWaypoint[]
): { x: number; y: number; tilt: number } => {
  if (!waypoints.length) return { x: 0, y: 0, tilt: -8 };
  if (frame <= waypoints[0].frame) {
    return { x: waypoints[0].x, y: waypoints[0].y, tilt: -8 };
  }
  const last = waypoints[waypoints.length - 1];
  if (frame >= last.frame) {
    return { x: last.x, y: last.y, tilt: -8 };
  }
  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    if (frame >= a.frame && frame <= b.frame) {
      const rawT = progress(frame, a.frame, Math.max(1, b.frame - a.frame));
      const t = snappyInOut(rawT);
      const arc = (b.arc ?? 36) * Math.sin(t * Math.PI);
      const x = lerp(a.x, b.x, t);
      const y = lerp(a.y, b.y, t) - arc;
      const dx = b.x - a.x;
      return { x, y, tilt: clamp(dx * 0.025, -14, 14) };
    }
  }
  return { x: last.x, y: last.y, tilt: -8 };
};

export const hoverProximity = (
  cx: number,
  cy: number,
  tx: number,
  ty: number,
  radius = 175
): number => {
  const dist = Math.hypot(cx - tx, cy - ty);
  const raw = clamp(1 - dist / Math.max(1, radius), 0, 1);
  return raw * raw * (3 - 2 * raw);
};

/**
 * Visible continuous idle life across calm holds (use distinct phaseOffset per element
 * so elements breathe naturally at 60 FPS and 30 FPS instead of moving identically).
 */
export const ambientBreath = (
  frame: number,
  periodFrames = 110,
  ampScale = 0.022,
  ampY = 10,
  phaseOffset = 0,
  ampRotDeg = 1.2
): { scale: number; y: number; rot: number } => {
  const phase = (frame / Math.max(1, periodFrames)) * Math.PI * 2 + phaseOffset;
  return {
    scale: 1 + Math.sin(phase) * ampScale,
    y: Math.cos(phase) * ampY,
    rot: Math.sin(phase * 0.5) * ampRotDeg,
  };
};

export const pulseGlow = (
  frame: number,
  periodFrames = 90,
  minAlpha = 0.35,
  maxAlpha = 0.95
): number => {
  const wave = 0.5 - 0.5 * Math.cos((frame / Math.max(1, periodFrames)) * Math.PI * 2);
  return lerp(minAlpha, maxAlpha, wave);
};

/**
 * Visible elastic pop (~1.20x peak across ~8 frames, clean settle to 1.000).
 * Apply directly to transform scale instead of diluting via lerp(0.86, 1, pop).
 */
export const elasticPop = (
  frame: number,
  triggerFrame: number,
  durationFrames = 36,
  damping = 5.2,
  freq = 10.5
): number => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  const tail = 1 - p * p * p;
  return 1 - Math.exp(-damping * p) * Math.cos(freq * p) * tail;
};

/**
 * Volume-preserving rubbery squash-and-stretch on drops, impacts, or landings.
 */
export const squashStretch = (
  frame: number,
  triggerFrame: number,
  durationFrames = 26,
  strength = 0.18
): { scaleX: number; scaleY: number } => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0 || p >= 1) return { scaleX: 1, scaleY: 1 };
  const tail = 1 - p * p;
  const impulse = Math.exp(-3.6 * p) * Math.sin(p * Math.PI * 2.5) * strength * tail;
  const scaleX = 1 + impulse;
  return {
    scaleX,
    scaleY: 1 / Math.max(0.5, scaleX),
  };
};

export const badgeBounce = (
  frame: number,
  triggerFrame: number,
  durationFrames = 28
): { scale: number; y: number; rot: number } => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0) return { scale: 0, y: 12, rot: -10 };
  if (p >= 1) return { scale: 1, y: 0, rot: 0 };
  const pop = elasticPop(frame, triggerFrame, durationFrames, 5.0, 10.5);
  const env = Math.exp(-3.8 * p) * (1 - p);
  return {
    scale: Math.max(0, pop),
    y: -Math.abs(Math.sin(p * Math.PI * 2)) * 14 * env,
    rot: Math.sin(p * Math.PI * 3) * 10 * env,
  };
};

export const morphBox = (
  progress01: number,
  from: { w: number; h: number; r: number },
  to: { w: number; h: number; r: number }
): { w: number; h: number; r: number } => {
  const t = snappyInOut(progress01);
  return {
    w: lerp(from.w, to.w, t),
    h: lerp(from.h, to.h, t),
    r: lerp(from.r, to.r, t),
  };
};

export const cardFanPose = (
  index: number,
  total: number,
  spreadProgress: number,
  maxAngleDeg = 18,
  spacingPx = 110
): { x: number; y: number; rotZ: number; zIndex: number } => {
  const t = snappyOut(spreadProgress);
  const mid = (total - 1) / 2;
  const norm = total > 1 ? (index - mid) / Math.max(0.5, mid) : 0;
  return {
    x: norm * spacingPx * t,
    y: Math.abs(norm) * Math.abs(norm) * 26 * t,
    rotZ: norm * maxAngleDeg * t,
    zIndex: Math.round(total - Math.abs(index - mid)),
  };
};

export const splitInsertGap = (
  progress01: number,
  targetGapPx: number
): {
  leftOffsetPx: number;
  rightOffsetPx: number;
  insertScale: number;
  insertOpacity: number;
} => {
  const t = snappyOut(progress01);
  const half = (targetGapPx * 0.5) * t;
  const insertT = clamp((t - 0.14) / 0.86, 0, 1);
  return {
    leftOffsetPx: -half,
    rightOffsetPx: half,
    insertScale: lerp(0.68, 1.0, overshoot(insertT, 2.0)),
    insertOpacity: clamp(insertT * 1.45, 0, 1),
  };
};

/* ── KINETIC TYPOGRAPHY PRIMITIVES (Zero Flat PowerPoint Fades) ── */

export type MaskedWordOpts = {
  staggerFrames?: number;
  durationFrames?: number;
  overshootAmount?: number;
  tiltDeg?: number;
};

/**
 * Masked word-by-word baseline launch with spring bounce, flight stretch, and landing settle.
 * Wrap each word inside an `overflow: hidden` inline-block container.
 */
export const maskedWordRise = (
  frame: number,
  startFrame: number,
  wordIndex: number,
  opts?: MaskedWordOpts
): { yPct: number; opacity: number; scaleX: number; scaleY: number; rotDeg: number } => {
  const stagger = opts?.staggerFrames ?? 5;
  const duration = opts?.durationFrames ?? 32;
  const overshootAmt = opts?.overshootAmount ?? 0.14;
  const tilt = opts?.tiltDeg ?? 4.5;

  const tStart = startFrame + wordIndex * stagger;
  const p = progress(frame, tStart, duration);
  if (p <= 0) {
    return { yPct: 115, opacity: 0, scaleX: 0.94, scaleY: 1.06, rotDeg: tilt };
  }
  if (p >= 1) {
    return { yPct: 0, opacity: 1, scaleX: 1, scaleY: 1, rotDeg: 0 };
  }

  const sb = springBounce(frame, tStart, duration, overshootAmt, 1.5);
  const yPct = lerp(115, 0, sb);
  const flightStretch = p < 0.4 ? Math.sin((p / 0.4) * Math.PI) * 0.11 : 0;
  const landSquash = p >= 0.28 ? -Math.sin((p - 0.28) * Math.PI * 2.4) * Math.exp(-4.2 * (p - 0.28)) * 0.08 * (1 - p) : 0;
  const scaleY = 1 + flightStretch + landSquash;
  return {
    yPct,
    opacity: clamp(p * 4.5, 0, 1),
    scaleX: 1 / Math.max(0.65, scaleY),
    scaleY,
    rotDeg: tilt * (1 - sb),
  };
};

/**
 * Anticipation + brisk glide exit so departing copy clears the stage energetically.
 */
export const kineticExit = (
  frame: number,
  exitStartFrame: number,
  durationFrames = 14,
  direction: "up" | "down" = "up"
): { yPx: number; scale: number; opacity: number } => {
  const p = progress(frame, exitStartFrame, durationFrames);
  if (p <= 0) return { yPx: 0, scale: 1, opacity: 1 };
  if (p >= 1) return { yPx: direction === "up" ? -72 : 72, scale: 0.9, opacity: 0 };

  const sign = direction === "up" ? 1 : -1;
  if (p < 0.22) {
    const a = snappyOut(p / 0.22);
    return {
      yPx: sign * 12 * a,
      scale: lerp(1.0, 1.03, a),
      opacity: 1,
    };
  }
  const g = snappyInOut((p - 0.22) / 0.78);
  return {
    yPx: lerp(sign * 12, -sign * 72, g),
    scale: lerp(1.03, 0.9, g),
    opacity: clamp(1 - Math.pow(g, 1.35), 0, 1),
  };
};

/**
 * Rolling numeric counter with crisp spring settle pop on completion.
 */
export const rollingNumber = (
  frame: number,
  startFrame: number,
  durationFrames: number,
  fromVal: number,
  toVal: number,
  decimals = 0
): { value: number; formatted: string; settleScale: number } => {
  const p = progress(frame, startFrame, durationFrames);
  const eased = snappyOut(p);
  const value = lerp(fromVal, toVal, eased);
  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  const post = progress(frame, startFrame + durationFrames, 18);
  const settleScale =
    post > 0 && post < 1
      ? 1 + Math.sin(post * Math.PI * 1.5) * Math.exp(-3.2 * post) * 0.16 * (1 - post)
      : 1;

  return { value, formatted, settleScale };
};

/**
 * Specular highlight sweep across a keyword or completed pill (`posPct` sweeps -40..140).
 */
export const shimmerSweep = (
  frame: number,
  triggerFrame: number,
  durationFrames = 28
): { posPct: number; opacity: number } => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0 || p >= 1) return { posPct: p >= 1 ? 140 : -40, opacity: 0 };
  return {
    posPct: lerp(-40, 140, snappyInOut(p)),
    opacity: Math.sin(p * Math.PI),
  };
};

/**
 * Self-drawing horizontal underline/highlight accent with gentle spring settle.
 */
export const underlineDraw = (
  frame: number,
  triggerFrame: number,
  durationFrames = 24
): { scaleX: number; opacity: number } => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0) return { scaleX: 0, opacity: 0 };
  if (p >= 1) return { scaleX: 1, opacity: 1 };
  const sb = springBounce(frame, triggerFrame, durationFrames, 0.08, 1.25);
  return {
    scaleX: Math.max(0, sb),
    opacity: clamp(p * 4, 0, 1),
  };
};

/* ── TACTILE UI MICRO-INTERACTION PRIMITIVES (Zero 1-Frame Teleports) ── */

/**
 * Liquid sliding tab/capsule highlight that stretches proportionally mid-flight
 * and rebounds elastically into the target option.
 */
export const slidingPillPose = (
  frame: number,
  switchFrame: number,
  fromCenterX: number,
  toCenterX: number,
  durationFrames = 26
): { centerX: number; scaleX: number; scaleY: number } => {
  const p = progress(frame, switchFrame, durationFrames);
  if (p <= 0) return { centerX: fromCenterX, scaleX: 1, scaleY: 1 };
  if (p >= 1) return { centerX: toCenterX, scaleX: 1, scaleY: 1 };

  const sb = springBounce(frame, switchFrame, durationFrames, 0.12, 1.5);
  const flightStretch = p < 0.55 ? Math.sin((p / 0.55) * Math.PI) * 0.26 : 0;
  const settleSquash = p >= 0.45 ? -Math.sin(((p - 0.45) / 0.55) * Math.PI) * 0.08 * (1 - p) : 0;
  const scaleX = 1 + flightStretch + settleSquash;
  return {
    centerX: lerp(fromCenterX, toCenterX, sb),
    scaleX,
    scaleY: 1 / Math.max(0.55, scaleX),
  };
};

/**
 * 3D seesaw rock for capsules and buttons when clicked left (-1), center (0), or right (+1).
 */
export const tactileTilt = (
  frame: number,
  clickFrame: number,
  side: -1 | 0 | 1,
  durationFrames = 26
): { rotZ: number; rotX: number; translateY: number; scale: number } => {
  const p = progress(frame, clickFrame, durationFrames);
  if (p <= 0 || p >= 1) return { rotZ: 0, rotX: 0, translateY: 0, scale: 1 };

  const rawImp = Math.sin(p * Math.PI * 2.2) * Math.exp(-3.0 * p) * (1 - p);
  const impulse = rawImp / 0.48; // normalized so primary peak reaches ~1.0
  if (side === 0) {
    const push = Math.max(0, impulse);
    return {
      rotZ: 0,
      rotX: 6.0 * push,
      translateY: 7.0 * push,
      scale: 1 - 0.035 * push,
    };
  }
  return {
    rotZ: side * 3.0 * impulse,
    rotX: 2.2 * Math.max(0, impulse),
    translateY: 4.0 * Math.max(0, impulse),
    scale: 1 - 0.02 * Math.max(0, impulse),
  };
};

/**
 * Expanding sonar ripple ring emitted at a pointer click position.
 */
export const clickRipple = (
  frame: number,
  clickFrame: number,
  durationFrames = 24,
  maxRadiusPx = 68
): { radiusPx: number; opacity: number; strokeWidth: number } => {
  const p = progress(frame, clickFrame, durationFrames);
  if (p <= 0 || p >= 1) return { radiusPx: 0, opacity: 0, strokeWidth: 0 };
  const eased = snappyOut(p);
  return {
    radiusPx: lerp(6, maxRadiusPx, eased),
    opacity: clamp((1 - p) * (1 - p) * 0.85, 0, 1),
    strokeWidth: lerp(4.0, 1.0, p),
  };
};

/**
 * Pointer pinch-down and spring-back across an array of click/grab cues.
 */
export const cursorPressState = (
  frame: number,
  clickFrames: readonly number[],
  pressFrames = 18
): { scale: number; isPressed: boolean } => {
  for (let i = 0; i < clickFrames.length; i++) {
    const d = frame - clickFrames[i];
    if (d >= 0 && d <= pressFrames) {
      const p = d / Math.max(1, pressFrames);
      if (p <= 0.28) {
        return { scale: lerp(1.0, 0.78, snappyOut(p / 0.28)), isPressed: true };
      }
      if (p <= 0.68) {
        return {
          scale: lerp(0.78, 1.08, overshoot((p - 0.28) / 0.4, 1.4)),
          isPressed: false,
        };
      }
      return {
        scale: lerp(1.08, 1.0, snappyOut((p - 0.68) / 0.32)),
        isPressed: false,
      };
    }
  }
  return { scale: 1, isPressed: false };
};

/**
 * Elastic horizontal slot expansion for dropped thumbnails or inline badges (zero 1-frame teleport).
 */
export const slotExpandSpring = (
  frame: number,
  triggerFrame: number,
  targetWidthPx: number,
  durationFrames = 28
): { widthPx: number; contentScale: number; contentOpacity: number } => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0) return { widthPx: 0, contentScale: 0, contentOpacity: 0 };
  if (p >= 1) return { widthPx: targetWidthPx, contentScale: 1, contentOpacity: 1 };

  const sb = springBounce(frame, triggerFrame, durationFrames, 0.15, 1.5);
  return {
    widthPx: Math.max(0, targetWidthPx * sb),
    contentScale: Math.max(0, sb),
    contentOpacity: clamp(progress(frame, triggerFrame + 3, 10), 0, 1),
  };
};

/**
 * Deterministic geometric celebration ticks on completion milestones (zero Math.random()).
 */
export const burstParticlePose = (
  index: number,
  total: number,
  frame: number,
  triggerFrame: number,
  maxRadiusPx = 74,
  durationFrames = 28
): { x: number; y: number; scale: number; opacity: number; rotDeg: number } => {
  const p = progress(frame, triggerFrame, durationFrames);
  const safeTotal = Math.max(1, total);
  const angle = (index / safeTotal) * Math.PI * 2 + (index % 2 === 0 ? 0.18 : -0.18);
  const deg = (angle * 180) / Math.PI;
  if (p <= 0 || p >= 1) {
    return { x: 0, y: 0, scale: 0, opacity: 0, rotDeg: deg };
  }
  const travel = snappyOut(p) * maxRadiusPx * (index % 2 === 0 ? 1.0 : 0.82);
  return {
    x: Math.cos(angle) * travel,
    y: Math.sin(angle) * travel,
    scale: lerp(1.15, 0.35, p),
    opacity: p < 0.2 ? p / 0.2 : clamp((1 - p) / 0.8, 0, 1),
    rotDeg: deg,
  };
};

/* ── EXTENDED VFX & COLLABORATIVE UI PRIMITIVES (TikTok 6-Ref Upgrade) ── */

/**
 * Elastic in-place morph from a square app icon into a wide prompt/search bar
 * (Spotify UI style) without cutting to an empty intermediate canvas.
 */
export const iconToBarMorph = (
  frame: number,
  triggerFrame: number,
  iconSizePx: number,
  barWidthPx: number,
  barHeightPx: number,
  durationFrames = 30
): {
  w: number;
  h: number;
  radius: number;
  iconOpacity: number;
  inputOpacity: number;
  stretchX: number;
  stretchY: number;
} => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0) {
    return {
      w: iconSizePx,
      h: iconSizePx,
      radius: Math.round(iconSizePx * 0.24),
      iconOpacity: 1,
      inputOpacity: 0,
      stretchX: 1,
      stretchY: 1,
    };
  }
  if (p >= 1) {
    return {
      w: barWidthPx,
      h: barHeightPx,
      radius: Math.round(barHeightPx * 0.5),
      iconOpacity: 0,
      inputOpacity: 1,
      stretchX: 1,
      stretchY: 1,
    };
  }

  const sb = springBounce(frame, triggerFrame, durationFrames, 0.14, 1.4);
  const flightStretch = p < 0.5 ? Math.sin((p / 0.5) * Math.PI) * 0.18 : 0;
  const settleSquash = p >= 0.5 ? -Math.sin(((p - 0.5) / 0.5) * Math.PI) * 0.06 * (1 - p) : 0;
  const stretchX = 1 + flightStretch + settleSquash;
  return {
    w: Math.max(iconSizePx * 0.8, lerp(iconSizePx, barWidthPx, sb)),
    h: Math.max(barHeightPx * 0.8, lerp(iconSizePx, barHeightPx, snappyInOut(p))),
    radius: lerp(iconSizePx * 0.24, barHeightPx * 0.5, snappyInOut(p)),
    iconOpacity: clamp(1 - progress(frame, triggerFrame, Math.max(4, Math.round(durationFrames * 0.35))), 0, 1),
    inputOpacity: clamp(progress(frame, triggerFrame + Math.round(durationFrames * 0.35), Math.max(4, Math.round(durationFrames * 0.45))), 0, 1),
    stretchX,
    stretchY: 1 / Math.max(0.65, stretchX),
  };
};

/**
 * Bouncing mascot/dot hops across letter slots revealing characters sequentially,
 * then settles as the trailing period (Grok Bots style).
 */
export const mascotLetterHop = (
  frame: number,
  startFrame: number,
  letterCount: number,
  stepFrames = 14,
  hopHeightPx = 54,
  letterSpacingPx = 44
): {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  revealedLetters: number;
  isSettledAsPeriod: boolean;
} => {
  const safeCount = Math.max(1, Math.round(letterCount));
  const safeStep = Math.max(4, stepFrames);
  const totalDur = safeCount * safeStep;
  const d = frame - startFrame;

  if (d <= 0) {
    return {
      x: 0,
      y: -hopHeightPx * 0.5,
      scaleX: 1,
      scaleY: 1,
      revealedLetters: 0,
      isSettledAsPeriod: false,
    };
  }
  if (d >= totalDur) {
    return {
      x: safeCount * letterSpacingPx,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      revealedLetters: safeCount,
      isSettledAsPeriod: true,
    };
  }

  const hopIdx = Math.min(safeCount - 1, Math.floor(d / safeStep));
  const localT = (d - hopIdx * safeStep) / safeStep;
  const arc = Math.sin(localT * Math.PI);
  const squash = localT < 0.16 ? -0.14 * Math.sin((localT / 0.16) * Math.PI) : arc * 0.12;
  const scaleY = 1 + squash;

  return {
    x: lerp(hopIdx * letterSpacingPx, (hopIdx + 1) * letterSpacingPx, snappyInOut(localT)),
    y: -arc * hopHeightPx,
    scaleX: 1 / Math.max(0.7, scaleY),
    scaleY,
    revealedLetters: Math.min(safeCount, hopIdx + (localT >= 0.25 ? 1 : 0)),
    isSettledAsPeriod: false,
  };
};

const parseHexRgb = (hex: string): [number, number, number] => {
  const clean = hex.trim().replace("#", "");
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16) || 0,
      parseInt(clean[1] + clean[1], 16) || 0,
      parseInt(clean[2] + clean[2], 16) || 0,
    ];
  }
  const full = clean.padEnd(6, "0").slice(0, 6);
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return [0, 0, 0];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/**
 * Smoothly blends an entire variant card's background color while rotating/popping
 * the active hero product (Apple Store AirPods Max mood-shifting card style).
 */
export const moodCardBlend = (
  frame: number,
  switchFrame: number,
  fromHex: string,
  toHex: string,
  durationFrames = 24,
  spinDeg = 18
): {
  bgRgb: string;
  hex: string;
  productRotDeg: number;
  productScale: number;
} => {
  const p = progress(frame, switchFrame, durationFrames);
  const t = snappyInOut(p);
  const [r1, g1, b1] = parseHexRgb(fromHex);
  const [r2, g2, b2] = parseHexRgb(toHex);
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));
  const toHex2 = (v: number) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0");

  const sb = springBounce(frame, switchFrame, durationFrames, 0.12, 1.25);
  const rotImpulse = p > 0 && p < 1 ? Math.sin(p * Math.PI) * spinDeg : 0;

  return {
    bgRgb: `rgb(${r}, ${g}, ${b})`,
    hex: `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`.toUpperCase(),
    productRotDeg: rotImpulse,
    productScale: p <= 0 || p >= 1 ? 1 : lerp(0.94, 1.0, sb),
  };
};

export type NamedCursorTrack = {
  id: string;
  label: string;
  color: string;
  waypoints: readonly CursorWaypoint[];
  clickFrames?: readonly number[];
};

/**
 * Drives 2–4 simultaneous named collaborative cursors (Supabase "Build together" style)
 * deterministically from independent waypoint and click arrays.
 */
export const evalMultiCursors = (
  frame: number,
  tracks: readonly NamedCursorTrack[]
): Array<{
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  tilt: number;
  pressScale: number;
  isPressed: boolean;
}> =>
  tracks.map((track) => {
    const pos = evalCursorPos(frame, track.waypoints);
    const press = cursorPressState(frame, track.clickFrames ?? []);
    return {
      id: track.id,
      label: track.label,
      color: track.color,
      x: pos.x,
      y: pos.y,
      tilt: pos.tilt,
      pressScale: press.scale,
      isPressed: press.isPressed,
    };
  });

/**
 * Computes clamped counter-pan camera coordinates tethered to an active cursor
 * during multi-step zoomed UI walkthroughs (Supabase Table Editor style).
 */
export const tetheredCameraFollow = (
  cursorX: number,
  cursorY: number,
  frameWidth: number,
  frameHeight: number,
  zoom = 2.0,
  followStrength = 0.72,
  maxOffsetX = 420,
  maxOffsetY = 260
): { x: number; y: number; scale: number } => {
  const cx = frameWidth * 0.5;
  const cy = frameHeight * 0.5;
  const targetX = -(cursorX - cx) * followStrength;
  const targetY = -(cursorY - cy) * followStrength;
  return {
    x: clamp(targetX, -Math.abs(maxOffsetX), Math.abs(maxOffsetX)),
    y: clamp(targetY, -Math.abs(maxOffsetY), Math.abs(maxOffsetY)),
    scale: Math.max(1, zoom),
  };
};

/**
 * Radial glowing halftone dot-matrix wave for prompt-to-code or state transitions
 * (Supabase SQL burst style).
 */
export const halftoneWaveCell = (
  col: number,
  row: number,
  cols: number,
  rows: number,
  frame: number,
  triggerFrame: number,
  durationFrames = 34,
  bandWidth = 0.34
): { radiusScale: number; opacity: number } => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0 || p >= 1) return { radiusScale: 0, opacity: 0 };

  const nx = cols > 1 ? (col / (cols - 1)) * 2 - 1 : 0;
  const ny = rows > 1 ? (row / (rows - 1)) * 2 - 1 : 0;
  const dist = Math.hypot(nx, ny) / Math.SQRT2; // 0 at center, 1 at corners
  const waveRadius = lerp(-0.15, 1.25, snappyOut(p));
  const delta = Math.abs(dist - waveRadius);
  const safeBand = Math.max(0.05, bandWidth);
  const strength = clamp(1 - delta / safeBand, 0, 1);
  const smooth = strength * strength * (3 - 2 * strength);
  const envelope = Math.sin(p * Math.PI);

  return {
    radiusScale: smooth * envelope,
    opacity: clamp(smooth * envelope * 0.95, 0, 1),
  };
};

/**
 * Visual-editor selection frame + component label pill reveal (Lovable Inspector style).
 */
export const inspectorBoxPose = (
  frame: number,
  hoverFrame: number,
  durationFrames = 20
): { scale: number; borderOpacity: number; tagY: number; tagOpacity: number } => {
  const p = progress(frame, hoverFrame, durationFrames);
  if (p <= 0) {
    return { scale: 0.97, borderOpacity: 0, tagY: 8, tagOpacity: 0 };
  }
  if (p >= 1) {
    return { scale: 1, borderOpacity: 1, tagY: 0, tagOpacity: 1 };
  }
  const sb = springBounce(frame, hoverFrame, durationFrames, 0.08, 1.2);
  return {
    scale: lerp(0.97, 1.0, sb),
    borderOpacity: clamp(p * 3.5, 0, 1),
    tagY: lerp(8, 0, snappyOut(p)),
    tagOpacity: clamp(progress(frame, hoverFrame + 2, Math.max(4, durationFrames - 4)), 0, 1),
  };
};
