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
 
/* Real coordinates for the choreography. Anchor points. */
export const CHIMNEY_ROCK = {
  longitude: -107.5706,
  latitude: 38.1466,
};
 
export const RIDGWAY = {
  longitude: -107.7551,
  latitude: 38.1547,
};
 
/* The center of the active dome. Ridgway, the home port. */
export const DOME_CENTER = RIDGWAY;
 
/* Approximate radius of the active dome in degrees. */
export const DOME_RADIUS_DEG = 0.35;
 
/* Cruise altitude in meters. */
export const CRUISE_ALTITUDE_M = 5486;
 
/* Initial map view. Chimney Rock close-up, low altitude, pitched up
 * like the camera is sitting at the base of the monolith looking up. */
export const INITIAL_VIEW = {
  longitude: CHIMNEY_ROCK.longitude,
  latitude: CHIMNEY_ROCK.latitude,
  zoom: 13,        // close in, monolith dominates the frame
  pitch: 75,       // looking up toward the sky
  bearing: 270,    // facing west toward Ridgway
};
 
/* The three stages of the opening choreography. */
 
/* Stage 1: lift. From the base of Chimney Rock up to cruise altitude.
 * Camera tilts down from looking up to looking out. */
export const STAGE_LIFT = {
  duration: 4000,
  target: {
    longitude: CHIMNEY_ROCK.longitude,
    latitude: CHIMNEY_ROCK.latitude,
    zoom: 10.5,
    pitch: 55,
    bearing: 270,
  },
};
 
/* Stage 2: drift west toward Ridgway. Bearing rotates gently to
 * frame the town as we arrive. */
export const STAGE_DRIFT = {
  duration: 6000,
  target: {
    longitude: RIDGWAY.longitude,
    latitude: RIDGWAY.latitude,
    zoom: 11,
    pitch: 55,
    bearing: -15,
  },
};
 
/* Stage 3: Ridgway orbit. Slow circular pan around the town center.
 * 90 second full rotation. Loops indefinitely until user interacts. */
export const STAGE_ORBIT = {
  durationPerRotation: 90000,  // 90 seconds per full 360
  zoom: 11,
  pitch: 55,
  /* Center stays on Ridgway; bearing increments continuously. */
};
 
/* Final view used for the StatusOverlay readout. After the lift
 * completes, we're at "cruise altitude over Ridgway." */
export const CRUISE_VIEW = STAGE_DRIFT.target;
 
/* Total time before the orbit phase begins. Used by code that
 * wants to know when the map has settled. */
export const OPENING_DURATION_MS = STAGE_LIFT.duration + STAGE_DRIFT.duration;
 
/* Default fog config. Adds depth and the "simulation layer" feel. */
export const FOG_CONFIG = {
  color: "rgb(8, 14, 12)",
  "high-color": "rgb(20, 40, 30)",
  "horizon-blend": 0.2,
  "space-color": "rgb(2, 5, 3)",
  "star-intensity": 0.2,
};
 
/* Brand colors mirrored from styles/index.css for Mapbox use. */
export const COLORS = {
  accent: "#7AB300",
  accentDark: "#A8D055",
  bg: "#020503",
  ink: "#FFFFFF",
};
