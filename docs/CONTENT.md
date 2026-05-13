# Content
 
The living source of truth for every piece of production copy on the
site. Update this file when copy ships. Read `VOICE.md` before
editing.
 
Status legend:
 
- **Locked** — never change without a clear reason
- **Live** — currently on the site, can be improved
- **Draft** — placeholder, waiting for the content writer
- **TBD** — slot exists but no copy yet
 
---
 
## Home page
 
### Hero
 
**Eyebrow** · Locked
> The Burroship · Live
 
**Headline** · Locked
> Build. Deploy. Automate.
 
**Subhead** · Draft
> A vessel of small operational systems built in the Cimarron Range.
> Sites, infrastructure, and a council of working agents. The airship
> cruises the San Juans at 18,000 feet.
 
**Spec strip** · Live
| Label | Value |
| --- | --- |
| Vessel | The Burroship |
| Altitude | 18,000 ft |
| Coordinates | 38.15° N · 107.75° W |
| Range | San Juan Mountains |
| Status | Cruising |
 
### Build · the navigation table
 
**Eyebrow** · Locked
> Section 01 · Build
 
**Subhead** · Locked
> The navigation table.
 
**Body** · Draft
> Before anything is built, the terrain is read. Six operational
> steps. Sites, dashboards, internal tools, the occasional system
> nobody else makes.
 
**The six steps** · Live (but the hints are draft)
| Step | Hint |
| --- | --- |
| 01 Tree | Survey the terrain |
| 02 Design | Draft the vessel |
| 03 Plan | Chart the route |
| 04 Review | Read the signals |
| 05 Discuss | Adjust the bearings |
| 06 Finalize | Lock the course |
 
**CTA** · Locked
> Open the table
 
### Deploy · the engine room
 
**Eyebrow** · Locked
> Section 02 · Deploy
 
**Subhead** · Locked
> The engine room.
 
**Body** · Draft
> The systems run on real infrastructure. Continuous deploys, three
> environments, signals visible from anywhere. The room where the
> vessel is actually moving.
 
**Environment cards** · Live
| Code | Name | Status | Detail |
| --- | --- | --- | --- |
| DEV | Development | Active | Vessel under construction |
| STG | Staging | Holding | Awaiting final review |
| PRD | Production | Live | Cruising · uptime nominal |
 
**Status row** · Live
> Signal nominal · UPTIME · Last deploy · 12 min ago
 
**CTA** · Locked
> Open the room
 
### Automate · the bridge
 
**Eyebrow** · Locked
> Section 03 · Automate
 
**Subhead** · Locked
> The bridge.
 
**Body** · Draft
> Six onboard systems coordinating the work. They monitor signals,
> manage flow, hold context, and answer when called. Not assistants.
> Operational intelligence.
 
**The agents** · Live
See `AGENTS.md` for the full catalog. Tiles show:
| Name | Role |
| --- | --- |
| Warbleur | Voice |
| Cypher | Data |
| Lyra | Tone |
| Volt | Flow |
| Ion | Memory |
| Canyon | Terrain |
 
**Status row** · Live
> Council operational · Six systems online
 
**CTA** · Locked
> Open the bridge
 
### Footer
 
**Brand description** · Draft
> A working compound in the Cimarron Range. Sites, infrastructure,
> and a council of working agents. The airship cruises the San Juans.
 
**Location anchor** · Live
> Ridgway, Colorado · 38.155° N · 6,985 ft
 
**Status row** · Live
> Signal nominal
 
**Tagline** · Locked (never change)
> A small bright thing
 
**Copyright** · Auto
> © [current year] The Burroship
 
---
 
## Build page (`/build/`)
 
Status: scaffolded with placeholder content.
 
**Eyebrow** · Live
> Phase 01
 
**Headline** · Live
> Build.
 
**Body** · Draft
> Sites, dashboards, internal tools, custom CRMs. Hand-crafted for
> the people who run them. We use modern stacks, but we never make
> you adopt them.
 
**Three cards** · Draft
| Num | Title | Body |
| --- | --- | --- |
| 01 | Marketing sites | Static where it can be, dynamic where it needs to be. Lighthouse 100 by default. |
| 02 | Internal dashboards | Operations tooling for teams who outgrew the spreadsheet but don't want SaaS. |
| 03 | Custom platforms | Multi-tenant systems, agent infrastructure, the harder stuff. Cimarron Engineering is one. |
 
**Footer line** · Draft
> Full case studies coming soon. We're picky about what we ship.
 
---
 
## Deploy page (`/deploy/`)
 
Status: scaffolded with placeholder content.
 
**Eyebrow** · Live
> Phase 02
 
**Headline** · Live
> Deploy.
 
**Body** · Draft
> Modern infrastructure without the modern infrastructure tax. Netlify,
> Supabase, Cesium, Mapbox. We pick the boring tools that quietly do
> their job.
 
**Three cards** · Draft
| Num | Title | Body |
| --- | --- | --- |
| 01 | Continuous deploys | Every push goes to production. Every PR gets a preview. The old way is gone. |
| 02 | Real databases | Postgres via Supabase. Row-level security. Realtime when it matters. Pulse admin where useful. |
| 03 | Beautiful maps | Cesium for cinematic. Mapbox for utility. Gaussian Splats for the future. |
 
**Footer line** · Draft
> We deploy on Tuesdays when we can help it. Mondays are for thinking.
 
---
 
## Automate page (`/automate/`)
 
Status: scaffolded with placeholder content.
 
**Eyebrow** · Live
> Phase 03
 
**Headline** · Live
> Automate.
 
**Body** · Draft
> A council of six agents. Warbleur, Cypher, Lyra, Volt, Ion, Canyon.
> Each one a specialist. Together they make the boring work boring
> again.
 
**Six agent cards** · Live (names and roles only)
See `AGENTS.md` for the full catalog.
 
**Footer line** · Draft
> The agents are not chatbots. The agents are working on it.
 
---
 
## World page (`/world/`)
 
The Cesium experience. Most copy here is operational instrumentation,
not marketing.
 
**Vessel name** · Locked
> The Burroship
 
**Current overlay** · Live, dynamic
> Burroship · Corridor
> Over [waypoint name] · [elapsed time]
 
**Coordinate readout** · Live, dynamic
> [latitude] · [longitude]
 
---
 
## Coordinate bar (was global, currently removed in v0.6)
 
When/if re-added, the Easter egg phrases (1-in-10 page loads) are:
 
- Altitude nominal
- Scanning Ridgway basin
- Warping automation routes
- Council is awake
- Compound is in view
- Cruising the Cimarron
- Splat library indexing
- Lantern green is on
 
These are status-as-personality. Adding more is welcome as long as
they sound like instrumentation, not jokes.
 
---
 
## Email signature
 
When using `tyler@neonburro.com` for Burroship-related correspondence:
 
```
Tyler Reagan
The Burroship · Ridgway, Colorado
theburroship.netlify.app · neonburro.com
```
 
## Voice rules summary
 
See `VOICE.md` for the full rules. Quick reference:
 
- Banned: innovative, platform, AI-powered, future of, em-dashes,
  Oxford commas
- Real places matter. Use the names.
- Short declarative sentences. Periods over commas.
- 90% practical / 10% impossible
- One italic-serif moment per page maximum
 
## How to update this file
 
When new copy ships, update the status from Draft to Live and replace
the placeholder text. When copy gets reworked, log the old text in a
"Previous versions" subsection below the current text. Keep a paper
trail.
