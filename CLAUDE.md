# Portfolio

Personal portfolio site — a single scrolling page of sections (hero, about, skills, projects,
experience, contact) built on Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4,
and GSAP with ScrollTrigger for animation over Lenis smooth scrolling. Deployed as a
static-friendly Next app; no backend, no database.

Baseline coding standards live in `~/Develop/CLAUDE.md`, with Next.js specifics in
`~/Develop/FRONTEND_STANDARDS.md`. Record repeated mistakes in
[`CLAUDE_GOTCHAS.md`](CLAUDE_GOTCHAS.md) — read it before debugging a dev server or scroll issue.

## Commands

- `npm run dev` — Next dev server with Turbopack
- `npm run build` / `npm start` — production build and serve
- `npm run lint` — `next lint` (ESLint flat config in `eslint.config.mjs`)
- `npm run test` — Vitest (`test:watch` to watch)

There is no Prettier in this repo. Formatting is whatever ESLint and the existing files say —
do not reformat existing code to the `~/Develop` baseline.

## Layout

- `src/app/` — App Router entry: root layout with the theme provider, one page.
- `src/components/sections/` — one component per page section.
- `src/components/ui/` — reusable primitives (navigation, theme provider). New shared pieces go
  here, not inline in a section.
- `src/components/hero/`, `src/components/providers/` — feature-scoped components.
- `src/lib/` — `smooth-scroll.ts`, `tech-icons.ts`, `utils/`.

## Load-bearing constraints

- **Lenis owns scrolling.** Anchor navigation must go through `src/lib/smooth-scroll.ts`; calling
  `scrollIntoView` directly fights it.
- **One dev server at a time, and never build while `next dev` runs.** Both corrupt `.next` and
  every request 500s. Check with `pgrep -fl "next dev"`; recover with `rm -rf .next`.
- The dark "N" circle at bottom-left in development is Next.js dev tools, not part of the site.
