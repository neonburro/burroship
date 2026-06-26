// src/pages/Home/sections/Rewards.jsx
//
// Rewards. The connective tissue. One membership that earns and
// redeems across every outlet, physical and digital. Points, crypto
// and agent earned. Teases the future rewards page. Uses the shared
// Btn so the cta is visible and consistent. Clean lowercase content
// with no oxford commas and no dashes.
// v1 · 2026-06-24

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";
import Btn from "../../../components/Atoms/Btn";

const KINDS = [
  { k: "points", line: "Earned on everything from a coffee to a deploy." },
  { k: "crypto", line: "The neon burro reward world plugs straight in." },
  { k: "agent earned", line: "Agents work, agents earn, the value flows back to you." },
];

function Rewards() {
  return (
    <section className="relative py-28 md:py-40 w-full overflow-hidden" style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" }}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(91,180,240,0.06) 0%, transparent 70%)" }} />

      <Container size="reading" className="relative z-10 text-center">
        <Reveal><div className="flex justify-center"><Eyebrow signal>rewards</Eyebrow></div></Reveal>
        <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">one membership. every outlet.</h2></Reveal>
        <Reveal delay={0.12}><p className="text-lead mt-5 mx-auto max-w-[46ch]">Earn at the bakery, the vending wall, the checkout and the agents. Spend it anywhere across the network.</p></Reveal>

        <Reveal delay={0.18}>
          <div className="grid sm:grid-cols-3 gap-px mt-12 mb-12 text-left" style={{ background: "var(--color-line)" }}>
            {KINDS.map((kind) => (
              <div key={kind.k} className="p-7" style={{ background: "var(--color-bg)" }}>
                <p className="text-mono-sm text-accent mb-3 lowercase">{kind.k}</p>
                <p className="text-body-sm text-ink-muted">{kind.line}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <Btn to="/rewards/" intent="solid" arrow>see rewards</Btn>
        </Reveal>
      </Container>
    </section>
  );
}

export default Rewards;
