// src/pages/CommandCenter/layers/BeaconLayer.jsx
//
// Renders all locations as Mapbox circle layers + text labels.
// Uses a GeoJSON source so additional locations just become more
// features. No per-marker React component overhead.
//
// All beacons uniform lantern green per Phase 2.1 spec. Hover/click
// handled via Mapbox events. Click opens BeaconPopup.
 
import { useEffect, useRef } from "react";
 
import { LOCATIONS } from "../data/locations";
 
/* The source and layer ids. Prefixed `burroship-` to avoid
 * collisions with Mapbox Standard's built-in layers. */
const SOURCE_ID = "burroship-beacons-src";
const DOT_LAYER_ID = "burroship-beacons-dot";
const HALO_LAYER_ID = "burroship-beacons-halo";
const LABEL_LAYER_ID = "burroship-beacons-label";
 
/* Convert the locations array into a GeoJSON FeatureCollection.
 * Each feature carries the location data in properties so click
 * handlers can read it. */
function buildGeoJSON() {
  return {
    type: "FeatureCollection",
    features: LOCATIONS.map((loc) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [loc.longitude, loc.latitude],
      },
      properties: {
        slug: loc.slug,
        name: loc.name,
        category: loc.category,
        blurb: loc.blurb,
        city: loc.city,
        elevation_m: loc.elevationM,
      },
    })),
  };
}
 
function BeaconLayer({ map, onBeaconClick }) {
  /* Keep the callback in a ref so the Mapbox event handler
   * doesn't get stale closures. */
  const onClickRef = useRef(onBeaconClick);
  useEffect(() => {
    onClickRef.current = onBeaconClick;
  }, [onBeaconClick]);
 
  useEffect(() => {
    if (!map) return;
 
    /* Wait for the map style to be ready before adding sources. */
    const addLayers = () => {
      if (map.getSource(SOURCE_ID)) return; // already added
 
      /* The source. */
      map.addSource(SOURCE_ID, {
        type: "geojson",
        data: buildGeoJSON(),
      });
 
      /* Soft halo ring beneath each dot. Bigger and more
       * transparent. Sells the beacon-glow feel. */
      map.addLayer({
        id: HALO_LAYER_ID,
        type: "circle",
        source: SOURCE_ID,
        paint: {
          "circle-radius": 14,
          "circle-color": "#4FB0F0",
          "circle-opacity": 0.18,
          "circle-blur": 0.8,
        },
      });
 
      /* The dot itself. Crisp, 5px, full lantern green. */
      map.addLayer({
        id: DOT_LAYER_ID,
        type: "circle",
        source: SOURCE_ID,
        paint: {
          "circle-radius": 5,
          "circle-color": "#4FB0F0",
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "rgba(255, 255, 255, 0.6)",
          "circle-stroke-opacity": 0.8,
        },
      });
 
      /* The name label, mono, uppercase, offset below the dot. */
      map.addLayer({
        id: LABEL_LAYER_ID,
        type: "symbol",
        source: SOURCE_ID,
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
          "text-size": 10,
          "text-letter-spacing": 0.12,
          "text-transform": "uppercase",
          "text-offset": [0, 1.4],
          "text-anchor": "top",
          "text-allow-overlap": false,
          "text-optional": true,
        },
        paint: {
          "text-color": "rgba(255, 255, 255, 0.85)",
          "text-halo-color": "rgba(2, 5, 3, 0.9)",
          "text-halo-width": 1.5,
          "text-halo-blur": 1,
        },
      });
 
      /* Click handler — fire callback with the location data. */
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
 
      /* Cursor feedback on hover. */
      const handleMouseEnter = () => {
        map.getCanvas().style.cursor = "pointer";
      };
      const handleMouseLeave = () => {
        map.getCanvas().style.cursor = "";
      };
 
      map.on("click", DOT_LAYER_ID, handleClick);
      map.on("click", HALO_LAYER_ID, handleClick);
      map.on("mouseenter", DOT_LAYER_ID, handleMouseEnter);
      map.on("mouseleave", DOT_LAYER_ID, handleMouseLeave);
 
      /* Cleanup: store handler references for removal. */
      map._burroshipBeaconHandlers = {
        handleClick,
        handleMouseEnter,
        handleMouseLeave,
      };
    };
 
    if (map.isStyleLoaded()) {
      addLayers();
    } else {
      map.once("style.load", addLayers);
    }
 
    /* Cleanup on unmount. */
    return () => {
      const handlers = map._burroshipBeaconHandlers;
      if (handlers) {
        try {
          map.off("click", DOT_LAYER_ID, handlers.handleClick);
          map.off("click", HALO_LAYER_ID, handlers.handleClick);
          map.off("mouseenter", DOT_LAYER_ID, handlers.handleMouseEnter);
          map.off("mouseleave", DOT_LAYER_ID, handlers.handleMouseLeave);
        } catch (e) {
          /* Map may already be torn down. */
        }
      }
 
      try {
        if (map.getLayer(LABEL_LAYER_ID)) map.removeLayer(LABEL_LAYER_ID);
        if (map.getLayer(DOT_LAYER_ID)) map.removeLayer(DOT_LAYER_ID);
        if (map.getLayer(HALO_LAYER_ID)) map.removeLayer(HALO_LAYER_ID);
        if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
      } catch (e) {
        /* Map may already be torn down. */
      }
    };
  }, [map]);
 
  return null;
}
 
export default BeaconLayer;
