// src/lib/mapbox.js
//
// Mapbox configuration. Token loads from env. Camera presets and
// style settings are documented in docs/MAP_SYSTEM.md.

export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const mapboxStyle = "mapbox://styles/mapbox/dark-v11";

export const viewPresets = {
  BURROSHIP: {
    label: "Burroship",
    longitude: -107.7551,
    latitude: 38.0900,
    zoom: 10.2,
    pitch: 50,
    bearing: -15,
  },
  RIDGWAY: {
    label: "Ridgway",
    longitude: -107.7551,
    latitude: 38.1547,
    zoom: 14,
    pitch: 60,
    bearing: -10,
  },
  OURAY: {
    label: "Ouray",
    longitude: -107.6708,
    latitude: 38.0228,
    zoom: 14,
    pitch: 60,
    bearing: 0,
  },
  TELLURIDE: {
    label: "Telluride",
    longitude: -107.8123,
    latitude: 37.9375,
    zoom: 14,
    pitch: 60,
    bearing: 0,
  },
};

export const defaultCamera = viewPresets.BURROSHIP;

export const featuredLabels = [
  "Ridgway",
  "Ouray",
  "Telluride",
  "Montrose",
  "Chimney Rock",
];