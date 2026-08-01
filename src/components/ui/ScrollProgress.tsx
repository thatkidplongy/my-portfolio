"use client";

import { useEffect, useRef } from "react";

/**
 * Replaces the hidden native scrollbar: a slim track on the right whose fill
 * tracks scroll progress. Reads window.scrollY rather than hooking Lenis, so
 * it stays correct when smooth scrolling is disabled for reduced motion.
 */
const ScrollProgress = () => {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fill.current) fill.current.style.height = `${progress * 100}%`;
    };

    // Coalesce bursts of scroll events into one paint.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed right-[21px] top-1/2 z-40 hidden h-[40vh] w-1.5 -translate-y-1/2 rounded-full bg-line lg:block"
    >
      <div
        ref={fill}
        className="w-full rounded-full bg-signal"
        style={{ height: "0%" }}
      />
    </div>
  );
};

export default ScrollProgress;
