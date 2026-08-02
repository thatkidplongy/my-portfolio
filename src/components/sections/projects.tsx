"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight, Github } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import FillText from "@/components/ui/FillText";

interface Project {
  id: string;
  title: string;
  /** Short qualifier shown under the title, in place of a full paragraph. */
  summary: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  /**
   * Whether the live site can be shown in the hover preview. False when the
   * host sends x-frame-options / CSP frame-ancestors, or when the URL is not
   * currently serving. Those fall back to the screenshot.
   */
  embeddable?: boolean;
  /** Client work shipped to production, versus things built for myself. */
  category: "production" | "personal";
}

const GROUPS: { key: Project["category"]; label: string }[] = [
  { key: "production", label: "Client & Production Work" },
  { key: "personal", label: "Personal Projects" },
];

const PROJECTS: Project[] = [
  {
    id: "1",
    category: "production",
    title: "Before You Buy",
    summary: "A single place for all your property reports",
    image: "/beforeyoubuy.png",
    techStack: [
      "React (Vite)",
      "TypeScript",
      "Styled Components",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "CircleCI",
      "AWS",
    ],
    githubUrl: "",
    liveUrl: "https://www.beforeyoubuy.com.au/",
  },
  {
    id: "2",
    category: "production",
    title: "Backyard",
    summary: "Admin dashboard for Before You Buy",
    image: "/backyard.png",
    techStack: [
      "React (Vite)",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "ExpressJS",
      "PostgreSQL",
      "Docker",
      "CircleCI",
    ],
    githubUrl: "",
  },
  {
    id: "9",
    category: "personal",
    title: "Arise",
    summary:
      "A life RPG mobile app with daily quests, XP, ranks and streaks, inspired by Solo Leveling",
    image: "/arise.png",
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "FastAPI",
      "SQLite",
    ],
    githubUrl: "https://github.com/thatkidplongy/arise",
  },
  {
    id: "3",
    category: "personal",
    title: "BarBooks",
    summary: "Order management system",
    image: "/bar-books.png",
    techStack: [
      "React (Vite)",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "ExpressJS",
      "PostgreSQL",
      "Docker",
      "CircleCI",
    ],
    githubUrl: "https://github.com/thatkidplongy/barbook-order-management",
  },
  {
    id: "4",
    category: "production",
    title: "Exit on Your Terms",
    summary:
      "Business value estimate, discretionary earnings and value gap calculators",
    image: "/eoyt.png",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Responsive Design",
    ],
    githubUrl: "",
    liveUrl: "https://app.exitonyourterms.com/business-value-estimate-calculator",
    embeddable: true,
  },
  {
    id: "5",
    category: "production",
    title: "UBX Training",
    summary: "Training, franchise and camp websites with print templates",
    image: "/ubx-training.png",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Puppeteer",
    ],
    githubUrl: "",
    liveUrl: "https://ubxtraining.com",
    embeddable: true,
  },
  {
    id: "6",
    category: "personal",
    title: "Kanban Board",
    summary: "Task and project management",
    image: "/kanban.png",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Node.js",
      "ExpressJS",
      "PostgreSQL",
      "Railway",
    ],
    githubUrl: "https://github.com/thatkidplongy/kanban-board-frontend",
  },
  {
    id: "7",
    category: "personal",
    title: "Socially",
    summary: "Social platform inspired by Pinterest",
    image: "/socially.png",
    techStack: [
      "React",
      "TypeScript",
      "User Authentication",
      "Content Management",
    ],
    githubUrl: "https://github.com/thatkidplongy/socially",
    // Live site is behind a Google sign-in wall, so a frame would only ever
    // show the login screen. The screenshot is an authenticated view.
    liveUrl: "https://socially-by-plongy.vercel.app/",
  },
];

/**
 * The preview panel is 420px wide at xl. Rendering the iframe at a desktop
 * width and scaling it down keeps the embedded site laid out as its own
 * desktop breakpoint rather than squashing it into a phone layout.
 */
const FRAME_WIDTH = 1400;
const FRAME_HEIGHT = 875;
const FRAME_SCALE = 0.3;

const Projects = () => {
  const [active, setActive] = useState(0);
  /** Rows hovered at least once; their iframes stay mounted for instant re-hover. */
  const [mounted, setMounted] = useState<Set<number>>(new Set());
  const [loaded, setLoaded] = useState<Set<number>>(new Set());
  const preview = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  /** Slide the floating preview to sit beside whichever row is hovered. */
  const handleEnter = (index: number, row: HTMLElement) => {
    setActive(index);

    // Mount the live frame on first hover; it stays mounted so returning to
    // the row is instant rather than reloading the site.
    if (PROJECTS[index].embeddable) {
      setMounted((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
    }

    if (!preview.current || !list.current) return;

    const listBox = list.current.getBoundingClientRect();
    const rowBox = row.getBoundingClientRect();
    const previewHeight = preview.current.offsetHeight;

    const target = rowBox.top - listBox.top + rowBox.height / 2 - previewHeight / 2;
    const clamped = Math.max(0, Math.min(target, listBox.height - previewHeight));

    gsap.to(preview.current, { opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.to(preview.current, { y: clamped, duration: 0.7, ease: "power3.out" });
  };

  const handleLeave = () => {
    if (!preview.current) return;
    gsap.to(preview.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section id="projects" className="pb-section">
      <div className="container-x">
        <SectionLabel>Selected Projects</SectionLabel>

        <div ref={list} className="relative" onMouseLeave={handleLeave}>
          {/* Floating preview — desktop only, follows the hovered row. */}
          <div
            ref={preview}
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 z-10 hidden w-[320px] overflow-hidden opacity-0 xl:block xl:w-[420px]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-elevated">
              {PROJECTS.map((project, i) => (
                <Image
                  key={project.id}
                  src={project.image}
                  alt=""
                  fill
                  sizes="420px"
                  className={`object-cover object-top transition-opacity duration-500 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Live site, layered over its screenshot. Mounted only once a
                  row has been hovered, and revealed only after it loads, so
                  there is never a blank panel. */}
              {PROJECTS.map((project, i) =>
                project.embeddable && mounted.has(i) ? (
                  <iframe
                    key={`frame-${project.id}`}
                    src={project.liveUrl}
                    title=""
                    tabIndex={-1}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                    referrerPolicy="no-referrer"
                    onLoad={() =>
                      setLoaded((prev) => new Set(prev).add(i))
                    }
                    className={`absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-700 ${
                      i === active && loaded.has(i) ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      width: FRAME_WIDTH,
                      height: FRAME_HEIGHT,
                      transform: `scale(${FRAME_SCALE})`,
                    }}
                  />
                ) : null
              )}
            </div>
          </div>

          {GROUPS.map((group) => {
            const items = PROJECTS.map((project, index) => ({
              project,
              index,
            })).filter(({ project }) => project.category === group.key);

            if (!items.length) return null;

            return (
              <div key={group.key} className="mb-16 last:mb-0">
                <h3 className="slide-up-and-fade mb-6 text-xs uppercase tracking-[0.2em] text-faint">
                  {group.label}
                </h3>

                <ul className="border-t border-line">
                  {items.map(({ project, index }, position) => {
                    const href =
                      project.liveUrl || project.githubUrl || undefined;

                    return (
                      <li
                        key={project.id}
                        className="slide-up border-b border-line"
                      >
                        {/* Rows with no working destination render as plain
                            text rather than a dead link. */}
                        <a
                          href={href}
                          target={href ? "_blank" : undefined}
                          rel={href ? "noopener noreferrer" : undefined}
                          onMouseEnter={(e) => handleEnter(index, e.currentTarget)}
                          onFocus={(e) => handleEnter(index, e.currentTarget)}
                          className="group/row block py-8"
                        >
                          <div className="flex items-baseline gap-5">
                            <span className="text-sm tracking-widest text-signal">
                              _{String(position + 1).padStart(2, "0")}.
                            </span>
                            <h3 className="display text-4xl text-muted md:text-6xl">
                              <FillText>{project.title}</FillText>
                            </h3>
                            {href && (
                              <ArrowUpRight
                                className="h-6 w-6 shrink-0 -translate-x-2 text-signal opacity-0 transition-all duration-300 group-hover/row:translate-x-0 group-hover/row:opacity-100"
                                aria-hidden="true"
                              />
                            )}
                          </div>

                          <p className="mt-3 max-w-xl text-body md:pl-[3.4rem]">
                            {project.summary}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-faint md:pl-[3.4rem]">
                            {project.techStack.map((tech, i) => (
                              <span key={tech} className="flex items-center gap-3">
                                {i > 0 && (
                                  <span
                                    aria-hidden="true"
                                    className="inline-block h-1 w-1 rounded-full bg-faint"
                                  />
                                )}
                                {tech}
                              </span>
                            ))}
                          </div>
                        </a>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-8 inline-flex items-center gap-2 text-sm text-faint transition-colors duration-300 hover:text-signal md:ml-[3.4rem]"
                          >
                            <Github className="h-4 w-4" aria-hidden="true" />
                            Source
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
