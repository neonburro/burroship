// src/pages/CommandCenter/map/config.js
//
// Camera and Mapbox configuration. Phase A • hover-language.
//
// Volt's design direction:
//   "Keep the craft at a constant authored flight altitude
//    equivalent to roughly 16,000 ft instead of climbing to a
//    remote high-altitude surveillance view. The visual should
//    feel like gliding just above the San Juans with mountains
//    occupying meaningful foreground and midground."
//
// So this file no longer encodes "lift then drift then orbit".
// It encodes "already cruising near Chimney Rock, glide toward
// Ridgway, settle into a slow orbit."
 
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
 
/* CONSTANT CRUISE ALTITUDE
 *
 * Zoom 13.5 throughout the entire opening and orbit. We do not
 * change altitude during the glide. The airship is already at
 * cruise when the page loads. */
export const CRUISE_ZOOM = 13.5;
export const CRUISE_PITCH = 68;
 
/* OPENING START POSITION
 *
 * Already at cruise altitude near Chimney Rock, slightly east
 * so the monolith sits visibly in frame. Pitch is the same as
 * cruise pitch (no descent or climb during glide). */
export const INITIAL_VIEW = {
  longitude: CHIMNEY_ROCK.longitude + 0.011,
  latitude: CHIMNEY_ROCK.latitude - 0.001,
  zoom: CRUISE_ZOOM,
  pitch: CRUISE_PITCH,
  bearing: 282,
};
 
/* TIMING
 *
 * Single glide phase replaces lift+drift. 90 seconds of slow
 * lateral motion from Chimney Rock to Ridgway. Then perpetual
 * orbit at 3 min per rotation. */
export const TIMING = {
  glideDuration: 90_000,        // 90s • Chimney Rock to Ridgway glide
  rotationDuration: 180_000,    // 3 min per orbit rotation
};
 
/* WAYPOINTS for the glide.
 *
 * Same altitude (CRUISE_ZOOM), same pitch (CRUISE_PITCH).
 * Only longitude/latitude and bearing change. Bearing eases
 * from 282 (looking west toward Ridgway from Chimney Rock) to
 * 260 (settling into the orbit starting bearing). */
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
 
/* CRUISE_VIEW alias for code that wants "the resting state." */
export const CRUISE_VIEW = WAYPOINT_GLIDE_END;
 
/* BREATHING during orbit. Very subtle. */
export const BREATHING = {
  pitchAmplitude: 1.5,
  pitchCycleMs: 24_000,
  zoomAmplitude: 0.06,
  zoomCycleMs: 31_000,
};
 
/* Atmospheric fog. Will be tuned further in Phase B. */
export const FOG_CONFIG = {
  color: "rgb(8, 14, 12)",
  "high-color": "rgb(20, 40, 30)",
  "horizon-blend": 0.2,
  "space-color": "rgb(2, 5, 3)",
  "star-intensity": 0.2,
};
 
/* CANCELLATION GRACE AND DEBOUNCE
 *
 * Grace window: events fired during the first 800ms of the
 * sequence are ignored. Long enough to absorb any startup
 * artifacts, short enough that real user input still responds.
 *
 * Wheel debounce: ignore subsequent wheel events within 250ms
 * of the last one. Trackpad inertia generates many small wheel
 * events; one real scroll should cancel cruise, but momentum
 * tail-off should not produce 50 cancel logs. */
export const CANCEL_GRACE_MS = 800;
export const WHEEL_DEBOUNCE_MS = 250;
 
export const COLORS = {
  accent: "#7AB300",
  accentDark: "#A8D055",
  bg: "#020503",
  ink: "#FFFFFF",
};
