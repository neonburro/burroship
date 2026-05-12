// src/lib/burroship.js
//
// World data layer. Pulls from Supabase, falls back to local data.
// Tour route now uses a continuous-corridor format: an array of
// waypoints, each flown to from the previous over duration_to_next_ms.

import { burroshipSupabase, supabaseReady } from "./burroshipSupabase";

export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
export const cesiumIonToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

// ----- Atmosphere presets ---------------------------------------

export const atmospherePresets = {
  alpenglow: {
    lightPreset: "dawn",
    exaggeration: 1.4,
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
    exaggeration: 1.3,
    fogDensity: 0.00018,
    weather: null,
  },
  boxCanyonShadow: {
    lightPreset: "dusk",
    exaggeration: 1.4,
    fogDensity: 0.00025,
    weather: null,
  },
  alpineSnow: {
    lightPreset: "day",
    exaggeration: 1.3,
    fogDensity: 0.0002,
    weather: { type: "snow", intensity: 0.3 },
  },
  resortDusk: {
    lightPreset: "dusk",
    exaggeration: 1.3,
    fogDensity: 0.0002,
    weather: { type: "snow", intensity: 0.15 },
  },
  compoundDusk: {
    lightPreset: "dusk",
    exaggeration: 1.4,
    fogDensity: 0.00022,
    weather: null,
  },
  compoundNight: {
    lightPreset: "night",
    exaggeration: 1.4,
    fogDensity: 0.0004,
    weather: null,
  },
};

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

// ----- San Juans bounding box -----------------------------------

export const burroshipBounds = {
  west: -108.0,
  east: -107.3,
  south: 37.85,
  north: 38.30,
  minAltitude: 1500,
  maxAltitude: 8500,
};

// ----- Default landing camera -----------------------------------
// Land at the first waypoint of the corridor — Ridgway at 4570m
// (15,000ft) heading south. Same altitude as the entire loop.

export const defaultCamera = {
  longitude: -107.7551,
  latitude: 38.1547,
  altitude: 4570,
  pitch: -22,
  heading: 175,
};

// ----- Local fallback data --------------------------------------

const FALLBACK_LOCATIONS = [
  { slug: "burroships", name: "The Burroships", category: "hq", subcategory: "compound-beacon", beacon_color: "bronze", status: "live", longitude: -107.5800, latitude: 38.1380, elevation_m: 2350, blurb: "Loading bay and staging ground for visiting burros. Cargo in, cargo out, water and shade for the journey.", tags: ["compound","staging","logistics"], featured: true },
  { slug: "stackhouse", name: "The StackHouse", category: "hq", subcategory: "compound-beacon", beacon_color: "lantern", status: "live", longitude: -107.5760, latitude: 38.1425, elevation_m: 2480, blurb: "Where the thinking gets done. Strategy, research, and the long view from the upper ridge.", tags: ["compound","strategy","research"], featured: true },
  { slug: "compound", name: "The Compound", category: "hq", subcategory: "compound-beacon", beacon_color: "steel", status: "in-development", longitude: -107.5895, latitude: 38.1335, elevation_m: 2280, blurb: "Entrance, lodging, and the long-view fun zone. Hot spring lazy river and Geoship bioceramic domes coming online.", tags: ["compound","entrance","lodging","in-development"], featured: true },
  { slug: "chimney-rock", name: "Chimney Rock", category: "landmark", longitude: -107.5706, latitude: 38.1466, elevation_m: 3590, blurb: "Sandstone monolith on the Cimarron skyline. True Grit backdrop.", tags: ["mountain","outdoor","landmark","cinema-history"], featured: true, status: "live" },
  { slug: "ridgway", name: "Ridgway", category: "landmark", longitude: -107.7551, latitude: 38.1547, elevation_m: 2080, blurb: "True Grit town. Trains and rivers and the brewery.", tags: ["town"], featured: true, status: "live" },
  { slug: "mt-sneffels", name: "Mt Sneffels", category: "landmark", longitude: -107.7922, latitude: 38.0038, elevation_m: 4313, blurb: "14,158-ft peak in the San Juans. The crown of the range.", tags: ["mountain","14er","outdoor","landmark"], featured: true, status: "live" },
  { slug: "ouray", name: "Ouray", category: "landmark", longitude: -107.6708, latitude: 38.0228, elevation_m: 2380, blurb: "Switzerland of America. Box canyon and hot springs.", tags: ["town"], featured: true, status: "live" },
  { slug: "telluride", name: "Telluride", category: "landmark", longitude: -107.8123, latitude: 37.9375, elevation_m: 2670, blurb: "Free gondola, free spirit. Mountain town with a famous box canyon.", tags: ["town","ski"], featured: true, status: "live" },
  { slug: "mountain-village", name: "Mountain Village", category: "landmark", longitude: -107.8561, latitude: 37.9356, elevation_m: 2910, blurb: "Resort village above Telluride at 9,545 ft. Gondola-connected.", tags: ["resort","outdoor","landmark"], featured: true, status: "live" },
];

const FALLBACK_AIRSHIPS = [
  { slug: "the-burroship", name: "The Burroship", description: "The lantern. Slow cruise over the San Juans.", cruising_altitude_m: 4570, cruising_speed_kmh: 25, beacon_color: "#A8D055", active: true },
];

const FALLBACK_TOUR_ROUTE = {
  slug: "san-juans-default",
  name: "San Juans Corridor",
  is_default: true,
  stops: [
    { waypoint: { longitude: -107.7551, latitude: 38.1547, altitude: 4570, pitch: -22, heading: 175 }, duration_to_next_ms: 60000, location_slug: "ridgway", atmosphere: "highNoonClear", label: "Ridgway" },
    { waypoint: { longitude: -107.7300, latitude: 38.0900, altitude: 4570, pitch: -22, heading: 175 }, duration_to_next_ms: 50000, location_slug: "ridgway", atmosphere: "goldenDusk", label: "Hwy 550 South" },
    { waypoint: { longitude: -107.6708, latitude: 38.0228, altitude: 4570, pitch: -22, heading: 220 }, duration_to_next_ms: 55000, location_slug: "ouray", atmosphere: "boxCanyonShadow", label: "Ouray" },
    { waypoint: { longitude: -107.7300, latitude: 38.0100, altitude: 4570, pitch: -18, heading: 240 }, duration_to_next_ms: 50000, location_slug: "ouray", atmosphere: "alpenglow", label: "Sneffels Approach" },
    { waypoint: { longitude: -107.7922, latitude: 38.0038, altitude: 4570, pitch: -10, heading: 230 }, duration_to_next_ms: 45000, location_slug: "mt-sneffels", atmosphere: "alpenglow", label: "Mt Sneffels" },
    { waypoint: { longitude: -107.8400, latitude: 37.9700, altitude: 4570, pitch: -22, heading: 210 }, duration_to_next_ms: 45000, location_slug: "telluride", atmosphere: "alpineSnow", label: "Telluride Approach" },
    { waypoint: { longitude: -107.8123, latitude: 37.9375, altitude: 4570, pitch: -22, heading: 90 }, duration_to_next_ms: 50000, location_slug: "telluride", atmosphere: "alpineSnow", label: "Telluride" },
    { waypoint: { longitude: -107.8561, latitude: 37.9356, altitude: 4570, pitch: -22, heading: 350 }, duration_to_next_ms: 55000, location_slug: "mountain-village", atmosphere: "resortDusk", label: "Mountain Village" },
    { waypoint: { longitude: -107.8800, latitude: 38.0400, altitude: 4570, pitch: -22, heading: 30 }, duration_to_next_ms: 55000, location_slug: "ridgway", atmosphere: "goldenDusk", label: "Uncompahgre Plateau" },
    { waypoint: { longitude: -107.8200, latitude: 38.1300, altitude: 4570, pitch: -22, heading: 60 }, duration_to_next_ms: 50000, location_slug: "ridgway", atmosphere: "highNoonClear", label: "Ridgway Approach" },
  ],
};

// ----- Fetchers --------------------------------------------------

export async function fetchLocations() {
  if (!supabaseReady) return FALLBACK_LOCATIONS;
  const { data, error } = await burroshipSupabase
    .from("world_locations")
    .select("*")
    .eq("visibility", "public")
    .order("featured", { ascending: false });
  if (error || !data || data.length === 0) {
    console.warn("Locations fetch failed, using fallback", error?.message);
    return FALLBACK_LOCATIONS;
  }
  return data;
}

export async function fetchAirships() {
  if (!supabaseReady) return FALLBACK_AIRSHIPS;
  const { data, error } = await burroshipSupabase
    .from("world_airships")
    .select("*")
    .eq("active", true)
    .order("name");
  if (error || !data || data.length === 0) {
    console.warn("Airships fetch failed, using fallback", error?.message);
    return FALLBACK_AIRSHIPS;
  }
  return data;
}

export async function fetchTourRoutes() {
  if (!supabaseReady) return [FALLBACK_TOUR_ROUTE];
  const { data, error } = await burroshipSupabase
    .from("tour_routes")
    .select("*")
    .eq("active", true)
    .order("is_default", { ascending: false });
  if (error || !data || data.length === 0) {
    console.warn("Tour routes fetch failed, using fallback", error?.message);
    return [FALLBACK_TOUR_ROUTE];
  }
  return data;
}

// Resolve a tour route's stops to include resolved location data.
// For the corridor format, each stop has location_slug; we attach the
// actual location record so the schedule UI can show town names + blurbs.

export function hydrateTourStops(routeStops, locations) {
  const bySlug = new Map(locations.map((l) => [l.slug, l]));
  return routeStops.map((stop) => ({
    ...stop,
    location: bySlug.get(stop.location_slug) || null,
    name: stop.label || bySlug.get(stop.location_slug)?.name || stop.location_slug,
  }));
}