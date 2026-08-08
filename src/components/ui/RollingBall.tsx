"use client";

import { useEffect, useRef, useState } from "react";
import {
  buildZigzagSegments,
  resolveZigzagPoint,
  type ZigzagSegment,
} from "@/lib/utils/zigzag-path";

const BALL_SIZE = 44;

/** Horizontal rail margins as viewport fractions. */
const X_NEAR = 0.08;
const X_FAR = 0.92;

/**
 * Background ornament: a continuous zigzag rail of identical diagonals,
 * alternating direction, anchored to the document behind the content. The
 * ball rides the point where the rail crosses the middle of the viewport, so
 * it rolls down and back across the screen as the page scrolls, and retraces
 * its path when scrolling up. Roll angle is arc length over radius, signed by
 * travel direction, so the spin always matches the movement.
 */
const RollingBall = () => {
  const ball = useRef<HTMLDivElement>(null);
  const segments = useRef<ZigzagSegment[]>([]);
  const [canvas, setCanvas] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ball.current;
      const point = resolveZigzagPoint(
        segments.current,
        window.scrollY + window.innerHeight / 2
      );
      if (!el || !point) return;

      const rotation = (point.arc / (BALL_SIZE / 2)) * (180 / Math.PI);
      el.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
      el.style.left = `${point.x}px`;
    };

    // Coalesce bursts of scroll events into one paint.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const measure = () => {
      segments.current = buildZigzagSegments({
        pageWidth: window.innerWidth,
        docHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight,
        xNear: X_NEAR,
        xFar: X_FAR,
      });
      setCanvas({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight,
      });
      schedule();
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);

    // Section heights settle as fonts and images load; re-measure when the
    // page's total height changes rather than guessing at load timing.
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none hidden lg:block">
      {/* Rails: document-anchored so each diagonal stays with its section. */}
      {canvas.height > 0 && (
        <svg
          className="absolute left-0 top-0 z-0 w-full"
          style={{ height: canvas.height }}
          viewBox={`0 0 ${canvas.width} ${canvas.height}`}
          preserveAspectRatio="none"
        >
          {segments.current.map((seg) => (
            <line
              key={seg.top}
              x1={seg.x1}
              y1={seg.top}
              x2={seg.x2}
              y2={seg.bottom}
              stroke="var(--color-line)"
              strokeWidth="1"
            />
          ))}
        </svg>
      )}

      {/* The ball rides mid-viewport, so it is fixed; only x and spin vary. */}
      <div
        ref={ball}
        className="fixed top-1/2 z-0 rounded-full border border-white/25 bg-elevated/60"
        style={{ width: BALL_SIZE, height: BALL_SIZE, left: "-100px" }}
      >
        <span className="absolute left-1/2 top-[6px] h-2 w-2 -translate-x-1/2 rounded-full bg-signal" />
      </div>
    </div>
  );
};

export default RollingBall;
