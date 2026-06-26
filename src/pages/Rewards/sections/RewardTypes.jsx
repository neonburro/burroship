// src/pages/Rewards/sections/RewardTypes.jsx
//
// The reward types. Points, crypto and agent earned, each expanded.
// Aligned cards under a left heading. Clean lowercase content with no
// oxford commas and no dashes.
// v1 · 2026-06-26

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const TYPES = [
  { title: "points", line: "The everyday currency. Earned on a coffee, a pickup, a subscription or a shipped feature. Simple and quick to spend." },
  { title: "crypto", line: "The neon burro reward world connects straight in. Token rewards that live on chain and travel beyond any single outlet." },
  { title: "agent earned", line: "Agents are part of the economy. They work, they earn and the value flows back to the people who hold them." },
];

function RewardTypes() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" }}>
      <div className="absolute inset-0 schematic-grid schematic-grid-fade pointer-events-none" aria-hidden="true" />

      <Container size="full" className="relative z-10">
        <div className="max-w-[54ch] mb-14 md:mb-20">
          <Reveal><Eyebrow>the currencies</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">three ways to earn.</h2></Reveal>
          <Reveal delay={0.12}><p className="text-lead mt-5 max-w-[50ch]">One balance, more than one kind of value. The membership holds them all together.</p></Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--color-line)" }}>
          {TYPES.map((t, i) => (
            <Reveal key={t.title} delay={0.08 + i * 0.07} className="h-full">
              <div className="h-full flex flex-col p-8 md:p-12" style={{ background: "var(--color-bg)" }}>
                <h3 className="text-display-md text-ink mb-4 lowercase">{t.title}</h3>
                <p className="text-body text-ink-muted max-w-[36ch]">{t.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default RewardTypes;
