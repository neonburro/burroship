// src/pages/Build/sections/WhatWeMake.jsx
//
// What we make. Expands the home pillar into real categories of work.
// Left aligned header with aligned cards underneath on desktop and a
// clean full width stack on mobile. Schematic grid behind. Clean
// lowercase content with no oxford commas and no dashes.
// v1 · 2026-06-18

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const WORK = [
  { title: "sites", line: "Fast public sites with real motion and copy that carries weight. The kind people remember after one visit." },
  { title: "dashboards", line: "Live views of the numbers that matter. Built so a glance is enough and a deeper look always pays off." },
  { title: "internal tools", line: "The quiet software a team runs on. Forms, queues, admin panels and the workflows nobody else will touch." },
  { title: "integrations", line: "We make systems talk. Payments, calendars, messaging and data moving cleanly between the things you already use." },
  { title: "one offs", line: "The strange request that does not fit a category. If it can be built we are usually the ones who say yes." },
];

function WhatWeMake() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" }}>
      <div className="absolute inset-0 schematic-grid schematic-grid-fade pointer-events-none" aria-hidden="true" />

      <Container size="full" className="relative z-10">
        <div className="max-w-[54ch] mb-14 md:mb-20">
          <Reveal><Eyebrow>what we make</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">a short list. done properly.</h2></Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--color-line)" }}>
          {WORK.map((w, i) => (
            <Reveal key={w.title} delay={0.08 + i * 0.06} className="h-full"><Card w={w} /></Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Card({ w }) {
  return (
    <div className="h-full flex flex-col p-8 md:p-12" style={{ background: "var(--color-bg)" }}>
      <h3 className="text-display-md text-ink mb-4 lowercase">{w.title}</h3>
      <p className="text-body text-ink-muted max-w-[36ch]">{w.line}</p>
    </div>
  );
}

export default WhatWeMake;
