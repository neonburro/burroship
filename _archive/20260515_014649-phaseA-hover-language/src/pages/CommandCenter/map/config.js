// src/pages/CommandCenter/map/config.js
//
// All Mapbox configuration in one place. Token, style, view defaults,
// dome geometry, performance flags. Edit here, not in components.
 
/* The Mapbox access token comes from Vite env vars. */
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";
 
/* Mapbox Standard is the v3 native style. Dark via the `night`
 * light preset, set after the style loads. */
export const STANDARD_STYLE = "mapbox://styles/mapbox/standard";
 
/* Light preset to apply via setConfigProperty after style.load. */
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
 
/* Cruise altitude in meters. Used in the StatusOverlay readout. */
export const CRUISE_ALTITUDE_M = 5486;
 
/* OPENING START POSITION
 *
 * Slightly east of Chimney Rock so the monolith sits IN the camera
 * frame as the airship lifts away from it. Without this offset the
 * camera would be AT Chimney Rock with the rock behind us, which
 * wastes the story beat.
 *
 * 0.012 degrees longitude east = ~1.05 km east of the rock,
 * giving a clean profile shot of the monolith on lift. */
export const INITIAL_VIEW = {
  longitude: CHIMNEY_ROCK.longitude + 0.012,
  latitude: CHIMNEY_ROCK.latitude - 0.002,
  zoom: 14.2,
  pitch: 78,
  bearing: 285,
};
 
/* OPENING CHOREOGRAPHY TIMING
 *
 * Single continuous animation, no staged pauses. Time-based RAF
 * loop interpolates the camera through all three phases without
 * settling between them.
 *
 * Total opening: 2 minutes before first orbit starts, then orbits
 * continuously at 3 minutes per rotation. */
 
export const TIMING = {
  liftDuration: 60_000,        // 60s • Chimney Rock float-up
  driftDuration: 60_000,       // 60s • drift west toward Ridgway
  rotationDuration: 180_000,   // 3 min per full 360 orbit
};
 
/* Camera waypoints for the continuous animation.
 * Each waypoint defines a snapshot. The RAF loop interpolates
 * between them based on elapsed time. */
 
export const WAYPOINT_START = {
  longitude: INITIAL_VIEW.longitude,
  latitude: INITIAL_VIEW.latitude,
  zoom: INITIAL_VIEW.zoom,
  pitch: INITIAL_VIEW.pitch,
  bearing: INITIAL_VIEW.bearing,
};
 
/* End of lift • risen above Chimney Rock, looking out across
 * the Cimarron range toward Ridgway. */
export const WAYPOINT_LIFT_END = {
  longitude: CHIMNEY_ROCK.longitude + 0.008,
  latitude: CHIMNEY_ROCK.latitude + 0.002,
  zoom: 12.8,
  pitch: 62,
  bearing: 282,
};
 
/* End of drift • arrived over Ridgway at cruise altitude.
 * This is where the orbit begins. */
export const WAYPOINT_CRUISE = {
  longitude: RIDGWAY.longitude,
  latitude: RIDGWAY.latitude,
  zoom: 12.5,
  pitch: 55,
  bearing: 260,
};
 
/* CRUISE_VIEW alias for code that reads "the resting state." */
export const CRUISE_VIEW = WAYPOINT_CRUISE;
 
/* PITCH BREATHING and ALTITUDE DRIFT
 *
 * Subtle oscillations during the orbit that sell "we're in an
 * airship," not "we're a fixed camera on a tripod." Amplitudes
 * are deliberately small so it reads as natural drift, not
 * motion sickness.
 *
 * Both oscillate on independent cycles so they never sync up
 * predictably. */
export const BREATHING = {
  pitchAmplitude: 2.0,          // pitch oscillates +/- 2 degrees
  pitchCycleMs: 24_000,         // 24s full pitch cycle
  zoomAmplitude: 0.08,          // zoom oscillates +/- 0.08
  zoomCycleMs: 31_000,          // 31s full zoom cycle (offset from pitch)
};
 
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
