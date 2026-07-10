# Portfolio Website — Design Spec

**Date:** 2026-07-10
**Status:** Approved pending user review
**Repo:** ~/portfolio (new)

## Goal

Personal portfolio site for **job applications + showcasing work**. Must look
intentional and professional to recruiters, and double as proof of frontend
skill itself.

## Stack

- **Next.js** (App Router, TypeScript, Tailwind CSS) — deliberate choice: the
  site itself demonstrates the stack employers ask for.
- Mostly static pages (`generateStaticParams` / static rendering). No DB, no
  auth, no API routes at launch.
- Node standalone output (`output: 'standalone'`) so it runs as a small
  container on the homelab PaaS.

## Hosting / Deploy

- **Homelab PaaS** (Railway-like): Coolify or Dokploy — user installs first
  (prerequisite, outside this repo's scope).
- Pipeline: `git push` → PaaS auto-builds (Dockerfile or nixpacks) → deploys.
- Exposed via existing **Cloudflare tunnel** → `vlls.space` (or a subdomain,
  e.g. `www.vlls.space` / `me.vlls.space` — decide at deploy time).
- Fallback if homelab is down during a job hunt: the same repo deploys to
  Cloudflare Pages/Vercel with zero code changes. Keep that door open.

## Design Direction

- **Dark editorial / typographic** — large type, strong hierarchy, no generic
  card-grid template. Must pass the anti-template checklist
  (hierarchy via scale, intentional spacing rhythm, designed hover/focus
  states, semantic color).
- One accent color, disciplined contrast. Max two font families.
- Motion: subtle, compositor-friendly (transform/opacity only), respects
  `prefers-reduced-motion`.

## Pages / Sections (single page + resume)

1. **Hero** — name, role one-liner (e.g. "Full-stack developer"), links
   (GitHub, email, resume).
2. **Projects** — data-driven list from one file (`src/data/projects.ts`).
   Editorial list style, not uniform cards. Per project: name, description,
   tech tags, GitHub link, optional live link, optional image.
   - **No screenshots required at launch.** Typographic/terminal-style cards.
     Images added later per-project only where a real UI exists
     (multitenant-ecommerce is the first candidate).
   - Featured first: `off-by-none` (real published tool), then
     `multitenant-ecommerce`, `google-temp-up`, `React_projrct_mycos`,
     `Village-Security`. User can reorder/curate in the data file.
3. **About / Skills** — short paragraph + skill groups (languages, frameworks,
   tools). No skill-percentage bars.
4. **Contact** — GitHub, email (mailto), no contact form at launch
   (form = backend + spam handling; YAGNI).
5. **/resume** — link to a PDF in `/public` (user provides file later).

## Data Model

```ts
// src/data/projects.ts
type Project = {
  slug: string
  name: string
  description: string   // 1-2 sentences, what + why it matters
  tech: string[]
  github: string
  live?: string
  image?: string        // /public path, optional
  featured?: boolean
}
```

Adding a project = adding one entry. No CMS.

## SEO / Meta

- Proper `metadata` export: title, description, OpenGraph image (one static
  OG image for the whole site at launch).
- Sitemap + robots via Next.js built-ins.

## Testing / Quality Gates

- `next build` passes = primary gate.
- Playwright: one smoke test (hero renders) + screenshots at 375/768/1440
  for visual check.
- Lighthouse pass on the deployed page (LCP < 2.5s — trivially achievable,
  site is static).

## Phases

1. **[USER — prerequisite]** Install Coolify/Dokploy in homelab, connect
   Cloudflare tunnel. Portfolio work is not blocked on this — dev happens
   locally.
2. Scaffold Next.js app (create-next-app, TS, Tailwind, App Router), git init.
3. Build sections with placeholder content; design pass.
4. Fill real content (project descriptions, about text, resume PDF).
5. Deploy: Dockerfile, push to GitHub, wire into the PaaS, map domain.

## Out of Scope (launch)

- Blog, CMS, contact form, analytics, i18n, light/dark toggle
  (dark-only at launch), per-project detail pages.
