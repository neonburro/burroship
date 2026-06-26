// src/pages/Rewards/sections/RewardsHero.jsx
//
// Rewards hero. Its own wild identity, distinct from the home hero. The
// feeling of an animal drawn to a warm strange thing glowing in the
// dark. Big, wide and left aligned. Topo rings drift on parallax.
// Clean lowercase content with no oxford commas and no dashes.
// v3 · 2026-06-26

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";
import Parallax from "../../../components/Atoms/Parallax";
import Btn from "../../../components/Atoms/Btn";

function RewardsHero() {
  return (
    <section className="relative pt-40 pb-24 md:pt-48 md:pb-36 w-full overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <Parallax speed={80} className="absolute inset-0 pointer-events-none">
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-end">
          <svg viewBox="0 0 800 800" className="h-[150%]" style={{ marginRight: "-10%" }}>
            <defs>
              <radialGradient id="rewardsTopo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.18" />
                <stop offset="55%" stopColor="var(--color-accent)" stopOpacity="0.06" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g fill="none" stroke="url(#rewardsTopo)" strokeWidth="1">
              <circle cx="400" cy="400" r="110" />
              <circle cx="400" cy="400" r="180" />
              <circle cx="400" cy="400" r="250" />
              <circle cx="400" cy="400" r="320" />
              <circle cx="400" cy="400" r="390" />
            </g>
          </svg>
        </div>
      </Parallax>

      <Container size="full" className="relative z-10">
        <div className="max-w-[66ch]">
          <Reveal><Eyebrow signal>rewards</Eyebrow></Reveal>
          <Reveal delay={0.06}><h1 className="text-display-2xl mt-5 text-ink lowercase">one reward earned. more rewards served.</h1></Reveal>
          <Reveal delay={0.12}><p className="text-lead mt-6 max-w-[56ch]">There is a warm light at the edge of the dark and it smells like roasted coffee and matcha. You wander closer. Something good is always coming out of the tent. Every cup, every drop, every job an agent finishes leaves a little behind, and it keeps adding up while you sleep.</p></Reveal>
          <Reveal delay={0.2}><div className="mt-9"><Btn href="mailto:hello@neonburro.com" intent="solid" arrow>join the list</Btn></div></Reveal>
        </div>
      </Container>
    </section>
  );
}

export default RewardsHero;
