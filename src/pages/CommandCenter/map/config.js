// src/pages/CommandCenter/map/config.js
//
// Camera and Mapbox configuration. Phase C • visual polish.
//
// Values verified against Volt's sourced research:
//   docs.mapbox.com/mapbox-gl-js/example/set-config-property
//   docs.mapbox.com/mapbox-gl-js/example/add-terrain
//   docs.mapbox.com/style-spec/reference/terrain
//   docs.mapbox.com/style-spec/reference/fog
//   docs.mapbox.com/map-styles/standard/api
//
// Camera positioning UNCHANGED from Phase B (zoom 14.7, pitch 73).
// Timing UNCHANGED from Phase A (90s glide, 3min orbit).
 
/* Mapbox access token. */
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";
 
/* Mapbox Standard style. Dusk preset per Volt's recommendation. */
export const STANDARD_STYLE = "mapbox://styles/mapbox/standard";
export const STANDARD_LIGHT_PRESET = "dusk";
 
/* Real-world anchor points. */
export const CHIMNEY_ROCK = {
  longitude: -107.5706,
  latitude: 38.1466,
};
 
export const RIDGWAY = {
  longitude: -107.7551,
  latitude: 38.1547,
};
 
export const DOME_CENTER = RIDGWAY;
export const DOME_RADIUS_DEG = 0.35;
 
export const CRUISE_ALTITUDE_M = 1524;

/* OVER-RIDGWAY PRESET • high enough to clear the range so the camera never drags
 * through the mountains, tilted down to look at the town from above. Bigger zoom =
 * closer to the ground, smaller pitch = more top down (more facing straight down). */
export const CRUISE_ZOOM = 13.4;
export const CRUISE_PITCH = 50;
 
export const INITIAL_VIEW = {
  longitude: CHIMNEY_ROCK.longitude + 0.011,
  latitude: CHIMNEY_ROCK.latitude - 0.001,
  zoom: 13.9,
  pitch: 58,
  bearing: 285,
};
 
export const TIMING = {
  glideDuration: 30_000,
  rotationDuration: 180_000,
};
 
export const WAYPOINT_GLIDE_START = {
  longitude: INITIAL_VIEW.longitude,
  latitude: INITIAL_VIEW.latitude,
  zoom: INITIAL_VIEW.zoom,
  pitch: INITIAL_VIEW.pitch,
  bearing: INITIAL_VIEW.bearing,
};
 
export const WAYPOINT_GLIDE_END = {
  longitude: RIDGWAY.longitude,
  latitude: RIDGWAY.latitude,
  zoom: CRUISE_ZOOM,
  pitch: CRUISE_PITCH,
  bearing: 260,
};
 
export const CRUISE_VIEW = WAYPOINT_GLIDE_END;
 
export const BREATHING = {
  pitchAmplitude: 1.5,
  pitchCycleMs: 24_000,
  zoomAmplitude: 0.06,
  zoomCycleMs: 31_000,
};
 
/* TERRAIN EXAGGERATION
 *
 * Mapbox style spec range: 0 to 1000, default 1. [doc-verified]
 * Official example: 1.5. Phase C: 1.8.
 *
 * Standard does NOT provide DEM source automatically.
 * MapCanvas adds mapbox-dem before calling setTerrain. */
export const TERRAIN_EXAGGERATION = 1.8;
 
export const DEM_SOURCE_ID = "mapbox-dem";
export const DEM_SOURCE_CONFIG = {
  type: "raster-dem",
  url: "mapbox://mapbox.mapbox-terrain-dem-v1",
  tileSize: 512,
  maxzoom: 14,
};
 
/* FOG • Volt's recommended cinematic ranges:
 *   horizon-blend 0.25 to 0.35 (restrained cinematic)
 *   star-intensity 0.15 to 0.35 (avoid sci-fi glare)
 * Phase C landing: 0.30 and 0.30 (midpoints). */
export const FOG_CONFIG = {
  color: "rgb(14, 22, 24)",
  "high-color": "rgb(36, 52, 48)",
  "horizon-blend": 0.30,
  "space-color": "rgb(2, 4, 6)",
  "star-intensity": 0.30,
};
 
export const CANCEL_GRACE_MS = 800;
export const WHEEL_DEBOUNCE_MS = 250;
 
export const COLORS = {
  accent: "#4FB0F0",
  accentDark: "#2E9BE6",
  bg: "#05070A",
  ink: "#FFFFFF",
};
