// src/pages/Map/MapWorld.jsx
import { useState, useRef, useCallback, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";

import {
  mapboxToken,
  mapboxStyle,
  defaultCamera,
  viewPresets,
  tourRoute,
} from "../../lib/mapbox";
import locations from "../../data/locations.json";

import LocationPin from "./LocationPin";
import MapControls from "./MapControls";
import MapSchedule from "./MapSchedule";

const labelLayersToHide = [
  "settlement-minor-label",
  "settlement-subdivision-label",
  "natural-point-label",
  "natural-line-label",
  "water-point-label",
  "water-line-label",
  "poi-label",
  "airport-label",
  "transit-label",
];

function MapWorld() {
  const [selected, setSelected] = useState(null);
  const [activePreset, setActivePreset] = useState("BURROSHIP");
  const [tourActive, setTourActive] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(null);
  const [phaseEndsAt, setPhaseEndsAt] = useState(0);

  const mapRef = useRef(null);
  const tourTimeoutRef = useRef(null);
  const tourRunningRef = useRef(false);

  // ----- Tour engine -----------------------------------------

  const stopTour = useCallback(() => {
    tourRunningRef.current = false;
    setTourActive(false);
    setCurrentStopIndex(null);
    setCurrentPhase(null);
    if (tourTimeoutRef.current) {
      clearTimeout(tourTimeoutRef.current);
      tourTimeoutRef.current = null;
    }
  }, []);

  const runPhase = useCallback((stopIndex, phase) => {
    if (!tourRunningRef.current || !mapRef.current) return;

    const stop = tourRoute[stopIndex];
    const config = stop[phase];

    setCurrentStopIndex(stopIndex);
    setCurrentPhase(phase);
    setPhaseEndsAt(Date.now() + config.durationMs);

    if (phase === "hold") {
      // Hold = low orbit. flyTo for the descent into hold position,
      // then easeTo for the bearing rotation while staying put.
      mapRef.current.flyTo({
        center: [config.longitude, config.latitude],
        zoom: config.zoom,
        pitch: config.pitch,
        bearing: config.bearingStart,
        duration: 2000,
        essential: true,
      });

      // After arrival settles, ease the bearing rotation
      setTimeout(() => {
        if (!tourRunningRef.current || !mapRef.current) return;
        mapRef.current.easeTo({
          center: [config.longitude, config.latitude],
          zoom: config.zoom,
          pitch: config.pitch,
          bearing: config.bearingEnd,
          duration: config.durationMs - 2000,
          essential: true,
        });
      }, 2000);
    } else {
      // Approach or depart = single flyTo with smooth curve
      mapRef.current.flyTo({
        center: [config.longitude, config.latitude],
        zoom: config.zoom,
        pitch: config.pitch,
        bearing: config.bearing,
        duration: config.durationMs,
        essential: true,
        curve: 1.4,
      });
    }

    // Schedule next phase
    tourTimeoutRef.current = setTimeout(() => {
      if (!tourRunningRef.current) return;
      if (phase === "approach") {
        runPhase(stopIndex, "hold");
      } else if (phase === "hold") {
        runPhase(stopIndex, "depart");
      } else {
        // depart → next stop's approach
        const nextIndex = (stopIndex + 1) % tourRoute.length;
        runPhase(nextIndex, "approach");
      }
    }, config.durationMs);
  }, []);

  const startTour = useCallback(() => {
    if (tourRunningRef.current) return;
    tourRunningRef.current = true;
    setTourActive(true);
    runPhase(0, "approach");
  }, [runPhase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      tourRunningRef.current = false;
      if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
    };
  }, []);

  // ----- Preset handler --------------------------------------

  const handlePresetSelect = useCallback(
    (presetKey) => {
      const preset = viewPresets[presetKey];
      if (!preset || !mapRef.current) return;

      setActivePreset(presetKey);
      setSelected(null);

      if (preset.isTour) {
        if (!tourRunningRef.current) startTour();
        return;
      }

      // Static preset: stop the tour and fly there
      stopTour();
      mapRef.current.flyTo({
        center: [preset.longitude, preset.latitude],
        zoom: preset.zoom,
        pitch: preset.pitch,
        bearing: preset.bearing,
        duration: 1800,
        essential: true,
      });
    },
    [startTour, stopTour]
  );

  // ----- Map lifecycle ---------------------------------------

  const handleLoad = useCallback(
    (event) => {
      const map = event.target;
      labelLayersToHide.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.setLayoutProperty(layerId, "visibility", "none");
        }
      });
      // Auto-start the tour after the map is ready
      setTimeout(() => startTour(), 800);
    },
    [startTour]
  );

  if (!mapboxToken) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-mono-label text-text-secondary">
          MAP TOKEN MISSING
        </p>
      </div>
    );
  }

  const currentStopName =
    currentStopIndex != null ? tourRoute[currentStopIndex].name : null;

  return (
    <>
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle={mapboxStyle}
        initialViewState={defaultCamera}
        style={{ position: "absolute", inset: 0 }}
        terrain={{ source: "mapbox-dem", exaggeration: 1.4 }}
        onClick={() => setSelected(null)}
        onLoad={handleLoad}
      >
        <NavigationControl
          position="bottom-right"
          showCompass={true}
          visualizePitch={true}
        />

        {locations
          .filter((loc) => loc.lat != null && loc.lng != null)
          .map((loc) => (
            <Marker
              key={loc.slug}
              longitude={loc.lng}
              latitude={loc.lat}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelected(loc);
              }}
            >
              <LocationPin
                category={loc.category}
                featured={loc.featured}
              />
            </Marker>
          ))}

        {selected && (
          <Popup
            longitude={selected.lng}
            latitude={selected.lat}
            anchor="top"
            onClose={() => setSelected(null)}
            closeOnClick={false}
            closeButton={false}
            offset={16}
            className="burroship-popup"
          >
            <div className="bg-surface border border-surface-edge rounded-card p-4 min-w-[240px] max-w-[280px]">
              <p className="font-mono-label text-[10px] mb-2 text-primary">
                {selected.category.toUpperCase()}
              </p>
              <p className="text-text-primary font-medium mb-1">
                {selected.name}
              </p>
              {selected.address && (
                <p className="font-mono-label text-[10px] text-text-muted mb-3">
                  {selected.address}
                </p>
              )}
              <p className="text-text-secondary text-sm mb-3">
                {selected.blurb}
              </p>
              {selected.tags && selected.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-label text-[9px] px-2 py-0.5 rounded-pill border border-surface-edge text-text-muted"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Popup>
        )}
      </Map>

      <MapControls
        activePreset={activePreset}
        currentTourStop={currentStopName}
        onSelect={handlePresetSelect}
      />

      <MapSchedule
        tourActive={tourActive}
        currentStopIndex={currentStopIndex}
        currentPhase={currentPhase}
        phaseEndsAt={phaseEndsAt}
      />
    </>
  );
}

export default MapWorld;