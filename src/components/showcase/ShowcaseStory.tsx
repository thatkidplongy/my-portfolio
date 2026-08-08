"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";
import { DEFAULT_FOCUS, type Showcase } from "@/lib/showcases";
import { prefersReducedMotion } from "@/lib/utils/motion";

/** Viewport heights of scroll per beat; also the tall section's height unit. */
const SCROLL_PER_BEAT_VH = 100;

interface ShowcaseStoryProps {
  showcase: Showcase;
  /** Mirrors the layout so consecutive stories alternate sides. */
  reversed?: boolean;
}

/**
 * One project told as a pinned scroll story, in the shape Apple uses on its
 * product pages: a sticky stage whose beats crossfade as scroll progress
 * scrubs a single timeline, over a screenshot that straightens from a tilt
 * as the story advances. Below lg and under reduced motion the beats simply
 * stack in flow, so the content is never gated behind the animation.
 */
const ShowcaseStory = ({ showcase, reversed = false }: ShowcaseStoryProps) => {
  const root = useRef<HTMLDivElement>(null);

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
            {
              rotateY: reversed ? 18 : -18,
              rotateX: 8,
              scale: 0.92,
              y: 40,
            },
            { rotateY: 0, rotateX: 0, scale: 1, y: 0, ease: "none" },
            0
          );
        }

        // Each beat holds the stage, then hands over to the next. Its frame
        // crossfades on the same schedule, so the image the visitor is
        // looking at always belongs to the words they are reading.
        const frames = gsap.utils.toArray<HTMLElement>("[data-frame]");

        beats.forEach((beat, i) => {
          const frame = frames[i];

          if (i > 0) {
            tl.fromTo(
              beat,
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.35 },
              i
            );
            if (frame) {
              tl.fromTo(
                frame,
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.35 },
                i
              );
            }
          }

          if (i < beats.length - 1) {
            tl.to(beat, { autoAlpha: 0, y: -30, duration: 0.35 }, i + 0.65);
            // Frames stay put once shown: the incoming one fades over the
            // top, which avoids a flash of empty stage between beats.
          }
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reversed]);

  return (
    <div
      ref={root}
      id={showcase.id}
      // Tall on desktop: one viewport of scroll per beat feeds the scrub.
      className="pb-section lg:pb-0"
      style={{
        ["--story-height" as string]: `${
          showcase.beats.length * SCROLL_PER_BEAT_VH
        }vh`,
      }}
    >
      <div className="lg:h-[var(--story-height)]">
        <div className="container-x lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
          <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div
              className={`lg:relative lg:min-h-[24rem] ${
                reversed ? "lg:order-2" : ""
              }`}
            >
              <p className="slide-up-and-fade mb-6 text-sm uppercase tracking-[0.2em] text-signal lg:mb-10">
                {showcase.name}
              </p>

              {showcase.beats.map((beat, i) => (
                <div
                  key={beat.index}
                  data-beat
                  /* Stacked and pinned on desktop so beats crossfade in
                     place; a plain flow list everywhere else. */
                  className={`mb-12 lg:absolute lg:inset-x-0 lg:top-16 lg:mb-0 ${
                    i > 0 ? "lg:invisible lg:opacity-0" : ""
                  }`}
                >
                  <span className="display text-sm text-signal">
                    _{beat.index}
                  </span>
                  <h3 className="display mt-3 text-4xl leading-none md:text-5xl">
                    {beat.title}
                  </h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                    {beat.body}
                  </p>
                </div>
              ))}

              <div className="flex flex-wrap gap-4 lg:absolute lg:bottom-0 lg:left-0">
                {showcase.liveUrl && (
                  <a
                    href={showcase.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="display inline-flex items-center gap-3 bg-accent px-8 py-4 text-lg tracking-[0.1em] text-canvas transition-colors duration-300 hover:bg-body"
                  >
                    View live
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                )}
                {showcase.repoUrl && (
                  <a
                    href={showcase.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="display inline-flex items-center gap-3 border border-line px-8 py-4 text-lg tracking-[0.1em] text-body transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <Github className="h-5 w-5" aria-hidden="true" />
                    Source
                  </a>
                )}
              </div>
            </div>

            <div className={`[perspective:1200px] ${reversed ? "lg:order-1" : ""}`}>
              <div
                data-shot
                className="slide-up-and-fade relative aspect-[16/10] w-full overflow-hidden border border-line bg-elevated"
              >
                {showcase.beats.map((beat, i) => {
                  const focus = beat.focus ?? DEFAULT_FOCUS;

                  return (
                    <div
                      key={beat.index}
                      data-frame
                      /* Stacked frames: beat one is visible from the start,
                         the rest fade in over it as the story advances.
                         On mobile only the first is kept, since the beats
                         are a plain list there. */
                      className={`absolute inset-0 ${
                        i > 0 ? "hidden lg:block lg:invisible lg:opacity-0" : ""
                      }`}
                    >
                      <Image
                        src={beat.image ?? showcase.image}
                        alt={beat.image ? beat.title : showcase.imageAlt}
                        fill
                        priority={i === 0}
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover transition-[object-position,transform] duration-700 ease-out"
                        style={{
                          objectPosition: `${focus.x}% ${focus.y}%`,
                          transform: `scale(${focus.scale})`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseStory;
