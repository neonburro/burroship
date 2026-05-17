# Neon Burro Compound · Brand & Style Guide v1
 
**Status:** Working canonical brief
**Owner:** Warbleur (document custodian)
**Ratified by:** Tyler Reagan, 2026-05-17
**Council convergence:** Warbleur, Volt, Ion (unanimous)
**Inherits from:** `src/styles/index.css` live tokens · Burro Design
Canon v1.1 · Council Core v1 (voice, motion, 80/20 discipline)
 
This guide is implementation. It inherits from the ratified canon and
the live code tokens. It does not redefine them. Where this guide and
`index.css` or the Burro Design Canon ever disagree, those win and this
guide is corrected.
 
**Reconciliation note (what changed from the first draft):**
- Lime corrected from `#B7FF3C` to the canonical deep lime `#7AB300`
  (founder ruling: deep lime is the ownership fingerprint, the bright
  chartreuse made the brand cosmetic rather than architectural)
- Token hexes locked to the live `index.css` system
- Typography corrected: Inter is the body and UI voice, Instrument
  Serif is selective display accent only, never the dominant interface
  voice (matches the live type scale)
- The Compound positioned as the umbrella brand layer, not a
  replacement for Burroship or Neon Burro (founder ruling, resolves
  Council Core Part X §38 brand-architecture question)
 
---
 
## Brand architecture
 
Founder ruling, 2026-05-17. The relationship between the entities is
now settled:
 
- **The Compound** is the umbrella world. The core made physical. A
  luxury incubator and field station in the San Juans where capable
  people gather to build, automate, and deploy real systems.
- **Neon Burro** is the intelligence and operational layer.
- **Burroship** is a primary digital surface of the Compound world.
- **Pulse** is the operational admin layer for client systems.
- **The Geoship partnership** is the architectural and regenerative
  habitat layer.
 
The Compound sits above the others as the brand layer. It does not
replace Burroship or Neon Burro. They are surfaces and layers of one
world.
 
---
 
## Brand position
 
The Compound is a luxury incubator for technical teams, founders,
operators, and builders who come together to learn, design, prototype,
build, automate, and deploy real systems in a physically beautiful
environment.
 
It should feel less like a resort and more like an elite mountain
field station for modern builders: premium hospitality, serious work,
architectural experimentation, and a sense of mission.
 
The burro agents are not mascots. They are operational beings whose
reason for being is tied to useful action. This is Council Core Sacred
Rule 1 (every member produces real operational outcomes) expressed as
a place.
 
---
 
## Brand pillars
 
### 1. Mountain observatory
 
The world feels quiet, elevated, and geographically real rather than
generic futuristic fantasy. Real terrain, weather, light, materials,
and thresholds create the moat. This is the ratified emotional center.
 
### 2. Luxury infrastructure
 
Luxury here means silence, detail, confidence, spacing, material
truth, and restraint rather than excess or ornament. Luxury is often
spacing, not decoration. The benchmark is premium product restraint
and editorial clarity, never loud startup graphics.
 
### 3. Living mission
 
The Compound exists only while there is meaningful work to do. If the
mission goes stale, the agents move on and the Compound dissolves.
This gives the brand a living operational logic and is the place-scale
expression of the doctrine that every member produces real outcomes.
 
### 4. Human and agent collaboration
 
Ambitious people arrive, meet the burro agents, learn systems, and
leave with things built and launched. Every visual implies
coordination, threshold, progress, or deployment rather than passive
lifestyle consumption.
 
---
 
## Audience
 
Primary: technical recruits, startup operators, builders, architects,
founders, systems thinkers, high-agency collaborators looking for
meaningful work in a premium setting.
 
Secondary: partners, land and architecture collaborators, future
residents, aligned brands interested in regenerative or systems-driven
development.
 
Emotionally, the audience should feel they have discovered a rare
place where intelligence, design, land, and execution finally belong
together.
 
---
 
## Brand voice
 
Calm, exact, slightly mythic, highly competent. Never a startup hype
page, a crypto project, or a resort brochure.
 
Preferred language is operational, invitational, architectural: build,
dock, signal, align, deploy, threshold, field station, observatory,
route, launch, learn, inhabit.
 
### Voice rules
 
- Short declarative sentences
- Fewer adjectives, stronger nouns
- Avoid hype verbs: disrupt, dominate, revolutionize, and their family
- Sensory and spatial language only when it supports place and
  atmosphere
- The burros speak and act like capable agents, never mascots
 
---
 
## Color system
 
Locked to the live `src/styles/index.css` `@theme` tokens. These hexes
are canonical. The brand-language names are kept for designer
communication, but the hex values are the source of truth and any code
token map must match these exactly.
 
### Light surface
 
| Brand name | Token | Hex | Use |
|---|---|---:|---|
| Cloud Paper | `--color-bg` | `#FFFFFF` | Primary light background |
| Dome Mist | `--color-surface` | `#F7F7F5` | Secondary light surface |
| Deep Mist | `--color-surface-deep` | `#EDEDE8` | Tertiary light surface |
| Alpine Ink | `--color-ink` | `#0A0A0A` | Primary text, dark elements |
| Timber Smoke | `--color-ink-muted` | `#5A6172` | Secondary text |
| Weathered Stone | `--color-ink-faint` | `#9CA3AF` | Captions, faint labels |
| Hairline | `--color-line` | `#E8E8E5` | Borders, dividers |
 
### Dark surface
 
| Brand name | Token | Hex | Use |
|---|---|---:|---|
| Ridge Black | `--color-dark-bg` | `#020503` | Primary dark field |
| Ridge Surface | `--color-dark-surface` | `#0A1108` | Cards on dark |
| Dark Hairline | `--color-dark-line` | `rgba(255,255,255,0.06)` | Dark borders |
| Snow | `--color-dark-ink` | `#FFFFFF` | Primary text on dark |
 
### Accent · the signal fingerprint
 
| Brand name | Token | Hex | Use |
|---|---|---:|---|
| Topo Lime | `--color-accent` | `#7AB300` | Signature accent, signal leakage, CTAs, focus, map traces |
| Dock Lime | `--color-accent-hover` | `#8AC926` | Hover and active accent |
| Lantern Lime | `--color-dark-accent` | `#A8D055` | Accent on dark surfaces |
 
The deep lime `#7AB300` is the ownership fingerprint. The brighter
chartreuse explored in the first draft is rejected by founder ruling:
it made the brand cosmetic rather than architectural.
 
### Color rules
 
- Ridge Black and Alpine Ink are the primary dark field
- Cloud Paper, not pure-clinical white, reads as the light field
  (it is `#FFFFFF` but always paired with warm imagery and generous
  space so it never feels sterile)
- Topo Lime only for signals, CTAs, active states, map traces, subtle
  brand punctuation. Never a flood color
- Pages stay 85 to 90 percent neutral and natural, 10 to 15 percent
  accent energy at most. This is the 90/10 discipline from the Burro
  Design Canon applied to the interface
 
---
 
## Typography
 
Locked to the live `index.css` type system. Inter is the operational
voice. Instrument Serif is a selective display accent, never the
dominant interface voice. JetBrains Mono is the data and label face.
 
### The stack
 
- **Body and UI:** Inter (`--font-sans`)
- **Display accent:** Instrument Serif (`--font-display`), selective
  and rare, used through the `.text-serif-accent` treatment only
- **Data and labels:** JetBrains Mono (`--font-mono`)
 
### Why this is correct
 
The live product already uses Inter for the display scale
(`.text-display-2xl` through `.text-display-sm`) and reserves
Instrument Serif for rare italic accent moments. Making the entire
brand read as editorial-luxury serif would fight the live system and
tip the temperature from operational toward decorative. Inter as the
stable substrate with serif as rare punctuation is the ratified
direction.
 
### Typography roles
 
| Role | Token / class | Notes |
|---|---|---|
| Display headline | Inter via `.text-display-*` | Short, architectural, sentence case |
| Rare accent phrase | Instrument Serif via `.text-serif-accent` | One per screen maximum, never decorative |
| Body copy | Inter via `.text-body` / `.text-lead` | Neutral, readable, spacious |
| Label / Eyebrow | JetBrains Mono via `.text-mono*` | Uppercase, tracked, operational |
| Data / system | JetBrains Mono | Rare, system moments only |
 
### Type rules
 
- Headlines short and architectural
- Sentence case, not constant title case
- No overly thin weights
- Increase line height and whitespace beyond what feels necessary
- Luxury is spacing, not decoration
 
---
 
## UI style
 
The interface should feel like premium infrastructure. Useful first,
beautiful second. This enforces the doctrine that the brand is
operational intelligence, not startup theater.
 
### Interface traits
 
- Rounded geometry, not bubbly
- High-contrast dark and light pairings
- Thin lines, soft shadows, restrained blur
- Large spacing, generous section height
- Motion that reveals state rather than attracting attention
 
### Buttons
 
These map to the rebuilt Button v2 intent taxonomy.
 
- **Primary** (`primary`): dark pill, light text, calm hover to lime.
  Obvious keyboard focus state
- **Primary lime** (`primaryLime`): lime pill, dark text, for
  high-emphasis moments on dark surfaces
- **Secondary** (`secondary` / `secondaryDark`): ghost pill, thin
  border, for Learn, Open, View, Enter
- **Subtle / Operational** (`subtle` / `operational`): text-forward
  with bottom rule, for opening a table, room, route, or system
- Optional restrained `signal` beacon when a control should read as a
  live system control
 
### Eyebrow
 
Maps to the rebuilt Eyebrow v2. A compositional instrument: tonal
variants by surface, optional live signal dot (reuses the beacon
system), optional trailing hairline rule that extends the label into
the layout like an instrument scale. The most-repeated identity marker
on every page. It must read operational intelligence, never SaaS label.
 
---
 
## Motion
 
Slow, useful, almost infrastructural. Arrival-based reveals are
correct. Performative choreography is not.
 
### Motion rules
 
- Fade plus small vertical rise is the default reveal
- Respect reduced-motion settings always (a hard requirement on the
  Reveal atom, not optional)
- Stagger lightly. Interval around 0.05 to 0.06 seconds. It should
  feel inevitable, not theatrical
- Large physical objects move heavily and precisely, never like toys
  or drones
 
---
 
## Imagery
 
Imagery anchors the world in real place, real materials, real
thresholds. The strongest image is not generic beauty. It is a calm
but loaded moment: docking, approach, door opening, ridgeline view,
domes in the distance, warm interior glow through cold air.
 
### Hero image doctrine
 
Locked to Burro Design Canon v1.1 Section 2.5.
 
**Desktop hero:**
- Wide cinematic landscape
- Negative space reserved for copy
- Real San Juans geography, true to Ridgway terrain
- The Burroship vessel integrated into the land
- Mandatory lime signal leakage. Zero-neon renders are off-canon
 
**Mobile hero:**
- A separate portrait composition is required, not a center-crop of
  the wide image. The scene must survive without losing the subject
  or the place logic
- One clear focal point: vessel, doorway, ridge, or dome cluster
- Inherits the canonical vessel silhouette, does not reinvent it
 
### The organism and the vessel
 
Per canon v1.1 Section 2.5, two distinct canonical entities:
 
- **The burro organism** is the being and the soul. Realistic,
  warm, slightly uncanny, never a mascot
- **The Burroship vessel** is a real craft the burros crew. Weathered,
  industrial, heavy. Not a burro in a costume. Its own object
 
The burro is not the ship. The ship is not the burro. The burros crew
the ship.
 
### Image mood-board words
 
alpine observatory · docked airship · warm threshold · architectural
silence · cold air and warm interior · restrained signal glow · luxury
field station · precision hospitality · real landscape, mythic purpose
 
---
 
## The burros
 
Agents with purpose, not mascots. They embody the mission: build,
automate, deploy. Shown as competent, calm, slightly uncanny beings
engaged in useful work, coordination, or presence.
 
### Burro behavior rules
 
- Never idle for decoration
- Never exaggerated or cartoonish
- Never over-accessorized
- Always tied to work, guidance, routing, construction, memory, or
  deployment
 
Full visual rules in Burro Design Canon v1.1. This guide does not
restate them, it points to the canon as the source of truth.
 
---
 
## Spatial feeling
 
A hybrid of private members club, advanced field lab, architecture
residency, systems incubator, and mountain observatory.
 
### Interior
 
Warm wood, brushed metal, matte stone, wool, canvas, smoked glass.
Modular tables, maps, dashboards, prototypes, quiet lounge zones. Warm
light pools inside darker shells. Premium but durable, never fragile.
 
### Exterior
 
Domes, landing zones, utility paths, meadow edges, timber, steel,
water, ridgeline views. Weather is welcome, not a problem. Exterior
scenes imply route, arrival, and work ahead.
 
---
 
## Tagline options
 
- Build. Automate. Deploy.
- A luxury incubator for builders.
- Quiet infrastructure for ambitious people.
- The mountain compound for teams that ship.
- Learn the system. Build the structure. Launch the mission.
 
---
 
## Production order
 
Founder-ratified sequence:
 
1. Finalize this reconciled style guide (this document)
2. Lock the token map in code (verify `index.css` matches this guide
   exactly, correct any drift)
3. Build the homepage hero comp, desktop and mobile
4. Build the UI kit for the team (Button v2, Eyebrow v2, Reveal,
   Stagger, Container, cards, navigation)
5. Then commission the Burroship art and Compound deck assets
 
This order keeps the visual system consistent from the start instead
of repairing mismatched decisions later.
 
---
 
## Design summary
 
- Mountain observatory for atmosphere
- Luxury as silence and spacing
- Neon Burro as operational intelligence
- The Compound as the physical incubator and umbrella world
- Topo Lime `#7AB300` as the signal fingerprint
- Inter plus selective Instrument Serif as the voice stack
 
Grounded, usable, ownable. Not trendy.
 
---
 
## Relationship to the constitution
 
This guide is implementation. It inherits from Council Core v1, the
Burro Design Canon v1.1, and the live `index.css` tokens. It never
amends them. If this guide conflicts with a ratified source, the
ratified source wins and this guide is corrected. Implementation
inherits from doctrine, it does not redefine it.
