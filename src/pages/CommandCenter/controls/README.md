# Controls
 
User-facing UI overlays. Buttons, sheets, location lists,
status readouts.
 
Phase 1 has only the StatusOverlay (which lives in MapCanvas
for now — it's small enough to not need its own file yet).
 
## Planned controls (in order of build)
 
- LocationList — desktop sidebar with the 13 places, click to fly
- MobileBottomSheet — mobile bottom sheet with same data
- StatusOverlay — current waypoint, altitude, coords (already in MapCanvas)
- DomeIndicator — fades in when user pans near the dome edge
 
## Conventions
 
- Controls are React components that render JSX over the map
- They get the map instance via prop or a `useMap` hook from
  react-map-gl
- They use the `pointer-events-auto` pattern only on interactive
  areas; everything else is `pointer-events-none` so map gestures
  pass through
- Brand voice: operational, calm, mono labels for status text
