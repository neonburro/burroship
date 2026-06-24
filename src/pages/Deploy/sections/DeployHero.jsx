// src/pages/Deploy/sections/DeployHero.jsx
//
// Deploy hero. A scroll driven zoom into the core. Stacked rings,
// particles and a glowing center scale and fade as you scroll so it
// feels like descending into the live production heart. The host is a
// tall section so there is scroll room. Copy sits pinned over the
// depths and resolves on mount. Reuses the DepthZoom atom.
// v1 · 2026-06-18

import { useState, useEffect } from "react";
import DepthZoom from "../../../components/Atoms/DepthZoom";

function ringSvg(radius, opacity) {
  return (
    <svg viewBox="0 0 1000 1000" className="w-[120vmax] h-[120vmax]">
      <circle cx="500" cy="500" r={radius} fill="none" stroke="var(--color-accent)" strokeOpacity={opacity} strokeWidth="1.2" />
    </svg>
  );
}

function coreSvg() {
  return (
    <svg viewBox="0 0 1000 1000" className="w-[120vmax] h-[120vmax]">
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="25%" stopColor="var(--color-accent)" stopOpacity="0.8" />
          <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="500" cy="500" r="220" fill="url(#coreGlow)" />
    </svg>
  );
}

function particleSvg(seed) {
  const dots = [];
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2 + seed;
    const r = 120 + ((i * 53) % 360);
    const x = 500 + Math.cos(a) * r;
    const y = 500 + Math.sin(a) * r;
    dots.push(<circle key={i} cx={x} cy={y} r="1.6" fill="var(--color-accent)" fillOpacity="0.5" />);
  }
  return (
    <svg viewBox="0 0 1000 1000" className="w-[120vmax] h-[120vmax]">{dots}</svg>
  );
}

const LAYERS = [
  { depth: 0.0, fromScale: 0.6, toScale: 2.2, node: ringSvg(460, 0.10) },
  { depth: 0.2, fromScale: 0.5, toScale: 3.0, node: ringSvg(360, 0.14) },
  { depth: 0.4, fromScale: 0.45, toScale: 4.2, node: particleSvg(0.6) },
  { depth: 0.6, fromScale: 0.4, toScale: 5.6, node: ringSvg(240, 0.2) },
  { depth: 0.8, fromScale: 0.35, toScale: 7.5, node: ringSvg(150, 0.26) },
  { depth: 1.0, fromScale: 0.3, toScale: 10, node: coreSvg() },
];

function DeployHero() {
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLit(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full" style={{ background: "var(--color-bg)", height: "260vh" }}>
      <DepthZoom layers={LAYERS}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <p className="text-mono text-ink-faint mb-7" style={{ opacity: lit ? 1 : 0, transition: "opacity 0.8s var(--ease-emphasis)" }}>deploy</p>
          <h1 className="text-display-2xl text-ink lowercase max-w-[18ch]" style={{ opacity: lit ? 1 : 0, transform: lit ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.9s var(--ease-emphasis) 0.2s, transform 0.9s var(--ease-emphasis) 0.2s" }}>into the live core.</h1>
          <p className="text-lead mt-6 max-w-[44ch]" style={{ opacity: lit ? 1 : 0, transition: "opacity 1s var(--ease-emphasis) 0.5s" }}>Scroll to descend. Everything we ship runs on real infrastructure with signals you can read at a glance.</p>
        </div>
      </DepthZoom>
    </section>
  );
}

export default DeployHero;
