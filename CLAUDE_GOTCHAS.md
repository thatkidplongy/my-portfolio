# Gotchas

- Never run `npm run build` while `next dev` is running: the production build
  rewrites `.next` under the dev server and every request 500s with missing
  manifest errors. Stop the dev server first; recover with `rm -rf .next`.
- Only one dev server at a time. Two `next dev` processes sharing `.next`
  corrupt it (ENOTEMPTY renames during `npm install`, missing
  `[turbopack]_runtime.js` at runtime). Check with `pgrep -fl "next dev"`.
- The dark "N" circle bottom-left in development is Next.js dev tools, not
  part of the site; it never ships to production.
- Lenis owns scrolling: anchor navigation must go through
  `src/lib/smooth-scroll.ts`, never `scrollIntoView` (see its comment).
