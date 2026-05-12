// src/pages/BurroshipMap/BurroshipMap.jsx
import { useEffect, useState } from "react";

import {
  fetchLocations,
  fetchAirships,
  fetchTourRoutes,
  hydrateTourStops,
} from "../../lib/burroship";

import CesiumWorld from "./cesium/CesiumWorld";
import AirshipControls from "./shared/AirshipControls";
import LocationPanel from "./shared/LocationPanel";

function BurroshipMap() {
  const [locations, setLocations] = useState(null);
  const [airships, setAirships] = useState(null);
  const [tourRoutes, setTourRoutes] = useState(null);
  const [activeRouteSlug, setActiveRouteSlug] = useState(null);
  const [activeAirshipSlug, setActiveAirshipSlug] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [tourPaused, setTourPaused] = useState(false);

  // Fetch everything in parallel
  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchLocations(), fetchAirships(), fetchTourRoutes()]).then(
      ([locs, ships, routes]) => {
        if (cancelled) return;
        setLocations(locs);
        setAirships(ships);
        setTourRoutes(routes);
        const defaultRoute = routes.find((r) => r.is_default) || routes[0];
        setActiveRouteSlug(defaultRoute?.slug);
        setActiveAirshipSlug(ships[0]?.slug);
      }
    );
    return () => { cancelled = true; };
  }, []);

  const loading = !locations || !airships || !tourRoutes;
  const activeRoute = tourRoutes?.find((r) => r.slug === activeRouteSlug);
  const hydratedStops = activeRoute && locations
    ? hydrateTourStops(activeRoute.stops, locations)
    : null;

  return (
    <section className="relative w-full h-[calc(100vh-5rem)] bg-background-deep overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <p className="font-mono-label text-text-secondary animate-pulse">
            BURROSHIP · BOARDING
          </p>
        </div>
      )}

      {!loading && (
        <CesiumWorld
          locations={locations}
          tourStops={hydratedStops}
          tourPaused={tourPaused}
          onSelectLocation={setSelectedLocation}
        />
      )}

      {!loading && (
        <AirshipControls
          airships={airships}
          tourRoutes={tourRoutes}
          activeAirshipSlug={activeAirshipSlug}
          activeRouteSlug={activeRouteSlug}
          tourPaused={tourPaused}
          onAirshipChange={setActiveAirshipSlug}
          onRouteChange={setActiveRouteSlug}
          onPauseToggle={() => setTourPaused((p) => !p)}
        />
      )}

      <LocationPanel
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />

      <div className="absolute top-6 right-6 z-10 pointer-events-none text-right">
        <p className="font-mono-label text-[10px] mb-1 text-text-secondary">
          SECTION 003 / WORLD
        </p>
        <p className="font-mono-label text-text-primary">
          RIDGWAY · SAN JUAN MOUNTAINS
        </p>
      </div>
    </section>
  );
}

export default BurroshipMap;