// src/pages/BurroshipMap/shared/AirshipControls.jsx
//
// Bottom-right control panel. Airship picker, tour route picker,
// pause/resume. Future: piloting controls (altitude up/down, yaw,
// pitch nudge, return to autopilot).

import { useState, useEffect, useRef } from "react";

function AirshipControls({
  airships,
  tourRoutes,
  activeAirshipSlug,
  activeRouteSlug,
  tourPaused,
  onAirshipChange,
  onRouteChange,
  onPauseToggle,
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  const activeAirship = airships.find((a) => a.slug === activeAirshipSlug);
  const activeRoute = tourRoutes.find((r) => r.slug === activeRouteSlug);

  return (
    <div
      ref={panelRef}
      className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-2"
    >
      {open && (
        <div className="rounded-card border border-surface-edge bg-surface/90 backdrop-blur-md p-4 min-w-[260px] mb-2">
          <p className="font-mono-label text-[9px] mb-3 text-text-muted">
            AIRSHIP CONTROLS
          </p>

          {airships.length > 1 && (
            <div className="mb-4">
              <p className="font-mono-label text-[9px] text-text-muted mb-2">
                AIRSHIP
              </p>
              <div className="flex flex-col gap-1">
                {airships.map((a) => (
                  <button
                    key={a.slug}
                    onClick={() => onAirshipChange(a.slug)}
                    className={
                      "text-left px-3 py-1.5 rounded-control transition-all " +
                      (a.slug === activeAirshipSlug
                        ? "text-primary bg-background-deep"
                        : "text-text-secondary hover:text-text-primary")
                    }
                  >
                    <span className="font-mono-label text-[10px]">{a.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tourRoutes.length > 1 && (
            <div className="mb-4">
              <p className="font-mono-label text-[9px] text-text-muted mb-2">
                TOUR
              </p>
              <div className="flex flex-col gap-1">
                {tourRoutes.map((r) => (
                  <button
                    key={r.slug}
                    onClick={() => onRouteChange(r.slug)}
                    className={
                      "text-left px-3 py-1.5 rounded-control transition-all " +
                      (r.slug === activeRouteSlug
                        ? "text-primary bg-background-deep"
                        : "text-text-secondary hover:text-text-primary")
                    }
                  >
                    <span className="font-mono-label text-[10px]">{r.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onPauseToggle}
            className="w-full px-3 py-2 rounded-control border border-surface-edge text-text-primary hover:border-primary/60 transition-all"
          >
            <span className="font-mono-label text-[10px]">
              {tourPaused ? "RESUME" : "PAUSE"}
            </span>
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-control border border-surface-edge bg-surface/90 backdrop-blur-md px-4 h-10 flex items-center gap-2 hover:border-primary/60 transition-all"
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: activeAirship?.beacon_color || "#A8D055",
            boxShadow: "0 0 8px " + (activeAirship?.beacon_color || "#A8D055"),
          }}
        />
        <span className="font-mono-label text-[10px] text-text-primary">
          {activeAirship?.name || "AIRSHIP"}
        </span>
        <span className="font-mono-label text-[9px] text-text-muted">
          {tourPaused ? "· PAUSED" : open ? "▾" : "▴"}
        </span>
      </button>
    </div>
  );
}

export default AirshipControls;