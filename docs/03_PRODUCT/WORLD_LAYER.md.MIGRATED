# World
 
The map is the soul of The Burroship. This document covers what
lives at `/world/` — the active dome, the airship, the layers — plus
the future town pages and the splat library.
 
For the practical splat capture handbook, see `GAUSSIAN_SPLATS.md`.
 
---
 
## The Vantage
 
The viewer is leaning over the gondola railing of The Burroship,
looking down at the San Juans. Cold. Quiet. Expansive. The world
should never feel like Google Maps. It should feel like a window.
 
That line governs every visual decision about the map.
 
---
 
## The active dome
 
The map operates inside an **active dome** — a subtle atmospheric
shell over the San Juans. All Burroships are assigned inside the
active dome location. Outside the dome: no active assignment, no
live Burro traffic.
 
The dome is described in product copy as a faint mapped field, part
weather field, part control boundary, part cosmic joke. Never
explained as a metaphor. Just present.
 
Dome center: Ridgway (`38.1547° N, -107.7551° W`).
Dome radius: ~0.35° (~38 km), covering Ridgway / Ouray / Telluride /
Mountain Village and the Ridgway State Park (a.k.a. The Anchorage).
 
---
 
## The engine: Mapbox GL JS v3 + Mapbox Standard
 
As of v0.8, the world runs on Mapbox.
 
| Property | Value |
| --- | --- |
| Library | Mapbox GL JS v3 via `react-map-gl` |
| Style | Mapbox Standard, `night` light preset |
| Projection | Globe on first paint, mercator at cruise |
| Initial view | Globe at zoom 2, centered on Ridgway |
| Final view | Zoom 10, pitch 55°, bearing -15° |
| Opening duration | ~5.5 seconds, cubic ease-out |
| Atmosphere | Custom fog config (near-black with green tint) |
 
**Cesium is parked.** The previous Cesium-based `/world/` is archived
under `_archive/`. The Cesium Ion token (`VITE_CESIUM_ION_TOKEN`)
remains in env vars in case we revisit Cesium for hero splat
moments. Mapbox is the active engine.
 
---
 
## File structure
 
```
src/pages/CommandCenter/
├── index.jsx                ← route entry, lazy-loaded
├── CommandCenter.jsx        ← top-level component
├── map/
│   ├── MapCanvas.jsx        ← react-map-gl wrapper
│   ├── config.js            ← token, style, view, dome, fog
│   └── camera.js            ← opening sequence, flyTo helpers
├── layers/
│   ├── BeaconLayer.jsx      ← 13 location beacons (Phase 2.1)
│   ├── BeaconPopup.jsx      ← click-to-detail popup (Phase 2.1)
│   └── README.md            ← contract for adding layers
├── controls/
│   └── README.md            ← contract for adding controls (Phase 2.4)
└── data/
    ├── locations.js         ← 13 places from Supabase, static export
    └── tour-route.js        ← corridor waypoints, static export
```
 
Each layer is a single React file. Each control is a single React
file. Adding a new layer doesn't touch other layers. Adding a
location doesn't touch layers.
 
---
 
## The beacons (Phase 2.1)
 
Each location is rendered as a Mapbox layer composition:
 
| Layer ID | Type | Purpose |
| --- | --- | --- |
| `burroship-beacons-halo` | circle | Soft outer glow ring |
| `burroship-beacons-dot` | circle | The 5px solid dot |
| `burroship-beacons-label` | symbol | Name label below the dot |
 
All beacons render in lantern green (`#A8D055`). The schema's
`beacon_color` field is reserved for Phase 2.2+ when we may
introduce category-specific tinting.
 
Beacons are interactive:
- Hover: cursor changes to pointer
- Click: a `BeaconPopup` opens with the blurb, category, elevation, city
 
The popup uses Mapbox's native Popup primitive (not a React
component) so it correctly tracks the map pan/zoom.
 
---
 
## The locations table (Supabase)
 
The real schema in production. Project `twvptrfohuthynndeuxx`,
table `world_locations`. 13 rows live.
 
| Column | Type | Notes |
| --- | --- | --- |
| `id` | uuid | Primary key |
| `slug` | text | URL-safe identifier |
| `name` | text | Display name |
| `category` | text | hq / client / partner / landmark |
| `subcategory` | text | e.g. `compound-beacon` |
| `beacon_color` | text | bronze / steel / lantern, etc. |
| `status` | text | live / in-development / planned |
| `city` | text | Town the location is in |
| `address` | text | Street address if applicable |
| `longitude` | double | |
| `latitude` | double | |
| `elevation_m` | double | Meters above sea level |
| `blurb` | text | Short brand-voice description |
| `body_markdown` | text | Long-form copy (optional) |
| `splat_asset_id` | bigint | Cesium Ion asset ID for splats |
| `splat_height_offset_m` | double | Vertical adjustment for splat anchor |
| `photo_urls` | text[] | |
| `links` | jsonb | |
| `tags` | text[] | |
| `featured` | bool | Whether to show as a primary beacon |
| `visibility` | text | public / private |
| `source` | text | manual / mapbox-geocoded / etc. |
| `notes` | text | Internal notes |
 
For now, this data is **hardcoded** into
`src/pages/CommandCenter/data/locations.js` for speed. Re-export
from the database when locations change. We'll switch to live
Supabase reads when realtime data is needed (Phase 4+).
 
## The airship table
 
Table `world_airships`. One row: The Burroship.
 
| Column | Type | Notes |
| --- | --- | --- |
| `id` | uuid | |
| `slug` | text | `the-burroship` |
| `name` | text | The Burroship |
| `description` | text | |
| `cruising_altitude_m` | double | 3000 (will move to 5486) |
| `cruising_speed_kmh` | double | 25 |
| `model_glb_url` | text | Future: custom 3D model |
| `beacon_color` | text | `#A8D055` (lantern green) |
| `active` | bool | |
| `current_lat` | double | Phase 4: live position |
| `current_lng` | double | |
| `current_altitude_m` | double | |
| `current_heading` | double | |
| `last_position_at` | timestamptz | |
 
Phase 2.2 will render the airship glyph on the map.
 
## The tour routes
 
Table `tour_routes`. One row: `san-juans-default`. Stops stored as
jsonb. There is also a view `tour_route_stops_expanded` that
flattens stops into rows.
 
For now, the corridor data is hardcoded into
`src/pages/CommandCenter/data/tour-route.js`.
 
---
 
## Pin categories
 
These categories drive future styling and filtering.
 
| Category | What it is | Examples |
| --- | --- | --- |
| `hq` | Burroship-owned spaces | The Compound, The StackHouse, The Burroships |
| `client` | Businesses we work with | Cimarron Engineering, Colorado Boy Depot |
| `landmark` | Natural features | Chimney Rock, Hot Springs, Mt Sneffels |
| `partner` | Friendly local spots | Colorado Boy Pub, True Grit Cafe |
 
The popup shows the category as the top label: "Compound · HQ",
"Client", "Landmark", "Partner".
 
---
 
## Real coordinates that matter
 
Always use real numbers. Never round.
 
| Place | Latitude | Longitude | Elevation |
| --- | --- | --- | --- |
| Ridgway | 38.1547° N | 107.7551° W | 6,985 ft |
| Ouray | 38.0228° N | 107.6708° W | 7,792 ft |
| Telluride | 37.9375° N | 107.8123° W | 8,750 ft |
| Mountain Village | 37.9356° N | 107.8561° W | 9,540 ft |
| Mt Sneffels | 38.0038° N | 107.7922° W | 14,158 ft |
| Chimney Rock | 38.1466° N | 107.5706° W | 11,781 ft |
| The Compound | 38.1335° N | 107.5895° W | ~7,480 ft |
| The StackHouse | 38.1425° N | 107.5760° W | ~8,135 ft |
| The Burroships | 38.1380° N | 107.5800° W | ~7,710 ft |
 
---
 
## Performance budget
 
- First contentful paint < 2 seconds
- Time to interactive < 3 seconds
- Bundle size for `/world/` route < 2 MB (Mapbox is most of it)
- 60 fps pan/zoom on mid-range phones
- No FOUC, no flash of white before dark surface
 
The route is **lazy-loaded** so the home page doesn't pay for
Mapbox unless the visitor actually navigates here.
 
---
 
## What ships in each phase
 
| Phase | Status | What ships |
| --- | --- | --- |
| Phase 1 | Shipped | Foundation. Mapbox Standard night, globe-to-cruise opening, status overlay. |
| Phase 2.1 | Shipped | 13 location beacons in lantern green, click-to-popup with blurb. |
| Phase 2.2 | Next | Airship glyph at cruise altitude. |
| Phase 2.3 | After | Dome edge glow with soft resistance. |
| Phase 2.4 | After | Fly-to controls (desktop sidebar, mobile bottom sheet). |
| Phase 3 | Future | Town pages, danger paths, more layers. |
| Phase 4 | Future | Live airship position via Supabase realtime. |
| Phase 5 | Future | Splat zones, live deploy beacons. |
 
---
 
## See also
 
- `BRAND.md` for the conceit
- `ROADMAP.md` for the phased plan
- `INFRASTRUCTURE.md` for env vars and the Supabase project
- `AGENTS.md` for the council
- `GAUSSIAN_SPLATS.md` for splat capture
