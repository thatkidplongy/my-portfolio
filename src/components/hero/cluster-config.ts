/**
 * Palette and geometry for the hero atom. Colors mirror the design tokens in
 * globals.css: monochrome forms with cyan strictly as punctuation (the outer
 * ring, the electrons' orbits, the chip's pin-1 marker, the sparks).
 */

export const CORE_COLOR = "#3d424a";
export const CORE_TOP_COLOR = "#2f343b";
export const PIN_COLOR = "#aab2bc";
export const RING_COLOR = "#e8eaed";
export const SHARD_COLOR = "#8b929c";
export const SHARD_ACCENT_COLOR = "#e8eaed";
export const SIGNAL_COLOR = "#00e5ff";

/** Orbit radii shared by the ring tubes and their electrons. */
export const RING_A_RADIUS = 1.05;
export const RING_B_RADIUS = 1.35;

/** Electron angular speeds in rad/s; opposite signs, so they counter-orbit. */
export const ELECTRON_A_SPEED = 1.7;
export const ELECTRON_B_SPEED = -1.1;

/** Random electric sparks that flash around the cluster. */
export const SPARK_COUNT = 4;
export const SPARK_LIFE_S = 0.35;

export interface Shard {
  position: [number, number, number];
  size: number;
  color: string;
}

export const SHARDS: Shard[] = [
  { position: [1.2, 0.5, 0.2], size: 0.13, color: SHARD_COLOR },
  { position: [-1.15, -0.35, 0.4], size: 0.1, color: SHARD_ACCENT_COLOR },
  { position: [0.55, -0.95, -0.3], size: 0.12, color: SHARD_COLOR },
  { position: [-0.65, 1.0, -0.2], size: 0.09, color: SHARD_COLOR },
  { position: [1.55, -0.2, -0.5], size: 0.07, color: SHARD_ACCENT_COLOR },
];

/** IC-package pins: six per side on all four edges of the chip core. */
export const CHIP_HALF = 0.425;
const PIN_COUNT_PER_SIDE = 6;

export interface PinTransform {
  position: [number, number, number];
  rotationY: number;
}

const buildPinTransforms = (): PinTransform[] => {
  const pins: PinTransform[] = [];
  const spread = 0.56;

  for (let i = 0; i < PIN_COUNT_PER_SIDE; i++) {
    const offset = -spread / 2 + (spread / (PIN_COUNT_PER_SIDE - 1)) * i;
    pins.push({ position: [offset, -0.02, CHIP_HALF + 0.05], rotationY: 0 });
    pins.push({ position: [offset, -0.02, -(CHIP_HALF + 0.05)], rotationY: 0 });
    pins.push({ position: [CHIP_HALF + 0.05, -0.02, offset], rotationY: Math.PI / 2 });
    pins.push({ position: [-(CHIP_HALF + 0.05), -0.02, offset], rotationY: Math.PI / 2 });
  }

  return pins;
};

export const PIN_TRANSFORMS = buildPinTransforms();
