/**
 * Geometry for the rolling-ball background: a serpentine of equal-height
 * diagonal legs spanning the document, and the point/roll lookup along it.
 * Pure functions so the math stays testable apart from the DOM.
 */

export interface ZigzagSegment {
  top: number;
  bottom: number;
  x1: number;
  x2: number;
  /** Signed cumulative roll arc (px) at the segment start. */
  arcStart: number;
  length: number;
}

export interface ZigzagPoint {
  x: number;
  /** Signed arc length at this point; sign encodes travel direction. */
  arc: number;
}

interface BuildOptions {
  pageWidth: number;
  docHeight: number;
  viewportHeight: number;
  /** Horizontal rail margins as viewport fractions. */
  xNear: number;
  xFar: number;
}

/**
 * Equal-height legs spanning the whole document, so every diagonal has the
 * same angle and the zigzag reads as a symmetrical serpentine. Leg height is
 * the closest even division of the page to one viewport height.
 */
export const buildZigzagSegments = ({
  pageWidth,
  docHeight,
  viewportHeight,
  xNear,
  xFar,
}: BuildOptions): ZigzagSegment[] => {
  const legCount = Math.max(1, Math.round(docHeight / viewportHeight));
  const legHeight = docHeight / legCount;
  const segments: ZigzagSegment[] = [];
  let arc = 0;

  for (let i = 0; i < legCount; i++) {
    // Even legs run upper-left to bottom-right, odd ones the reverse, so
    // consecutive diagonals share an endpoint and form one continuous path.
    const leftToRight = i % 2 === 0;
    const x1 = (leftToRight ? xNear : xFar) * pageWidth;
    const x2 = (leftToRight ? xFar : xNear) * pageWidth;
    const top = i * legHeight;
    const bottom = top + legHeight;
    const length = Math.hypot(x2 - x1, legHeight);

    segments.push({ top, bottom, x1, x2, arcStart: arc, length });
    // Rolling right spins the ball clockwise, rolling left the other way.
    arc += leftToRight ? length : -length;
  }

  return segments;
};

/** Point on the path where it crosses the given document Y, clamped to it. */
export const resolveZigzagPoint = (
  segments: ZigzagSegment[],
  docY: number
): ZigzagPoint | null => {
  if (segments.length === 0) return null;

  const first = segments[0];
  const last = segments[segments.length - 1];
  const clamped = Math.min(last.bottom, Math.max(first.top, docY));
  const seg =
    segments.find((s) => clamped >= s.top && clamped <= s.bottom) ?? last;
  const t =
    seg.bottom > seg.top ? (clamped - seg.top) / (seg.bottom - seg.top) : 0;
  const direction = seg.x2 >= seg.x1 ? 1 : -1;

  return {
    x: seg.x1 + (seg.x2 - seg.x1) * t,
    arc: seg.arcStart + direction * t * seg.length,
  };
};
