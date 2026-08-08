"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection, setLenis } from "@/lib/smooth-scroll";

/**
 * Wires Lenis (inertial scrolling) into GSAP's ticker and registers the
 * scroll-reveal animations for the whole page. Renders nothing.
 *
 * The reveal classes are declared in globals.css so the initial hidden state
 * is painted before JS runs; this component only animates them back in.
 *
 * Re-runs on every route change so each page gets a fresh Lenis instance and
 * its own reveal triggers, rather than inheriting the previous page's.
 */
const SmoothScroll = () => {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    if (!prefersReduced) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      });

      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);

      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      // Section headers and large blocks: long travel, individual triggers.
      gsap.utils.toArray<HTMLElement>(".slide-up-and-fade").forEach((el) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // List items: short travel, staggered across whatever enters together.
      ScrollTrigger.batch(".slide-up", {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
          }),
      });

      // Clipped line-by-line reveals for display type.
      gsap.utils.toArray<HTMLElement>(".reveal-mask").forEach((el) => {
        gsap.to(el.children, {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    });

    ScrollTrigger.refresh();

    // A section link followed from another route arrives as /#section, which
    // Lenis has to finish rather than the browser: scroll once the page has
    // mounted. The hash is left in place so the URL stays shareable.
    const { hash } = window.location;
    if (hash) requestAnimationFrame(() => scrollToSection(hash));

    return () => {
      ctx.revert();
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      setLenis(null);
    };
  }, [pathname]);

  return null;
};

export default SmoothScroll;
