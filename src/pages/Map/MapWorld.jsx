// src/pages/Map/MapWorld.jsx
import { useState, useRef, useCallback, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";

import {
  mapboxToken,
  mapboxStyle,
  standardStyleConfig,
  atmospherePresets,
  defaultCamera,
  viewPresets,
  tourRoute,
} from "../../lib/mapbox";
import locations from "../../data/locations.json";

import LocationPin from "./LocationPin";
import MapControls from "./MapControls";
import MapSchedule from "./MapSchedule";

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
  const styleReadyRef = useRef(false);

  // ----- Atmosphere application ------------------------------
  // Applies a named atmosphere preset to the live map. Standard
  // style v3 takes lightPreset via setConfigProperty, fog via
  // setFog (which works on v3), terrain via setTerrain, and
  // weather via setSnow/setRain.

  const applyAtmosphere = useCallback((presetKey) => {
    const map = mapRef.current?.getMap?.() || mapRef.current;
    if (!map || !styleReadyRef.current) return;

    const preset = atmospherePresets[presetKey];
    if (!preset) return;

    // Light preset — Standard style v3 config slot
    try {
      map.setConfigProperty("basemap", "lightPreset", preset.lightPreset);
    } catch (e) {
      console.warn("setConfigProperty lightPreset failed", e);
    }

    // Terrain exaggeration — Standard style includes mapbox-dem
    // automatically when terrain is set
    try {
      map.setTerrain({ source: "mapbox-dem", exaggeration: preset.exaggeration });
    } catch (e) {
      console.warn("setTerrain failed", e);
    }

    // Fog — works in v3, drives the horizon haze
    try {
      map.setFog({
        range: preset.fogRange,
        "horizon-blend": preset.fogHorizonBlend,
        color: "rgb(2, 5, 3)",
        "high-color": "rgb(40, 60, 25)",
        "space-color": "rgb(2, 5, 3)",
        "star-intensity": preset.lightPreset === "night" ? 0.6 : 0.2,
      });
    } catch (e) {
      console.warn("setFog failed", e);
    }

    // Weather — snow or rain or clear. Standard style has these
    // built in via setSnow/setRain.
    try {
      if (preset.weather?.type === "snow") {
        map.setSnow({
          density: preset.weather.intensity,
          opacity: 0.9,
          intensity: preset.weather.intensity,
          color: "#FFFFFF",
        });
        map.setRain(null);
      } else if (preset.weather?.type === "rain") {
        map.setRain({
          density: preset.weather.intensity,
          opacity: 0.7,
          intensity: preset.weather.intensity,
        });
        map.setSnow(null);
      } else {
        map.setSnow(null);
        map.setRain(null);
      }
    } catch (e) {
      // Older mapbox-gl versions may not have setSnow/setRain.
      // Fail quiet — the atmosphere still works without weather.
    }
  }, []);

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

  const runPhase = useCallback(
    (stopIndex, phase) => {
      if (!tourRunningRef.current || !mapRef.current) return;

      const stop = tourRoute[stopIndex];
      const config = stop[phase];

      setCurrentStopIndex(stopIndex);
      setCurrentPhase(phase);
      setPhaseEndsAt(Date.now() + config.durationMs);

      // Apply this stop's atmosphere on approach, and let it ride
      // through hold + depart. The next stop's approach will swap
      // atmosphere when we arrive there.
      if (phase === "approach") {
        applyAtmosphere(stop.atmosphere);
      }

      if (phase === "hold") {
        mapRef.current.flyTo({
          center: [config.longitude, config.latitude],
          zoom: config.zoom,
          pitch: config.pitch,
          bearing: config.bearingStart,
          duration: 2000,
          essential: true,
        });

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

      tourTimeoutRef.current = setTimeout(() => {
        if (!tourRunningRef.current) return;
        if (phase === "approach") {
          runPhase(stopIndex, "hold");
        } else if (phase === "hold") {
          runPhase(stopIndex, "depart");
        } else {
          const nextIndex = (stopIndex + 1) % tourRoute.length;
          runPhase(nextIndex, "approach");
        }
      }, config.durationMs);
    },
    [applyAtmosphere]
  );

  const startTour = useCallback(() => {
    if (tourRunningRef.current) return;
    tourRunningRef.current = true;
    setTourActive(true);
    runPhase(0, "approach");
  }, [runPhase]);

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

      stopTour();
      mapRef.current.flyTo({
        center: [preset.longitude, preset.latitude],
        zoom: preset.zoom,
        pitch: preset.pitch,
        bearing: preset.bearing,
        duration: 1800,
        essential: true,
      });

      // Find the matching tour stop (if any) and apply its
      // atmosphere so a manual jump still feels weathered.
      const matchingStop = tourRoute.find(
        (s) =>
          Math.abs(s.longitude - preset.longitude) < 0.01 &&
          Math.abs(s.latitude - preset.latitude) < 0.01
      );
      if (matchingStop) {
        applyAtmosphere(matchingStop.atmosphere);
      }
    },
    [startTour, stopTour, applyAtmosphere]
  );

  // ----- Map lifecycle ---------------------------------------
  // On Standard style v3, configuration runs through
  // setConfigProperty('basemap', ...). No manual addLayer for
  // buildings — they're built into the style.

  const handleLoad = useCallback(
    (event) => {
      const map = event.target;

      // Apply Standard style config — labels, theme, 3d objects
      try {
        Object.entries(standardStyleConfig).forEach(([key, value]) => {
          map.setConfigProperty("basemap", key, value);
        });
      } catch (e) {
        console.warn("Standard style config failed (style may be v2)", e);
      }

      styleReadyRef.current = true;

      // First-frame atmosphere — apply the first tour stop's preset
      // so the page lands already weathered, not in a flat default
      applyAtmosphere(tourRoute[0].atmosphere);

      // Start the tour after the style + atmosphere settle
      setTimeout(() => startTour(), 1500);
    },
    [applyAtmosphere, startTour]
  );

  if (!mapboxToken) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-mono-label text-text-secondary">MAP TOKEN MISSING</p>
      </div>
    );
  }

  const currentStopName =
    currentStopIndex != null ? tourRoute[currentStopIndex].name : null;

  // Popup category label — beacons show their role, others show category
  const popupLabel = (() => {
    if (!selected) return "";
    if (selected.subcategory === "compound-beacon") {
      return "COMPOUND";
    }
    return selected.category.toUpperCase();
  })();

  return (
    <>
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle={mapboxStyle}
        initialViewState={defaultCamera}
        style={{ position: "absolute", inset: 0 }}
        onClick={() => setSelected(null)}
        onLoad={handleLoad}
        antialias={true}
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
                subcategory={loc.subcategory}
                beaconColor={loc.beaconColor}
                status={loc.status}
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
              <div className="flex items-center gap-2 mb-2">
                <p className="font-mono-label text-[10px] text-primary">
                  {popupLabel}
                </p>
                {selected.status === "in-development" && (
                  <span className="font-mono-label text-[9px] px-2 py-0.5 rounded-pill border border-primary/40 text-primary bg-primary/10">
                    IN DEV
                  </span>
                )}
              </div>
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