// src/pages/CommandCenter/layers/BeaconLayer.jsx
//
// Renders map places as Mapbox circle layers + text labels from a GeoJSON source.
// The places now come in as the `locations` prop (fetched from the Supabase `places`
// table by MapCanvas), not a hardcoded import, so the map reflects our curated
// Ridgway dataset. When the prop changes we setData on the existing source instead of
// re-adding layers. Beacons are sky blue. Labels hide when crowded and reveal on
// zoom. Click opens BeaconPopup.

import { useEffect, useRef } from "react";

const SOURCE_ID = "burroship-beacons-src";
const DOT_LAYER_ID = "burroship-beacons-dot";
const HALO_LAYER_ID = "burroship-beacons-halo";
const LABEL_LAYER_ID = "burroship-beacons-label";

const ACCENT = "#4FB0F0";

/* Turn the places array into a GeoJSON FeatureCollection. Each feature carries the
 * place data in properties so the click handler and popup can read it. */
function buildGeoJSON(locations) {
  return {
    type: "FeatureCollection",
    features: (locations || [])
      .filter((l) => l && l.longitude != null && l.latitude != null)
      .map((loc) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [loc.longitude, loc.latitude] },
        properties: {
          slug: loc.slug,
          name: loc.name,
          category: loc.category || null,
          subcategory: loc.subcategory || null,
          blurb: loc.blurb || null,
          city: loc.city || null,
          address: loc.address || null,
          website: loc.website || null,
          phone: loc.phone || null,
          featured: loc.featured ? 1 : 0,
        },
      })),
  };
}

function BeaconLayer({ map, locations = [], onBeaconClick, onBeaconHover }) {
  const onClickRef = useRef(onBeaconClick);
  useEffect(() => { onClickRef.current = onBeaconClick; }, [onBeaconClick]);

  const onHoverRef = useRef(onBeaconHover);
  useEffect(() => { onHoverRef.current = onBeaconHover; }, [onBeaconHover]);

  const locationsRef = useRef(locations);
  useEffect(() => { locationsRef.current = locations; }, [locations]);

  useEffect(() => {
    if (!map) return;

    const addLayers = () => {
      if (map.getSource(SOURCE_ID)) return;

      map.addSource(SOURCE_ID, { type: "geojson", data: buildGeoJSON(locationsRef.current) });

      map.addLayer({
        id: HALO_LAYER_ID,
        type: "circle",
        source: SOURCE_ID,
        paint: {
          "circle-radius": ["case", ["==", ["get", "featured"], 1], 22, 12],
          "circle-color": ACCENT,
          "circle-opacity": ["case", ["==", ["get", "featured"], 1], 0.3, 0.15],
          "circle-blur": 0.85,
        },
      });

      map.addLayer({
        id: DOT_LAYER_ID,
        type: "circle",
        source: SOURCE_ID,
        paint: {
          "circle-radius": ["case", ["==", ["get", "featured"], 1], 6.5, 4.5],
          "circle-color": ACCENT,
          "circle-stroke-width": ["case", ["==", ["get", "featured"], 1], 2, 1.5],
          "circle-stroke-color": "rgba(255, 255, 255, 0.7)",
          "circle-stroke-opacity": 0.85,
        },
      });

      map.addLayer({
        id: LABEL_LAYER_ID,
        type: "symbol",
        source: SOURCE_ID,
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
          "text-size": 11,
          "text-letter-spacing": 0.06,
          "text-offset": [0, 1.3],
          "text-anchor": "top",
          "text-allow-overlap": false,
          "text-optional": true,
        },
        paint: {
          "text-color": "rgba(255, 255, 255, 0.92)",
          "text-halo-color": "rgba(5, 7, 10, 0.9)",
          "text-halo-width": 1.5,
          "text-halo-blur": 1,
        },
      });

      const handleClick = (e) => {
        const feature = e.features?.[0];
        if (!feature) return;
        if (onClickRef.current) {
          onClickRef.current({
            ...feature.properties,
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
          });
        }
      };
      const handleMouseEnter = (e) => {
        map.getCanvas().style.cursor = "pointer";
        const feature = e.features?.[0];
        if (feature && onHoverRef.current) {
          onHoverRef.current({
            ...feature.properties,
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
          });
        }
      };
      const handleMouseLeave = () => {
        map.getCanvas().style.cursor = "";
        if (onHoverRef.current) onHoverRef.current(null);
      };

      map.on("click", DOT_LAYER_ID, handleClick);
      map.on("click", HALO_LAYER_ID, handleClick);
      map.on("mouseenter", DOT_LAYER_ID, handleMouseEnter);
      map.on("mouseleave", DOT_LAYER_ID, handleMouseLeave);

      map._burroshipBeaconHandlers = { handleClick, handleMouseEnter, handleMouseLeave };
    };

    /* isStyleLoaded can read false right at mount even after the style has loaded,
     * and style.load may have already fired, so also retry on idle which fires
     * whenever the map settles. addLayers guards against double add. */
    const tryAdd = () => { if (map.isStyleLoaded()) addLayers(); };
    tryAdd();
    map.on("idle", tryAdd);

    return () => {
      try { map.off("idle", tryAdd); } catch (e) { /* torn down */ }
      const handlers = map._burroshipBeaconHandlers;
      if (handlers) {
        try {
          map.off("click", DOT_LAYER_ID, handlers.handleClick);
          map.off("click", HALO_LAYER_ID, handlers.handleClick);
          map.off("mouseenter", DOT_LAYER_ID, handlers.handleMouseEnter);
          map.off("mouseleave", DOT_LAYER_ID, handlers.handleMouseLeave);
        } catch (e) { /* map may be torn down */ }
      }
      /* Leave the source and layers in place. Removing them on every effect
       * teardown (StrictMode double mount, re-renders) was racing the async style
       * load and wiping the beacons. They are keyed by id and guarded against a
       * double add, and the setData effect keeps their data current. */
    };
  }, [map]);

  /* Push new data into the existing source when the places change. */
  useEffect(() => {
    if (!map) return;
    const src = map.getSource(SOURCE_ID);
    if (src) src.setData(buildGeoJSON(locations));
  }, [map, locations]);

  return null;
}

export default BeaconLayer;
