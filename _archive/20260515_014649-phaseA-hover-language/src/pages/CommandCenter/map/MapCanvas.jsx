// src/pages/CommandCenter/map/MapCanvas.jsx
//
// DIAGNOSTIC BUILD + FIX. Phase 2.2B.1 behavior with the
// Scenario B fix applied.
//
// THE FIX:
// - rotatestart and pitchstart were removed from cancel-handler
//   list. Those events fire whenever the bearing/pitch changes,
//   regardless of cause, so they were canceling on our own
//   programmatic camera motion at frame 1.
// - mousedown added for completeness on desktop.
// - 100ms grace window: events fired during the first 100ms
//   after the sequence starts are ignored. Belt and suspenders
//   in case any other phantom event slips through.
//
// Diagnostics still on. After we confirm the fix, a separate
// deploy will remove the logs.
 
import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
 
import {
  MAPBOX_TOKEN,
  STANDARD_STYLE,
  STANDARD_LIGHT_PRESET,
  INITIAL_VIEW,
  FOG_CONFIG,
  CRUISE_ALTITUDE_M,
} from "./config";
import { runOpeningSequence } from "./camera";
import BeaconLayer from "../layers/BeaconLayer";
import BeaconPopup from "../layers/BeaconPopup";
 
const LOG_PREFIX = "[burroship-mapcanvas]";
const mountWallTime = performance.now();
 
function dlog(...args) {
  const ts = Math.round(performance.now() - mountWallTime);
  console.log(`${LOG_PREFIX} +${ts}ms`, ...args);
}
 
/* Cancellation grace window. Events fired in the first 100ms
 * after the opening sequence begins are ignored. This is a
 * safety net in case any other camera state event sneaks in.
 * 100ms is well under the time any human could react. */
const CANCEL_GRACE_MS = 100;
 
function MapCanvas() {
  dlog("MapCanvas component RENDER", { INITIAL_VIEW });
 
  const mapRef = useRef(null);
  const sequenceRef = useRef(null);
  const sequenceStartTimeRef = useRef(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [selectedBeacon, setSelectedBeacon] = useState(null);
  const [autoCruiseActive, setAutoCruiseActive] = useState(true);
 
  const mapInstance = mapRef.current?.getMap?.() || null;
 
  useEffect(() => {
    dlog("state: mapLoaded ->", mapLoaded);
  }, [mapLoaded]);
 
  useEffect(() => {
    dlog("state: styleLoaded ->", styleLoaded);
  }, [styleLoaded]);
 
  useEffect(() => {
    dlog("state: autoCruiseActive ->", autoCruiseActive);
  }, [autoCruiseActive]);
 
  useEffect(() => {
    if (!mapLoaded || !styleLoaded) {
      dlog("opening-sequence useEffect: skipped", {
        mapLoaded,
        styleLoaded,
      });
      return;
    }
 
    const map = mapRef.current?.getMap();
    if (!map) {
      dlog("opening-sequence useEffect: no map instance");
      return;
    }
 
    dlog("opening-sequence useEffect: entering setup");
 
    /* Apply night light preset. */
    try {
      map.setConfigProperty("basemap", "lightPreset", STANDARD_LIGHT_PRESET);
      dlog("lightPreset applied successfully");
    } catch (e) {
      dlog("lightPreset failed", e.message);
    }
 
    /* Apply atmospheric fog. */
    try {
      map.setFog(FOG_CONFIG);
      dlog("fog applied successfully");
    } catch (e) {
      dlog("fog failed", e.message);
    }
 
    /* Build a cancel handler that respects the grace window. */
    const makeCancelHandler = (eventName) => () => {
      const elapsedSinceStart =
        performance.now() - sequenceStartTimeRef.current;
 
      if (elapsedSinceStart < CANCEL_GRACE_MS) {
        dlog(
          `IGNORED '${eventName}' event during grace window`,
          `(${Math.round(elapsedSinceStart)}ms < ${CANCEL_GRACE_MS}ms)`
        );
        return;
      }
 
      dlog(`INTERACTION DETECTED via '${eventName}' event`);
      if (sequenceRef.current) {
        dlog(`cancelling opening sequence (was active)`);
        sequenceRef.current.cancel();
        sequenceRef.current = null;
      } else {
        dlog(`interaction fired but no active sequence to cancel`);
      }
      dlog(`setting autoCruiseActive -> false via interaction '${eventName}'`);
      setAutoCruiseActive(false);
    };
 
    /* IMPORTANT: only true user-intent events get a cancel handler.
     *
     * REMOVED from this list:
     *   - rotatestart  • fires on any bearing change including ours
     *   - pitchstart   • fires on any pitch change including ours
     *
     * These were canceling the sequence on its own first frame. */
    const dragHandler = makeCancelHandler("dragstart");
    const wheelHandler = makeCancelHandler("wheel");
    const touchHandler = makeCancelHandler("touchstart");
    const mouseHandler = makeCancelHandler("mousedown");
 
    map.on("dragstart", dragHandler);
    map.on("wheel", wheelHandler);
    map.on("touchstart", touchHandler);
    map.on("mousedown", mouseHandler);
 
    dlog("interaction handlers bound (cancel list: dragstart, wheel, touchstart, mousedown)");
 
    /* Mark sequence start time so the grace window can compute
     * elapsed against it. */
    sequenceStartTimeRef.current = performance.now();
 
    dlog("calling runOpeningSequence");
    sequenceRef.current = runOpeningSequence(map);
    dlog("runOpeningSequence returned", {
      hasController: !!sequenceRef.current,
    });
 
    return () => {
      dlog("opening-sequence useEffect: cleanup running");
      map.off("dragstart", dragHandler);
      map.off("wheel", wheelHandler);
      map.off("touchstart", touchHandler);
      map.off("mousedown", mouseHandler);
      if (sequenceRef.current) {
        sequenceRef.current.cancel();
        sequenceRef.current = null;
      }
    };
  }, [mapLoaded, styleLoaded]);
 
  const handleBeaconClick = (beacon) => {
    dlog("beacon clicked", beacon.name);
    if (sequenceRef.current) {
      sequenceRef.current.cancel();
      sequenceRef.current = null;
    }
    setAutoCruiseActive(false);
    setSelectedBeacon(beacon);
  };
 
  if (!MAPBOX_TOKEN) {
    dlog("MAPBOX_TOKEN missing, rendering fallback");
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: "var(--color-dark-bg)" }}
      >
        <div className="text-center px-8 max-w-md">
          <p
            className="text-mono mb-3"
            style={{ color: "var(--color-dark-accent)" }}
          >
            Vessel not yet provisioned
          </p>
          <p
            className="text-body-sm"
            style={{ color: "var(--color-dark-ink-muted)" }}
          >
            VITE_MAPBOX_TOKEN is not set. Add it to your .env file and the
            environment variables in Netlify, then redeploy.
          </p>
        </div>
      </div>
    );
  }
 
  return (
    <div className="absolute inset-0">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={STANDARD_STYLE}
        initialViewState={INITIAL_VIEW}
        projection="globe"
        attributionControl={false}
        logoPosition="bottom-right"
        onLoad={() => {
          dlog("Map onLoad fired");
          setMapLoaded(true);
        }}
        onStyleData={() => {
          dlog("Map onStyleData fired");
          setStyleLoaded(true);
        }}
        style={{ width: "100%", height: "100%" }}
      />
 
      {mapLoaded && styleLoaded && mapInstance && (
        <>
          <BeaconLayer
            map={mapInstance}
            onBeaconClick={handleBeaconClick}
          />
          {selectedBeacon && (
            <BeaconPopup
              map={mapInstance}
              location={selectedBeacon}
              onDismiss={() => setSelectedBeacon(null)}
            />
          )}
        </>
      )}
 
      <StatusOverlay
        visible={mapLoaded}
        selectedBeacon={selectedBeacon}
        autoCruiseActive={autoCruiseActive}
      />
    </div>
  );
}
 
function StatusOverlay({ visible, selectedBeacon, autoCruiseActive }) {
  const modeLabel = selectedBeacon
    ? "Tagged"
    : autoCruiseActive
    ? "Cruising"
    : "Steady";
 
  return (
    <div
      className="absolute bottom-6 left-6 pointer-events-none transition-opacity duration-700 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="beacon-dot sm pulse on-dark" aria-hidden="true" />
        <span
          className="text-mono"
          style={{ color: "var(--color-dark-accent)" }}
        >
          The Burroship · Active dome
        </span>
      </div>
      <div
        className="flex items-center gap-4 flex-wrap"
        style={{ color: "var(--color-dark-ink-muted)" }}
      >
        <span className="text-mono-xs">{modeLabel}</span>
        <span
          className="text-mono-xs"
          style={{ color: "var(--color-dark-ink-faint)" }}
        >
          {selectedBeacon
            ? selectedBeacon.name
            : `${CRUISE_ALTITUDE_M.toLocaleString()} m`}
        </span>
        {!selectedBeacon && (
          <>
            <span
              className="text-mono-xs"
              style={{ color: "var(--color-dark-ink-faint)" }}
            >
              Over Ridgway
            </span>
            <span
              className="text-mono-xs"
              style={{ color: "var(--color-dark-ink-faint)" }}
            >
              38.155° N · 107.755° W
            </span>
          </>
        )}
      </div>
    </div>
  );
}
 
export default MapCanvas;
