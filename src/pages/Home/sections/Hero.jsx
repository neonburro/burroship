// src/pages/Home/sections/Hero.jsx
//
// The approach. A full bleed dark viewport. The topo rings are the
// true background filling the whole section. The wordmark resolves on
// mount and the dot ignites. Voice is broad and a little mysterious:
// a fellowship of builders and agents, not a location.
// v1 · 2026-06-18

import { useState, useEffect } from "react";

function Hero() {
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLit(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <Starfield />
      <BigTopo lit={lit} />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(91,180,240,0.06) 0%, transparent 68%)" }} />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="text-mono text-ink-faint mb-8" style={{ opacity: lit ? 1 : 0, transform: lit ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.7s var(--ease-emphasis), transform 0.7s var(--ease-emphasis)" }}>
          a fellowship of builders
        </p>

        <h1 className="inline-flex items-baseline justify-center text-ink" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(52px, 11vw, 132px)", letterSpacing: "-0.05em", lineHeight: 1, textTransform: "lowercase" }}>
          theburroship
          <span aria-hidden="true" style={{ display: "inline-block", width: "0.14em", height: "0.14em", borderRadius: "50%", marginLeft: "0.05em", background: "var(--color-accent)", boxShadow: lit ? "0 0 28px var(--color-accent-glow), 0 0 7px var(--color-accent)" : "0 0 0 var(--color-accent-glow)", opacity: lit ? 1 : 0, transform: lit ? "scale(1)" : "scale(0.2)", transition: "opacity 0.5s var(--ease-emphasis) 0.35s, transform 0.6s var(--ease-emphasis) 0.35s, box-shadow 0.8s var(--ease-standard) 0.5s" }} />
        </h1>

        <p className="text-lead mt-8 max-w-[48ch]" style={{ opacity: lit ? 1 : 0, transform: lit ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.8s var(--ease-emphasis) 0.55s, transform 0.8s var(--ease-emphasis) 0.55s" }}>
          We build quiet machines and send them out to work. Systems that think a little, run on their own and answer when called. Some of this is engineering. Some of it still feels like magic.
        </p>
      </div>
    </section>
  );
}

function BigTopo({ lit }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ opacity: lit ? 1 : 0, transition: "opacity 1.6s var(--ease-standard) 0.2s" }}>
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full" style={{ minWidth: "1100px" }}>
        <defs>
          <radialGradient id="topoFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.16" />
            <stop offset="55%" stopColor="var(--color-accent)" stopOpacity="0.07" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g fill="none" stroke="url(#topoFade)" strokeWidth="1">
          <circle cx="500" cy="500" r="120" />
          <circle cx="500" cy="500" r="190" />
          <circle cx="500" cy="500" r="260" />
          <circle cx="500" cy="500" r="330" />
          <circle cx="500" cy="500" r="400" />
          <circle cx="500" cy="500" r="470" />
        </g>
      </svg>
    </div>
  );
}

function Starfield() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ opacity: 0.45 }}>
      <div style={{ position: "absolute", inset: "-40px", backgroundImage: "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 80% 20%, rgba(91,180,240,0.5), transparent), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.35), transparent), radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 10% 60%, rgba(91,180,240,0.4), transparent), radial-gradient(1px 1px at 50% 15%, rgba(255,255,255,0.4), transparent)", backgroundSize: "240px 240px", animation: "field-drift 90s linear infinite" }} />
    </div>
  );
}

export default Hero;
