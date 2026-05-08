// src/pages/Map/Map.jsx
import MapWorld from "./MapWorld";

function Map() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center">
      <MapWorld />
      <div className="relative z-10 text-center px-6">
        <p className="font-mono-label mb-4">SECTION 003 / MAP</p>
        <h1 className="text-3xl md:text-5xl font-medium text-text-primary mb-4" style={{ lineHeight: 1.1 }}>
          The world below.
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          Mapbox integration arrives in the next batch.
        </p>
      </div>
    </section>
  );
}

export default Map;