// src/pages/Home/sections/Hero.jsx
//
// The approach. A full bleed dark viewport. The wordmark resolves on
// mount, the sky blue dot ignites, coordinates settle in. The ambient
// field fills the whole section edge to edge.

import { useState, useEffect } from "react";
import TopoLines from "../../../components/Atoms/TopoLines";

function Hero() {
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLit(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <Starfield />
      <TopoLines size={820} position="center" intensity="subtle" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(91,180,240,0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="text-mono text-ink-faint mb-8" style={{ opacity: lit ? 1 : 0, transform: lit ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.7s var(--ease-emphasis), transform 0.7s var(--ease-emphasis)" }}>
          build &nbsp; deploy &nbsp; automate
        </p>

        <h1 className="text-ink inline-flex items-end justify-center" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(52px, 11vw, 132px)", letterSpacing: "-0.05em", lineHeight: 1, textTransform: "lowercase" }}>
          theburroship
          <span aria-hidden="true" style={{ display: "inline-block", width: "0.16em", height: "0.16em", borderRadius: "50%", marginLeft: "0.04em", marginBottom: "0.12em", background: "var(--color-accent)", boxShadow: lit ? "0 0 24px var(--color-accent-glow), 0 0 6px var(--color-accent)" : "0 0 0 var(--color-accent-glow)", opacity: lit ? 1 : 0, transform: lit ? "scale(1)" : "scale(0.2)", transition: "opacity 0.5s var(--ease-emphasis) 0.35s, transform 0.6s var(--ease-emphasis) 0.35s, box-shadow 0.8s var(--ease-standard) 0.5s" }} />
        </h1>

        <p className="text-lead mt-8 max-w-[46ch]" style={{ opacity: lit ? 1 : 0, transform: lit ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.8s var(--ease-emphasis) 0.55s, transform 0.8s var(--ease-emphasis) 0.55s" }}>
          A working compound in the San Juans. We build the systems, ship the infrastructure, and let the council run the rest.
        </p>

        <div className="mt-10 flex items-center gap-7 flex-wrap justify-center" style={{ opacity: lit ? 1 : 0, transition: "opacity 0.9s var(--ease-emphasis) 0.8s" }}>
          <Coord label="lat" value="38.15 N" />
          <span className="w-px h-4" style={{ background: "var(--color-line)" }} />
          <Coord label="lon" value="107.75 W" />
          <span className="w-px h-4" style={{ background: "var(--color-line)" }} />
          <Coord label="elev" value="6,985 ft" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: lit ? 1 : 0, transition: "opacity 1s var(--ease-standard) 1.1s" }}>
        <span className="text-mono-xs text-ink-faint">descend</span>
        <span aria-hidden="true" style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, var(--color-accent), transparent)" }} />
      </div>
    </section>
  );
}

function Coord({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-mono-xs text-ink-faint">{label}</span>
      <span className="text-mono-sm text-ink">{value}</span>
    </div>
  );
}

function Starfield() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }}>
      <div style={{ position: "absolute", inset: "-40px", backgroundImage: "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 80% 20%, rgba(91,180,240,0.5), transparent), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.35), transparent), radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 10% 60%, rgba(91,180,240,0.4), transparent), radial-gradient(1px 1px at 50% 15%, rgba(255,255,255,0.4), transparent)", backgroundSize: "240px 240px", animation: "field-drift 90s linear infinite" }} />
    </div>
  );
}

export default Hero;
