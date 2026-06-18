// src/pages/Home/sections/PillarsSection.jsx
//
// The three operations, unified. Build, Deploy, Automate as one
// clean triptych instead of three scattered rooms. Each pillar is
// observational and brief. No outbound links — the homepage stays
// sealed. Schematic grid behind for the workshop feel.

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const PILLARS = [
  {
    n: "01",
    title: "Build",
    line: "We read the terrain before we build inside it. Sites, dashboards, internal tools, the occasional system nobody else makes.",
    spec: "Survey · Draft · Ship",
  },
  {
    n: "02",
    title: "Deploy",
    line: "Real infrastructure, made visible. Continuous deploys across three environments with signals you can read from anywhere.",
    spec: "Dev · Staging · Production",
  },
  {
    n: "03",
    title: "Automate",
    line: "A council of working agents holds the context, watches the signals, and answers when called. Operational intelligence, not assistants.",
    spec: "Monitor · Route · Resolve",
  },
];

function PillarsSection() {
  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-line)",
      }}
    >
      <div
        className="absolute inset-0 schematic-grid schematic-grid-fade pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        <div className="max-w-[52ch] mb-14 md:mb-20">
          <Reveal>
            <Eyebrow signal>The operating layer</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="text-display-xl mt-5 text-ink">
              Three operations. One vessel.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lead mt-5 max-w-[48ch]">
              Everything the compound does reduces to three moves. We
              keep them small, deliberate, and quietly running.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--color-line)" }}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={0.1 + i * 0.08}>
              <Pillar p={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pillar({ p }) {
  return (
    <div
      className="group h-full p-8 md:p-10 transition-colors duration-300"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="flex items-center justify-between mb-8">
        <span className="text-mono-xs text-ink-faint">{p.n}</span>
        <span
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{ background: "var(--color-ink-faint)" }}
          aria-hidden="true"
        />
      </div>
      <h3 className="text-display-lg text-ink mb-4">{p.title}</h3>
      <p className="text-body text-ink-muted mb-8 max-w-[34ch]">{p.line}</p>
      <p
        className="text-mono-sm text-ink-faint pt-5"
        style={{ borderTop: "1px solid var(--color-line)" }}
      >
        {p.spec}
      </p>
    </div>
  );
}

export default PillarsSection;
