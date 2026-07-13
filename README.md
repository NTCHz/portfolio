# portfolio

Personal portfolio of Thichanon "Nont" Ratanasaenwan ([@NTCHz](https://github.com/NTCHz)) —
full-stack developer: RAG/LLM backends, LINE-platform apps, self-hosted infra.

**Live: [portfolio.shipfold.com](https://portfolio.shipfold.com)**

Self-hosted end to end: built with Next.js, deployed via Coolify on a Proxmox homelab,
served through a Cloudflare Tunnel. The hosting is part of the portfolio.

## Stack

- Next.js (App Router) + TypeScript
- Deployed by Coolify (auto-deploy on push to `main` via GitHub App webhook)

## Development

```bash
npm install
npm run dev   # http://localhost:3000
```

## Structure

- `app/` — pages, layout, OG image generation, sitemap
- `docs/` — design specs and roadmap
- `resume/` — LaTeX resume source
- `public/llms.txt` — machine-readable summary for LLM crawlers
