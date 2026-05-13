# Burroship Design
 
The brand bible. Written May 12 2026, post-Cesium-corridor session. Locked.
 
## The one-line
 
Apple meets Mapbox, with a treasure map in its back pocket.
 
## What Burroship is
 
A working agency, a working compound, and a working airship. Three things that exist as one
brand. The website is the front porch. The Cesium map at `/world/` is the lobby. The agent
council, the splat library, the town partners — those are the rooms. Visitors walk through. They
remember the airship.
 
## Voice — very subtle genius quirky
 
Confident, restrained, never explained. The kind of brand that knows what it is and does not
beg you to like it. The personality leaks through in small places: a word choice, a piece of
ambient typography, a topographic ring that does not need to be there but is. Like a person who
wears one excellent watch and no other jewelry.
 
**Voice rules:**
 
- Headlines are short. 3-6 words. Never explain in the headline.
- Body is conversational, never corporate. "We" and "our" are fine, but never "synergy."
- Numbers and proper nouns are confident. "Six agents. Four towns. One airship." Not "we
  have built a system of..."
- Lean on natural pauses. Periods, not commas, when in doubt. Hemingway over Faulkner.
- Insert one quirky element per page. Not many. One. A footnote in marginalia. A
  topographic decoration. A label that says "boarding" instead of "loading". One thing that
  reveals the personality. Resist the urge to add a second.
- The airship is real to us. We refer to it as a real thing. "The Burroship cruises at
  18,000ft." Not "our virtual airship." Treat the world we are building as if it already exists.
 
**Voice anti-patterns:**
 
- No "innovative." No "cutting-edge." No "next-generation." No "platform."
- No exclamation marks except in deeply earned moments (the closer, maybe).
- No emoji in production copy. They live in commits and notes and chat.
- No "powered by." Whatever is powering it is invisible.
 
**Reference touchstones:**
 
- Apple Small Business — for the warmth and the photography-as-design instinct
- Mapbox developer docs — for the cartographic-but-confident tone
- Patagonia copy — for the western environmental authenticity
- Pendleton's catalogs — for the heritage-but-current feel
- An REI trail map from 1978 — for the topographic decoration vocabulary
 
## Aesthetic direction
 
**Refined minimalism with topographic ambient texture.**
 
Light mode primary. Generous whitespace. Big serif headlines that breathe. Mono labels at small
sizes for the operator-instrument feel. Full-bleed black sections for contrast moments — the
Cesium map embed, the manifesto, the closer. Topo line decorations as subtle background
texture, never as foreground decoration.
 
The page should look at first glance like it could be Apple. On second look you notice the
topo rings, the marginalia, the lantern green accent — and you realize it has its own thing.
 
## Palette
 
**Light surface — the home:**
 
```
--ink             #0A0A0A    Headlines, primary text
--ink-muted       #5A6172    Body, secondary text
--ink-faint       #9CA3AF    Captions, hints
--bg              #FFFFFF    Page background
--surface         #F7F7F5    Cards, soft sections (warm off-white)
--surface-deep    #EDEDE8    Pressed states, deeper recess
--line            #E8E8E5    Hairline dividers
--accent          #7AB300    Topo Lime — buttons, links, accents
--accent-hover    #8AC926    Brighter lime on hover
--accent-glow     rgba(122, 179, 0, 0.18)  Subtle button shadows
```
 
**Dark surface — the Cesium map, the manifesto, the moments:**
 
```
--dark-bg         #020503    Near-black, never pure black
--dark-surface    #0A1108    Elevated cards, panels
--dark-line       rgba(255, 255, 255, 0.06)
--dark-ink        #FFFFFF    Headlines on dark
--dark-ink-muted  rgba(255, 255, 255, 0.65)
--dark-accent     #A8D055    Lantern green — beacons, pins, glow
--dark-accent-glow rgba(168, 208, 85, 0.5)
```
 
Use the same brand color in two value modes — denser on white, brighter on near-black. They
read as siblings. This is how Apple system colors adapt to dark/light without losing identity.
 
## Type
 
**Display: Instrument Serif** (Google Fonts, free)
 
For hero headlines, page titles, big moments. Used at 56-96px depending on context. Has a
characterful italic which we use selectively — usually on one word in the headline to add
emphasis. Tracking: -0.025em at large sizes.
 
**Body: Inter** (Google Fonts, free)
 
For everything that is not a headline or a label. The skill rule says avoid Inter when it is
the showpiece. Here it is the workhorse and Instrument Serif is the showpiece. That pairing is
correct.
 
**Mono: JetBrains Mono** (Google Fonts, free)
 
For labels, captions, timestamps, coordinates, the operator-instrument moments. Used at 9-12px
with letter-spacing of 0.12-0.16em. Always uppercase when it appears as a label.
 
**Scale:**
 
```
display-2xl   96px    line 0.95    tracking -0.03em    hero headlines (rare)
display-xl    72px    line 0.98    tracking -0.025em   page hero
display-lg    56px    line 1.0     tracking -0.02em    section titles
display-md    40px    line 1.05    tracking -0.015em   sub-section titles
display-sm    32px    line 1.1     tracking -0.01em    cards, callouts
 
lead          18px    line 1.55    body lead-in paragraphs
body          15px    line 1.6     body
body-sm       13px    line 1.55    secondary
 
mono-lg       12px    tracking 0.14em uppercase   prominent labels
mono          11px    tracking 0.12em uppercase   standard labels
mono-sm       10px    tracking 0.14em uppercase   small captions
```
 
## Motion
 
Restraint. Apple's curve, nothing else.
 
```
--ease-standard   cubic-bezier(0.4, 0, 0.2, 1)
--ease-emphasis   cubic-bezier(0.16, 1, 0.3, 1)
--duration-fast   180ms
--duration-base   240ms
--duration-slow   480ms
```
 
**The rules:**
 
- Page load: a single staggered reveal. Eyebrow first, headline second, sub third, CTA
  fourth. 80ms stagger. Each item rises 12px and fades in.
- Hover states: 180ms. Subtle color shift, optional 2px translate.
- Scroll reveals: 480ms. Only used on section transitions. Fade-and-rise pattern.
- Never use springs. Never bounce. Never spin without purpose.
- Topographic ring decorations have a slow ambient breathing — 8 second cycle, ±2% opacity.
  This is the only "always on" animation. Everything else is event-driven.
 
## Topographic decoration
 
The signature ambient element. Concentric circles rendered as 1px SVG strokes in accent color
at 12-18% opacity. Used:
 
- As a watermark behind the hero headline
- As a section divider element
- As a pin label decoration on town cards
- As the loading state for the Cesium map
 
Never as foreground. Never as a focal element. Always feels like it is part of the paper.
 
## Layout
 
**Grid:** 12-column on desktop, 4-column on tablet, 1-column on mobile.
 
**Container max-widths:**
 
- Reading width: 720px (article body, manifesto)
- Default content: 1200px
- Wide content (hero, areas grid, full map): 1440px
 
**Spacing scale (multiples of 4):**
 
```
space-1   4px
space-2   8px
space-3   12px
space-4   16px
space-6   24px
space-8   32px
space-12  48px
space-16  64px
space-20  80px
space-24  96px
space-32  128px
space-40  160px    section separators
```
 
Section padding-y is `space-32` (128px) on desktop, `space-20` (80px) on mobile.
 
## The footer
 
Subtle, generous, lots of negative space. Layout:
 
```
[Areas column]    [Burroship column]    [Compound column]    [Empty / decorative topo lines]
 
Areas              Burroship              Compound
  Ridgway          The Burroship          About
  Ouray            Build                  Manifesto
  Telluride        Deploy                 Field Notes
  Mountain Village Automate
 
                                                     © 2026 The Burroship · A small bright thing
```
 
The copyright lives in a subtle row at the bottom with mono-sm type at 50% opacity. The line
"A small bright thing" is our voice — confident, restrained, slightly off. Apple says "Designed
by Apple in California." We say "A small bright thing." Same energy. Different person.
 
## Logo plan
 
No logo yet — that's Phase 2. For now, the wordmark "The Burroship" set in JetBrains Mono
weight 700 at 11px with letter-spacing 0.14em IS the logo. It works. When a real mark exists,
we drop it in beside the wordmark and adjust.
 
## Pages
 
The site has four primary pages plus the world:
 
1. `/` — Home, full pitch
2. `/build/` — Coming soon, scaffolded for content
3. `/deploy/` — Coming soon, scaffolded
4. `/automate/` — Coming soon, scaffolded
5. `/world/` — The Cesium map (separate experience)
 
Each town gets a page later: `/ridgway/`, `/ouray/`, `/telluride/`, `/mountain-village/`. Those
are Mapbox-driven and a separate phase.
 
## Anti-patterns — things this site will never do
 
- Glassmorphism / frosted glass cards (over-done, dated)
- Gradient buttons (timid, says "I am a startup from 2022")
- Three columns of identical feature cards with icons (generic SaaS)
- Hero video backgrounds at the top of the home page (slow, expensive, distracting)
- Testimonial carousels with avatars (Burroship is too early for that anyway)
- "Trusted by" logo wall (we have one client and that is fine)
- A chat bubble in the bottom-right corner (we are not Drift)
- Emoji in the nav or any persistent UI
- More than one font weight per visual size (one weight, one job)
 
## When in doubt
 
Cut a thing. Make the remaining things bigger. Add more whitespace. Move on.
 
The Burroship is not for everyone. It is for the people who recognize it. They will find it.
