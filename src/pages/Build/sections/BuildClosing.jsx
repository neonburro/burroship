// src/pages/Build/sections/BuildClosing.jsx
//
// Closing band. A short line and a way onward so the page does not
// dead end. A solid sky blue advance circle returns to the gate.
// Clean lowercase content with no oxford commas and no dashes.
// v1 · 2026-06-18

import { Link } from "react-router-dom";
import Container from "../../../components/Layout/Container";
import Reveal from "../../../components/Atoms/Reveal";

function BuildClosing() {
  return (
    <section className="relative py-32 md:py-44 w-full overflow-hidden" style={{ background: "#000000", borderTop: "1px solid var(--color-line)" }}>
      <Container size="reading" className="relative z-10 text-center">
        <Reveal><h2 className="text-display-lg text-ink lowercase">have something worth building?</h2></Reveal>
        <Reveal delay={0.08}><p className="text-lead mt-5 mx-auto max-w-[42ch]">Bring the strange one. We like those best.</p></Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex items-center justify-center gap-5 flex-wrap">
            <a href="mailto:hello@neonburro.com" className="text-mono text-ink hover:text-accent transition-colors duration-200 lowercase">hello@neonburro.com</a>
            <Link to="/" aria-label="back to the gate" className="flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--color-accent)", boxShadow: "0 0 16px var(--color-accent-glow)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default BuildClosing;
