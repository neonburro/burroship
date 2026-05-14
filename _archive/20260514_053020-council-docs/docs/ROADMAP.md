# Roadmap
 
The phased build plan for The Burroship. Updated as phases ship.
 
## North Star
 
The Burroship is a living Western Slope world map where real
businesses, real terrain, and onboard agents converge into a
quietly running operating system. The website is the front porch.
The active dome is the working surface. The agents are the crew.
 
## The Big Rule
 
Build the map first. Then make it alive. Then make it smart. Then
make it 3D. Do not build the dream all at once.
 
## Phase status legend
 
- **shipped** — live in production
- **active** — under build right now
- **next** — queued, not yet started
- **future** — planned but not scheduled
 
---
 
## Phases
 
### Phase 1 · Cinematic Skeleton · shipped
 
Header, hero, footer, three-room home (Build, Deploy, Automate),
working `/world/` map experience. Live on Netlify.
 
What actually shipped: the v0.6 home page with Hero, Build, Deploy,
Automate sections plus a working Cesium-based `/world/` experience.
 
### Phase 2 · The Active Dome · active
 
Pivoted from Cesium to **Mapbox GL JS v3** for performance and
control. The dome is the new spatial framing: a subtle atmospheric
shell over the San Juans inside which all Burroship operations
take place.
 
**Phase 2.1 (shipped or shipping):** Foundation. Mapbox Standard
night style, globe-to-cruise opening sequence, status overlay,
clean file structure ready for layers. No pins, no airship,
no visible dome edge yet.
 
**Phase 2.2 (next):** The airship glyph. Camera can be steered.
Dome edge becomes visible when user pans near boundary.
 
**Phase 2.3 (after that):** 13 location beacons. Fly-to controls.
Mobile bottom sheet.
 
Doc: `WORLD.md`.
 
### Phase 3 · The Layers Era · next
 
Once the dome is built and steerable, layers stack on top.
 
- Million Dollar Highway as a subtle danger path between Ouray
  and Silverton (when Silverton is added)
- Town pages: separate routes for Ridgway, Ouray, Telluride
- Pin categories from `WORLD.md`: hq, client, landmark, partner
 
### Phase 4 · Live Data · future
 
Supabase realtime kicks in.
 
- `world_airships.current_lat/lng/heading` broadcasts live
- Update a row via SQL, the airship moves on the map
- Foundation for deploy-driven movement
 
### Phase 5 · Deploy Triggers · future
 
Netlify webhooks from client repos update agent positions.
 
- When `coloradoboydepot.com` deploys, the assigned agent moves
  to Colorado Boy Depot's coordinates
- Map becomes a real-time mirror of NeonBurro's work
 
### Phase 6 · Council Intelligence · future
 
The six agents (Warbleur, Cypher, Lyra, Volt, Ion, Canyon) review
deploys, events, and business activity. They generate briefs.
Tyler reviews. The map becomes a thinking surface.
 
### Phase 7 · The Burroglyph Layer · future
 
Each agent gets an identity layer — a "Burroglyph" — that ties
the agent to a recognized vessel inside the active dome. Possibly
collectible, possibly cloneable per client. Identity becomes a
first-class entity in the schema.
 
This is the long-term play that gives the agents a face without
turning them into mascots.
 
---
 
## Master files
 
These docs exist in `docs/`:
 
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
- `WORLD.md` — Mapbox engine, dome, layers, schema
- `AGENTS.md` — the six-agent council
- `GAUSSIAN_SPLATS.md` — splat capture handbook
 
**Meta:**
- `README.md` — catalog and reading order
- `ROADMAP.md` — this file
- `CLAUDE_SKILLS.md` — skills index for Claude Code
 
---
 
## What each phase ships
 
| Phase | Ships |
| --- | --- |
| 1 | Live cinematic brand site |
| 2 | Live `/world/` with active dome, steerable airship, beacons |
| 3 | Town pages, danger paths, more layers |
| 4 | Realtime airship position |
| 5 | Deploys move the agents |
| 6 | Council briefs that recommend actions |
| 7 | Burroglyph identity layer |
 
---
 
## Velocity
 
One phase at a time. Don't rush. Don't skip phases. Don't merge
phases.
 
## When stuck
 
Read `BRAND.md` first, then `VOICE.md`. The brand philosophy is
the tiebreaker.
