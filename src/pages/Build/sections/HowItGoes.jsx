// src/pages/Build/sections/HowItGoes.jsx
//
// How it goes. The build process as a quiet labelled sequence. Reads
// as operational reassurance not a sales pitch. Numbered steps with a
// hairline rule between them. Clean lowercase content with no oxford
// commas and no dashes.
// v1 · 2026-06-18

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const STEPS = [
  { k: "01", title: "read the terrain", line: "We learn the work before we touch a keyboard. What it is, who it serves and where it breaks today." },
  { k: "02", title: "draft the vessel", line: "A small honest plan and a first build you can actually click. No long silence and no big reveal at the end." },
  { k: "03", title: "ship and watch", line: "It goes live on real infrastructure with signals running. We watch the first days and tune what the data shows." },
  { k: "04", title: "hand it the routine", line: "Once it runs clean we let the agents take the repeat work so the thing keeps moving on its own." },
];

function HowItGoes() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-surface-engine)", borderTop: "1px solid var(--color-line)" }}>
      <Container size="full" className="relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <Reveal><Eyebrow signal>how it goes</Eyebrow></Reveal>
            <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">four moves. no surprises.</h2></Reveal>
            <Reveal delay={0.12}><p className="text-lead mt-6 max-w-[40ch]">The same sequence every time. It is calm on purpose.</p></Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.k} delay={0.1 + i * 0.07}>
                <div className="flex gap-6 md:gap-10 py-7" style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}>
                  <span className="text-mono-sm text-accent flex-shrink-0 pt-1">{s.k}</span>
                  <div>
                    <h3 className="text-display-sm text-ink mb-2 lowercase">{s.title}</h3>
                    <p className="text-body text-ink-muted max-w-[46ch]">{s.line}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HowItGoes;
