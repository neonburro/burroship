// src/lib/mapbox.js
//
// Mapbox configuration. Token loads from env. Camera presets and the
// autonomous tour route are documented in docs/MAP_SYSTEM.md.
//
// Style: Mapbox Standard v3 — gives us realtime time-of-day lighting,
// built-in 3D buildings/trees/landmarks, and atmospheric scattering
// for free. We drive the mood per-stop via lightPreset + terrain
// exaggeration + optional weather (snow/rain).

export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const mapboxStyle = "mapbox://styles/mapbox/standard";

// Standard style config — applied once at load. Quieter labels for
// the cabin-window feel; we keep place + road labels but suppress
// transit, POI, and landmark noise.
export const standardStyleConfig = {
  // Base lighting preset. The tour overrides this per stop.
  lightPreset: "dusk",
  // The Standard style is naturally bright; theme=monochrome strips
  // hue down toward our greens-and-greys world.
  theme: "monochrome",
  // Show 3D pbr buildings and trees — built into the style.
  show3dObjects: true,
  showPlaceLabels: true,
  showRoadLabels: true,
  // Suppress everything else — keeps the map quiet.
  showPointOfInterestLabels: false,
  showTransitLabels: false,
  showPedestrianRoads: false,
};

// ----- Atmosphere presets ---------------------------------------
// Each tour stop pulls one of these. Defining them centrally makes
// it easy to retune the whole world without hunting through stops.

export const atmospherePresets = {
  alpenglow: {
    lightPreset: "dawn",
    exaggeration: 2.0,
    fogRange: [0.5, 14],
    fogHorizonBlend: 0.3,
    weather: null,
  },
  highNoonClear: {
    lightPreset: "day",
    exaggeration: 1.4,
    fogRange: [1, 20],
    fogHorizonBlend: 0.1,
    weather: null,
  },
  goldenDusk: {
    lightPreset: "dusk",
    exaggeration: 1.7,
    fogRange: [0.5, 12],
    fogHorizonBlend: 0.25,
    weather: null,
  },
  boxCanyonShadow: {
    lightPreset: "dusk",
    exaggeration: 1.9,
    fogRange: [0.4, 10],
    fogHorizonBlend: 0.3,
    weather: null,
  },
  alpineSnow: {
    lightPreset: "day",
    exaggeration: 1.8,
    fogRange: [0.6, 14],
    fogHorizonBlend: 0.2,
    weather: { type: "snow", intensity: 0.4 },
  },
  resortDusk: {
    lightPreset: "dusk",
    exaggeration: 1.7,
    fogRange: [0.5, 12],
    fogHorizonBlend: 0.25,
    weather: { type: "snow", intensity: 0.2 },
  },
  compoundDusk: {
    lightPreset: "dusk",
    exaggeration: 1.9,
    fogRange: [0.4, 11],
    fogHorizonBlend: 0.3,
    weather: null,
  },
  compoundNight: {
    lightPreset: "night",
    exaggeration: 1.9,
    fogRange: [0.3, 10],
    fogHorizonBlend: 0.4,
    weather: null,
  },
};

// ----- View presets (top-left selector) -------------------------
// Towns and destinations only. The Compound, Sneffels, and Chimney
// Rock live in the tour route but not in this selector — they're
// flyovers, not destinations on the menu.

export const viewPresets = {
  BURROSHIP: {
    label: "The Burroship",
    longitude: -107.6700,
    latitude: 38.0700,
    zoom: 9.6,
    pitch: 50,
    bearing: -15,
    isTour: true,
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
  MOUNTAIN_VILLAGE: {
    label: "Mountain Village",
    longitude: -107.8561,
    latitude: 37.9356,
    zoom: 14,
    pitch: 62,
    bearing: -20,
  },
};

// ----- The autonomous tour --------------------------------------
// Seven stops. Each stop has three phases:
//   approach — descending fly-in from altitude (~25-32s)
//   hold     — low-altitude orbit, bearing rotates (~50-65s)
//   depart   — rising lift-off heading toward next stop (~12-16s)
//
// Each stop also names an `atmosphere` preset. The atmosphere
// applied at any moment is the destination stop's preset — meaning
// during `approach` you're flying into that stop's weather, during
// `hold` you're in it, during `depart` you're leaving it as the
// next approach takes over.
//
// Total cycle: ~7.5 minutes. Tightened from the v1 12-minute loop.

export const tourRoute = [
  {
    name: "The Compound",
    slug: "compound",
    longitude: -107.5800,
    latitude: 38.1380,
    atmosphere: "compoundDusk",
    approach: {
      longitude: -107.5950,
      latitude: 38.1700,
      zoom: 11.8,
      pitch: 50,
      bearing: -25,
      durationMs: 28000,
    },
    hold: {
      longitude: -107.5800,
      latitude: 38.1380,
      zoom: 14.2,
      pitch: 68,
      bearingStart: -25,
      bearingEnd: 90,
      durationMs: 60000,
    },
    depart: {
      longitude: -107.6500,
      latitude: 38.1500,
      zoom: 12,
      pitch: 50,
      bearing: 60,
      durationMs: 14000,
    },
  },
  {
    name: "Chimney Rock",
    slug: "chimney-rock",
    longitude: -107.5706,
    latitude: 38.1466,
    atmosphere: "goldenDusk",
    approach: {
      longitude: -107.5900,
      latitude: 38.1600,
      zoom: 12.5,
      pitch: 55,
      bearing: 60,
      durationMs: 24000,
    },
    hold: {
      longitude: -107.5706,
      latitude: 38.1466,
      zoom: 14.2,
      pitch: 72,
      bearingStart: 60,
      bearingEnd: 240,
      durationMs: 55000,
    },
    depart: {
      longitude: -107.6400,
      latitude: 38.1500,
      zoom: 12,
      pitch: 50,
      bearing: 270,
      durationMs: 13000,
    },
  },
  {
    name: "Ridgway",
    slug: "ridgway",
    longitude: -107.7551,
    latitude: 38.1547,
    atmosphere: "highNoonClear",
    approach: {
      longitude: -107.7300,
      latitude: 38.1900,
      zoom: 12,
      pitch: 50,
      bearing: 270,
      durationMs: 26000,
    },
    hold: {
      longitude: -107.7551,
      latitude: 38.1547,
      zoom: 14.8,
      pitch: 70,
      bearingStart: 270,
      bearingEnd: 90,
      durationMs: 55000,
    },
    depart: {
      longitude: -107.7400,
      latitude: 38.1100,
      zoom: 12.5,
      pitch: 52,
      bearing: 170,
      durationMs: 13000,
    },
  },
  {
    name: "Mt Sneffels",
    slug: "mt-sneffels",
    longitude: -107.7922,
    latitude: 38.0038,
    atmosphere: "alpenglow",
    approach: {
      longitude: -107.8100,
      latitude: 38.0400,
      zoom: 11.8,
      pitch: 55,
      bearing: 170,
      durationMs: 30000,
    },
    hold: {
      longitude: -107.7922,
      latitude: 38.0038,
      zoom: 13.4,
      pitch: 76,
      bearingStart: 170,
      bearingEnd: 350,
      durationMs: 65000,
    },
    depart: {
      longitude: -107.7400,
      latitude: 38.0100,
      zoom: 12,
      pitch: 50,
      bearing: 80,
      durationMs: 14000,
    },
  },
  {
    name: "Ouray",
    slug: "ouray",
    longitude: -107.6708,
    latitude: 38.0228,
    atmosphere: "boxCanyonShadow",
    approach: {
      longitude: -107.6900,
      latitude: 38.0500,
      zoom: 12.4,
      pitch: 55,
      bearing: 80,
      durationMs: 26000,
    },
    hold: {
      longitude: -107.6708,
      latitude: 38.0228,
      zoom: 15.0,
      pitch: 72,
      bearingStart: 80,
      bearingEnd: 260,
      durationMs: 60000,
    },
    depart: {
      longitude: -107.7100,
      latitude: 37.9900,
      zoom: 12.5,
      pitch: 50,
      bearing: 230,
      durationMs: 15000,
    },
  },
  {
    name: "Telluride",
    slug: "telluride",
    longitude: -107.8123,
    latitude: 37.9375,
    atmosphere: "alpineSnow",
    approach: {
      longitude: -107.8000,
      latitude: 37.9650,
      zoom: 12.5,
      pitch: 55,
      bearing: 230,
      durationMs: 28000,
    },
    hold: {
      longitude: -107.8123,
      latitude: 37.9375,
      zoom: 14.6,
      pitch: 70,
      bearingStart: 230,
      bearingEnd: 60,
      durationMs: 58000,
    },
    depart: {
      longitude: -107.8350,
      latitude: 37.9400,
      zoom: 12.5,
      pitch: 50,
      bearing: 250,
      durationMs: 13000,
    },
  },
  {
    name: "Mountain Village",
    slug: "mountain-village",
    longitude: -107.8561,
    latitude: 37.9356,
    atmosphere: "resortDusk",
    approach: {
      longitude: -107.8700,
      latitude: 37.9550,
      zoom: 12.5,
      pitch: 55,
      bearing: 250,
      durationMs: 25000,
    },
    hold: {
      longitude: -107.8561,
      latitude: 37.9356,
      zoom: 14.5,
      pitch: 68,
      bearingStart: 250,
      bearingEnd: 90,
      durationMs: 55000,
    },
    depart: {
      longitude: -107.7900,
      latitude: 37.9800,
      zoom: 11.8,
      pitch: 50,
      bearing: 50,
      durationMs: 16000,
    },
  },
];

// Sum total cycle time, in ms — used by the schedule UI.
export const tourCycleMs = tourRoute.reduce(
  (sum, stop) =>
    sum + stop.approach.durationMs + stop.hold.durationMs + stop.depart.durationMs,
  0
);

export const defaultCamera = viewPresets.BURROSHIP;

export const featuredLabels = [
  "Ridgway",
  "Ouray",
  "Telluride",
  "Mountain Village",
  "Mt Sneffels",
  "Chimney Rock",
  "The Compound",
  "The Burroships",
  "The StackHouse",
];

// ----- Compound beacon palette ----------------------------------
// Three metallic-glow beacons rendered just southwest of Chimney
// Rock. Each is its own location entry in locations.json with
// subcategory "compound-beacon" and a beaconColor field that maps
// to one of these.

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