// src/pages/Map/MapWorld.jsx
import { useState, useRef, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";

import {
  mapboxToken,
  mapboxStyle,
  defaultCamera,
  viewPresets,
} from "../../lib/mapbox";
import locations from "../../data/locations.json";

import LocationPin from "./LocationPin";
import MapControls from "./MapControls";

// Layer IDs in the dark-v11 style that we want suppressed for
// a quieter cabin-window feel. Keep cities and major roads.
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
  const mapRef = useRef(null);

  const handlePresetSelect = useCallback((presetKey) => {
    const preset = viewPresets[presetKey];
    if (!preset || !mapRef.current) return;

    setActivePreset(presetKey);
    setSelected(null);

    mapRef.current.flyTo({
      center: [preset.longitude, preset.latitude],
      zoom: preset.zoom,
      pitch: preset.pitch,
      bearing: preset.bearing,
      duration: 1800,
      essential: true,
    });
  }, []);

  // Suppress noisy labels once the style finishes loading.
  const handleLoad = useCallback((event) => {
    const map = event.target;
    labelLayersToHide.forEach((layerId) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, "visibility", "none");
      }
    });
  }, []);

  if (!mapboxToken) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-mono-label text-text-secondary">
          MAP TOKEN MISSING
        </p>
      </div>
    );
  }

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
        onSelect={handlePresetSelect}
      />
    </>
  );
}

export default MapWorld;