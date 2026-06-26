// src/pages/Home/sections/Incubator.jsx
//
// The incubator reveal. We do not only build for hire. When we find
// something worth making we build it, run it and keep a hand in it.
// The fellowship line lives here, stated once and quietly. Two column
// layout: a statement on the left, a short set of principles on the
// right. Clean lowercase content with no oxford commas and no dashes.
// v1 · 2026-06-24

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const PRINCIPLES = [
  { k: "make", line: "When something is worth building we build it for real, not as a demo." },
  { k: "run", line: "We operate what we make. Kitchens, payments, vending, comms and code." },
  { k: "hold", line: "Everyone who helps holds a piece. The upside belongs to the people who build it." },
];

function Incubator() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-surface-engine)", borderTop: "1px solid var(--color-line)" }}>
      <Container size="full" className="relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <Reveal><Eyebrow signal>the incubator</Eyebrow></Reveal>
            <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">we also build our own.</h2></Reveal>
            <Reveal delay={0.12}><p className="text-lead mt-6 max-w-[44ch]">The studio is an engine. When we find something worth making we build it, run it and keep a hand in it. The tools we learn on one project become the ground for the next.</p></Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.k} delay={0.1 + i * 0.08}>
                <div className="flex gap-6 md:gap-10 py-7" style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}>
                  <span className="text-mono-sm text-accent flex-shrink-0 pt-1 lowercase" style={{ minWidth: "56px" }}>{p.k}</span>
                  <p className="text-body text-ink-muted max-w-[46ch]">{p.line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Incubator;
