---
name: "The Burroship"
tagline: "Build. Deploy. Automate."
mood: "Bioluminescent forest at night. The Burroship's lantern over Ridgway."
version: "0.1.0"
status: "documentation only — not yet wired into Tailwind. Tokens live in src/styles/index.css for v1."

palette:
  primary: "#A8D055"
  accent: "#A8D055"
  background: "#050F05"
  surface: "#18181B"
  border: "#27272A"
  text-primary: "#FFFFFF"
  text-secondary: "#A1A1AA"

typography:
  display:
    family: "Inter"
    sizes:
      lg: "64px / 1.04 / 500 / 0 tracking"
      md: "40px / 1.1 / 500"
      sm: "28px / 1.2 / 500"
  body:
    family: "Inter"
    sizes:
      lg: "18px / 1.6 / 400"
      md: "16px / 1.6 / 400"
      sm: "14px / 1.5 / 400"
  label:
    family: "JetBrains Mono"
    sizes:
      md: "12px / 1.2 / 600 / uppercase / 0.08em tracking"

spacing:
  base: "8px"
  gap: "16px"
  card-padding: "24px"
  section-padding: "80px"

radius:
  card: "8px"
  control: "8px"
  pill: "9999px"

motion:
  ease-standard: "cubic-bezier(0.32, 0.72, 0, 1)"
  ease-cinematic: "cubic-bezier(0.16, 1, 0.3, 1)"
  duration-ui: "400ms"
  duration-scene: "1200ms"
---

# The Burroship — Design Philosophy

## The Feeling

You are leaning over the gondola railing of an airship at altitude.
Below you, the San Juans. The lights of Ridgway scattered through low
cloud. Cold. Quiet. Expansive. The lantern of the ship casts a pale
green glow on the underside of the cloud. Nothing busy. Nothing
decorative. Every element earns its place.

Every section of the site is a different angle from that same
vantage. Header is the railing in front of you. Hero is the view
out. Map is the world below. Footer is the cabin behind you.

## Principles

Restraint over density. Empty space is not unused space. It is
the breath that makes the rest legible.

One focal element per section. Never two things competing for the
eye. The map is the focal element of the map section. The video is
the focal element of the hero. Anything else is supporting.

Material honesty. Green glows because the lantern is lit. Colors
mean something. They are not decoration.

Mono for metadata. Coordinates, timestamps, labels, tags, status
indicators are all JetBrains Mono. Never sans.

## What This Is Not

- Not a SaaS landing page. No logo cloud, no testimonial carousel,
  no pricing table.
- Not a marketing site. No "transform your business," no urgency
  CTAs, no exclamation points.
- Not a Web3 project. No NFT mint button on the hero. No wallet
  connect by default.
- Not a portfolio. The work speaks elsewhere; this is the brand.

## Motion

All easing uses ease-standard or ease-cinematic. No bounce, no
spring, no playful overshoot. The Burroship is not playful. It is
settled.

UI transitions are 400ms. Scene transitions are 1200ms or longer.
Anything in between feels nervous.

## The Map (specific)

The map is the soul of the site. Custom Mapbox style, dark base,
contour lines visible at zoom 12+, labels suppressed except for
Ridgway, Ouray, Telluride, and Chimney Rock. Terrain enabled. Pitch
50 degrees default. We are looking down at an angle, not flat.

Future agent characters render as small circular portraits with a
faint signal-green ring when active. Click reveals a hover card with
name, status, current task, location. The world is quiet until you
ask it a question.

## Guardrails

- Do not introduce additional accent colors. The palette is strict.
- Do not use bright reds, warning yellows, or semantic dashboard
  colors. The Burroship has no errors, only states.
- Do not use emoji in UI copy. Mono and sans, that is it.
- Do not flatten the design into generic SaaS sections.
- Do not break the contrast pattern. Background and surface roles
  must remain distinct.
- Buttons, cards, and badges share the same radius and border
  language across the entire site.

## Promotion Path

This file currently documents the design system. The tokens above
are the source of truth, but they are mirrored manually into
src/styles/index.css using Tailwind v4 @theme syntax.

In v0.2, a Vite plugin will parse this frontmatter at build time
and generate the CSS automatically. When that lands, edit DESIGN.md
and the entire site re-themes on save.

Until then: when you change a token here, change it in
src/styles/index.css too. Both files travel together.
