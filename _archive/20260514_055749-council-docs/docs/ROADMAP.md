# Roadmap
 
The phased build plan for The Burroship. Updated as phases ship.
 
## North Star
 
The Burroship is a living Western Slope world map where real
businesses, real terrain, and onboard agents converge into a
quietly running operating system. The website is the front porch.
The active dome is the working surface. The council is the crew.
 
## The Big Rule
 
Build the map first. Then make it alive. Then make it smart. Then
make it 3D. Do not build the dream all at once.
 
## Phase status legend
 
- **shipped** — live in production
- **pushed** — code merged, visual confirmation pending
- **active** — under build right now
- **next** — queued, not yet started
- **future** — planned but not scheduled
 
---
 
## Map track
 
### Phase 1 · Cinematic Skeleton · shipped
 
Three-room home page (Build, Deploy, Automate), v0.6 dark footer
with horizon hairline, button text fix. Live on Netlify.
 
### Phase 2 · The Active Dome · in motion
 
Pivoted from Cesium to Mapbox GL JS v3.
 
**Phase 2.1 (pushed):** Beacons. 13 lantern-green dots from
Supabase, click-to-popup with brand-voice blurbs, status overlay
updates on selection. Code pushed to main. Visual production
verification on `/world/` pending.
 
**Phase 2.2 (next):** The airship glyph. Custom SVG vessel
cruising at altitude. Tied to `world_airships.current_lat/lng/heading`.
 
**Phase 2.3 (after):** The dome edge glow. Visible boundary,
soft resistance near the perimeter.
 
**Phase 2.4 (after):** Fly-to controls. Desktop sidebar list,
mobile bottom sheet, smooth flyTo animations.
 
Doc: `WORLD.md`.
 
### Phase 3 · The Layers Era · future
 
Once the dome is built and steerable, layers stack on top.
 
- Million Dollar Highway as a subtle danger path between Ouray and
  Silverton (when Silverton is added to locations)
- Town pages: separate routes for Ridgway, Ouray, Telluride
- Pin categories from `WORLD.md`: hq, client, landmark, partner
 
### Phase 4 · Live Data · future
 
Supabase realtime kicks in.
 
- `world_airships.current_lat/lng/heading` broadcasts live
- Update a row via SQL, the airship moves on the map
- Foundation for deploy-driven movement
 
### Phase 5 · Deploy Triggers · future
 
Netlify webhooks from client repos update agent positions on the map.
 
---
 
## Council track
 
The council is a parallel track to the map. Its plan is in
`COUNCIL_VISION.md` and its communication conventions are in
`COMMUNICATION_PROTOCOL.md`.
 
### Phase A · Vision and contracts · active
 
What ships: the canonical architecture doc, the communication
protocol doc, and the first agent contract (Warbleur). All in
`docs/`. No runtime code yet.
 
Status: in motion. The vision doc, protocol doc, and Warbleur
brief land in this phase.
 
### Phase B · Lyra ships · next
 
The first production agent. A repo-aware email delivery system.
Reads a Neon Burro client repo, drafts custom transactional
emails matching the client's brand voice and visual identity.
 
Architecture: Netlify Function + GitHub API + Anthropic API +
Resend. No new infrastructure beyond what NeonBurro already runs.
 
Doc to write: `docs/agents/LYRA_BRIEF.md` before build begins.
 
### Phase C · Cypher · future
 
Database queries and audit trail. Powers Lyra's research and
client lookups across NeonBurro's projects.
 
### Phase D · Warbleur · future
 
The voice channel. Twilio integration. Real call routing.
 
### Phase E · Ion, Volt, Canyon · future
 
The remaining three agents. Shared memory, workflow
orchestration, geographic intelligence.
 
### Phase F · Burroglyphs · future
 
Identity layer for each agent. Possibly collectible. Definitely
operational. Each Burroglyph is a recognized vessel identity
assigned to the active dome and trained for a defined operational
domain.
 
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
- `AGENTS.md` — brand-facing description of the council
- `GAUSSIAN_SPLATS.md` — splat capture handbook
 
**The council:**
- `COUNCIL_VISION.md` — canonical architecture
- `COMMUNICATION_PROTOCOL.md` — the `@agent • message` pattern
- `agents/WARBLEUR_BRIEF.md` — first agent contract
 
**Meta:**
- `README.md` — catalog and reading order
- `ROADMAP.md` — this file
- `CLAUDE_SKILLS.md` — skills index for Claude Code
 
---
 
## What each phase ships
 
| Phase | Track | Ships |
| --- | --- | --- |
| Map 1 | Map | Cinematic brand site |
| Map 2 | Map | Active dome with steerable airship, beacons, controls |
| Map 3 | Map | Town pages, danger paths, more layers |
| Map 4 | Map | Realtime airship position |
| Map 5 | Map | Deploys move the agents |
| Council A | Council | Vision and contracts (this doc set) |
| Council B | Council | Lyra in production (email delivery agent) |
| Council C | Council | Cypher in production (data lookups) |
| Council D | Council | Warbleur in production (voice channel) |
| Council E | Council | Ion, Volt, Canyon (full six) |
| Council F | Council | Burroglyph identity layer |
 
---
 
## Velocity
 
One phase at a time per track. Don't rush. Don't skip phases.
Don't merge phases.
 
The map and council tracks can move in parallel because they live
in different scopes. The map is the public site. The council is
the operations layer behind it. They meet at `/world/` when agent
beacons go live in Phase 4.
 
## When stuck
 
Read `BRAND.md` first, then `VOICE.md`. The brand philosophy is
the tiebreaker.
 
For council questions specifically, read `COUNCIL_VISION.md` and
the relevant `agents/` contract.
