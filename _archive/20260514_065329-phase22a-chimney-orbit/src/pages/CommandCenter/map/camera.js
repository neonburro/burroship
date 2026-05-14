// src/pages/CommandCenter/map/camera.js
//
// Camera choreography. The opening descent from globe to cruise,
// fly-to helpers for location selection, smooth easing curves.
 
import {
  INITIAL_VIEW,
  CRUISE_VIEW,
  OPENING_DURATION_MS,
} from "./config";
 
/* Cubic ease-out. Snappy start, gentle landing. Matches Apple's
 * default curve for camera moves. */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
 
/* Fly the map from globe view down to cruise view. Called once
 * after the map loads. The camera descends and tilts in a single
 * smooth motion over OPENING_DURATION_MS. */
export function runOpeningSequence(map) {
  if (!map) return;
 
  map.flyTo({
    center: [CRUISE_VIEW.longitude, CRUISE_VIEW.latitude],
    zoom: CRUISE_VIEW.zoom,
    pitch: CRUISE_VIEW.pitch,
    bearing: CRUISE_VIEW.bearing,
    duration: OPENING_DURATION_MS,
    essential: true,
    easing: easeOutCubic,
  });
}
 
/* Fly to a specific location. Used when the user taps a place
 * in the location list. The camera keeps cruise pitch so the
 * world stays operational, not a flat top-down view. */
export function flyToLocation(map, location) {
  if (!map || !location) return;
 
  map.flyTo({
    center: [location.longitude, location.latitude],
    zoom: 13,
    pitch: 55,
    bearing: -15,
    duration: 2400,
    essential: true,
    easing: easeOutCubic,
  });
}
 
/* Return to the home cruise view. */
export function returnToCruise(map) {
  if (!map) return;
 
  map.flyTo({
    center: [CRUISE_VIEW.longitude, CRUISE_VIEW.latitude],
    zoom: CRUISE_VIEW.zoom,
    pitch: CRUISE_VIEW.pitch,
    bearing: CRUISE_VIEW.bearing,
    duration: 2000,
    essential: true,
    easing: easeOutCubic,
  });
}
 
export { INITIAL_VIEW, CRUISE_VIEW };
