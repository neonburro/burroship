// src/pages/CommandCenter/map/camera.js
//
// One continuous airship-pace camera motion.
//
// Phase 2.2B.1 architecture:
//   • A single requestAnimationFrame loop runs the entire opening.
//   • No setTimeout chains, no easeTo queueing.
//   • The loop computes the camera's desired position at every
//     frame based on elapsed milliseconds.
//   • Lift, drift, and orbit blend seamlessly into one another.
//   • During orbit, subtle pitch breathing and zoom drift add
//     "airship floating, not camera bolted down" feel.
//   • Any user interaction immediately cancels the loop.
 
import {
  TIMING,
  WAYPOINT_START,
  WAYPOINT_LIFT_END,
  WAYPOINT_CRUISE,
  BREATHING,
} from "./config";
 
/* Cubic ease-in-out. Slow start, slow end, smooth through the
 * middle. Gives the airship feel during the lift and drift. */
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
 
/* Linear interpolate between two numbers. */
function lerp(a, b, t) {
  return a + (b - a) * t;
}
 
/* Interpolate every numeric field of a waypoint between A and B. */
function lerpWaypoint(a, b, t) {
  return {
    longitude: lerp(a.longitude, b.longitude, t),
    latitude: lerp(a.latitude, b.latitude, t),
    zoom: lerp(a.zoom, b.zoom, t),
    pitch: lerp(a.pitch, b.pitch, t),
    bearing: lerp(a.bearing, b.bearing, t),
  };
}
 
/* Run the continuous opening animation. Returns a controller
 * with .cancel() so the caller can stop the loop on user input. */
export function runOpeningSequence(map) {
  if (!map) return { cancel: () => {} };
 
  let cancelled = false;
  let rafId = null;
  const startTime = performance.now();
 
  /* The lift phase ends at this elapsed time. */
  const liftEndAt = TIMING.liftDuration;
 
  /* The drift phase ends at this elapsed time. */
  const driftEndAt = TIMING.liftDuration + TIMING.driftDuration;
 
  function tick(now) {
    if (cancelled) return;
 
    const elapsed = now - startTime;
 
    let cameraState;
 
    if (elapsed < liftEndAt) {
      /* LIFT PHASE: float up from Chimney Rock with monolith in frame. */
      const t = elapsed / TIMING.liftDuration;
      const eased = easeInOutCubic(t);
      cameraState = lerpWaypoint(WAYPOINT_START, WAYPOINT_LIFT_END, eased);
    } else if (elapsed < driftEndAt) {
      /* DRIFT PHASE: slide west toward Ridgway, descend pitch
       * slightly, arrive at cruise altitude. */
      const driftElapsed = elapsed - liftEndAt;
      const t = driftElapsed / TIMING.driftDuration;
      const eased = easeInOutCubic(t);
      cameraState = lerpWaypoint(WAYPOINT_LIFT_END, WAYPOINT_CRUISE, eased);
    } else {
      /* ORBIT PHASE: perpetual circling around Ridgway with
       * subtle pitch breathing and zoom drift. */
      const orbitElapsed = elapsed - driftEndAt;
 
      /* Continuous bearing rotation. */
      const degreesPerMs = 360 / TIMING.rotationDuration;
      const orbitBearing =
        (WAYPOINT_CRUISE.bearing + orbitElapsed * degreesPerMs) % 360;
 
      /* Pitch breathing: sine wave around the cruise pitch. */
      const pitchPhase =
        (orbitElapsed % BREATHING.pitchCycleMs) / BREATHING.pitchCycleMs;
      const pitchOffset =
        Math.sin(pitchPhase * Math.PI * 2) * BREATHING.pitchAmplitude;
 
      /* Zoom drift: sine wave on a different cycle. */
      const zoomPhase =
        (orbitElapsed % BREATHING.zoomCycleMs) / BREATHING.zoomCycleMs;
      const zoomOffset =
        Math.sin(zoomPhase * Math.PI * 2) * BREATHING.zoomAmplitude;
 
      cameraState = {
        longitude: WAYPOINT_CRUISE.longitude,
        latitude: WAYPOINT_CRUISE.latitude,
        zoom: WAYPOINT_CRUISE.zoom + zoomOffset,
        pitch: WAYPOINT_CRUISE.pitch + pitchOffset,
        bearing: orbitBearing,
      };
    }
 
    /* Apply the computed state. jumpTo is the right call here
     * because we are driving the camera every frame ourselves;
     * easeTo would queue conflicting animations. */
    map.jumpTo({
      center: [cameraState.longitude, cameraState.latitude],
      zoom: cameraState.zoom,
      pitch: cameraState.pitch,
      bearing: cameraState.bearing,
    });
 
    rafId = requestAnimationFrame(tick);
  }
 
  rafId = requestAnimationFrame(tick);
 
  return {
    cancel: () => {
      if (cancelled) return;
      cancelled = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      try {
        map.stop();
      } catch (e) {
        /* Already stopped. */
      }
    },
  };
}
 
/* Fly to a specific location. Used when the user taps a place
 * in a controls list. The camera keeps cruise pitch. */
export function flyToLocation(map, location) {
  if (!map || !location) return;
 
  map.flyTo({
    center: [location.longitude, location.latitude],
    zoom: 13,
    pitch: 55,
    bearing: -15,
    duration: 2400,
    essential: true,
  });
}
 
/* Return to the home cruise view over Ridgway. */
export function returnToCruise(map) {
  if (!map) return;
 
  map.flyTo({
    center: [WAYPOINT_CRUISE.longitude, WAYPOINT_CRUISE.latitude],
    zoom: WAYPOINT_CRUISE.zoom,
    pitch: WAYPOINT_CRUISE.pitch,
    bearing: WAYPOINT_CRUISE.bearing,
    duration: 2000,
    essential: true,
  });
}
