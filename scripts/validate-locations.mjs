// scripts/validate-locations.mjs
//
// Validates every entry in src/data/locations.json against the
// Mapbox forward geocoder. Reports drift in meters between the
// stored coords and what Mapbox returns for the address.
//
// Usage:
//   yarn validate:locations
//
// Env:
//   VITE_MAPBOX_TOKEN — same token the app uses (read from .env)
//
// Exit codes:
//   0 — all entries within tolerance
//   1 — at least one entry exceeded the drift threshold
//
// Notes:
//   - Entries with source === "manual" are checked but never block
//     the build, since manual coords are intentional (peaks, areas,
//     in-development sites where no street address exists).
//   - Entries with source === "mapbox-geocoded" are expected to
//     match closely. If they drift > 200m, something has shifted
//     in the geocoder or someone hand-edited a value.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOCATIONS_PATH = resolve(__dirname, "../src/data/locations.json");
const TOLERANCE_METERS = 200;
const TOKEN = process.env.VITE_MAPBOX_TOKEN;

if (!TOKEN) {
  console.error("✗ VITE_MAPBOX_TOKEN missing from env");
  process.exit(1);
}

// Haversine distance in meters between two lat/lng points.
function distanceMeters(a, b) {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

async function geocode(address) {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?country=us&limit=1&access_token=" +
    TOKEN;

  const res = await fetch(url);
  if (!res.ok) throw new Error("geocode failed: " + res.status);
  const data = await res.json();
  const feature = data.features?.[0];
  if (!feature) return null;
  const [lng, lat] = feature.center;
  return { lat, lng, place: feature.place_name };
}

async function main() {
  const raw = await readFile(LOCATIONS_PATH, "utf8");
  const locations = JSON.parse(raw);

  const results = {
    pass: [],
    drift: [],
    manualOnly: [],
    failed: [],
  };

  for (const loc of locations) {
    const tag =
      "[" + (loc.source || "unknown") + "] " + loc.slug.padEnd(28);

    if (!loc.address) {
      results.manualOnly.push({ loc, reason: "no address to geocode" });
      console.log(tag + " · skipped (no address)");
      continue;
    }

    try {
      const geo = await geocode(loc.address);
      if (!geo) {
        results.failed.push({ loc, reason: "no geocoder result" });
        console.log(tag + " · ✗ no geocoder result");
        continue;
      }

      const drift = distanceMeters(
        { lat: loc.lat, lng: loc.lng },
        { lat: geo.lat, lng: geo.lng }
      );

      const driftStr = drift.toFixed(0).padStart(6) + "m";

      if (drift <= TOLERANCE_METERS) {
        results.pass.push({ loc, drift });
        console.log(tag + " · ✓ " + driftStr);
      } else if (loc.source === "manual") {
        results.manualOnly.push({ loc, drift, reason: "manual entry, drift expected" });
        console.log(tag + " · ◎ " + driftStr + " (manual, allowed)");
      } else {
        results.drift.push({ loc, drift });
        console.log(tag + " · ✗ " + driftStr + " — drift exceeds tolerance");
      }
    } catch (err) {
      results.failed.push({ loc, reason: err.message });
      console.log(tag + " · ✗ " + err.message);
    }

    // Be polite to the geocoder
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log("");
  console.log("Summary");
  console.log("  ✓ within tolerance: " + results.pass.length);
  console.log("  ◎ manual (skipped): " + results.manualOnly.length);
  console.log("  ✗ drift exceeded:   " + results.drift.length);
  console.log("  ✗ failed:           " + results.failed.length);

  if (results.drift.length > 0 || results.failed.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});