"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/smooth-scroll";

const ABOUT_SECTION = "#about";

/**
 * Floating back-to-top control, bottom right. Hidden until the page is
 * scrolled, then fades in; scrolls through Lenis so the return trip is smooth.
 */
const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      // Appears once the about section reaches the middle of the viewport;
      // falls back to one viewport height if the section is ever renamed.
      const about = document.querySelector<HTMLElement>(ABOUT_SECTION);
      const threshold = about
        ? about.offsetTop - window.innerHeight / 2
        : window.innerHeight;
      setVisible(window.scrollY > threshold);
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
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-elevated/80 text-body backdrop-blur transition-all duration-300 hover:border-signal hover:text-signal motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={20} strokeWidth={2} />
    </button>
  );
};

export default BackToTopButton;
