import type Lenis from "lenis";

/**
 * Lenis owns the scroll position once it is running, so anchor navigation has
 * to go through it rather than through scrollIntoView. The instance is held
 * here so any component can reach it without prop drilling.
 */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

/** Freeze the page behind a fullscreen overlay. */
export const setScrollLocked = (locked: boolean) => {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.body.style.overflow = locked ? "hidden" : "";
};

export const scrollToTop = () => {
  if (instance) {
    instance.scrollTo(0, { duration: 1.4 });
  } else {
    // Lenis is disabled under prefers-reduced-motion.
    window.scrollTo({ top: 0, behavior: "auto" });
  }
};

export const scrollToSection = (selector: string) => {
  const element = document.querySelector(selector);
  if (!element) return;

  if (instance) {
    instance.scrollTo(element as HTMLElement, { duration: 1.4 });
  } else {
    // Lenis is disabled under prefers-reduced-motion.
    element.scrollIntoView({ behavior: "auto", block: "start" });
  }
};
