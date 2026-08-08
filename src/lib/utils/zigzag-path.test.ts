import { describe, expect, it } from "vitest";
import { buildZigzagSegments, resolveZigzagPoint } from "./zigzag-path";

const OPTIONS = {
  pageWidth: 1000,
  docHeight: 3000,
  viewportHeight: 1000,
  xNear: 0.1,
  xFar: 0.9,
};

const LEG_LENGTH = Math.hypot(800, 1000);

describe("buildZigzagSegments", () => {
  it("divides the document into equal-height legs near one viewport each", () => {
    const segments = buildZigzagSegments(OPTIONS);

    expect(segments).toHaveLength(3);
    segments.forEach((seg, i) => {
      expect(seg.top).toBe(i * 1000);
      expect(seg.bottom).toBe((i + 1) * 1000);
    });
  });

  it("alternates direction and keeps the path continuous", () => {
    const segments = buildZigzagSegments(OPTIONS);

    expect(segments[0].x1).toBe(100);
    expect(segments[0].x2).toBe(900);
    expect(segments[1].x1).toBe(900);
    expect(segments[1].x2).toBe(100);
    expect(segments[2].x1).toBe(100);

    for (let i = 1; i < segments.length; i++) {
      expect(segments[i].x1).toBe(segments[i - 1].x2);
    }
  });

  it("accumulates signed roll arc across legs", () => {
    const segments = buildZigzagSegments(OPTIONS);

    expect(segments[0].arcStart).toBe(0);
    expect(segments[1].arcStart).toBeCloseTo(LEG_LENGTH);
    // Leg 1 runs right to left, unwinding what leg 0 wound up.
    expect(segments[2].arcStart).toBeCloseTo(0);
  });

  it("always produces at least one leg", () => {
    const segments = buildZigzagSegments({ ...OPTIONS, docHeight: 400 });

    expect(segments).toHaveLength(1);
    expect(segments[0].bottom).toBe(400);
  });
});

describe("resolveZigzagPoint", () => {
  const segments = buildZigzagSegments(OPTIONS);

  it("returns null for an empty path", () => {
    expect(resolveZigzagPoint([], 100)).toBeNull();
  });

  it("interpolates position along a leg", () => {
    const point = resolveZigzagPoint(segments, 500);

    expect(point?.x).toBeCloseTo(500);
    expect(point?.arc).toBeCloseTo(LEG_LENGTH / 2);
  });

  it("reverses x and unwinds arc on a right-to-left leg", () => {
    const point = resolveZigzagPoint(segments, 1250);

    expect(point?.x).toBeCloseTo(700);
    expect(point?.arc).toBeCloseTo(LEG_LENGTH * 0.75);
  });

  it("clamps beyond both ends of the document", () => {
    expect(resolveZigzagPoint(segments, -50)?.x).toBeCloseTo(100);
    expect(resolveZigzagPoint(segments, 9999)?.x).toBeCloseTo(900);
  });
});
