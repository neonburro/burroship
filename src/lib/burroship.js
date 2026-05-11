// src/lib/burroship.js
//
// Engine-agnostic configuration for the Burroship world. Tokens,
// tour stops, atmospheric presets, beacon palette — all single
// source of truth.

// ----- Tokens ----------------------------------------------------

export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
export const cesiumIonToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

// ----- Atmosphere presets ---------------------------------------
// Each tour stop pulls one of these. Driving values:
//   lightPreset: maps to time-of-day for Cesium sun position
//   exaggeration: terrain vertical scale (1.0 = real, higher = drama)
//   fogDensity: 0 = no fog, ~0.0005 = noticeable, ~0.002 = heavy
//   weather: null | { type: 'snow' | 'rain', intensity: 0-1 }

export const atmospherePresets = {
  alpenglow: {
    lightPreset: "dawn",
    exaggeration: 1.6,
    fogDensity: 0.0002,
    weather: null,
  },
  highNoonClear: {
    lightPreset: "day",
    exaggeration: 1.2,
    fogDensity: 0.0001,
    weather: null,
  },
  goldenDusk: {
    lightPreset: "dusk",
    exaggeration: 1.4,
    fogDensity: 0.00025,
    weather: null,
  },
  boxCanyonShadow: {
    lightPreset: "dusk",
    exaggeration: 1.6,
    fogDensity: 0.0004,
    weather: null,
  },
  alpineSnow: {
    lightPreset: "day",
    exaggeration: 1.5,
    fogDensity: 0.0003,
    weather: { type: "snow", intensity: 0.4 },
  },
  resortDusk: {
    lightPreset: "dusk",
    exaggeration: 1.4,
    fogDensity: 0.00025,
    weather: { type: "snow", intensity: 0.2 },
  },
  compoundDusk: {
    lightPreset: "dusk",
    exaggeration: 1.5,
    fogDensity: 0.0003,
    weather: null,
  },
  compoundNight: {
    lightPreset: "night",
    exaggeration: 1.5,
    fogDensity: 0.0005,
    weather: null,
  },
};

// ----- View presets (top-left selector) -------------------------
// Towns and destinations only. Compound, Sneffels, Chimney Rock
// live in the tour route but not in this menu — they are flyovers.

export const viewPresets = {
  BURROSHIP: {
    label: "The Burroship",
    longitude: -107.6700,
    latitude: 38.0700,
    altitude: 35000,
    pitch: -40,
    heading: -15,
    isTour: true,
  },
  RIDGWAY: {
    label: "Ridgway",
    longitude: -107.7551,
    latitude: 38.1547,
    altitude: 3000,
    pitch: -30,
    heading: -10,
  },
  OURAY: {
    label: "Ouray",
    longitude: -107.6708,
    latitude: 38.0228,
    altitude: 3500,
    pitch: -30,
    heading: 0,
  },
  TELLURIDE: {
    label: "Telluride",
    longitude: -107.8123,
    latitude: 37.9375,
    altitude: 4000,
    pitch: -30,
    heading: 0,
  },
  MOUNTAIN_VILLAGE: {
    label: "Mountain Village",
    longitude: -107.8561,
    latitude: 37.9356,
    altitude: 3500,
    pitch: -28,
    heading: -20,
  },
};

// ----- The autonomous tour --------------------------------------
// Each tour stop has three phases (approach, hold, depart) with
// camera positions and durations. Positions are real-world
// {longitude, latitude, altitude (meters), pitch (degrees, negative
// = looking down), heading (degrees, 0 = north, 90 = east)}.
//
// The `atmosphere` key names one preset from atmospherePresets.
// The `splats` array is empty for now — when you upload a Gaussian
// Splat to Cesium ion, paste its asset ID here as:
//   { assetId: 1234567, longitude: ..., latitude: ..., height: ... }
// and it streams in automatically when the camera flies near.

export const tourRoute = [
  {
    name: "The Compound",
    slug: "compound",
    longitude: -107.5800,
    latitude: 38.1380,
    atmosphere: "compoundDusk",
    splats: [],
    approach: {
      longitude: -107.5950, latitude: 38.1700,
      altitude: 6000, pitch: -45, heading: -25,
      durationMs: 28000,
    },
    hold: {
      longitude: -107.5800, latitude: 38.1380,
      altitude: 1800, pitch: -35, headingStart: -25, headingEnd: 90,
      durationMs: 60000,
    },
    depart: {
      longitude: -107.6500, latitude: 38.1500,
      altitude: 5000, pitch: -45, heading: 60,
      durationMs: 14000,
    },
  },
  {
    name: "Chimney Rock",
    slug: "chimney-rock",
    longitude: -107.5706,
    latitude: 38.1466,
    atmosphere: "goldenDusk",
    splats: [],
    approach: {
      longitude: -107.5900, latitude: 38.1600,
      altitude: 4500, pitch: -40, heading: 60,
      durationMs: 24000,
    },
    hold: {
      longitude: -107.5706, latitude: 38.1466,
      altitude: 1500, pitch: -25, headingStart: 60, headingEnd: 240,
      durationMs: 55000,
    },
    depart: {
      longitude: -107.6400, latitude: 38.1500,
      altitude: 5500, pitch: -45, heading: 270,
      durationMs: 13000,
    },
  },
  {
    name: "Ridgway",
    slug: "ridgway",
    longitude: -107.7551,
    latitude: 38.1547,
    atmosphere: "highNoonClear",
    splats: [],
    approach: {
      longitude: -107.7300, latitude: 38.1900,
      altitude: 5500, pitch: -45, heading: 270,
      durationMs: 26000,
    },
    hold: {
      longitude: -107.7551, latitude: 38.1547,
      altitude: 1200, pitch: -30, headingStart: 270, headingEnd: 90,
      durationMs: 55000,
    },
    depart: {
      longitude: -107.7400, latitude: 38.1100,
      altitude: 4500, pitch: -43, heading: 170,
      durationMs: 13000,
    },
  },
  {
    name: "Mt Sneffels",
    slug: "mt-sneffels",
    longitude: -107.7922,
    latitude: 38.0038,
    atmosphere: "alpenglow",
    splats: [],
    approach: {
      longitude: -107.8100, latitude: 38.0400,
      altitude: 6500, pitch: -40, heading: 170,
      durationMs: 30000,
    },
    hold: {
      longitude: -107.7922, latitude: 38.0038,
      altitude: 2200, pitch: -18, headingStart: 170, headingEnd: 350,
      durationMs: 65000,
    },
    depart: {
      longitude: -107.7400, latitude: 38.0100,
      altitude: 5000, pitch: -45, heading: 80,
      durationMs: 14000,
    },
  },
  {
    name: "Ouray",
    slug: "ouray",
    longitude: -107.6708,
    latitude: 38.0228,
    atmosphere: "boxCanyonShadow",
    splats: [],
    approach: {
      longitude: -107.6900, latitude: 38.0500,
      altitude: 4500, pitch: -40, heading: 80,
      durationMs: 26000,
    },
    hold: {
      longitude: -107.6708, latitude: 38.0228,
      altitude: 900, pitch: -22, headingStart: 80, headingEnd: 260,
      durationMs: 60000,
    },
    depart: {
      longitude: -107.7100, latitude: 37.9900,
      altitude: 4500, pitch: -45, heading: 230,
      durationMs: 15000,
    },
  },
  {
    name: "Telluride",
    slug: "telluride",
    longitude: -107.8123,
    latitude: 37.9375,
    atmosphere: "alpineSnow",
    splats: [],
    approach: {
      longitude: -107.8000, latitude: 37.9650,
      altitude: 4000, pitch: -40, heading: 230,
      durationMs: 28000,
    },
    hold: {
      longitude: -107.8123, latitude: 37.9375,
      altitude: 1400, pitch: -28, headingStart: 230, headingEnd: 60,
      durationMs: 58000,
    },
    depart: {
      longitude: -107.8350, latitude: 37.9400,
      altitude: 4500, pitch: -45, heading: 250,
      durationMs: 13000,
    },
  },
  {
    name: "Mountain Village",
    slug: "mountain-village",
    longitude: -107.8561,
    latitude: 37.9356,
    atmosphere: "resortDusk",
    splats: [],
    approach: {
      longitude: -107.8700, latitude: 37.9550,
      altitude: 4200, pitch: -40, heading: 250,
      durationMs: 25000,
    },
    hold: {
      longitude: -107.8561, latitude: 37.9356,
      altitude: 1500, pitch: -30, headingStart: 250, headingEnd: 90,
      durationMs: 55000,
    },
    depart: {
      longitude: -107.7900, latitude: 37.9800,
      altitude: 6000, pitch: -45, heading: 50,
      durationMs: 16000,
    },
  },
];

export const tourCycleMs = tourRoute.reduce(
  (sum, stop) =>
    sum + stop.approach.durationMs + stop.hold.durationMs + stop.depart.durationMs,
  0
);

export const defaultCamera = viewPresets.BURROSHIP;

export const featuredLabels = [
  "Ridgway", "Ouray", "Telluride", "Mountain Village",
  "Mt Sneffels", "Chimney Rock", "The Compound",
  "The Burroships", "The StackHouse",
];

// ----- Compound beacon palette ----------------------------------

export const compoundBeaconColors = {
  steel: {
    base: "#7BA8C4",
    glow: "rgba(123, 168, 196, 0.55)",
    label: "The Compound",
  },
  bronze: {
    base: "#C9A87C",
    glow: "rgba(201, 168, 124, 0.55)",
    label: "The Burroships",
  },
  lantern: {
    base: "#A8D055",
    glow: "rgba(168, 208, 85, 0.6)",
    label: "The StackHouse",
  },
};