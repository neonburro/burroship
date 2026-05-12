// src/pages/BurroshipMap/shared/LocationPanel.jsx
//
// Slide-in detail panel triggered by clicking a beacon. Shows full
// location detail from Supabase. Doesn't pause the tour — the airship
// keeps flying while the user reads.

import { useEffect } from "react";

import { compoundBeaconColors } from "../../../lib/burroship";

function LocationPanel({ location, onClose }) {
  // Escape closes panel
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (location) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [location, onClose]);

  if (!location) return null;

  const isBeacon = location.subcategory === "compound-beacon";
  const palette = isBeacon
    ? compoundBeaconColors[location.beacon_color]
    : null;
  const accent = palette?.base || "#A8D055";
  const isInDev = location.status === "in-development";
  const hasSplat = !!location.splat_asset_id;

  return (
    <div className="absolute top-0 right-0 bottom-0 z-30 w-full md:w-[400px] pointer-events-none">
      <div
        className="absolute inset-0 bg-background-deep/90 backdrop-blur-md border-l border-surface-edge p-6 overflow-y-auto pointer-events-auto"
        style={{
          animation: "burroship-slide-in 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: accent, boxShadow: "0 0 8px " + accent }}
            />
            <p
              className="font-mono-label text-[10px]"
              style={{ color: accent }}
            >
              {isBeacon
                ? "COMPOUND · " + (location.beacon_color?.toUpperCase() || "")
                : location.category?.toUpperCase() || ""}
            </p>
            {isInDev && (
              <span className="font-mono-label text-[9px] px-2 py-0.5 rounded-pill border border-primary/40 text-primary bg-primary/10">
                IN DEV
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close"
          >
            <span className="font-mono-label text-xs">✕</span>
          </button>
        </div>

        <h2 className="text-2xl font-medium text-text-primary mb-2">
          {location.name}
        </h2>

        {location.city && (
          <p className="font-mono-label text-[10px] text-text-muted mb-4">
            {location.city.toUpperCase()}
            {location.elevation_m
              ? " · " + Math.round(location.elevation_m).toLocaleString() + " M"
              : ""}
          </p>
        )}

        {location.blurb && (
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            {location.blurb}
          </p>
        )}

        {location.address && (
          <div className="mb-6">
            <p className="font-mono-label text-[9px] text-text-muted mb-1">
              ADDRESS
            </p>
            <p className="text-text-secondary text-sm">{location.address}</p>
          </div>
        )}

        <div className="mb-6">
          <p className="font-mono-label text-[9px] text-text-muted mb-1">
            COORDINATES
          </p>
          <p className="font-mono-label text-[10px] text-text-secondary">
            {location.latitude.toFixed(5)}° N · {Math.abs(location.longitude).toFixed(5)}° W
          </p>
        </div>

        {hasSplat ? (
          <div className="mb-6 rounded-card border border-surface-edge p-3 bg-surface/40">
            <p className="font-mono-label text-[9px] text-primary mb-1">
              ◉ SPLAT AVAILABLE
            </p>
            <p className="font-mono-label text-[10px] text-text-secondary">
              Asset {location.splat_asset_id} · streaming
            </p>
          </div>
        ) : (
          <div className="mb-6 rounded-card border border-surface-edge/40 border-dashed p-3">
            <p className="font-mono-label text-[9px] text-text-muted">
              ○ NO SPLAT YET
            </p>
          </div>
        )}

        {location.tags && location.tags.length > 0 && (
          <div className="mb-6">
            <p className="font-mono-label text-[9px] text-text-muted mb-2">
              TAGS
            </p>
            <div className="flex flex-wrap gap-1.5">
              {location.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-label text-[9px] px-2 py-0.5 rounded-pill border border-surface-edge text-text-secondary"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {location.body_markdown && (
          <div className="mb-6">
            <p className="font-mono-label text-[9px] text-text-muted mb-2">
              DETAIL
            </p>
            <div className="text-text-secondary text-sm whitespace-pre-wrap leading-relaxed">
              {location.body_markdown}
            </div>
          </div>
        )}

        {location.links && Object.keys(location.links).length > 0 && (
          <div className="mb-6 border-t border-surface-edge pt-4">
            <p className="font-mono-label text-[9px] text-text-muted mb-2">
              LINKS
            </p>
            <div className="flex flex-col gap-1">
              {Object.entries(location.links).map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-label text-[10px] text-text-secondary hover:text-primary transition-colors"
                >
                  {key.toUpperCase()} →
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationPanel;