// src/pages/Home/sections/Collage.jsx
//
// The Field. A uniform plate grid, tighter and less abstract than the
// Neon Burro collage. 2x2 on mobile, full-width 4-up on desktop. Each
// plate is a sealed coordinate. Optional image via /collage/<id>.png;
// until assets land they render as toned placeholders.

import { useState } from "react";
import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const PLATES = [
  { id: "compound", label: "The Compound", tag: "HQ", tone: "#22252C" },
  { id: "stackhouse", label: "The StackHouse", tag: "STRATEGY", tone: "#1A2630" },
  { id: "burroships", label: "The Burroships", tag: "STAGING", tone: "#202830" },
  { id: "field", label: "The Field", tag: "TERRAIN", tone: "#181B20" },
  { id: "council", label: "The Council", tag: "AGENTS", tone: "#1C2733" },
  { id: "engine", label: "The Engine Room", tag: "DEPLOY", tone: "#16181D" },
  { id: "signal", label: "Signal Tower", tag: "RELAY", tone: "#1E2A36" },
  { id: "gate", label: "The Gate", tag: "SEALED", tone: "#202329" },
];

function Collage() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden" style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" }}>
      <Container size="wide">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12 md:mb-16">
          <div className="max-w-[44ch]">
            <Reveal><Eyebrow>The compound</Eyebrow></Reveal>
            <Reveal delay={0.06}><h2 className="text-display-lg mt-5 text-ink">A real place. Mostly sealed.</h2></Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2.5">
              <span className="beacon-dot sm pulse" aria-hidden="true" />
              <span className="text-mono-xs text-ink-faint">8 coordinates · 1 visible</span>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {PLATES.map((plate, i) => (
            <Reveal key={plate.id} delay={0.05 + i * 0.04}><Plate plate={plate} /></Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Plate({ plate }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "1 / 1", background: plate.tone, border: "1px solid var(--color-line)", transition: "border-color 0.3s var(--ease-standard)", borderColor: hover ? "var(--color-accent)" : "var(--color-line)" }}>
      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: `url(/collage/${plate.id}.png)`, backgroundSize: "cover", backgroundPosition: "center", opacity: hover ? 1 : 0.85, transform: hover ? "scale(1.04)" : "scale(1)", transition: "transform 0.6s var(--ease-emphasis), opacity 0.4s var(--ease-standard)" }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,9,11,0.92) 0%, rgba(8,9,11,0.2) 55%, transparent 100%)" }} />
      <div className="absolute top-3 left-3">
        <span className="text-mono-xs" style={{ color: "var(--color-ink-faint)" }}>{plate.tag}</span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
        <span className="text-display-sm text-ink leading-tight">{plate.label}</span>
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: hover ? "var(--color-accent)" : "var(--color-ink-faint)", boxShadow: hover ? "0 0 8px var(--color-accent-glow)" : "none", transition: "all 0.3s var(--ease-standard)" }} aria-hidden="true" />
      </div>
    </div>
  );
}

export default Collage;
