// src/pages/BurroshipMap/mapbox/mapboxConfig.js
//
// Mapbox-specific config. Style URL, label suppression, build-time
// settings. Shared tour data comes from lib/burroship.js.

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