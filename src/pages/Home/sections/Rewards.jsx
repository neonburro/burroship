// src/pages/Home/sections/Rewards.jsx
//
// Rewards teaser on the home page. Big and wide and left aligned to
// match the rest of the site. The connective tissue: one membership
// that earns and redeems across every outlet. Points, crypto and agent
// earned. Teases the rewards page. Uses the shared Btn. Clean lowercase
// content with no oxford commas and no dashes.
// v2 · 2026-06-26 · rebuilt wide and left aligned

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";
import Btn from "../../../components/Atoms/Btn";

const KINDS = [
  { k: "points", line: "Earned on everything from a coffee to a deploy." },
  { k: "crypto", line: "The neon burro reward world plugs straight in." },
  { k: "agent earned", line: "Agents work, agents earn and the value flows back to you." },
];

function Rewards() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" }}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 20% 40%, rgba(91,180,240,0.06) 0%, transparent 70%)" }} />

      <Container size="full" className="relative z-10">
        <div className="max-w-[60ch] mb-14 md:mb-20">
          <Reveal><Eyebrow signal>rewards</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">one membership. every outlet.</h2></Reveal>
          <Reveal delay={0.12}><p className="text-lead mt-5 max-w-[52ch]">Earn at the bakery, the vending wall, the checkout and the agents. Spend it anywhere across the network.</p></Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-px mb-14 md:mb-16" style={{ background: "var(--color-line)" }}>
          {KINDS.map((kind, i) => (
            <Reveal key={kind.k} delay={0.1 + i * 0.07} className="h-full">
              <div className="h-full flex flex-col p-8 md:p-12" style={{ background: "var(--color-bg)" }}>
                <p className="text-mono-sm text-accent mb-4 lowercase">{kind.k}</p>
                <p className="text-body text-ink-muted max-w-[34ch]">{kind.line}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <Btn to="/rewards/" intent="solid" arrow>see rewards</Btn>
        </Reveal>
      </Container>
    </section>
  );
}

export default Rewards;
