# PRODUCT.md

## Register

brand — a portfolio: design IS the product. The visitor's impression is the deliverable.

## What this is

Personal portfolio of Thichanon "Nont" Ratanasaenwan (github.com/NTCHz) — full-stack
developer: RAG/LLM backends, LINE-platform apps, self-hosted infra. Live at
https://portfolio.vlls.space, served from his own Proxmox homelab through Coolify
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

- Next.js App Router + Tailwind v4, static, zero client JS where possible
- Content single source: `data/projects.ts`
- CSS motion only; respect prefers-reduced-motion
