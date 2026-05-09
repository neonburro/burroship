// src/pages/Map/LocationPin.jsx
import { compoundBeaconColors } from "../../lib/mapbox";

const styleByCategory = {
  hq: {
    ring: "border-primary",
    glow: "bg-primary/60",
  },
  client: {
    ring: "border-primary/80",
    glow: "bg-primary/50",
  },
  landmark: {
    ring: "border-text-secondary/70",
    glow: "bg-text-secondary/30",
  },
  partner: {
    ring: "border-primary/50",
    glow: "bg-primary/35",
  },
};

// Metallic beacon — used by the three Compound pins. Subtle glow,
// soft pulse, brushed-metal gradient. In-development beacons get
// an additional flag dot above the metal disk.
function CompoundBeacon({ beaconColor, status }) {
  const config = compoundBeaconColors[beaconColor] || compoundBeaconColors.lantern;
  const isInDev = status === "in-development";

  return (
    <div className="relative cursor-pointer group" style={{ width: 22, height: 22 }}>
      {/* Outer breathing halo — slow pulse */}
      <div
        className="absolute inset-0 rounded-full animate-burroship-beacon-pulse"
        style={{
          background: "radial-gradient(circle, " + config.glow + " 0%, transparent 70%)",
          transform: "scale(2.2)",
        }}
      />

      {/* Soft glow underneath the metal disk */}
      <div
        className="absolute inset-0 rounded-full blur-md transition-all group-hover:blur-lg"
        style={{ background: config.glow, transform: "scale(1.4)" }}
      />

      {/* Metal disk — brushed gradient, beveled edge */}
      <div
        className="absolute inset-0 rounded-full transition-transform group-hover:scale-110"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, " +
            config.base +
            " 0%, " +
            config.base +
            "cc 55%, #18181B 100%)",
          border: "1px solid " + config.base + "80",
          boxShadow:
            "inset 0 1px 2px " +
            config.base +
            "60, 0 0 12px " +
            config.glow,
        }}
      />

      {/* Center pinpoint — the actual signal */}
      <div
        className="absolute rounded-full"
        style={{
          width: 6,
          height: 6,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: config.base,
          boxShadow: "0 0 8px " + config.base,
        }}
      />

      {/* In-development flag — small pulsing dot above the beacon */}
      {isInDev && (
        <div
          className="absolute animate-burroship-flag-pulse"
          style={{
            width: 6,
            height: 6,
            top: -10,
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: "#FFFFFF",
            boxShadow: "0 0 8px #FFFFFF, 0 0 2px " + config.base,
          }}
        />
      )}
    </div>
  );
}

function LocationPin({
  category = "client",
  featured = false,
  subcategory = null,
  beaconColor = null,
  status = null,
}) {
  // Compound beacons get their own treatment
  if (subcategory === "compound-beacon") {
    return <CompoundBeacon beaconColor={beaconColor} status={status} />;
  }

  const style = styleByCategory[category] || styleByCategory.client;

  return (
    <div className="relative cursor-pointer group">
      <div
        className={
          "w-3 h-3 rounded-full bg-background-deep border-2 transition-all group-hover:scale-150 " +
          style.ring +
          (featured ? " w-4 h-4" : "")
        }
      />
      <div
        className={
          "absolute inset-0 rounded-full blur-md transition-all group-hover:blur-lg group-hover:scale-150 " +
          style.glow
        }
      />
    </div>
  );
}

export default LocationPin;