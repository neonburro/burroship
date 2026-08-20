// src/pages/CommandCenter/map/camera.js
//
// Opening camera: zoom and rotate, no fly-in over the range. We open half zoomed over
// downtown Ridgway and slowly spiral inward: the zoom eases from START_ZOOM to
// CRUISE_ZOOM over ZOOM_IN_MS while the bearing rotates, then the rotation continues
// forever at cruise zoom. The center is fixed on the town, so the camera never crosses
// a mountain and the motion is always smooth. Subtle breathing on zoom and pitch keeps
// it alive.

import {
  TIMING,
  START_ZOOM,
  ZOOM_IN_MS,
  CRUISE_ZOOM,
  CRUISE_PITCH,
  RIDGWAY,
  WAYPOINT_GLIDE_END,
  BREATHING,
} from "./config";

const START_BEARING = 20;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function runOpeningSequence(map) {
  if (!map) return { cancel: () => {} };

  let cancelled = false;
  let rafId = null;
  const startTime = performance.now();
  const degreesPerMs = 360 / TIMING.rotationDuration;

  function tick(now) {
    if (cancelled) return;
    const elapsed = now - startTime;

    const zt = Math.min(elapsed / ZOOM_IN_MS, 1);
    const baseZoom = lerp(START_ZOOM, CRUISE_ZOOM, easeInOutCubic(zt));

    const zoomPhase = (elapsed % BREATHING.zoomCycleMs) / BREATHING.zoomCycleMs;
    const zoomOffset = Math.sin(zoomPhase * Math.PI * 2) * BREATHING.zoomAmplitude;

    const pitchPhase = (elapsed % BREATHING.pitchCycleMs) / BREATHING.pitchCycleMs;
    const pitchOffset = Math.sin(pitchPhase * Math.PI * 2) * BREATHING.pitchAmplitude;

    const bearing = (START_BEARING + elapsed * degreesPerMs) % 360;

    map.jumpTo({
      center: [RIDGWAY.longitude, RIDGWAY.latitude],
      zoom: baseZoom + zoomOffset,
      pitch: CRUISE_PITCH + pitchOffset,
      bearing,
    });

    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);

  return {
    cancel: () => {
      if (cancelled) return;
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      try { map.stop(); } catch (e) { /* already stopped */ }
    },
  };
}

/* Fly closer over a pin when a beacon is clicked. */
export function flyToLocation(map, location) {
  if (!map || !location) return;
  map.flyTo({
    center: [location.longitude, location.latitude],
    zoom: Math.max(CRUISE_ZOOM, 16),
    pitch: CRUISE_PITCH,
    bearing: -15,
    duration: 2200,
    essential: true,
  });
}

/* Return to the cruise view over downtown. */
export function returnToCruise(map) {
  if (!map) return;
  map.flyTo({
    center: [WAYPOINT_GLIDE_END.longitude, WAYPOINT_GLIDE_END.latitude],
    zoom: WAYPOINT_GLIDE_END.zoom,
    pitch: WAYPOINT_GLIDE_END.pitch,
    bearing: WAYPOINT_GLIDE_END.bearing,
    duration: 2000,
    essential: true,
  });
}
