# Roadmap
 
The phased build plan for The Burroship. Updated as phases ship.
 
## North Star
 
The Burroship is a living Western Slope world map where real
businesses, real terrain, and onboard agents converge into a
quietly running operating system. The website is the front porch.
The Cesium map is the lobby. The agents are the crew.
 
## The Big Rule
 
Build the map first. Then make it alive. Then make it smart. Then
make it 3D. Do not build the dream all at once.
 
## Phase status legend
 
- **shipped** — live in production
- **in flight** — under active build
- **next** — queued, not yet started
- **future** — planned but not scheduled
 
---
 
## Phases
 
### Phase 1 · Cinematic Skeleton · shipped
 
Header, hero, footer, placeholder map section, three routes. Live
on Netlify. Foundation for everything else.
 
What actually shipped: the full v0.6 home page with Hero, Build,
Deploy, Automate sections plus a working `/world/` Cesium experience.
Scope grew during the build because the Cesium engine came together
faster than expected.
 
### Phase 2 · Real Map · shipped (Cesium instead of Mapbox)
 
Originally planned as a Mapbox dark-style map at `/map/`. Pivoted
during the build to a **Cesium photoreal 3D Tiles map at `/world/`**
with the airship cruising the San Juans at 18,000 feet. The
gondola-railing vantage survived. The technical implementation
changed.
 
Doc: `WORLD.md` (captures both the Cesium reality and the future
Mapbox town page plans).
 
The original Phase 2 Mapbox town pages (`/ridgway/`, `/ouray/`,
etc.) moved to Phase 3.
 
### Phase 3 · Town Pages and Agents on the Map · next
 
Two parallel tracks:
 
**Town pages.** Mapbox-driven routes for `/ridgway/`, `/ouray/`,
`/telluride/`, `/mountain-village/`. Each is a dark-styled tilted
map of the town with under 25 pins. Pin categories defined in
`WORLD.md`: hq, client, landmark, partner.
 
**Agents on the map.** Burro portraits or beacon glyphs as markers
on the Cesium world. Click a marker, an agent card opens with name,
domain, current task. Currently agents only appear in the Automate
section of the home page.
 
Docs: `WORLD.md` (exists), `AGENTS.md` (exists). Both updated as
each part lands.
 
Definition of done: at least one town page is live with a working
Mapbox map and real pin data. At least one agent appears on
`/world/` tied to a real location.
 
### Phase 4 · Movement and Live Data · future
 
A small Supabase project (already exists: `twvptrfohuthynndeuxx`)
with three tables: `agent_positions`, `agent_routes`, `events`.
 
Agents read positions from Supabase, not from hardcoded JSON. Agents
glide between locations smoothly. "Currently working at" status
lights up in real time.
 
Definition of done: update an agent's position via SQL, and the
map updates in (near) real time.
 
### Phase 5 · Deploy Triggers · future
 
Netlify webhook from each client repo (Pulse, Cimarron, etc.) fires
on every successful deploy. The webhook updates `agent_positions`
to move the appropriate burro to the appropriate client location.
 
Definition of done: when `coloradoboydepot.com` deploys, the
assigned agent visibly moves to Colorado Boy Depot's coordinates
and stays there for the duration of the deploy.
 
### Phase 6 · Council Intelligence · future
 
The agents review deploys, events, and business activity. They
generate recommendations. Tyler reviews and approves. The map
becomes a thinking surface, not just a display.
 
Doc to write before this phase: a dedicated `COUNCIL_BRIEFS.md`
or expanded `AGENTS.md` section.
 
Definition of done: every morning, open `theburroship.netlify.app`
and see a council brief from the night before. "We noticed X. We
recommend Y. Approve to execute."
 
### Phase 7 · 3D Burro World · future
 
React Three Fiber. GLB burro models. Buildings as tools. Gaussian
splats of Ridgway and partner towns. Weather and time-of-day. The
full dream.
 
Definition of done: the map becomes a real-time stylized 3D world
where burros walk between buildings and the seasons change with
the calendar.
 
The Gaussian Splat capture work begins much earlier than this phase
(see `GAUSSIAN_SPLATS.md`). The 3D world is the eventual home for
the splat library, not the start of it.
 
---
 
## Master files
 
These docs exist now in `docs/`:
 
**Brand and product:**
- `BRAND.md` — what The Burroship is
- `VOICE.md` — tone manifesto
- `CONTENT.md` — production copy source of truth
 
**Design and engineering:**
- `DESIGN.md` — visual system
- `STYLE_GUIDE.md` — engineering conventions
- `INFRASTRUCTURE.md` — Netlify, Supabase, env vars
- `WORKFLOW.md` — how Claude and Tyler ship
 
**The world:**
- `WORLD.md` — Cesium map and town page plans
- `AGENTS.md` — the six-agent council
- `GAUSSIAN_SPLATS.md` — splat capture handbook
 
**Meta:**
- `README.md` — catalog and reading order
- `ROADMAP.md` — this file
- `CLAUDE_SKILLS.md` — skills index for Claude Code
 
Phase-specific docs are written before the phase begins, not before
the project. This keeps documentation informed by reality instead
of speculation.
 
---
 
## What each phase ships
 
Every phase ends with a deployable, shippable URL. Never wait for
the next phase to ship the current one.
 
| Phase | Ships |
| --- | --- |
| 1 | Live cinematic brand site |
| 2 | Live URL where the map is the experience |
| 3 | Live URL where the characters appear on the map |
| 4 | Live URL where the world is alive |
| 5 | Live URL where reality (deploys) updates the world |
| 6 | Live URL where the agents tell Tyler what to do |
| 7 | Live URL that is a stylized world |
 
---
 
## Velocity
 
One phase at a time. Don't rush. Don't skip phases. Don't merge
phases.
 
The reward for shipping Phase 3 is starting Phase 4, not
half-building Phase 5 alongside it.
 
## When stuck
 
Read `BRAND.md` first, then `VOICE.md`. The brand philosophy is
the tiebreaker for any decision the build doesn't obviously
resolve.
