// src/pages/BurroshipMap/cesium/CesiumSchedule.jsx
//
// Schedule overlay for the continuous corridor. Shows:
//   - Currently flying toward: [label]
//   - Time until arrival
//   - Next 3 upcoming labels with ETA
//
// No phase tracking — the flight never stops, it just moves between
// waypoints.

import { useState, useEffect } from "react";

function formatCountdown(ms) {
  if (ms <= 0) return "0:00";
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return min + ":" + String(sec).padStart(2, "0");
}

function CesiumSchedule({
  tourActive,
  currentStopIndex,
  segmentEndsAt,
  tourStops,
  tourPaused,
}) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!tourActive || tourPaused) return;
    const interval = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(interval);
  }, [tourActive, tourPaused]);

  if (!tourActive || currentStopIndex == null || !tourStops?.length) return null;

  const currentStop = tourStops[currentStopIndex];
  const remainingMs = tourPaused
    ? segmentEndsAt - now
    : Math.max(0, segmentEndsAt - now);

  // Build the upcoming list — next 3 waypoints after the current one
  const upcoming = [];
  let cursor = (currentStopIndex + 1) % tourStops.length;
  let cumulativeMs = Math.max(0, remainingMs);

  for (let i = 0; i < 3; i++) {
    const stop = tourStops[cursor];
    const prevIndex = (cursor - 1 + tourStops.length) % tourStops.length;
    const segmentMs = tourStops[prevIndex].duration_to_next_ms || 50000;
    cumulativeMs += segmentMs;
    upcoming.push({ name: stop.name, eta: cumulativeMs });
    cursor = (cursor + 1) % tourStops.length;
  }

  return (
    <div className="absolute bottom-6 left-6 z-10 hidden md:block">
      <div className="rounded-card border border-surface-edge bg-surface/80 backdrop-blur-md p-4 min-w-[280px]">
        <p className="font-mono-label text-[9px] mb-3 text-text-muted">
          BURROSHIP · CORRIDOR
        </p>

        <div className="flex items-baseline justify-between mb-1">
          <span className="font-mono-label text-[10px] text-primary">
            {tourPaused ? "HOLDING" : "OVER"}
          </span>
          {!tourPaused && (
            <span className="font-mono-label text-[10px] text-text-secondary">
              {formatCountdown(Math.max(0, remainingMs))}
            </span>
          )}
        </div>
        <p className="text-text-primary font-medium mb-4">{currentStop.name}</p>

        <div className="border-t border-surface-edge pt-3 space-y-1.5">
          {upcoming.map((stop, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="font-mono-label text-[10px] text-text-secondary">
                {stop.name}
              </span>
              <span className="font-mono-label text-[10px] text-text-muted">
                +{formatCountdown(stop.eta)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CesiumSchedule;