// src/pages/CommandCenter/map/camera.js
//
// Camera choreography for the /world/ opening.
//
// The sequence (Phase 2.2A):
//   1. Lift from Chimney Rock base up to 18,000 ft equivalent (4 sec)
//   2. Drift west toward Ridgway, bearing rotates (6 sec)
//   3. Slow orbit around Ridgway (90 sec per rotation, loops)
//
// All stages are interruptible. The instant the user pans, zooms,
// clicks, or otherwise touches the map, auto-cruise cancels and
// stays cancelled. The orbit never resumes after user interaction
// in this phase; that's Phase 2.2B work.
 
import {
  STAGE_LIFT,
  STAGE_DRIFT,
  STAGE_ORBIT,
  RIDGWAY,
} from "./config";
 
/* Cubic ease-out for the cinematic stages. Snappy start, calm
 * landing. */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
 
/* Linear easing for the orbit. We want a steady rotation, not
 * an accelerating one. */
function easeLinear(t) {
  return t;
}
 
/* Run the opening choreography. Returns a controller object the
 * caller can use to cancel the sequence at any time. */
export function runOpeningSequence(map) {
  if (!map) return { cancel: () => {} };
 
  let cancelled = false;
  let orbitRafId = null;
 
  /* Stage 1: lift */
  function startLift() {
    if (cancelled) return;
    map.easeTo({
      center: [STAGE_LIFT.target.longitude, STAGE_LIFT.target.latitude],
      zoom: STAGE_LIFT.target.zoom,
      pitch: STAGE_LIFT.target.pitch,
      bearing: STAGE_LIFT.target.bearing,
      duration: STAGE_LIFT.duration,
      easing: easeOutCubic,
      essential: true,
    });
    setTimeout(startDrift, STAGE_LIFT.duration);
  }
 
  /* Stage 2: drift to Ridgway */
  function startDrift() {
    if (cancelled) return;
    map.easeTo({
      center: [STAGE_DRIFT.target.longitude, STAGE_DRIFT.target.latitude],
      zoom: STAGE_DRIFT.target.zoom,
      pitch: STAGE_DRIFT.target.pitch,
      bearing: STAGE_DRIFT.target.bearing,
      duration: STAGE_DRIFT.duration,
      easing: easeOutCubic,
      essential: true,
    });
    setTimeout(startOrbit, STAGE_DRIFT.duration);
  }
 
  /* Stage 3: slow continuous orbit around Ridgway.
   * Implemented as a requestAnimationFrame loop rather than easeTo
   * so we can rotate forever without re-queuing animations. */
  function startOrbit() {
    if (cancelled) return;
 
    /* Snap to the orbit's starting bearing without an animation. */
    const startBearing = map.getBearing();
    const startTime = performance.now();
    const degreesPerMs = 360 / STAGE_ORBIT.durationPerRotation;
 
    function tick(now) {
      if (cancelled) return;
 
      const elapsed = now - startTime;
      const newBearing = (startBearing + degreesPerMs * elapsed) % 360;
 
      /* Use jumpTo for the rotation step — easeTo would create
       * its own animation queue that conflicts with the next tick.
       * jumpTo + RAF gives us perfectly smooth continuous rotation. */
      map.setBearing(newBearing);
 
      orbitRafId = requestAnimationFrame(tick);
    }
 
    orbitRafId = requestAnimationFrame(tick);
  }
 
  /* Start the chain. */
  startLift();
 
  /* The controller. Caller uses this to cancel mid-sequence. */
  return {
    cancel: () => {
      if (cancelled) return;
      cancelled = true;
      if (orbitRafId !== null) {
        cancelAnimationFrame(orbitRafId);
        orbitRafId = null;
      }
      try {
        map.stop();
      } catch (e) {
        /* Already stopped. */
      }
    },
  };
}
 
/* Fly to a specific location. Used when the user taps a place in
 * a controls list. The camera keeps cruise pitch. */
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
 
/* Return to the home cruise view over Ridgway. */
export function returnToCruise(map) {
  if (!map) return;
 
  map.flyTo({
    center: [RIDGWAY.longitude, RIDGWAY.latitude],
    zoom: STAGE_DRIFT.target.zoom,
    pitch: STAGE_DRIFT.target.pitch,
    bearing: STAGE_DRIFT.target.bearing,
    duration: 2000,
    essential: true,
    easing: easeOutCubic,
  });
}
