// src/pages/CommandCenter/data/locations.js
//
// Map markers. Cleared to a fresh start 2026-08-19. The old thirteen places included
// private and client businesses we did not want public, so they are gone and the map
// opens clean over Ridgway with no markers.
//
// The next pass fills this from the Burroship's OWN Ridgway dataset: public places we
// gather and verify ourselves (local businesses, museums, historical buildings, town
// history) served from Supabase, not hardcoded here. Exact markers only, placed on
// real coordinates. Public reference data needs no one's approval, we only reach out
// to a business when we want to connect with them directly.

export const LOCATIONS = [];

export const FEATURED_LOCATIONS = LOCATIONS.filter((l) => l.featured);

export function findLocation(slug) {
  return LOCATIONS.find((l) => l.slug === slug);
}

/* Where the camera looks by default when nothing is selected. Town center. */
export const DEFAULT_FOCUS = {
  slug: "ridgway",
  name: "Ridgway",
  longitude: -107.7551,
  latitude: 38.1547,
};
