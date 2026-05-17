# Design
 
The visual system. Color, type, decoration, motion, layout. The
companion to `STYLE_GUIDE.md` — this one is about how it looks, that
one is about how it's built.
 
---
 
## Aesthetic intent
 
Apple meets Mapbox, with a treasure map in its back pocket.
 
What that means:
 
- **Apple** — restraint, generous whitespace, considered type
- **Mapbox** — cartographic confidence, mono labels, instrument feel
- **Treasure map** — one bit of personality. Topo decorations. A
  neon-on-paper accent. Beacon dots.
 
The right adjective for the visual voice is *very subtle genius
quirky*. Like a person who wears one excellent watch and no other
jewelry.
 
## Color
 
### Light surface (the home)
 
| Token | Hex | Use |
| --- | --- | --- |
| `ink` | `#0A0A0A` | Headlines, primary text |
| `ink-muted` | `#5A6172` | Body, secondary text |
| `ink-faint` | `#9CA3AF` | Captions, hints, labels |
| `bg` | `#FFFFFF` | Page background |
| `surface` | `#F7F7F5` | Cards, soft sections |
| `surface-engine` | `#F0EFEB` | Deploy section, warm engine-room feel |
| `surface-deep` | `#EDEDE8` | Pressed states, deeper recess |
| `line` | `#E8E8E5` | Hairline dividers |
 
### Accent (Topo Lime)
 
| Token | Hex | Use |
| --- | --- | --- |
| `accent` | `#7AB300` | Buttons, links, accents on white |
| `accent-hover` | `#8AC926` | Brighter on hover |
| `accent-soft` | `rgba(122,179,0,0.10)` | Soft backgrounds, dot shadows |
| `accent-glow` | `rgba(122,179,0,0.18)` | Subtle glows |
 
### Dark surface (Cesium, contrast moments)
 
| Token | Hex | Use |
| --- | --- | --- |
| `dark-bg` | `#020503` | Cesium background, dark sections |
| `dark-surface` | `#0A1108` | Elevated cards on dark |
| `dark-accent` | `#A8D055` | Lantern green for dark surfaces |
| `dark-ink` | `#FFFFFF` | Headlines on dark |
| `dark-ink-muted` | `rgba(255,255,255,0.65)` | Body on dark |
 
The accent has two render modes: denser `#7AB300` on white, brighter
`#A8D055` on near-black. Same DNA, two contexts. They read as
siblings.
 
## Type
 
### Display: Inter (yes, Inter is the display now)
 
Used for all headlines and titles. Weight 600. Tight tracking.
 
```
display-2xl   clamp(40px, 5.2vw, 64px)   weight 600   tracking -0.025em
display-xl    clamp(32px, 4vw, 44px)     weight 600   tracking -0.022em
display-lg    clamp(26px, 3vw, 34px)     weight 600   tracking -0.018em
display-md    clamp(20px, 2.4vw, 26px)   weight 600   tracking -0.012em
display-sm    clamp(17px, 2vw, 21px)     weight 600   tracking -0.008em
```
 
Hero headlines top out at 64px. Anything bigger feels like a magazine
cover instead of a product page.
 
### Body: Inter
 
```
lead     17px / 1.55   weight 400   muted color
body     15px / 1.6    weight 400
body-sm  13px / 1.5    weight 400
```
 
### Mono: JetBrains Mono
 
```
mono-lg  12px   weight 600   tracking 0.14em   uppercase
mono     11px   weight 600   tracking 0.12em   uppercase
mono-sm  10px   weight 600   tracking 0.14em   uppercase
mono-xs  9px    weight 500   tracking 0.14em   uppercase
```
 
Used for labels, coordinates, eyebrows, instrument readouts. Always
uppercase when used as a label.
 
### Serif accent: Instrument Serif (one moment per page)
 
The italic serif is reserved for **one accent moment per page**. The
footer tag "A small bright thing" is the canonical use. Hero subheads
may include one italic phrase. Everything else is sans.
 
If a designer or writer has to ask whether to use serif, the answer is
probably no.
 
## Topographic decoration
 
The signature ambient element. Concentric rings rendered as 1px SVG
strokes in the accent color. Used:
 
- Behind hero content as watermark
- In Build section corner
- In map-adjacent moments
 
**Never** as foreground. Never as a focal element. Always feels like
it is part of the paper.
 
### Intensity
 
| Class | Opacity | Use |
| --- | --- | --- |
| `intensity-subtle` | 0.06 | Most cases |
| `intensity-medium` | 0.10 | Deliberate accent |
| `intensity-strong` | 0.16 | Rare, hero-level only |
 
Per the designer round: lower opacity beats higher opacity. The rings
should feel like paper grain, not radar.
 
### Animation
 
Vertical drift, 16-second cycle, ease-in-out. Moves down 8px and back
up. No zoom pulse. The drift feels like air currents.
 
## Beacon dots
 
The signature marker of identity.
 
```
.beacon-dot         8px green dot + 4px soft glow ring
.beacon-dot.sm      6px version
.beacon-dot.pulse   slow 2.4s breathing animation
.beacon-dot.on-dark dark-surface variant with stronger glow
```
 
Used for live indicators, status markers, link emphasis. Always
green. Never red, yellow, or any "status" color from a normal design
system — Burroship beacons are just "we are here, signaling."
 
## Signal bars
 
For the engine-room aesthetic. Four ascending bars, 12px tall, in
Topo Lime. Indicates connectivity, uptime, signal strength. Used in
Deploy section and the footer status row.
 
## Schematic grid
 
A radial-gradient dot pattern with a fade-mask, used in the Build
section. Gives the navigation-table feel without being literal graph
paper. 24px grid spacing, 1px dots, hairline opacity.
 
## Arc backdrop
 
Concentric arc fragments used in the Automate section. Hints at
orbital coordination without ever announcing it. Always low opacity
(0.08), always behind content, masked with a gradient so it fades at
the edges.
 
## Spacing
 
Multiples of 4 throughout. Use the scale:
 
```
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128 / 160
```
 
Sections use `py-24 md:py-32` on the home page (96px/128px). Hero gets
slightly more breathing room with `py-28 md:py-36`.
 
## Containers
 
Three widths:
 
- **reading** — 720px max (manifesto, articles, long-form)
- **default** — 1200px max (most content)
- **wide** — 1440px max (hero, sections, full-width grids)
 
## Layout
 
12-column grid on desktop. Section content typically lives in either:
 
- A single full-width column for atmospheric moments (hero, manifesto)
- A 5/7 split for section + supporting visual (Build, Deploy, Automate)
- A grid for parallel items (areas grid, agent tiles)
 
The 5/7 split is the workhorse. Left column is title and copy, right
column is the operational artifact.
 
## Motion
 
Restraint. Apple's curve, nothing else.
 
```
ease-standard   cubic-bezier(0.4, 0, 0.2, 1)
ease-emphasis   cubic-bezier(0.16, 1, 0.3, 1)
duration-fast   180ms
duration-base   240ms
duration-slow   480ms
```
 
### Rules
 
- Page load: staggered reveal. Eyebrow first, headline second, body
  third, supporting fourth. 60-80ms stagger.
- Hover: 200ms. Subtle color shift or border accent.
- Scroll reveals: 480ms fade-and-rise. Only fires once per element.
- Topo rings drift continuously. Beacons pulse continuously. Nothing
  else animates without a user action.
 
No springs. No bounces. No rotations without purpose.
 
## Decorative elements catalog
 
These are the visual elements that carry brand identity. Each should
appear with restraint. Generally one per section.
 
| Element | Where it lives |
| --- | --- |
| Topo rings | Hero, Build, Manifesto |
| Schematic grid | Build (navigation table) |
| Signal bars | Deploy, Footer status |
| Beacon dots | Throughout. Liberal. |
| Pulse beacon | Hero, "Council operational" row, "Signal nominal" |
| Arc backdrop | Automate (the bridge) |
| Coordinate readouts | Spec strips, Hero, Footer |
 
## Don't
 
- Glassmorphism / frosted glass cards
- Gradient buttons
- Three-column feature grids with identical icons
- Hero video backgrounds
- Testimonial carousels
- "Trusted by" logo walls
- Chat bubbles in the bottom-right
- Emoji in any persistent UI
- More than one font weight per visual size
- Red, yellow, or "status color" indicators (everything is the green
  beacon, on or off)
 
## When in doubt
 
Cut a thing. Make the remaining things bigger. Add more whitespace.
The brand is not for everyone. It is for the people who recognize it.
They will find it.
