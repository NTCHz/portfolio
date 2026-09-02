# PRODUCT.md

## Register

brand — a portfolio: design IS the product. The visitor's impression is the deliverable.

## What this is

Personal portfolio of Thichanon "Nont" Ratanasaenwan (github.com/NTCHz) — full-stack
developer: RAG/LLM backends, LINE-platform apps, self-hosted infra. Live at
https://portfolio.shipfold.com, served from his own Proxmox homelab through Coolify
and a Cloudflare tunnel (this fact is part of the brand).

## Target users

- Recruiters / hiring managers (Thai + international) skimming in <60s
- Potential freelance clients
- Fellow developers checking his work

## Job of the page

Prove "I build production systems end to end" — 17 flagship systems (mostly
private client/org repos, so descriptions carry the weight, not links), skills,
contact. One page + resume PDF later.

## Brand personality

Brand-voice words: **wired · self-reliant · precise**.
The site should feel like a machine he operates, not a template he filled in.
Terminal/systems aesthetic chosen by the owner (rejected a minimal editorial pass
as bland): grid field, cyan signal glow, terminal motifs, bento project tiers.

## Anti-references

- Generic SaaS dark landing (gradient mesh + glass cards)
- Minimal editorial serif restraint (already tried; owner called it จืด/bland)
- Template dev-portfolio card grids with skill bars

## Constraints

- Next.js App Router + Tailwind v4; pages stay statically rendered
- A client-side motion layer is allowed and wanted: Lenis smooth scroll, GSAP
  ScrollTrigger, and a WebGL point field behind the DOM
- Perf budget is measured on the **critical path**, not on total JS: the initial
  home-page load stays under 750KB raw (measured 701,127 B decoded with the
  WebGL layer gated off — the same critical path the site had before it existed)
- The WebGL point field is deliberately **excluded** from that number and capped
  separately at ~900KB raw (measured 890,184 B for `three` +
  `@react-three/fiber`). Total JS is not the metric, because that chunk is
  lazily fetched behind a gate: reduced motion, no WebGL context, or no JS and
  it is never requested at all. The visitors who most need the site light —
  motion-sensitive, old GPU, slow device — are exactly the ones who never pay
  for it. Reference weight class for the motion-enabled path is david-hckh.com
  (~1.02MB), not worawork.vercel.app (~3.96MB)
- Degradation is not optional: with `prefers-reduced-motion` set, with WebGL
  unavailable, or with JS off entirely, the site must still render complete and
  usable. Nothing may be permanently invisible.
- Content single source: `data/projects.ts`
