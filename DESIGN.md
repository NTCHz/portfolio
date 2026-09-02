# DESIGN.md

> This file describes the site as it is actually built. Every token, font and
> element below was read back out of `app/globals.css`; if you change one, change
> the other in the same commit.

## Theme

Dark editorial brutalism. Near-black page, display type at poster scale, mono
metadata in wide tracking, hairline rules instead of cards, one hot orange used
sparingly. Reads as a printed spread that moves, not as a dashboard.

## Color

All five tokens live on `:root` in `app/globals.css`.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0c0c0c` | page background — set on `html`, so the signal field can sit at `z-index: -1` behind `body` |
| `--ink` | `#ececec` | display type, headings, hover inversions |
| `--muted` | `#8f8f8f` | body copy and metadata (6.05:1 on `--bg`) |
| `--line` | `rgba(236, 236, 236, 0.14)` | every hairline rule and border |
| `--accent` | `#ff4d00` | links, index numbers, focus ring, the signal field |
| `--ease-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | the one easing curve, shared by CSS and GSAP |

Strategy: the identity is carried by scale and rules, not by colour. Orange is
rationed to marks and interactive moments so it stays hot.

## Typography

- Display: **Anton** 400, always uppercase, line-height 0.92–0.95. It runs at
  poster scale: hero `clamp(3rem, 19.5vw, 15rem)`, work titles up to `5.6rem`,
  the footer's *Let's talk* up to `10rem`. There is no display size ceiling —
  the type is meant to overflow.
- Body/UI: **Geist Sans**.
- Data and labels: **Geist Mono**, uppercase, letter-spacing 0.1–0.22em —
  `.meta`, `.work-tech`, `.skill-title`, `.foot-links`, diagram labels.

Two families plus Anton. No serif anywhere.

## Signature elements

- Fixed nav in `mix-blend-mode: difference`, so it inverts against whatever
  scrolls under it instead of carrying a background.
- Hero name as two masked lines that rise into place on load.
- Outlined marquee band: transparent fill with a 1px `-webkit-text-stroke`,
  scrolling forever between two hairlines.
- Editorial work list, not cards: mono `/01` index, giant title, description
  column. Hover turns the title accent and slides it 14px right.
- Archive rows on a 4-column grid; hover inverts the entire row to an `--ink`
  background with `#0c0c0c` text.
- Per-project SVG architecture diagrams with mono labels and dashed flow lines,
  drawn in on scroll via `animation-timeline: view()` where supported.
- `.dot-live` — a small pulsing accent dot marking live status.
- **Signal field**: one fixed WebGL canvas behind the DOM carrying a point cloud
  in `--accent`, drifting on noise with a weak pointer repulsion. Shipped: the
  hero state only. Planned: it morphs as you scroll — noise cloud at the hero, a
  constellation of the 17 systems over the work sections, collapsing to a single
  line at contact. It is background, never chrome: under reduced motion or
  without a WebGL context the canvas is never constructed and `--bg` is the
  whole background.

## Motion

Scroll is the instrument. Three layers, in order of how early they ship:

1. **Lenis** — smooth scroll for the whole document. One instance, mounted from
   the root layout, driven off `requestAnimationFrame`.
2. **GSAP + ScrollTrigger** — section reveals and scroll-linked sequencing.
   ScrollTrigger reads scroll position from Lenis's callback, so the two share
   one source of truth. transform/opacity only.
3. **WebGL point field** — hero state shipped, scroll morph still to come. See
   *Signal field* above.

CSS keeps the small stuff it already does well: the `.dot-live` pulse, the
marquee scroll, hover colour/transform transitions (250–500ms on `--ease-expo`),
and the scroll-driven diagram draw-in under `animation-timeline: view()`.

Reduced motion is a real branch, not a lower amplitude: Lenis is never
constructed, native scroll takes over, and every revealed element renders in
its final visible state. Same for JS-off — the un-animated page is the page.
