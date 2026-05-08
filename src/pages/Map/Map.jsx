// src/pages/Map/Map.jsx
import MapWorld from "./MapWorld";

function Map() {
  return (
    <section className="relative w-full h-[calc(100vh-5rem)] bg-background-deep">
      <MapWorld />

      <div className="absolute top-6 right-6 z-10 pointer-events-none text-right">
        <p className="font-mono-label text-[10px] mb-1 text-text-secondary">
          SECTION 003 / MAP
        </p>
        <p className="font-mono-label text-text-primary">
          RIDGWAY · SAN JUAN MOUNTAINS
        </p>
      </div>
    </section>
  );
}

export default Map;