// src/pages/Deploy/sections/HowItRuns.jsx
//
// How it runs. The deploy stack as a clean aligned triptych. No
// numbering. Left aligned header with cards underneath on desktop and
// a clean full width stack on mobile. Clean lowercase content with no
// oxford commas and no dashes.
// v1 · 2026-06-24

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const STACK = [
  { title: "continuous deploys", line: "Every push goes to production and every branch gets a preview. The slow old release day is gone for good." },
  { title: "real databases", line: "Postgres with row level security and realtime when it matters. A clean admin layer wherever it helps." },
  { title: "global edge", line: "Served close to the people who use it. Fast first paint and one click rollbacks when a release misbehaves." },
];

function HowItRuns() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" }}>
      <div className="absolute inset-0 schematic-grid schematic-grid-fade pointer-events-none" aria-hidden="true" />

      <Container size="full" className="relative z-10">
        <div className="max-w-[54ch] mb-14 md:mb-20">
          <Reveal><Eyebrow>how it runs</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">boring tools. done right.</h2></Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--color-line)" }}>
          {STACK.map((s, i) => (
            <Reveal key={s.title} delay={0.08 + i * 0.06} className="h-full"><Card s={s} /></Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Card({ s }) {
  return (
    <div className="h-full flex flex-col p-8 md:p-12" style={{ background: "var(--color-bg)" }}>
      <h3 className="text-display-md text-ink mb-4 lowercase">{s.title}</h3>
      <p className="text-body text-ink-muted max-w-[36ch]">{s.line}</p>
    </div>
  );
}

export default HowItRuns;
