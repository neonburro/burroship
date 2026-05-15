// src/pages/CommandCenter/map/config.js
//
// Camera and Mapbox configuration. Phase B • lower hover preset.
//
// Volt's Phase B call:
//   "Use a designed low-hover camera preset first, not literal
//    altitude logic. cruise zoom around 14.5 to 15, pitch around
//    72 to 74, bearing authored per route, lower-feeling horizon
//    with less sky and more terrain mass."
//
// Specific values landed at zoom 14.7, pitch 73 within his range.
// If too street-level after testing, pull back to 14.4 before
// changing anything else (per Volt's spec).
//
// Speed and timing UNCHANGED from Phase A.
 
/* Mapbox access token. */
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";
 
/* Mapbox Standard style. Night light preset applied after load. */
export const STANDARD_STYLE = "mapbox://styles/mapbox/standard";
export const STANDARD_LIGHT_PRESET = "night";
 
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
 
/* Status-overlay altitude readout. ~16,000 ft = ~4,877 m. */
export const CRUISE_ALTITUDE_M = 4877;
 
/* CONSTANT CRUISE ALTITUDE • Phase B
 *
 * Zoom 14.7 throughout the entire opening and orbit. Phase B
 * dropped from 13.5 to 14.7 per Volt's specification. Pitch
 * raised from 68 to 73 for stronger forward terrain occupancy. */
export const CRUISE_ZOOM = 14.7;
export const CRUISE_PITCH = 73;
 
/* OPENING START POSITION
 *
 * Already at cruise altitude near Chimney Rock, slightly east
 * so the monolith sits visibly in frame. */
export const INITIAL_VIEW = {
  longitude: CHIMNEY_ROCK.longitude + 0.011,
  latitude: CHIMNEY_ROCK.latitude - 0.001,
  zoom: CRUISE_ZOOM,
  pitch: CRUISE_PITCH,
  bearing: 282,
};
 
/* TIMING (unchanged from Phase A per Tyler's locked-in feel). */
export const TIMING = {
  glideDuration: 90_000,
  rotationDuration: 180_000,
};
 
/* WAYPOINTS for the glide.
 *
 * Same altitude and pitch throughout (constant cruise preset).
 * Only longitude/latitude and bearing change. */
export const WAYPOINT_GLIDE_START = {
  longitude: INITIAL_VIEW.longitude,
  latitude: INITIAL_VIEW.latitude,
  zoom: CRUISE_ZOOM,
  pitch: CRUISE_PITCH,
  bearing: 282,
};
 
export const WAYPOINT_GLIDE_END = {
  longitude: RIDGWAY.longitude,
  latitude: RIDGWAY.latitude,
  zoom: CRUISE_ZOOM,
  pitch: CRUISE_PITCH,
  bearing: 260,
};
 
/* CRUISE_VIEW alias. */
export const CRUISE_VIEW = WAYPOINT_GLIDE_END;
 
/* BREATHING during orbit. */
export const BREATHING = {
  pitchAmplitude: 1.5,
  pitchCycleMs: 24_000,
  zoomAmplitude: 0.06,
  zoomCycleMs: 31_000,
};
 
/* Atmospheric fog. Phase C will tune further. */
export const FOG_CONFIG = {
  color: "rgb(8, 14, 12)",
  "high-color": "rgb(20, 40, 30)",
  "horizon-blend": 0.2,
  "space-color": "rgb(2, 5, 3)",
  "star-intensity": 0.2,
};
 
/* Cancellation grace and wheel debounce. */
export const CANCEL_GRACE_MS = 800;
export const WHEEL_DEBOUNCE_MS = 250;
 
export const COLORS = {
  accent: "#7AB300",
  accentDark: "#A8D055",
  bg: "#020503",
  ink: "#FFFFFF",
};
