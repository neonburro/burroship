// src/pages/CommandCenter/CommandCenter.jsx
//
// The /world/ route. Full-bleed Mapbox experience. The home port
// of the active dome. Phase 1: foundation only.
 
import MapCanvas from "./map/MapCanvas";
 
function CommandCenter() {
  return (
    <main
      id="main"
      className="fixed inset-0"
      style={{ background: "var(--color-dark-bg)" }}
    >
      <MapCanvas />
    </main>
  );
}
 
export default CommandCenter;
