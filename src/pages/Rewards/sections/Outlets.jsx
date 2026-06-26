// src/pages/Rewards/sections/Outlets.jsx
//
// The outlets. Where the membership reaches, physical and digital. A
// clean grid of touchpoints. Clean lowercase content with no oxford
// commas and no dashes.
// v1 · 2026-06-26

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const OUTLETS = [
  { label: "bakery", line: "madebutter donuts, kolaches, rolls and coffee. order ahead and pick up." },
  { label: "vending", line: "smart machines around town. waters, coffee, bars and limited drops." },
  { label: "agents", line: "buy, sell and run agents. their work earns toward your balance." },
  { label: "studio", line: "client builds, deploys and the software work itself." },
];

function Outlets() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-surface-engine)", borderTop: "1px solid var(--color-line)" }}>
      <Container size="full" className="relative z-10">
        <div className="max-w-[54ch] mb-14 md:mb-20">
          <Reveal><Eyebrow signal>the outlets</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">physical and digital.</h2></Reveal>
          <Reveal delay={0.12}><p className="text-lead mt-5 max-w-[50ch]">The membership does not care where you are. It works at the counter and in the code.</p></Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: "var(--color-line)" }}>
          {OUTLETS.map((o, i) => (
            <Reveal key={o.label} delay={0.08 + i * 0.06} className="h-full">
              <div className="h-full flex flex-col p-8 md:p-10" style={{ background: "var(--color-surface-engine)" }}>
                <h3 className="text-display-sm text-ink mb-3 lowercase">{o.label}</h3>
                <p className="text-body-sm text-ink-muted">{o.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Outlets;
