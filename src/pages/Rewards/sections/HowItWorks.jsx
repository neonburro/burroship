// src/pages/Rewards/sections/HowItWorks.jsx
//
// How it works. The earn then redeem loop in plain language. A simple
// labelled sequence. Clean lowercase content with no oxford commas and
// no dashes.
// v1 · 2026-06-26

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const STEPS = [
  { k: "01", title: "join once", line: "One membership for the whole network. No card per brand and no separate logins to juggle." },
  { k: "02", title: "earn everywhere", line: "Every purchase, every deploy and every agent that does its job adds to the same balance." },
  { k: "03", title: "redeem anywhere", line: "Spend what you earn at any outlet. A bakery credit can come from work you did on the software side." },
  { k: "04", title: "watch it grow", line: "The more of the network you touch the faster it compounds. Good energy is the only real requirement." },
];

function HowItWorks() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-surface-engine)", borderTop: "1px solid var(--color-line)" }}>
      <Container size="full" className="relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <Reveal><Eyebrow signal>how it works</Eyebrow></Reveal>
            <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">earn here. spend there.</h2></Reveal>
            <Reveal delay={0.12}><p className="text-lead mt-6 max-w-[40ch]">One balance that moves freely across the whole network.</p></Reveal>
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

export default HowItWorks;
