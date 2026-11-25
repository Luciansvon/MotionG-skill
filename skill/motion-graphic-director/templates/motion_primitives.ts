/**
 * Deterministic 60 FPS kinetic motion, interactive camera rig, cursor arc,
 * rack-focus, and tactile feedback primitives for Remotion motion graphics.
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

export const buttonPressScale = (frame: number, clickFrame: number): number => {
  const d = frame - clickFrame;
  if (d < 0 || d > 22) return 1;
  if (d <= 5) return lerp(1.0, 0.86, snappyOut(d / 5));
  if (d <= 12) return lerp(0.86, 1.07, overshoot((d - 5) / 7, 1.4));
  return lerp(1.07, 1.0, snappyOut((d - 12) / 10));
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

export const ambientBreath = (
  frame: number,
  periodFrames = 120,
  ampScale = 0.015,
  ampY = 5
): { scale: number; y: number } => {
  const phase = (frame / Math.max(1, periodFrames)) * Math.PI * 2;
  return {
    scale: 1 + Math.sin(phase) * ampScale,
    y: Math.cos(phase) * ampY,
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

export const elasticPop = (
  frame: number,
  triggerFrame: number,
  durationFrames = 24,
  damping = 5.5,
  freq = 14
): number => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  return 1 - Math.exp(-damping * p) * Math.cos(freq * p);
};

export const squashStretch = (
  frame: number,
  triggerFrame: number,
  durationFrames = 18,
  strength = 0.14
): { scaleX: number; scaleY: number } => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0 || p >= 1) return { scaleX: 1, scaleY: 1 };
  const impulse = Math.exp(-5.0 * p) * Math.sin(p * Math.PI * 3.0) * strength;
  return {
    scaleX: 1 + impulse,
    scaleY: 1 / Math.max(0.5, 1 + impulse),
  };
};

export const badgeBounce = (
  frame: number,
  triggerFrame: number,
  durationFrames = 22
): { scale: number; y: number; rot: number } => {
  const p = progress(frame, triggerFrame, durationFrames);
  if (p <= 0) return { scale: 0, y: 8, rot: -10 };
  if (p >= 1) return { scale: 1, y: 0, rot: 0 };
  const pop = elasticPop(frame, triggerFrame, durationFrames, 5.2, 13.5);
  const env = Math.exp(-4.8 * p);
  return {
    scale: Math.max(0, pop),
    y: -Math.abs(Math.sin(p * Math.PI * 2)) * 10 * env,
    rot: Math.sin(p * Math.PI * 3) * 8 * env,
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
  const insertT = clamp((t - 0.18) / 0.82, 0, 1);
  return {
    leftOffsetPx: -half,
    rightOffsetPx: half,
    insertScale: lerp(0.72, 1.0, overshoot(insertT, 1.4)),
    insertOpacity: clamp(insertT * 1.4, 0, 1),
  };
};
