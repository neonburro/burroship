# World
 
The map is the soul of The Burroship. This document covers the
Cesium experience at `/world/`, the future Mapbox town pages, and
the splat library that connects them. Read `BRAND.md` first.
 
For the practical capture handbook, see `GAUSSIAN_SPLATS.md`.
 
---
 
## The Vantage
 
The viewer is leaning over the gondola railing of The Burroship,
looking down at the San Juans. Cold. Quiet. Expansive. The world
should never feel like Google Maps. It should feel like a window.
 
That is the line that governs every visual decision about the map.
If a feature would make the experience feel more like Google Maps,
it does not ship.
 
---
 
## The vessel
 
The Burroship is a photoreal 3D airship that cruises the San Juan
Mountains continuously. It exists as a Cesium scene rendered in the
browser at `/world/`.
 
| Property | Value |
| --- | --- |
| Vessel | The Burroship |
| Altitude | 18,000 ft (5,486m) — clears Sneffels summit by 1,173m |
| Cruise mode | Continuous corridor flight |
| Loop time | ~8.5 minutes |
| Path | Counter-clockwise around the San Juans |
| Engine | Cesium loaded from CDN, Google Photorealistic 3D Tiles |
 
## The corridor
 
A continuous waypoint corridor, not a stop-and-hold tour. The vessel
flies between waypoints smoothly using cubic ease-in-out
interpolation. Visitors see "Over [waypoint]" as the airship
approaches each marker.
 
Counter-clockwise loop:
 
1. Ridgway
2. Highway 550 South
3. Ouray
4. Sneffels Approach
5. Mt Sneffels (summit fly-by)
6. Telluride Approach
7. Telluride
8. Mountain Village
9. Uncompahgre Plateau
10. Ridgway Approach (back to start)
 
All waypoints sit at 5,486m altitude (18,000 ft). The corridor was
designed to clear Mt Sneffels (4,313m) and Mt Wilson (4,344m) with
room to spare.
 
## The locations table
 
13 locations seeded in Supabase. Each has coordinates, altitude,
type, and a slug.
 
| Name | Type | Latitude | Longitude | Notes |
| --- | --- | --- | --- | --- |
| Ridgway | town | 38.155 | -107.755 | The compound is just outside |
| Ouray | town | 38.023 | -107.671 | Switzerland of America |
| Telluride | town | 37.938 | -107.812 | Box canyon, free gondola |
| Mountain Village | town | 37.936 | -107.856 | Resort village above Telluride |
| Mt Sneffels | peak | 38.003 | -107.792 | 4,313m. The signature peak. |
| Mt Wilson | peak | 37.838 | -107.991 | 4,344m. Highest of the San Miguels. |
| Uncompahgre Peak | peak | 38.072 | -107.462 | 4,361m. Highest of the San Juans. |
| Dallas Divide | pass | 38.067 | -107.879 | The view between Ridgway and Telluride |
| Last Dollar Road | route | 37.984 | -107.870 | Back way to Telluride |
| The Compound | compound | 38.158 | -107.760 | Burroship HQ (approximate) |
| Cimarron | landmark | 38.222 | -107.539 | The Cimarron Range namesake |
| Sneffels Approach | waypoint | 38.020 | -107.770 | Corridor waypoint |
| Telluride Approach | waypoint | 37.960 | -107.835 | Corridor waypoint |
 
Live source: `world_locations` table in Supabase project
`twvptrfohuthynndeuxx`.
 
## The airships table
 
For now, one airship: The Burroship. The schema allows for multiple
vessels in the future (a research vessel, a cargo vessel, etc.).
 
| Field | Value |
| --- | --- |
| Slug | the-burroship |
| Name | The Burroship |
| Class | Atmospheric research vessel |
| Cruise altitude | 5,486m / 18,000 ft |
| Default speed | Cruise (slow) |
 
## Tour routes
 
The default tour is `san-juans-default` — the counter-clockwise
corridor described above. Future tours can be added per-airship.
 
---
 
## Pin categories (future, for town pages)
 
When the Mapbox town pages ship (`/ridgway/`, `/ouray/`, etc.), pins
on those maps use a small fixed vocabulary. Each category gets the
same shape with a slightly different ring color and weight.
Restraint, not codes.
 
| Category | What it is | Examples |
| --- | --- | --- |
| `hq` | Burroship-owned spaces | The Compound, The StackHouse |
| `client` | Businesses we work with | Colorado Boy Depot, Cimarron Engineering |
| `landmark` | Natural features | Chimney Rock, hot springs, peaks |
| `partner` | Friendly local spots | Cafes, breweries, shops we love |
 
Future categories may emerge but four is the cap until proven
necessary.
 
---
 
## Town pages (future)
 
Each partner town will eventually get its own route:
 
- `/ridgway/`
- `/ouray/`
- `/telluride/`
- `/mountain-village/`
 
These will be Mapbox-driven (not Cesium) for performance and easier
embedding of business listings, events, and photos. Mapbox is the
right tool for "here is a town, here are the places in it." Cesium is
the right tool for "here is the world from above."
 
### Default camera (when town pages exist)
 
| Property | Value |
| --- | --- |
| Center | Town's main coordinates |
| Zoom | 11.5 (loose enough to show context) |
| Pitch | 50 degrees (we're looking down at an angle) |
| Bearing | -15 degrees (slight rotation, the airship is drifting) |
| Style | Mapbox dark-v11 (Phase 2), custom style later |
| Terrain | terrain-rgb enabled, exaggeration 1.4 |
 
### Interaction
 
- Drag to pan
- Pinch or scroll to zoom
- Two-finger drag (or Ctrl+drag) to rotate and pitch
- Click a pin: opens a card with name, category, blurb
- No animations on the map itself initially. The world is still.
  Movement comes when agents go live.
 
### Performance constraints
 
- One Mapbox instance per page, mounted in route only
- Pin count stays under 25 per town in v1 to keep the map sparse
- No heatmaps, clusters, or choropleths in v1
- Tile load is the only network hit on first paint
 
---
 
## What the maps are NOT
 
- Not Google Maps. No POI noise, no traffic, no review stars.
- Not satellite view (for town pages). The dark style is canon.
- Not gamified interactivity (yet — that's the splat phase).
- Not the council's working surface (yet — that's a later phase).
 
For the world at `/world/`, the goal is one beautiful continuous
airship cruise over the San Juans. Anything else is scope creep.
 
For the town pages, the goal is a beautiful, quiet, slightly tilted
map of the town with under 25 carefully chosen pins. Same rule.
 
---
 
## Real coordinates that matter
 
Always use real numbers. Never round.
 
| Place | Latitude | Longitude | Elevation |
| --- | --- | --- | --- |
| Ridgway | 38.155° N | 107.755° W | 6,985 ft |
| Ouray | 38.023° N | 107.671° W | 7,792 ft |
| Telluride | 37.938° N | 107.812° W | 8,750 ft |
| Mountain Village | 37.936° N | 107.856° W | 9,540 ft |
| Mt Sneffels | 38.003° N | 107.792° W | 14,158 ft |
| Mt Wilson | 37.838° N | 107.991° W | 14,252 ft |
| Uncompahgre Peak | 38.072° N | 107.462° W | 14,309 ft |
 
---
 
## How the Cesium engine works
 
The world is rendered using:
 
- Cesium 1.130 loaded from CDN
- Google Photorealistic 3D Tiles for the base earth
- Custom location data from Supabase
- Custom airship 3D model (or fallback to a stylized SVG glyph)
- Schedule UI overlaid on the canvas showing current waypoint
 
The Cesium widget chrome (toolbar, credits, fullscreen button) is
hidden via CSS. Only the airship and the schedule UI are visible.
 
## Performance notes
 
- Cesium initialization takes 2-4 seconds on a typical connection
- The 3D tiles stream in progressively, so the world becomes more
  detailed as the visitor watches
- Memory usage is significant; the page is intentionally separate
  from the home page route to avoid loading Cesium on every visit
- The corridor flight uses `flyTo` with cubic interpolation between
  waypoints, not the built-in Cesium tour API
 
## Updating waypoints
 
The waypoints live in the `tour_routes` Supabase table. To adjust the
corridor:
 
1. Update the waypoint list in the row for `san-juans-default`
2. Verify the altitude clears all terrain along the path
3. Test by loading `/world/` and watching a full loop
4. Adjust ease and timing in `CesiumWorld.jsx` if needed
 
The waypoints are stored as a JSON array. The Cesium component reads
them at mount and runs the flight loop automatically.
 
## Splat library
 
Gaussian Splats are photoreal 3D captures of real places. The plan
is to embed them inside the Cesium world so visitors can fly down to
ground level and walk through a specific place: a brewery in Ridgway,
the gondola station in Telluride, the hot springs in Ouray.
 
Status: planned, not yet implemented. The `splat_asset_id` column on
`world_locations` is ready to receive Cesium Ion asset IDs.
 
For the full capture handbook, equipment recommendations, and
upload-to-Cesium workflow, see `GAUSSIAN_SPLATS.md`.
 
## The relationship to the home page
 
The home page references the world subtly. The hero spec strip shows
"Status: Cruising" and current coordinates. The Vessel link in the
footer goes to `/world/`. The brand voice talks about the airship as
real because the world experience makes it tangible.
 
Without the world, the airship is just a metaphor. With the world,
it is a thing you can watch.
 
## Mapbox token
 
The Mapbox public token loads from `VITE_MAPBOX_TOKEN`. URL
restrictions on the token (set in the Mapbox dashboard) limit it to
`theburroship.netlify.app` and `localhost:3009`. When the custom
domain launches, add it to the token's allowed origins.
 
## See also
 
- `BRAND.md` for the conceit and the three rooms
- `AGENTS.md` for the council (which lives on the bridge of the vessel)
- `INFRASTRUCTURE.md` for the Supabase project and env vars
- `GAUSSIAN_SPLATS.md` for the practical capture and processing handbook
- `ROADMAP.md` for the phased build plan
