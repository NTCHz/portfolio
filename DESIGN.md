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

## Motion

CSS only: cursor blink, hero rise stagger, hover glow/lift transitions
(180–350ms, ease-out expo). All gated behind prefers-reduced-motion.
