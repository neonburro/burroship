// src/lib/burroship.js
//
// The world data layer. Pulls locations, airships, and tour routes
// from Supabase. Falls back to hardcoded defaults if Supabase is
// unreachable, so the map never breaks just because the DB is down.

import { burroshipSupabase, supabaseReady } from "./burroshipSupabase";

// ----- Tokens ----------------------------------------------------

export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
export const cesiumIonToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

// ----- Atmosphere presets ---------------------------------------
// Each tour stop names one of these. Engine reads the preset and
// drives Cesium's lighting, fog, and weather accordingly.

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
// Cesium camera constraints — keep the user inside our world.

export const burroshipBounds = {
  west: -108.0,
  east: -107.3,
  south: 37.85,
  north: 38.30,
  minAltitude: 1500,
  maxAltitude: 8500,
};

// ----- Default landing camera -----------------------------------
// First frame the user sees. Mid-altitude over the Compound area
// at airship cruise, looking south at the beacons.

export const defaultCamera = {
  longitude: -107.5850,
  latitude: 38.1500,
  altitude: 3500,
  pitch: -25,
  heading: 200,
};

// ----- Local fallback data --------------------------------------
// Used if Supabase is unreachable. Mirrors the seed data in the
// migration so the map renders something useful even offline.

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
  { slug: "the-burroship", name: "The Burroship", description: "The lantern. Slow cruise over the San Juans.", cruising_altitude_m: 3000, cruising_speed_kmh: 25, beacon_color: "#A8D055", active: true },
];

const FALLBACK_TOUR_ROUTE = {
  slug: "san-juans-default",
  name: "San Juans Default",
  is_default: true,
  stops: [
    {
      location_slug: "compound", atmosphere: "compoundDusk",
      approach: { longitude: -107.5850, latitude: 38.1500, altitude: 3200, pitch: -25, heading: 200, durationMs: 40000 },
      hold: { longitude: -107.5800, latitude: 38.1380, altitude: 2800, pitch: -22, headingStart: 200, headingEnd: 230, durationMs: 35000 },
      depart: { longitude: -107.5720, latitude: 38.1430, altitude: 3000, pitch: -25, heading: 50, durationMs: 20000 },
    },
    {
      location_slug: "chimney-rock", atmosphere: "goldenDusk",
      approach: { longitude: -107.5750, latitude: 38.1480, altitude: 3500, pitch: -25, heading: 50, durationMs: 35000 },
      hold: { longitude: -107.5706, latitude: 38.1466, altitude: 3700, pitch: -18, headingStart: 50, headingEnd: 70, durationMs: 35000 },
      depart: { longitude: -107.6400, latitude: 38.1500, altitude: 3400, pitch: -25, heading: 270, durationMs: 25000 },
    },
    {
      location_slug: "ridgway", atmosphere: "highNoonClear",
      approach: { longitude: -107.7300, latitude: 38.1700, altitude: 3200, pitch: -25, heading: 240, durationMs: 35000 },
      hold: { longitude: -107.7551, latitude: 38.1547, altitude: 2900, pitch: -28, headingStart: 240, headingEnd: 260, durationMs: 35000 },
      depart: { longitude: -107.7400, latitude: 38.1100, altitude: 3100, pitch: -25, heading: 180, durationMs: 25000 },
    },
    {
      location_slug: "mt-sneffels", atmosphere: "alpenglow",
      approach: { longitude: -107.7900, latitude: 38.0400, altitude: 4500, pitch: -22, heading: 180, durationMs: 40000 },
      hold: { longitude: -107.7922, latitude: 38.0038, altitude: 4900, pitch: -10, headingStart: 180, headingEnd: 210, durationMs: 40000 },
      depart: { longitude: -107.7400, latitude: 38.0100, altitude: 4000, pitch: -25, heading: 90, durationMs: 25000 },
    },
    {
      location_slug: "ouray", atmosphere: "boxCanyonShadow",
      approach: { longitude: -107.6900, latitude: 38.0400, altitude: 3500, pitch: -25, heading: 90, durationMs: 30000 },
      hold: { longitude: -107.6708, latitude: 38.0228, altitude: 3000, pitch: -28, headingStart: 90, headingEnd: 120, durationMs: 35000 },
      depart: { longitude: -107.7100, latitude: 37.9900, altitude: 3200, pitch: -25, heading: 220, durationMs: 25000 },
    },
    {
      location_slug: "telluride", atmosphere: "alpineSnow",
      approach: { longitude: -107.8000, latitude: 37.9550, altitude: 3400, pitch: -25, heading: 220, durationMs: 35000 },
      hold: { longitude: -107.8123, latitude: 37.9375, altitude: 3100, pitch: -28, headingStart: 220, headingEnd: 250, durationMs: 35000 },
      depart: { longitude: -107.8350, latitude: 37.9400, altitude: 3300, pitch: -25, heading: 250, durationMs: 25000 },
    },
    {
      location_slug: "mountain-village", atmosphere: "resortDusk",
      approach: { longitude: -107.8700, latitude: 37.9450, altitude: 3400, pitch: -25, heading: 250, durationMs: 30000 },
      hold: { longitude: -107.8561, latitude: 37.9356, altitude: 3200, pitch: -28, headingStart: 250, headingEnd: 80, durationMs: 35000 },
      depart: { longitude: -107.7900, latitude: 37.9800, altitude: 3500, pitch: -25, heading: 60, durationMs: 30000 },
    },
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
// The stops jsonb references locations by slug; we hydrate them with
// the actual location records so the tour engine has everything it
// needs in one shape.

export function hydrateTourStops(routeStops, locations) {
  const bySlug = new Map(locations.map((l) => [l.slug, l]));
  return routeStops.map((stop) => ({
    ...stop,
    location: bySlug.get(stop.location_slug) || null,
    name: bySlug.get(stop.location_slug)?.name || stop.location_slug,
  }));
}