// src/pages/Home/sections/PillarsSection.jsx
//
// The three operations. build deploy automate as one clean triptych.
// No numbering. Lowercase headings. Full width. Clean content with no
// oxford commas and no dashes.

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const PILLARS = [
  {
    title: "build",
    line: "We read the terrain before we build inside it. Sites, dashboards, internal tools and the occasional system nobody else makes.",
    spec: "survey  draft  ship",
  },
  {
    title: "deploy",
    line: "Real infrastructure made visible. Continuous deploys across three environments with signals you can read from anywhere.",
    spec: "dev  staging  production",
  },
  {
    title: "automate",
    line: "A council of working agents holds the context, watches the signals and answers when called. Operational intelligence not assistants.",
    spec: "monitor  route  resolve",
  },
];

function PillarsSection() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" }}>
      <div className="absolute inset-0 schematic-grid schematic-grid-fade pointer-events-none" aria-hidden="true" />

      <Container size="full" className="relative z-10">
        <div className="max-w-[52ch] mb-14 md:mb-20">
          <Reveal><Eyebrow signal>the operating layer</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">three operations. one vessel.</h2></Reveal>
          <Reveal delay={0.12}><p className="text-lead mt-5 max-w-[48ch]">Everything the compound does reduces to three moves. We keep them small, deliberate and quietly running.</p></Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--color-line)" }}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.08}><Pillar p={p} /></Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pillar({ p }) {
  return (
    <div className="h-full p-8 md:p-12" style={{ background: "var(--color-bg)" }}>
      <div className="flex items-center justify-end mb-8">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-ink-faint)" }} aria-hidden="true" />
      </div>
      <h3 className="text-display-lg text-ink mb-4 lowercase">{p.title}</h3>
      <p className="text-body text-ink-muted mb-8 max-w-[34ch]">{p.line}</p>
      <p className="text-mono-sm text-ink-faint pt-5" style={{ borderTop: "1px solid var(--color-line)" }}>{p.spec}</p>
    </div>
  );
}

export default PillarsSection;
