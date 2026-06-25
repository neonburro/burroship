// src/pages/Deploy/sections/DeployClosing.jsx
//
// Closing band. A short line and two clear ctas using the shared Btn
// so colors and hover are visible and consistent. Clean lowercase
// content with no oxford commas and no dashes.
// v1 · 2026-06-24

import Container from "../../../components/Layout/Container";
import Reveal from "../../../components/Atoms/Reveal";
import Btn from "../../../components/Atoms/Btn";

function DeployClosing() {
  return (
    <section className="relative py-32 md:py-44 w-full overflow-hidden" style={{ background: "#000000", borderTop: "1px solid var(--color-line)" }}>
      <Container size="reading" className="relative z-10 text-center">
        <Reveal><h2 className="text-display-lg text-ink lowercase">ready to go live?</h2></Reveal>
        <Reveal delay={0.08}><p className="text-lead mt-5 mx-auto max-w-[42ch]">We will get it running and keep it that way.</p></Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Btn href="mailto:hello@neonburro.com" intent="solid" arrow>start a deploy</Btn>
            <Btn to="/automate/" intent="outline">see automate</Btn>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default DeployClosing;
