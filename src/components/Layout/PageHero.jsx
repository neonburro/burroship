// src/components/Layout/PageHero.jsx
//
// Shared inner page hero. Quieter than the homepage approach. An
// eyebrow, a lowercase headline and a lead line over the signature
// topo wash. Reused by build, deploy and automate so every inner
// page opens the same way.
// v1 · 2026-06-18

import Container from "./Container";
import Eyebrow from "../Atoms/Eyebrow";
import Reveal from "../Atoms/Reveal";

function PageHero({ eyebrow, title, lead }) {
  return (
    <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 w-full overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ opacity: 0.6 }}>
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full" style={{ minWidth: "1100px" }}>
          <defs>
            <radialGradient id="pageTopo" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.12" />
              <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.05" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g fill="none" stroke="url(#pageTopo)" strokeWidth="1">
            <circle cx="500" cy="400" r="150" />
            <circle cx="500" cy="400" r="230" />
            <circle cx="500" cy="400" r="310" />
            <circle cx="500" cy="400" r="390" />
            <circle cx="500" cy="400" r="470" />
          </g>
        </svg>
      </div>

      <Container size="full" className="relative z-10">
        <div className="max-w-[60ch]">
          <Reveal><Eyebrow signal>{eyebrow}</Eyebrow></Reveal>
          <Reveal delay={0.06}><h1 className="text-display-2xl mt-5 text-ink lowercase">{title}</h1></Reveal>
          {lead && <Reveal delay={0.12}><p className="text-lead mt-6 max-w-[52ch]">{lead}</p></Reveal>}
        </div>
      </Container>
    </section>
  );
}

export default PageHero;
