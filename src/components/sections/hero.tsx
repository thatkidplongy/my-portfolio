"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import DownloadCVButton from "@/components/ui/DownloadCVButton";
import ScrollToButton from "@/components/ui/ScrollToButton";

// Client-only: three.js has no SSR story, and the scene is a progressive
// enhancement — the hero reads fine before (or without) it.
const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), {
  ssr: false,
});

const STATS = [
  { value: "5+", label: "Years of Experience" },
  { value: "8+", label: "Projects Shipped" },
  { value: "5", label: "Companies" },
];

const Hero = () => {
  const root = useRef<HTMLElement>(null);

  // Mount the 3D scene only on large viewports so phones never download the
  // three.js bundle; the dynamic import fires on first render of <HeroScene />.
  // Subscribed rather than read once so crossing the breakpoint (window drag,
  // rotation) mounts or unmounts the scene correctly.
  const [showScene, setShowScene] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setShowScene(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // The hero is above the fold, so it animates off the intro finishing rather
  // than off a scroll trigger.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.to("[data-hero-line]", {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
      })
        .to(
          "[data-hero-fade]",
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
          "-=0.6"
        )
        .to(
          "[data-hero-stat]",
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 },
          "-=0.7"
        );

      const play = () => tl.play();

      if (document.documentElement.dataset.introDone === "true") play();
      else window.addEventListener("intro:done", play, { once: true });

      return () => window.removeEventListener("intro:done", play);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden py-32"
    >
      {/* Sits over the empty upper-right region of the hero grid; z-10 so the
          canvas receives hover/click, which is safe because nothing
          interactive renders underneath it at lg and up. */}
      {showScene && (
        <div className="absolute right-[2%] top-[8%] z-10 hidden h-[56%] w-[42%] lg:block">
          <HeroScene />
        </div>
      )}

      <div className="container-x grid w-full items-end gap-16 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <h1 className="display text-[16vw] leading-[0.85] lg:text-[8.5rem]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block translate-y-full text-signal">
                Full Stack
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block translate-y-full text-muted">
                Engineer
              </span>
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-10 max-w-2xl translate-y-6 text-lg leading-relaxed text-muted opacity-0"
          >
            <span className="text-signal">
              Electronics and Communications Engineer
            </span>{" "}
            turned Software Engineer, with 5+ years shipping production web
            apps and AI powered features on AWS Bedrock.
          </p>

          <div
            data-hero-fade
            className="mt-12 flex translate-y-6 flex-wrap items-center gap-4 opacity-0"
          >
            <ScrollToButton target="#contact">Let&apos;s Talk</ScrollToButton>
            <DownloadCVButton />
          </div>

          <p
            data-hero-fade
            className="mt-8 flex translate-y-6 items-center gap-3 text-sm text-muted opacity-0"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
            </span>
            Open to new opportunities
          </p>
        </div>

        <dl className="flex gap-10 lg:flex-col lg:gap-8 lg:text-right">
          {STATS.map((stat) => (
            <div key={stat.label} data-hero-stat className="translate-y-6 opacity-0">
              <dt className="display text-4xl text-signal lg:text-5xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.15em] text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
