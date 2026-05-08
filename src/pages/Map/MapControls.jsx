// src/pages/Map/MapControls.jsx
import { useState, useEffect, useRef } from "react";

import { viewPresets } from "../../lib/mapbox";

function MapControls({ activePreset, currentTourStop, onSelect }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [mobileOpen]);

  function handleSelect(key) {
    onSelect(key);
    setMobileOpen(false);
  }

  const presetKeys = Object.keys(viewPresets);

  return (
    <>
      {/* Desktop: vertical list, well below header */}
      <div className="hidden md:flex absolute top-32 left-6 z-10 flex-col gap-1">
        {presetKeys.map((key) => {
          const preset = viewPresets[key];
          const isActive = key === activePreset;
          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={
                "text-left px-3 py-1.5 rounded-control transition-all " +
                (isActive
                  ? "text-primary"
                  : "text-text-secondary hover:text-text-primary")
              }
            >
              <span className="font-mono-label text-[11px]">
                {preset.label}
              </span>
              {isActive && key !== "BURROSHIP" && (
                <span className="font-mono-label text-[9px] text-primary/60 ml-2">
                  ●
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile: collapsed pill button */}
      <div className="md:hidden absolute top-28 left-4 z-10" ref={panelRef}>
        {!mobileOpen && (
          <button
            onClick={() => setMobileOpen(true)}
            className="px-3 h-10 rounded-control border border-surface-edge bg-surface/80 backdrop-blur-md flex items-center gap-2 hover:border-primary/60 transition-all"
            aria-label="View options"
          >
            <span className="font-mono-label text-[10px] text-primary">
              {viewPresets[activePreset]?.label || "View"}
            </span>
            <span className="font-mono-label text-[10px] text-text-muted">▾</span>
          </button>
        )}

        {mobileOpen && (
          <div className="rounded-control border border-surface-edge bg-surface/95 backdrop-blur-md p-2 min-w-[160px]">
            {presetKeys.map((key) => {
              const preset = viewPresets[key];
              const isActive = key === activePreset;
              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={
                    "block w-full text-left px-3 py-2 rounded transition-colors " +
                    (isActive
                      ? "text-primary bg-background-deep"
                      : "text-text-secondary hover:text-text-primary")
                  }
                >
                  <span className="font-mono-label text-[11px]">
                    {preset.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default MapControls;