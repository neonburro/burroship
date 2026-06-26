// src/pages/Rewards/sections/RewardsClosing.jsx
//
// Closing band. The program is still being built so the cta is a join
// the list move rather than a sign up. Uses the shared Btn. Clean
// lowercase content with no oxford commas and no dashes.
// v1 · 2026-06-26

import Container from "../../../components/Layout/Container";
import Reveal from "../../../components/Atoms/Reveal";
import Btn from "../../../components/Atoms/Btn";

function RewardsClosing() {
  return (
    <section className="relative py-32 md:py-44 w-full overflow-hidden" style={{ background: "#000000", borderTop: "1px solid var(--color-line)" }}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 50% at 50% 40%, rgba(91,180,240,0.06) 0%, transparent 70%)" }} />

      <Container size="reading" className="relative z-10 text-center">
        <Reveal><h2 className="text-display-lg text-ink lowercase">the program opens soon.</h2></Reveal>
        <Reveal delay={0.08}><p className="text-lead mt-5 mx-auto max-w-[42ch]">Join the list and you will be among the first to earn across the whole network.</p></Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Btn href="mailto:hello@neonburro.com" intent="solid" arrow>join the list</Btn>
            <Btn to="/" intent="outline">back home</Btn>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default RewardsClosing;
