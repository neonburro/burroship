// src/pages/Home/sections/PillarsSection.jsx
//
// The capability layer. This is the studio spine: build, deploy,
// automate. The three columns align under the section heading so build
// sits directly below the headline left edge. Forward looking copy in
// the studio voice. No numbering. Clean lowercase content with no
// oxford commas and no dashes.
// v3 · 2026-06-24 · studio reframe, columns aligned to heading

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const PILLARS = [
  {
    title: "build",
    line: "We design and ship the software itself. Sites, dashboards, internal tools and the odd thing nobody else will make.",
  },
  {
    title: "deploy",
    line: "We put it on real infrastructure and keep it honest. Continuous releases with signals you can read at a glance.",
  },
  {
    title: "automate",
    line: "We hand the routine to agents that watch, decide and act. The work keeps moving while you sleep.",
  },
];

function PillarsSection() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" }}>
      <div className="absolute inset-0 schematic-grid schematic-grid-fade pointer-events-none" aria-hidden="true" />

      <Container size="full" className="relative z-10">
        <div className="max-w-[60ch] mb-14 md:mb-20">
          <Reveal><Eyebrow signal>the work itself</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">we make systems that keep working.</h2></Reveal>
          <Reveal delay={0.12}><p className="text-lead mt-5 max-w-[50ch]">Three moves carry everything we ship. Each one is deliberate and each one compounds.</p></Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--color-line)" }}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.08} className="h-full"><Pillar p={p} /></Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pillar({ p }) {
  return (
    <div className="h-full flex flex-col p-8 md:p-12" style={{ background: "var(--color-bg)" }}>
      <h3 className="text-display-lg text-ink mb-4 lowercase">{p.title}</h3>
      <p className="text-body text-ink-muted max-w-[36ch]">{p.line}</p>
    </div>
  );
}

export default PillarsSection;
