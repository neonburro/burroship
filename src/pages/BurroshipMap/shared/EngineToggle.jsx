// src/pages/BurroshipMap/shared/EngineToggle.jsx
import { ENGINES } from "../../../lib/burroship";

function EngineToggle({ engine, onChange }) {
  return (
    <div className="absolute top-32 right-6 z-10 hidden md:flex flex-col gap-1 items-end">
      <p className="font-mono-label text-[9px] text-text-muted mb-1">
        ENGINE
      </p>
      <div className="rounded-control border border-surface-edge bg-surface/80 backdrop-blur-md p-1 flex gap-1">
        <button
          onClick={() => onChange(ENGINES.MAPBOX)}
          className={
            "px-3 py-1.5 rounded transition-all " +
            (engine === ENGINES.MAPBOX
              ? "bg-primary/10 text-primary"
              : "text-text-secondary hover:text-text-primary")
          }
        >
          <span className="font-mono-label text-[10px]">STYLIZED</span>
        </button>
        <button
          onClick={() => onChange(ENGINES.CESIUM)}
          className={
            "px-3 py-1.5 rounded transition-all " +
            (engine === ENGINES.CESIUM
              ? "bg-primary/10 text-primary"
              : "text-text-secondary hover:text-text-primary")
          }
        >
          <span className="font-mono-label text-[10px]">PHOTOREAL</span>
        </button>
      </div>
    </div>
  );
}

export default EngineToggle;