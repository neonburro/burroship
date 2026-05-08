// src/lib/mapbox.js
//
// Mapbox configuration. Token loads from env. Camera presets and
// the autonomous tour route are documented in docs/MAP_SYSTEM.md.

export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const mapboxStyle = "mapbox://styles/mapbox/dark-v11";

export const viewPresets = {
  BURROSHIP: {
    label: "The Burroship",
    longitude: -107.7551,
    latitude: 38.0900,
    zoom: 10.2,
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
};

// The autonomous tour. Five stops. Each stop has three phases:
//   approach — descending fly-in from altitude (~35-45s)
//   hold     — low-altitude orbit, bearing rotates (~75-100s)
//   depart   — rising lift-off heading toward next stop (~15-25s)
//
// Total cycle: ~12 minutes. The Burroship completes a full circuit
// roughly every 12 minutes, so a visitor can catch it at any of
// five locations within a coffee break.
//
// The schedule UI (MapSchedule.jsx) reads from this same array.

export const tourRoute = [
  {
    name: "The Compound",
    slug: "compound",
    longitude: -107.5631,
    latitude: 38.2364,
    approach: {
      longitude: -107.5631,
      latitude: 38.2900,
      zoom: 11.5,
      pitch: 50,
      bearing: -25,
      durationMs: 38000,
    },
    hold: {
      longitude: -107.5631,
      latitude: 38.2364,
      zoom: 14.5,
      pitch: 68,
      bearingStart: -25,
      bearingEnd: 90,
      durationMs: 95000,
    },
    depart: {
      longitude: -107.6500,
      latitude: 38.2200,
      zoom: 12,
      pitch: 50,
      bearing: 60,
      durationMs: 18000,
    },
  },
  {
    name: "Ridgway",
    slug: "ridgway",
    longitude: -107.7551,
    latitude: 38.1547,
    approach: {
      longitude: -107.7300,
      latitude: 38.1900,
      zoom: 12,
      pitch: 50,
      bearing: 60,
      durationMs: 35000,
    },
    hold: {
      longitude: -107.7551,
      latitude: 38.1547,
      zoom: 14.8,
      pitch: 70,
      bearingStart: 60,
      bearingEnd: 200,
      durationMs: 90000,
    },
    depart: {
      longitude: -107.7400,
      latitude: 38.1100,
      zoom: 12.5,
      pitch: 52,
      bearing: 170,
      durationMs: 16000,
    },
  },
  {
    name: "Ouray",
    slug: "ouray",
    longitude: -107.6708,
    latitude: 38.0228,
    approach: {
      longitude: -107.6900,
      latitude: 38.0500,
      zoom: 12,
      pitch: 52,
      bearing: 170,
      durationMs: 36000,
    },
    hold: {
      longitude: -107.6708,
      latitude: 38.0228,
      zoom: 15.0,
      pitch: 72,
      bearingStart: 170,
      bearingEnd: 320,
      durationMs: 100000,
    },
    depart: {
      longitude: -107.7100,
      latitude: 37.9900,
      zoom: 12.5,
      pitch: 50,
      bearing: 250,
      durationMs: 20000,
    },
  },
  {
    name: "Telluride",
    slug: "telluride",
    longitude: -107.8123,
    latitude: 37.9375,
    approach: {
      longitude: -107.8000,
      latitude: 37.9650,
      zoom: 12,
      pitch: 52,
      bearing: 250,
      durationMs: 42000,
    },
    hold: {
      longitude: -107.8123,
      latitude: 37.9375,
      zoom: 14.6,
      pitch: 70,
      bearingStart: 250,
      bearingEnd: 50,
      durationMs: 90000,
    },
    depart: {
      longitude: -107.7600,
      latitude: 38.0000,
      zoom: 12,
      pitch: 50,
      bearing: 30,
      durationMs: 22000,
    },
  },
  {
    name: "Chimney Rock",
    slug: "chimney-rock",
    longitude: -107.5631,
    latitude: 38.2364,
    approach: {
      longitude: -107.6200,
      latitude: 38.2700,
      zoom: 11.8,
      pitch: 50,
      bearing: 80,
      durationMs: 40000,
    },
    hold: {
      longitude: -107.5631,
      latitude: 38.2364,
      zoom: 14.2,
      pitch: 65,
      bearingStart: 80,
      bearingEnd: 270,
      durationMs: 80000,
    },
    depart: {
      longitude: -107.5631,
      latitude: 38.2700,
      zoom: 11.5,
      pitch: 50,
      bearing: 320,
      durationMs: 18000,
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
  "Montrose",
  "Chimney Rock",
];