"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/utils/motion";

interface Beat {
  index: string;
  title: string;
  body: string;
}

/** One beat per stage of the pinned story, in scroll order. */
const BEATS: Beat[] = [
  {
    index: "01",
    title: "Ask anything of a filing",
    body: "Drop in an SEC filing and ask a question in plain English. Retrieval runs on device, so nothing leaves the browser.",
  },
  {
    index: "02",
    title: "Every claim carries a citation",
    body: "Answers arrive with their sources attached, and each citation is checked in code against the document it came from.",
  },
  {
    index: "03",
    title: "Confidence you can inspect",
    body: "Scores are computed from retrieval and verification signals, not guessed by the model describing its own work.",
  },
  {
    index: "04",
    title: "Benchmarked against invention",
    body: "A published benchmark catches models citing sentences they made up, so the guarantees are measured rather than claimed.",
  },
];

const LIVE_URL = "https://docsight-ten.vercel.app/";
const REPO_URL = "https://github.com/thatkidplongy/docsight";

/**
 * Pinned scroll story for the flagship project, in the shape Apple uses on
 * its product pages: a tall section whose stage stays pinned while scroll
 * progress scrubs one timeline, crossfading beats over a screenshot that
 * settles as the story advances. Below lg (and under reduced motion) the
 * pinning is skipped and the beats simply stack.
 */
const DocSightShowcase = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        const beats = gsap.utils.toArray<HTMLElement>("[data-beat]");
        const shot = root.current?.querySelector("[data-shot]");

        // The stage is pinned by CSS sticky and the section's own height
        // supplies the scroll distance, so ScrollTrigger only scrubs.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // The screenshot enters tilted and straightens across the story.
        if (shot) {
          tl.fromTo(
            shot,
            { rotateY: -18, rotateX: 8, scale: 0.92, y: 40 },
            { rotateY: 0, rotateX: 0, scale: 1, y: 0, ease: "none" },
            0
          );
        }

        // Each beat holds the stage, then hands over to the next.
        beats.forEach((beat, i) => {
          if (i > 0) {
            tl.fromTo(
              beat,
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.35 },
              i
            );
          }
          if (i < beats.length - 1) {
            tl.to(beat, { autoAlpha: 0, y: -30, duration: 0.35 }, i + 0.65);
          }
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    // Tall on desktop: one viewport of scroll per beat feeds the scrub.
    <section ref={root} id="docsight" className="py-section lg:h-[400vh] lg:py-0">
      <div className="container-x lg:pt-24">
        <SectionLabel>Featured</SectionLabel>
      </div>

      <div
        data-stage
        className="container-x lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:relative lg:min-h-[22rem]">
            <p className="slide-up-and-fade mb-6 text-sm uppercase tracking-[0.2em] text-signal lg:mb-10">
              DocSight
            </p>

            {BEATS.map((beat, i) => (
              <div
                key={beat.index}
                data-beat
                /* Stacked and pinned on desktop so beats crossfade in place;
                   a plain flow list everywhere else. */
                className={`mb-12 lg:absolute lg:inset-x-0 lg:top-16 lg:mb-0 ${
                  i > 0 ? "lg:invisible lg:opacity-0" : ""
                }`}
              >
                <span className="display text-sm text-signal">_{beat.index}</span>
                <h3 className="display mt-3 text-4xl leading-none md:text-5xl">
                  {beat.title}
                </h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                  {beat.body}
                </p>
              </div>
            ))}

            <div className="flex flex-wrap gap-4 lg:absolute lg:bottom-0 lg:left-0">
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="display inline-flex items-center gap-3 bg-accent px-8 py-4 text-lg tracking-[0.1em] text-canvas transition-colors duration-300 hover:bg-body"
              >
                View live
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="display inline-flex items-center gap-3 border border-line px-8 py-4 text-lg tracking-[0.1em] text-body transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
                Source
              </a>
            </div>
          </div>

          <div className="[perspective:1200px]">
            <div
              data-shot
              className="slide-up-and-fade relative aspect-[16/10] w-full overflow-hidden border border-line bg-elevated"
            >
              <Image
                src="/docsight.png"
                alt="DocSight answering a question about an SEC filing with citations"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocSightShowcase;
