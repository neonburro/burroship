# Map System
 
**Status:** DRAFT · written fresh, factual
**Owner:** Warbleur
**Inherits from:** 03_PRODUCT/WORLD_LAYER.md, Constitution Part VII
 
---
 
## What it is
 
The implementation surface for the world layer. Mapbox GL JS v3,
react-map-gl v8, mounted at `/world/` without the standard nav and
footer. The map is an operational surface, not decoration — Spatial
Doctrine 2.
 
## Structure
 
- `src/pages/CommandCenter/` owns the map
- `map/` — MapCanvas, camera, config
- `layers/` — beacon layer and popup
- `data/` — locations and tour route
- Supabase holds world locations, airships, tour routes; the data is
  mirrored in the CommandCenter data files
 
## Camera language
 
The ratified direction is hover-reveal, not ascend-to-overview: a
constant cruise altitude, a single glide phase, cancel grace and
wheel debounce so it does not fight the user. Speed and timing were
locked as felt-right and are not to be retuned without cause. Mapbox
Standard polish (dusk light preset, terrain exaggeration, fog config,
selective labels) is applied.
 
## The standing honest record
 
There is a production commit on the map that was shipped but **never
visually confirmed by a human**. It has been the oldest open
verification thread for the entire span of recent work. This file
records it rather than hiding it. An honest map-system document names
what is unverified, not only what is built. Closing it is a
five-minute screenshot whenever the Owner/Operator is at the live
site.
 
## What is parked
 
Vertical-lift restoration, Supabase naming and storytelling work, a
travel-speed picker, and further map polish are explicitly parked.
Parked is not forgotten — it is governed uncertainty held until there
is reason to resume. The map is deliberately not the active front;
the docs foundation and the constitution are.
