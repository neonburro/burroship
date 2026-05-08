// src/pages/Map/LocationPin.jsx

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

function LocationPin({ category = "client", featured = false }) {
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