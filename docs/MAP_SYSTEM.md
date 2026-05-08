# Map System

The map is the soul of The Burroship. Phase 2 establishes the
basemap. Every layer that comes after (agents, events, deploys,
3D world) builds on this foundation.

## The Vantage

The viewer is leaning over the gondola railing of the Burroship,
looking down at the San Juans. Cold. Quiet. Expansive. The map
should never feel like Google Maps. It should feel like a window.

## Default Camera

- Center: Ridgway, Colorado (38.1547 N, -107.7551 W)
- Zoom: 11.5
- Pitch: 50 degrees (we are looking down at an angle, not flat)
- Bearing: -15 degrees (slight rotation, the airship is drifting)
- Bounds (loose): Ouray to the south, Telluride to the southwest,
  Chimney Rock to the east, Montrose to the north

## Style Source

Phase 2 uses Mapbox dark-v11 as the base style. It is dark enough
to feel like night and lets our signal-green pins glow against
it. We will graduate to a fully custom style in Phase 4 or later,
when the world is alive enough to demand it.

## Terrain

Mapbox terrain-rgb is enabled with exaggeration 1.4. Real San
Juan elevation matters. The mountains should feel present, not
abstract.

## Pin Categories

- hq      The Compound and Burroship-owned spaces
- client  Businesses we work with (depots, coffee, engineering)
- landmark  Natural features (Chimney Rock, Hot Springs)
- partner  Friendly local spots (cafes, breweries)

Each category gets the same shape with a slightly different ring
color and weight. Restraint, not codes.

## Interaction

- Drag to pan
- Pinch or scroll to zoom
- Two-finger drag (or Ctrl+drag) to rotate and pitch
- Click a pin: opens a card with name, category, blurb
- No animations on the map itself yet. The world is still.
  Movement enters in Phase 4 with the agents.

## Performance

- One Mapbox instance, mounted in the Map page only
- Tile load is the only network hit on first paint
- Pin count stays under 25 in v1 to keep the map feeling sparse
- No heatmaps, no clusters, no choropleths in v1

## Token

The Mapbox public token loads from VITE_MAPBOX_TOKEN env var.
URL restrictions on the token (set in Mapbox dashboard) limit
it to burroship.com, theburroship.netlify.app, and localhost.

## What This Map Is Not

- Not Google Maps. No POI noise, no traffic, no review stars.
- Not a satellite view. The dark style is canon.
- Not interactive in the gamified sense yet. That is Phase 4
  and Phase 7.
- Not the council's working surface yet. That is Phase 6.

For now, it is a beautiful, quiet, slightly tilted map of
Ridgway. That is the entire goal of Phase 2. Anything else
is scope creep.