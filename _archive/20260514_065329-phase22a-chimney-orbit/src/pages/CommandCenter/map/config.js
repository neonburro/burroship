// src/pages/CommandCenter/map/config.js
//
// All Mapbox configuration in one place. Token, style, view defaults,
// dome geometry, performance flags. Edit here, not in components.
 
/* The Mapbox access token comes from Vite env vars. */
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";
 
/* Mapbox Standard is the v3 native style. Dark via the `night`
 * light preset, set after the style loads. */
export const STANDARD_STYLE = "mapbox://styles/mapbox/standard";
 
/* Light preset to apply via setConfigProperty after style.load.
 * Options: dawn / day / dusk / night. We pick night for the brand. */
export const STANDARD_LIGHT_PRESET = "night";
 
/* The center of the active dome. Ridgway, the home port. */
export const DOME_CENTER = {
  longitude: -107.7551,
  latitude: 38.1547,
};
 
/* Approximate radius of the active dome in degrees. Covers the
 * Ridgway / Ouray / Silverton / Telluride / Mountain Village /
 * Anchorage zone with room to breathe. */
export const DOME_RADIUS_DEG = 0.35;
 
/* Cruise altitude in meters. */
export const CRUISE_ALTITUDE_M = 5486;
 
/* Initial map view. Opens at globe-ish zoom, descends from there. */
export const INITIAL_VIEW = {
  longitude: DOME_CENTER.longitude,
  latitude: DOME_CENTER.latitude,
  zoom: 2,        // globe view
  pitch: 0,
  bearing: 0,
};
 
/* Final view after the opening sequence. Hovering over the dome. */
export const CRUISE_VIEW = {
  longitude: DOME_CENTER.longitude,
  latitude: DOME_CENTER.latitude,
  zoom: 10,       // close enough to see the San Juans clearly
  pitch: 55,      // looking down from an angle
  bearing: -15,   // slight rotation, gives the drift feel
};
 
/* Opening sequence timing (in ms). */
export const OPENING_DURATION_MS = 5500;
 
/* Default fog config. Adds depth and the "simulation layer" feel. */
export const FOG_CONFIG = {
  color: "rgb(8, 14, 12)",            // near-black with green tint
  "high-color": "rgb(20, 40, 30)",
  "horizon-blend": 0.2,
  "space-color": "rgb(2, 5, 3)",      // dark-bg from brand tokens
  "star-intensity": 0.2,
};
 
/* Brand colors mirrored from styles/index.css for Mapbox use. */
export const COLORS = {
  accent: "#7AB300",
  accentDark: "#A8D055",
  bg: "#020503",
  ink: "#FFFFFF",
};
