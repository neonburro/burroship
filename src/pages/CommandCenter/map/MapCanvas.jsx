// src/pages/CommandCenter/map/MapCanvas.jsx
//
// Phase C • visual polish.
//
// Verified API calls per Volt's sourced research:
//   • setConfigProperty('basemap', flagName, value)
//     for lightPreset, showPlaceLabels, showPointOfInterestLabels,
//     showRoadLabels, showTransitLabels, show3dObjects
//   • addSource('mapbox-dem', {type: 'raster-dem', ...}) before
//     setTerrain (Standard does NOT provide DEM implicitly)
//   • setTerrain({source: 'mapbox-dem', exaggeration: 1.8})
//   • setFog with horizon-blend, star-intensity, color values
//
// show3dObjects requires mapbox-gl >= 3.5.2. Wrapped in try/catch
// so older versions degrade gracefully.
 
import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
 
import {
  MAPBOX_TOKEN,
  STANDARD_STYLE,
  STANDARD_LIGHT_PRESET,
  INITIAL_VIEW,
  FOG_CONFIG,
  TERRAIN_EXAGGERATION,
  DEM_SOURCE_ID,
  DEM_SOURCE_CONFIG,
  CRUISE_ALTITUDE_M,
  CANCEL_GRACE_MS,
  WHEEL_DEBOUNCE_MS,
} from "./config";
import { runOpeningSequence } from "./camera";
import { burroshipSupabase, supabaseReady } from "../../../lib/burroshipSupabase";
import BeaconLayer from "../layers/BeaconLayer";
import BeaconPopup from "../layers/BeaconPopup";
 
const LOG_PREFIX = "[burroship-mapcanvas]";
const mountWallTime = performance.now();
 
function dlog(...args) {
  const ts = Math.round(performance.now() - mountWallTime);
  console.log(`${LOG_PREFIX} +${ts}ms`, ...args);
}
 
/* Apply Mapbox Standard config flags.
 *
 * Place labels are kept ON so Tyler retains town orientation
 * (Ridgway, Ouray, Telluride). Road/POI/transit labels are
 * hidden to reduce basemap noise and let beacons dominate.
 *
 * Each call wrapped in try/catch because show3dObjects requires
 * mapbox-gl >= 3.5.2 and we don't want one failed flag to block
 * the others from applying. */
function applyStandardConfig(map) {
  const configCalls = [
    ["lightPreset", STANDARD_LIGHT_PRESET],
    ["showPlaceLabels", true],
    ["showRoadLabels", true],
    ["showPointOfInterestLabels", false],
    ["showTransitLabels", false],
    ["show3dObjects", true],
  ];
 
  for (const [key, value] of configCalls) {
    try {
      map.setConfigProperty("basemap", key, value);
      dlog(`config ${key} = ${value} OK`);
    } catch (e) {
      dlog(`config ${key} FAILED:`, e.message);
    }
  }
}
 
/* Add DEM source manually, then apply terrain exaggeration.
 *
 * Per Volt's verified research:
 *   "The official terrain example for GL JS v3.20.0 adds a
 *    raster-dem source manually and then calls setTerrain.
 *    For Standard, do not assume Standard gives you a ready
 *    DEM source automatically; add the DEM source explicitly,
 *    then call setTerrain."
 *
 * If the source already exists (e.g. on hot reload), addSource
 * throws. Check first and skip if present. */
function applyTerrain(map) {
  try {
    if (!map.getSource(DEM_SOURCE_ID)) {
      map.addSource(DEM_SOURCE_ID, DEM_SOURCE_CONFIG);
      dlog(`DEM source ${DEM_SOURCE_ID} added`);
    } else {
      dlog(`DEM source ${DEM_SOURCE_ID} already present, skipping add`);
    }
 
    map.setTerrain({
      source: DEM_SOURCE_ID,
      exaggeration: TERRAIN_EXAGGERATION,
    });
    dlog(`terrain exaggeration ${TERRAIN_EXAGGERATION} OK`);
  } catch (e) {
    dlog("terrain FAILED:", e.message);
  }
}
 
function MapCanvas() {
  dlog("MapCanvas component RENDER", { INITIAL_VIEW });
 
  const mapRef = useRef(null);
  const sequenceRef = useRef(null);
  const sequenceStartTimeRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [selectedBeacon, setSelectedBeacon] = useState(null);
  const [autoCruiseActive, setAutoCruiseActive] = useState(true);
  const [places, setPlaces] = useState([]);

  const mapInstance = mapRef.current?.getMap?.() || null;

  useEffect(() => {
    if (!supabaseReady) return;
    let active = true;
    burroshipSupabase
      .from("places")
      .select("slug,name,category,subcategory,address,city,latitude,longitude,website,phone,blurb")
      .eq("status", "live")
      .then(({ data, error }) => {
        if (active && !error && data) setPlaces(data);
      });
    return () => { active = false; };
  }, []);

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
 
    /* Phase C • basemap config, terrain, fog. */
    applyStandardConfig(map);
    applyTerrain(map);
 
    try {
      map.setFog(FOG_CONFIG);
      dlog("fog applied successfully");
    } catch (e) {
      dlog("fog failed", e.message);
    }
 
    /* Cancel handler with grace window and wheel debounce. */
    const makeCancelHandler = (eventName) => () => {
      const now = performance.now();
      const elapsedSinceStart = now - sequenceStartTimeRef.current;
 
      if (elapsedSinceStart < CANCEL_GRACE_MS) {
        dlog(
          `IGNORED '${eventName}' during grace window`,
          `(${Math.round(elapsedSinceStart)}ms < ${CANCEL_GRACE_MS}ms)`
        );
        return;
      }
 
      if (eventName === "wheel") {
        const sinceLastWheel = now - lastWheelTimeRef.current;
        lastWheelTimeRef.current = now;
        if (sinceLastWheel < WHEEL_DEBOUNCE_MS) {
          return;
        }
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
 
    const dragHandler = makeCancelHandler("dragstart");
    const wheelHandler = makeCancelHandler("wheel");
    const touchHandler = makeCancelHandler("touchstart");
    const mouseHandler = makeCancelHandler("mousedown");
 
    map.on("dragstart", dragHandler);
    map.on("wheel", wheelHandler);
    map.on("touchstart", touchHandler);
    map.on("mousedown", mouseHandler);
 
    dlog(
      "interaction handlers bound (cancel list: dragstart, wheel, touchstart, mousedown)"
    );
 
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
            locations={places}
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
