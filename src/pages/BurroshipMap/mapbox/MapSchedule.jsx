// src/pages/BurroshipMap/mapbox/MapSchedule.jsx
import { useState, useEffect } from "react";

import { tourRoute } from "../../../lib/burroship";

function formatCountdown(ms) {
  if (ms <= 0) return "0:00";
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return min + ":" + String(sec).padStart(2, "0");
}

function MapSchedule({ tourActive, currentStopIndex, currentPhase, phaseEndsAt }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!tourActive) return;
    const interval = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(interval);
  }, [tourActive]);

  if (!tourActive || currentStopIndex == null) return null;

  const currentStop = tourRoute[currentStopIndex];
  const remainingMs = Math.max(0, phaseEndsAt - now);

  const upcoming = [];
  let cursor = (currentStopIndex + 1) % tourRoute.length;
  let cumulativeMs = remainingMs;

  if (currentPhase === "approach") {
    cumulativeMs +=
      currentStop.hold.durationMs + currentStop.depart.durationMs;
  } else if (currentPhase === "hold") {
    cumulativeMs += currentStop.depart.durationMs;
  }

  for (let i = 0; i < 4; i++) {
    const stop = tourRoute[cursor];
    upcoming.push({
      name: stop.name,
      eta: cumulativeMs,
    });
    cumulativeMs +=
      stop.approach.durationMs +
      stop.hold.durationMs +
      stop.depart.durationMs;
    cursor = (cursor + 1) % tourRoute.length;
  }

  const phaseLabel = {
    approach: "ARRIVING",
    hold: "OVER",
    depart: "DEPARTING",
  }[currentPhase] || "AT";

  return (
    <div className="absolute bottom-6 left-6 z-10 hidden md:block">
      <div className="rounded-card border border-surface-edge bg-surface/80 backdrop-blur-md p-4 min-w-[260px]">
        <p className="font-mono-label text-[9px] mb-3 text-text-muted">
          BURROSHIP · SCHEDULE
        </p>

        <div className="flex items-baseline justify-between mb-1">
          <span className="font-mono-label text-[10px] text-primary">
            {phaseLabel}
          </span>
          <span className="font-mono-label text-[10px] text-text-secondary">
            {formatCountdown(remainingMs)}
          </span>
        </div>
        <p className="text-text-primary font-medium mb-4">
          {currentStop.name}
        </p>

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

export default MapSchedule;