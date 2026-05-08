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

// Mapbox style layers we suppress for a quieter cabin-window feel.
// Keep major roads and city labels.
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

// ----- Atmospheric configuration ----------------------------
// The Burroship's lantern faintly illuminates the upper atmosphere.
// Near-ground fog matches the deep page background so the map
// blends into the cabin around it.

const burroshipFog = {
  range: [0.5, 12],
  color: "rgb(2, 5, 3)",
  "high-color": "rgb(40, 60, 25)",
  "horizon-blend": 0.25,
  "space-color": "rgb(2, 5, 3)",
  "star-intensity": 0.4,
};

const burroshipSky = {
  "sky-type": "gradient",
  "sky-gradient": [
    "interpolate",
    ["linear"],
    ["sky-radial-progress"],
    0.8,
    "rgb(2, 5, 3)",
    1.0,
    "rgb(50, 80, 30)",
  ],
  "sky-gradient-center": [0, 0],
  "sky-gradient-radius": 90,
  "sky-opacity": 1.0,
};

// 3D building extrusion layer config. The buildings rise from the
// ground at their real heights. Especially dramatic at the tour's
// drone altitudes (zoom 14+).

const buildingLayer = {
  id: "burroship-3d-buildings",
  source: "composite",
  "source-layer": "building",
  filter: ["==", "extrude", "true"],
  type: "fill-extrusion",
  minzoom: 13,
  paint: {
    "fill-extrusion-color": [
      "interpolate",
      ["linear"],
      ["get", "height"],
      0,
      "#1a1f1a",
      30,
      "#22272a",
      80,
      "#2a2f33",
    ],
    "fill-extrusion-height": [
      "interpolate",
      ["linear"],
      ["zoom"],
      13,
      0,
      14,
      ["get", "height"],
    ],
    "fill-extrusion-base": ["get", "min_height"],
    "fill-extrusion-opacity": 0.85,
  },
};

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
  }, []);

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
    },
    [startTour, stopTour]
  );

  // ----- Map lifecycle ---------------------------------------
  // Suppress noisy labels, set atmospheric fog, set sky gradient,
  // add 3D building extrusion, then start the tour.

  const handleLoad = useCallback(
    (event) => {
      const map = event.target;

      // Suppress label clutter
      labelLayersToHide.forEach((layerId) => {
        if (map.getLayer(layerId)) {
          map.setLayoutProperty(layerId, "visibility", "none");
        }
      });

      // Atmosphere — fog + space color
      try {
        map.setFog(burroshipFog);
      } catch (e) {
        console.warn("setFog failed", e);
      }

      // Sky gradient — the lantern lighting the upper atmosphere
      try {
        // Some style versions name the layer "sky", others use a
        // dedicated sky source. Try the layer-property approach first.
        if (map.getLayer("sky")) {
          Object.entries(burroshipSky).forEach(([key, value]) => {
            map.setPaintProperty("sky", key, value);
          });
        } else {
          // Add our own sky layer
          map.addLayer({
            id: "burroship-sky",
            type: "sky",
            paint: burroshipSky,
          });
        }
      } catch (e) {
        console.warn("sky setup failed", e);
      }

      // 3D buildings — find a label layer to insert below so labels
      // still draw on top of buildings
      try {
        const layers = map.getStyle().layers;
        const firstSymbolId = layers.find((l) => l.type === "symbol")?.id;
        if (map.getLayer("burroship-3d-buildings")) {
          map.removeLayer("burroship-3d-buildings");
        }
        map.addLayer(buildingLayer, firstSymbolId);
      } catch (e) {
        console.warn("3d buildings setup failed", e);
      }

      // Start the tour after the style is ready
      setTimeout(() => startTour(), 1200);
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
        terrain={{ source: "mapbox-dem", exaggeration: 1.6 }}
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