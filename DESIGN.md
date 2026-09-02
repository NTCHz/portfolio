# DESIGN.md

## Theme

Terminal / systems. A live machine readout, not a document. Dark control-room
field with a faint blueprint grid, cyan phosphor signal, amber status marks.

## Color (OKLCH-first, hex fallback shown)

| Token | Hex | Role |
|---|---|---|
| `--void` | `#05070b` | page background |
| `--panel` | `#0b1017` | tiles, terminal chrome |
| `--line` | `#1c2634` | 1px borders, grid lines (grid at ~6% alpha) |
| `--text` | `#c7ccd4` | body text (≥4.5:1 on void) |
| `--bright` | `#eef2f6` | headings |
| `--dim` | `#7d8794` | secondary text |
| `--signal` | `#00e5ff` | cyan phosphor — links, glow, active |
| `--status` | `#e8a849` | amber — status marks, secondary accent |

Strategy: committed — the void+grid+glow field carries the identity; cyan is
rationed to interactive/signal moments so it stays hot.

## Typography

- Display: **Martian Mono** (700/800, tight tracking ≥ -0.04em) — terminal-manual
  physicality, used for the name and section headers.
- Body/UI: **Geist Sans**; data/labels: **Geist Mono**.
- Hero ceiling ~5rem; uppercase display only for the name and section headers.

## Signature elements

- Blueprint grid background with radial mask fading to the edges.
- Terminal prompt lines (`$ …`) with a blinking block cursor (CSS only).
- Manifest readout: host/edge/stack/status of the actual homelab serving the page.
- Bento project grid: 3 featured systems as large tiles (path-style header
  `~/systems/<slug>`), the rest as compact tiles. Hover = cyan border + glow lift.
- **Signal field**: one fixed WebGL canvas behind the DOM, carrying a cyan point
  cloud that morphs as you scroll — a noise cloud at the hero, a constellation
  of the 17 systems over the work sections, collapsing to a single line at
  contact. It is background, never chrome: the site reads the same without it.

## Motion

Scroll is the instrument. Three layers, in order of how early they ship:

1. **Lenis** — smooth scroll for the whole document. One instance, mounted from
   the root layout, driven off `requestAnimationFrame`.
2. **GSAP + ScrollTrigger** — section reveals and scroll-linked sequencing.
   ScrollTrigger reads scroll position from Lenis's callback, so the two share
   one source of truth. transform/opacity only.
3. **WebGL point field** — later. See *Signal field* above.

CSS keeps the small stuff it already does well: cursor blink, hover glow/lift
(180–350ms, ease-out expo).

Reduced motion is a real branch, not a lower amplitude: Lenis is never
constructed, native scroll takes over, and every revealed element renders in
its final visible state. Same for JS-off — the un-animated page is the page.
