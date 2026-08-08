"use client";

import { useEffect, useState } from "react";
import { scrollToSection, setScrollLocked } from "@/lib/smooth-scroll";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Featured", href: "#featured" },
  { name: "Projects", href: "#projects" },
  { name: "Stack", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const EMAIL = "fgclavano@gmail.com";

/**
 * Fullscreen menu. Driven by CSS transitions off React state rather than a
 * GSAP timeline, so it cannot be left half-applied by an effect re-running.
 */
const Navigation = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setScrollLocked(open);
    return () => setScrollLocked(false);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    // Let the overlay start clearing before the scroll begins.
    setTimeout(() => scrollToSection(href), 300);
  };

  return (
    <>
      <a
        href={`mailto:${EMAIL}`}
        className="fixed bottom-0 left-0 z-40 hidden h-screen w-12 items-center justify-center text-xs tracking-[0.2em] text-muted transition-colors duration-300 hover:text-signal lg:flex"
        style={{ writingMode: "vertical-rl" }}
      >
        {EMAIL}
      </a>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed right-6 top-6 z-[60] flex h-12 w-12 flex-col items-center justify-center gap-[7px] lg:right-12"
      >
        <span
          className={`block h-[2px] w-8 bg-accent transition-transform duration-300 ${
            open ? "translate-y-[4.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[2px] w-8 bg-accent transition-transform duration-300 ${
            open ? "-translate-y-[4.5px] -rotate-45" : ""
          }`}
        />
      </button>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex items-center bg-canvas transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "translate-y-0" : "pointer-events-none -translate-y-full"
        }`}
      >
        <nav className="container-x">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.name} className="overflow-hidden">
                <button
                  tabIndex={open ? 0 : -1}
                  onClick={() => go(item.href)}
                  className="display flex items-baseline gap-6 text-[13vw] text-muted transition-colors duration-300 hover:text-signal lg:text-[7rem]"
                >
                  <span
                    className={`block font-sans text-base tracking-widest text-signal transition-transform duration-500 ease-out ${
                      open ? "translate-y-0" : "translate-y-[110%]"
                    }`}
                    style={{ transitionDelay: open ? `${180 + i * 60}ms` : "0ms" }}
                  >
                    _0{i + 1}
                  </span>
                  <span
                    className={`block transition-transform duration-500 ease-out ${
                      open ? "translate-y-0" : "translate-y-[110%]"
                    }`}
                    style={{ transitionDelay: open ? `${180 + i * 60}ms` : "0ms" }}
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
