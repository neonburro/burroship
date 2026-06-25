// src/pages/Build/sections/BuildClosing.jsx
//
// Closing band. A short line and two clear ctas using the shared Btn
// so colors and hover are visible and consistent. Clean lowercase
// content with no oxford commas and no dashes.
// v2 · 2026-06-24 · use shared Btn

import Container from "../../../components/Layout/Container";
import Reveal from "../../../components/Atoms/Reveal";
import Btn from "../../../components/Atoms/Btn";

function BuildClosing() {
  return (
    <section className="relative py-32 md:py-44 w-full overflow-hidden" style={{ background: "#000000", borderTop: "1px solid var(--color-line)" }}>
      <Container size="reading" className="relative z-10 text-center">
        <Reveal><h2 className="text-display-lg text-ink lowercase">have something worth building?</h2></Reveal>
        <Reveal delay={0.08}><p className="text-lead mt-5 mx-auto max-w-[42ch]">Bring the strange one. We like those best.</p></Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Btn href="mailto:hello@neonburro.com" intent="solid" arrow>start a build</Btn>
            <Btn to="/deploy/" intent="outline">see deploy</Btn>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default BuildClosing;
