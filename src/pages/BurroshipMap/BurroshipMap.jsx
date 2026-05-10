// src/pages/BurroshipMap/BurroshipMap.jsx
//
// NOTE: Cesium engine integration was scaffolded but parked — Vite +
// Cesium 1.130 + zip.js have unresolved bundling conflicts that need
// a separate session to work through (likely via CDN loading or
// an alternative bundler approach). The cesium/ folder remains for
// future work; the import is currently disabled below.
import MapboxWorld from "./mapbox/MapboxWorld";

// Cesium import disabled — see note above
// import { useState, lazy, Suspense } from "react";
// import { ENGINES, DEFAULT_ENGINE } from "../../lib/burroship";
// import EngineToggle from "./shared/EngineToggle";
// const CesiumWorld = lazy(() => import("./cesium/CesiumWorld"));

function BurroshipMap() {
  return (
    <section className="relative w-full h-[calc(100vh-5rem)] bg-background-deep">
      <MapboxWorld />

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