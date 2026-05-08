// scripts/geocode-locations.mjs
//
// One-time geocoding script. Reads src/data/locations.json,
// finds entries with null lat/lng, queries Mapbox forward
// geocoding, writes results back. Backs up original first.
//
// Usage:
//   node scripts/geocode-locations.mjs
//
// Requires VITE_MAPBOX_TOKEN in .env (already set).

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const locationsPath = path.join(repoRoot, "src/data/locations.json");
const backupPath = path.join(repoRoot, "src/data/locations.original.json");
const envPath = path.join(repoRoot, ".env");

async function loadEnv() {
  const raw = await fs.readFile(envPath, "utf8");
  const match = raw.match(/^VITE_MAPBOX_TOKEN=(.+)$/m);
  if (!match) throw new Error("VITE_MAPBOX_TOKEN not found in .env");
  return match[1].trim();
}

async function geocode(query, token) {
  const encoded = encodeURIComponent(query);
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encoded +
    ".json?access_token=" +
    token +
    "&country=us&limit=1&proximity=-107.7551,38.1547";

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Mapbox " + res.status + " for query: " + query);
  }
  const data = await res.json();
  if (!data.features || data.features.length === 0) {
    return null;
  }
  const [lng, lat] = data.features[0].center;
  return { lat, lng, mapboxId: data.features[0].id };
}

async function main() {
  const token = await loadEnv();
  const raw = await fs.readFile(locationsPath, "utf8");
  const locations = JSON.parse(raw);

  // Backup original (only on first run)
  try {
    await fs.access(backupPath);
    console.log("Backup exists at locations.original.json (skipping)");
  } catch {
    await fs.writeFile(backupPath, raw);
    console.log("Backed up to locations.original.json");
  }

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const loc of locations) {
    if (loc.lat != null && loc.lng != null) {
      console.log("[skip] " + loc.slug + " already has coordinates");
      skipped++;
      continue;
    }
    const query = loc.address || (loc.name + ", " + loc.city + ", CO");
    try {
      const result = await geocode(query, token);
      if (!result) {
        console.log("[fail] no result for " + loc.slug + " (" + query + ")");
        failed++;
        continue;
      }
      loc.lat = result.lat;
      loc.lng = result.lng;
      loc.source = "mapbox-geocoded";
      console.log(
        "[ok]   " + loc.slug + " → " + result.lat.toFixed(5) + ", " + result.lng.toFixed(5)
      );
      updated++;
      // Be a good citizen: small delay
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.log("[fail] " + loc.slug + ": " + err.message);
      failed++;
    }
  }

  await fs.writeFile(locationsPath, JSON.stringify(locations, null, 2) + "\n");
  console.log("\n" + updated + " updated, " + skipped + " skipped, " + failed + " failed.");
  console.log("Wrote: " + locationsPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});