# Layers
 
Each file in this folder is a single Mapbox layer (or layer group)
that draws something on top of the base map.
 
Phase 1 has no layers yet. The foundation works without them.
Phase 2 adds the first layers.
 
## How to add a layer
 
Each layer is a React component that:
 
1. Accepts a `map` prop (the Mapbox map instance, from useMap or
   the parent ref)
2. On mount, adds its source(s) and layer(s) to the map
3. On unmount, removes them cleanly
4. Returns `null` (the layer renders to the canvas, not to JSX)
 
Example skeleton:
 
```jsx
// AirshipLayer.jsx
import { useEffect } from "react";
 
function AirshipLayer({ map }) {
  useEffect(() => {
    if (!map) return;
 
    map.addSource("airship", { type: "geojson", data: {} });
    map.addLayer({
      id: "airship-glyph",
      type: "circle",
      source: "airship",
      paint: { /* ... */ },
    });
 
    return () => {
      if (map.getLayer("airship-glyph")) map.removeLayer("airship-glyph");
      if (map.getSource("airship")) map.removeSource("airship");
    };
  }, [map]);
 
  return null;
}
 
export default AirshipLayer;
```
 
## Planned layers (in order of build)
 
- DomeLayer — the protected dome boundary with edge glow
- AirshipLayer — the airship glyph + steering
- BeaconLayer — the 13 locations as beacon dots
- RoutesLayer — Million Dollar Highway danger path
 
## Layer ID naming
 
All layer IDs are prefixed with `burroship-` to avoid collisions
with Mapbox Standard's built-in layers.
 
Examples: `burroship-dome-edge`, `burroship-airship-glyph`,
`burroship-beacon-featured`, `burroship-beacon-default`.
 
## Performance
 
- Layers should add their source(s) once and update via setData
  rather than recreate
- Use Mapbox expressions for data-driven styling instead of JS loops
- Heavy interactivity belongs in `controls/`, not in layer files
