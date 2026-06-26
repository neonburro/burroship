// src/pages/Home/sections/Ventures.jsx
//
// The network. A thin band naming the real ventures as a clickable
// logo collage. Each tile links out to that venture. Logos drop in at
// /ventures/<id>.png. Until art lands each tile shows the venture name
// as a clean placeholder. Clean lowercase content with no oxford
// commas and no dashes.
// v1 · 2026-06-24

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const VENTURES = [
  { id: "madebutter", name: "madebutter", href: "https://madebutter.com", external: true },
  { id: "roasting", name: "roasting lab", href: "#", external: false },
  { id: "vending", name: "vending", href: "#", external: false },
  { id: "trucks", name: "mini trucks", href: "#", external: false },
  { id: "agents", name: "agents", href: "#", external: false },
  { id: "warbler", name: "hooded warbler", href: "#", external: false },
  { id: "neonburro", name: "neon burro", href: "https://neonburro.com", external: true },
  { id: "rewards", name: "rewards", href: "/rewards/", external: false },
];

function Ventures() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" }}>
      <Container size="full" className="relative z-10">
        <div className="max-w-[54ch] mb-12 md:mb-16">
          <Reveal><Eyebrow>the network</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">real things, run under one roof.</h2></Reveal>
          <Reveal delay={0.12}><p className="text-lead mt-5 max-w-[50ch]">Bakery, coffee, vending, trucks, agents and the tools that hold them together. Each one stands on its own and feeds the rest.</p></Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "var(--color-line)" }}>
          {VENTURES.map((v, i) => (
            <Reveal key={v.id} delay={0.05 + i * 0.04} className="h-full"><VentureTile v={v} /></Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function VentureTile({ v }) {
  const external = v.external;
  return (
    <a href={v.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group relative flex items-center justify-center transition-colors duration-300" style={{ background: "var(--color-bg)", aspectRatio: "16 / 9", minHeight: "120px" }}>
      <div aria-hidden="true" className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "var(--color-accent-soft)" }} />
      <span className="relative text-display-sm text-ink-muted group-hover:text-ink transition-colors duration-300 lowercase">{v.name}</span>
      <span aria-hidden="true" className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "var(--color-accent)", boxShadow: "0 0 8px var(--color-accent-glow)" }} />
    </a>
  );
}

export default Ventures;
