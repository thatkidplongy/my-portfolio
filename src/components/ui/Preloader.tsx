"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LETTERS = "FLORANTE".split("");

/**
 * Full-screen intro: the name rises letter by letter, then the panel lifts
 * away. Rendered client-side only, so if JS never runs there is no overlay to
 * get stuck behind.
 */
const Preloader = () => {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The hero holds its entrance until this fires.
    const finish = () => {
      if (document.documentElement.dataset.introDone === "true") return;
      document.documentElement.dataset.introDone = "true";
      window.dispatchEvent(new Event("intro:done"));
      setDone(true);
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap
        .timeline({ onComplete: finish })
        .to("[data-letter]", {
          y: "0%",
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.045,
        })
        .to(
          "[data-letter]",
          { y: "-105%", duration: 0.5, ease: "power3.in", stagger: 0.025 },
          "+=0.35"
        )
        .to(root.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "-=0.2");
    }, root);

    // Safety net: never trap the page if the timeline is interrupted.
    const bail = setTimeout(finish, 4000);

    return () => {
      clearTimeout(bail);
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas"
      aria-hidden="true"
    >
      <div className="flex overflow-hidden">
        {LETTERS.map((letter, i) => (
          <span
            key={`${letter}-${i}`}
            data-letter
            className="display inline-block translate-y-full text-[16vw] leading-none lg:text-[11rem]"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
