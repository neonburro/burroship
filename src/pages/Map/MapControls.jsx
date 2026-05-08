// src/pages/Map/MapControls.jsx
import { viewPresets } from "../../lib/mapbox";

function MapControls({ activePreset, onSelect }) {
  const presetKeys = Object.keys(viewPresets);

  return (
    <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
      <p className="font-mono-label text-[10px] mb-1">VIEW</p>
      {presetKeys.map((key) => {
        const preset = viewPresets[key];
        const isActive = key === activePreset;
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={
              "group text-left px-3 py-2 rounded-control border transition-all backdrop-blur-md " +
              (isActive
                ? "border-primary bg-surface/80 signal-glow"
                : "border-surface-edge bg-surface/40 hover:border-primary/60 hover:bg-surface/70")
            }
          >
            <p
              className={
                "font-mono-label text-[11px] " +
                (isActive ? "text-primary" : "text-text-primary")
              }
            >
              {preset.label}
            </p>
            <p className="font-mono-label text-[9px] text-text-secondary mt-0.5">
              {preset.sub}
            </p>
          </button>
        );
      })}
    </div>
  );
}

export default MapControls;