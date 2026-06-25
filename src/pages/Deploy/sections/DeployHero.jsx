// src/pages/Deploy/sections/DeployHero.jsx
//
// Deploy hero. Quiet and sharp, matching the build page rhythm. An
// eyebrow, a real headline and a lead. Topo rings drift behind on a
// gentle parallax. Clean lowercase content with no oxford commas and
// no dashes.
// v1 · 2026-06-24

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";
import Parallax from "../../../components/Atoms/Parallax";

function DeployHero() {
  return (
    <section className="relative pt-40 pb-24 md:pt-48 md:pb-36 w-full overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <Parallax speed={70} className="absolute inset-0 pointer-events-none">
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-end">
          <svg viewBox="0 0 800 800" className="h-[140%]" style={{ marginRight: "-12%" }}>
            <defs>
              <radialGradient id="deployTopo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.14" />
                <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.05" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g fill="none" stroke="url(#deployTopo)" strokeWidth="1">
              <circle cx="400" cy="400" r="120" />
              <circle cx="400" cy="400" r="190" />
              <circle cx="400" cy="400" r="260" />
              <circle cx="400" cy="400" r="330" />
              <circle cx="400" cy="400" r="400" />
            </g>
          </svg>
        </div>
      </Parallax>

      <Container size="full" className="relative z-10">
        <div className="max-w-[60ch]">
          <Reveal><Eyebrow signal>deploy</Eyebrow></Reveal>
          <Reveal delay={0.06}><h1 className="text-display-2xl mt-5 text-ink lowercase">we put it on real infrastructure.</h1></Reveal>
          <Reveal delay={0.12}><p className="text-lead mt-6 max-w-[52ch]">Modern infrastructure without the modern infrastructure tax. We pick the boring tools that quietly do their job and we keep them honest with signals you can read at a glance.</p></Reveal>
        </div>
      </Container>
    </section>
  );
}

export default DeployHero;
