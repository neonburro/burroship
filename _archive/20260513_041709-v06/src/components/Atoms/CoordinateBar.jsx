// src/components/Atoms/CoordinateBar.jsx
//
// The signature Burroship instrumentation strip. Pinned at the
// bottom of the viewport above any page footer. Quiet, mono, thin.
// Feels like instrumentation, not chrome.
//
// modes:
//   home-port — static, default home page values
//   cesium    — wired to live camera position (set via setData)
//   town      — wired to current map focus
//   static    — pass coords directly
//
// 1-in-10 page loads, one field swaps to an Easter egg status:
//   "Altitude nominal" / "Scanning Ridgway basin" / "Warping
//   automation routes" — per designer note.
 
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
 
const HOME_PORT = {
  name: "The Burroship",
  lat: "38.155° N",
  lng: "107.755° W",
  altitude: "18,000 ft",
  region: "San Juan Mountains",
};
 
const EASTER_EGGS = [
  "Altitude nominal",
  "Scanning Ridgway basin",
  "Warping automation routes",
  "Council is awake",
  "Compound is in view",
  "Cruising the Cimarron",
  "Splat library indexing",
  "Lantern green is on",
];
 
function CoordinateBar({ mode = "home-port", data = null, onDark = false }) {
  const location = useLocation();
  const [eggIndex, setEggIndex] = useState(null);
 
  // On mount or route change, roll the dice on an Easter egg
  useEffect(() => {
    const shouldShowEgg = Math.random() < 0.1;
    if (shouldShowEgg) {
      const idx = Math.floor(Math.random() * EASTER_EGGS.length);
      setEggIndex(idx);
    } else {
      setEggIndex(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
 
  // On Cesium route, we'd wire in live data via the data prop. For
  // now, all routes show home-port values unless data is provided.
  const source = data || HOME_PORT;
 
  const onWorld = location.pathname.startsWith("/world");
 
  const fields = [
    { label: "Vessel", value: source.name },
    { label: "Lat", value: source.lat },
    { label: "Lng", value: source.lng },
    { label: "Altitude", value: source.altitude },
    { label: "Region", value: source.region },
  ];
 
  // If Easter egg fires, replace one random field with the status
  // message — but only on non-cesium routes (the live cesium data
  // earns its display time)
  const displayFields = [...fields];
  if (eggIndex !== null && !onWorld) {
    const targetField = Math.floor(Math.random() * displayFields.length);
    displayFields[targetField] = {
      label: "Status",
      value: EASTER_EGGS[eggIndex],
      egg: true,
    };
  }
 
  return (
    <div
      className={
        "coord-bar-wrap " +
        (onDark ? "on-dark" : "")
      }
      role="status"
      aria-label="Burroship instrumentation"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-14 py-2.5">
        <div className="flex items-center gap-3 md:gap-6 overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className={"w-1.5 h-1.5 rounded-full " + (onDark ? "bg-dark-accent" : "bg-accent")}
              style={{
                boxShadow: onDark
                  ? "0 0 6px rgba(168,208,85,0.6)"
                  : "0 0 0 3px rgba(122,179,0,0.18)",
              }}
              aria-hidden="true"
            />
          </div>
 
          {displayFields.map((field, idx) => (
            <div
              key={idx}
              className={
                "flex items-baseline gap-2 flex-shrink-0 " +
                (field.egg ? "italic" : "")
              }
            >
              <span
                className={
                  "text-mono-xs " +
                  (onDark ? "text-dark-ink-faint" : "text-ink-faint")
                }
              >
                {field.label}
              </span>
              <span
                className={
                  "text-mono-xs " +
                  (onDark
                    ? field.egg
                      ? "text-dark-accent"
                      : "text-dark-ink-muted"
                    : field.egg
                    ? "text-accent"
                    : "text-ink")
                }
              >
                {field.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
export default CoordinateBar;
