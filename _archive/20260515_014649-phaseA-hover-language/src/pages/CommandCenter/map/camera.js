// src/pages/CommandCenter/map/camera.js
//
// DIAGNOSTIC BUILD. Phase 2.2B.1 logic with logging added.
// All decisions logged to console with [burroship] prefix so we can
// trace exactly what happened during the opening sequence.
//
// The math and behavior are unchanged from the previous deploy.
// Logs only. Remove logs after diagnosis is complete.
 
import {
  TIMING,
  WAYPOINT_START,
  WAYPOINT_LIFT_END,
  WAYPOINT_CRUISE,
  BREATHING,
} from "./config";
 
const LOG_PREFIX = "[burroship]";
const startWallTime = performance.now();
 
function dlog(...args) {
  const ts = Math.round(performance.now() - startWallTime);
  console.log(`${LOG_PREFIX} +${ts}ms`, ...args);
}
 
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
 
function lerp(a, b, t) {
  return a + (b - a) * t;
}
 
function lerpWaypoint(a, b, t) {
  return {
    longitude: lerp(a.longitude, b.longitude, t),
    latitude: lerp(a.latitude, b.latitude, t),
    zoom: lerp(a.zoom, b.zoom, t),
    pitch: lerp(a.pitch, b.pitch, t),
    bearing: lerp(a.bearing, b.bearing, t),
  };
}
 
export function runOpeningSequence(map) {
  dlog("runOpeningSequence CALLED", {
    mapExists: !!map,
    styleLoaded: map ? map.isStyleLoaded() : "n/a",
  });
 
  if (!map) {
    dlog("runOpeningSequence aborted: no map");
    return { cancel: () => {} };
  }
 
  /* Log the camera's actual state at the moment we start. */
  dlog("initial camera state at sequence start", {
    center: map.getCenter(),
    zoom: map.getZoom(),
    pitch: map.getPitch(),
    bearing: map.getBearing(),
  });
 
  let cancelled = false;
  let rafId = null;
  let lastLoggedPhase = null;
  const startTime = performance.now();
 
  const liftEndAt = TIMING.liftDuration;
  const driftEndAt = TIMING.liftDuration + TIMING.driftDuration;
 
  dlog("opening sequence STARTING", {
    liftDurationMs: TIMING.liftDuration,
    driftDurationMs: TIMING.driftDuration,
    rotationDurationMs: TIMING.rotationDuration,
  });
 
  function tick(now) {
    if (cancelled) {
      dlog("tick after cancel, exiting");
      return;
    }
 
    const elapsed = now - startTime;
 
    let cameraState;
    let phase;
 
    if (elapsed < liftEndAt) {
      phase = "LIFT";
      const t = elapsed / TIMING.liftDuration;
      const eased = easeInOutCubic(t);
      cameraState = lerpWaypoint(WAYPOINT_START, WAYPOINT_LIFT_END, eased);
    } else if (elapsed < driftEndAt) {
      phase = "DRIFT";
      const driftElapsed = elapsed - liftEndAt;
      const t = driftElapsed / TIMING.driftDuration;
      const eased = easeInOutCubic(t);
      cameraState = lerpWaypoint(WAYPOINT_LIFT_END, WAYPOINT_CRUISE, eased);
    } else {
      phase = "ORBIT";
      const orbitElapsed = elapsed - driftEndAt;
      const degreesPerMs = 360 / TIMING.rotationDuration;
      const orbitBearing =
        (WAYPOINT_CRUISE.bearing + orbitElapsed * degreesPerMs) % 360;
 
      const pitchPhase =
        (orbitElapsed % BREATHING.pitchCycleMs) / BREATHING.pitchCycleMs;
      const pitchOffset =
        Math.sin(pitchPhase * Math.PI * 2) * BREATHING.pitchAmplitude;
 
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
 
    /* Log phase transitions. Only fires when phase changes, not
     * every frame, so the console stays readable. */
    if (phase !== lastLoggedPhase) {
      dlog(`phase transition -> ${phase}`, {
        elapsedMs: Math.round(elapsed),
        targetState: cameraState,
      });
      lastLoggedPhase = phase;
    }
 
    map.jumpTo({
      center: [cameraState.longitude, cameraState.latitude],
      zoom: cameraState.zoom,
      pitch: cameraState.pitch,
      bearing: cameraState.bearing,
    });
 
    rafId = requestAnimationFrame(tick);
  }
 
  dlog("scheduling first RAF tick");
  rafId = requestAnimationFrame((firstTime) => {
    dlog("FIRST RAF FRAME firing");
    tick(firstTime);
  });
 
  return {
    cancel: () => {
      if (cancelled) {
        dlog("cancel() called but already cancelled");
        return;
      }
      cancelled = true;
      dlog("OPENING SEQUENCE CANCELLED");
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
 
export function flyToLocation(map, location) {
  if (!map || !location) return;
  dlog("flyToLocation", location.name);
  map.flyTo({
    center: [location.longitude, location.latitude],
    zoom: 13,
    pitch: 55,
    bearing: -15,
    duration: 2400,
    essential: true,
  });
}
 
export function returnToCruise(map) {
  if (!map) return;
  dlog("returnToCruise");
  map.flyTo({
    center: [WAYPOINT_CRUISE.longitude, WAYPOINT_CRUISE.latitude],
    zoom: WAYPOINT_CRUISE.zoom,
    pitch: WAYPOINT_CRUISE.pitch,
    bearing: WAYPOINT_CRUISE.bearing,
    duration: 2000,
    essential: true,
  });
}
