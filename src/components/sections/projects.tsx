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
}

const PROJECTS: Project[] = [
  {
    id: "1",
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
    liveUrl: "https://barbook-order-management-production.up.railway.app/",
  },
  {
    id: "3",
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
    liveUrl: "https://barbook-order-management-production.up.railway.app/",
  },
  {
    id: "4",
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
  },
  {
    id: "5",
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
  },
  {
    id: "6",
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
    githubUrl: "",
    liveUrl: "https://kanban-board-frontend-production.up.railway.app",
  },
  {
    id: "7",
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
    liveUrl: "https://socially-by-plongy.vercel.app/",
  },
  {
    id: "8",
    title: "Sneakpeek",
    summary: "Ecommerce for sneakers, watches and headsets",
    image: "/sneak-peek.png",
    techStack: [
      "Ecommerce",
      "Product Management",
      "Shopping Cart",
      "Payment Processing",
    ],
    githubUrl: "https://github.com/thatkidplongy/sneapeek",
    liveUrl: "https://sneakpeek-plongy.vercel.app/",
  },
];

const Projects = () => {
  const [active, setActive] = useState(0);
  const preview = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  /** Slide the floating preview to sit beside whichever row is hovered. */
  const handleEnter = (index: number, row: HTMLElement) => {
    setActive(index);
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
            <div className="relative aspect-[16/10] w-full bg-elevated">
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
            </div>
          </div>

          <ul className="border-t border-line">
            {PROJECTS.map((project, index) => {
              const href = project.liveUrl || project.githubUrl || undefined;

              return (
                <li key={project.id} className="slide-up border-b border-line">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) => handleEnter(index, e.currentTarget)}
                    onFocus={(e) => handleEnter(index, e.currentTarget)}
                    className="group/row block py-8"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="text-sm tracking-widest text-signal">
                        _{String(index + 1).padStart(2, "0")}.
                      </span>
                      <h3 className="display text-4xl text-muted md:text-6xl">
                        <FillText>{project.title}</FillText>
                      </h3>
                      <ArrowUpRight
                        className="h-6 w-6 shrink-0 -translate-x-2 text-signal opacity-0 transition-all duration-300 group-hover/row:translate-x-0 group-hover/row:opacity-100"
                        aria-hidden="true"
                      />
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
      </div>
    </section>
  );
};

export default Projects;
