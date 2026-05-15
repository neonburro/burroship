// src/pages/CommandCenter/map/MapCanvas.jsx
//
// The Mapbox canvas. Mounts react-map-gl, applies Mapbox Standard
// style with night light preset, runs the opening choreography
// (lift from Chimney Rock, drift to Ridgway, orbit), and yields
// to the user the moment they touch the map.
 
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
 
function MapCanvas() {
  const mapRef = useRef(null);
  const sequenceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [selectedBeacon, setSelectedBeacon] = useState(null);
  const [autoCruiseActive, setAutoCruiseActive] = useState(true);
 
  /* Get the underlying mapbox-gl Map instance for layer components. */
  const mapInstance = mapRef.current?.getMap?.() || null;
 
  /* When the map style finishes loading, apply the night preset
   * and the fog. Then start the opening choreography. */
  useEffect(() => {
    if (!mapLoaded || !styleLoaded) return;
 
    const map = mapRef.current?.getMap();
    if (!map) return;
 
    /* Apply night light preset. */
    try {
      map.setConfigProperty("basemap", "lightPreset", STANDARD_LIGHT_PRESET);
    } catch (e) {
      /* Non-critical. */
    }
 
    /* Apply atmospheric fog. */
    try {
      map.setFog(FOG_CONFIG);
    } catch (e) {
      /* Non-critical. */
    }
 
    /* Wire interaction handlers BEFORE starting the sequence so
     * even very early input cancels auto-cruise. */
    const cancelAutoCruise = () => {
      if (sequenceRef.current) {
        sequenceRef.current.cancel();
        sequenceRef.current = null;
      }
      setAutoCruiseActive(false);
    };
 
    /* Mapbox fires these on user-initiated input. easeTo/jumpTo
     * inside our own choreography do NOT fire these, so we're safe. */
    map.on("dragstart", cancelAutoCruise);
    map.on("wheel", cancelAutoCruise);
    map.on("touchstart", cancelAutoCruise);
    map.on("pitchstart", cancelAutoCruise);
    map.on("rotatestart", cancelAutoCruise);
 
    /* Start the opening sequence. */
    sequenceRef.current = runOpeningSequence(map);
 
    return () => {
      map.off("dragstart", cancelAutoCruise);
      map.off("wheel", cancelAutoCruise);
      map.off("touchstart", cancelAutoCruise);
      map.off("pitchstart", cancelAutoCruise);
      map.off("rotatestart", cancelAutoCruise);
      if (sequenceRef.current) {
        sequenceRef.current.cancel();
        sequenceRef.current = null;
      }
    };
  }, [mapLoaded, styleLoaded]);
 
  /* When the user clicks a beacon, that also counts as interaction.
   * Cancel auto-cruise. */
  const handleBeaconClick = (beacon) => {
    if (sequenceRef.current) {
      sequenceRef.current.cancel();
      sequenceRef.current = null;
    }
    setAutoCruiseActive(false);
    setSelectedBeacon(beacon);
  };
 
  /* Friendly fallback if the Mapbox token is missing. */
  if (!MAPBOX_TOKEN) {
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
        onLoad={() => setMapLoaded(true)}
        onStyleData={() => setStyleLoaded(true)}
        style={{ width: "100%", height: "100%" }}
      />
 
      {/* Layers render once the map is loaded and the style is ready */}
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
 
/* Bottom-left operational readout. Brand voice.
 * Reactive to: opening sequence state, auto-cruise state, selected beacon. */
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
