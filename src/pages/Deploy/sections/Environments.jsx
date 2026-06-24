// src/pages/Deploy/sections/Environments.jsx
//
// The three environments. Dev staging production as a clean aligned
// triptych with a live beacon on production. Left aligned header with
// cards underneath on desktop and a clean full width stack on mobile.
// Clean lowercase content with no oxford commas and no dashes.
// v1 · 2026-06-18

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const ENVS = [
  { code: "dev", name: "development", state: "under construction", region: "localhost" },
  { code: "stg", name: "staging", state: "awaiting review", region: "preview" },
  { code: "prd", name: "production", state: "live and cruising", region: "netlify and supabase", live: true },
];

function Environments() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" }}>
      <div className="absolute inset-0 schematic-grid schematic-grid-fade pointer-events-none" aria-hidden="true" />

      <Container size="full" className="relative z-10">
        <div className="max-w-[54ch] mb-14 md:mb-20">
          <Reveal><Eyebrow signal>the environments</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">three rooms. one current.</h2></Reveal>
          <Reveal delay={0.12}><p className="text-lead mt-5 max-w-[50ch]">Work flows from one room to the next and never skips a step. Nothing reaches production without earning it.</p></Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--color-line)" }}>
          {ENVS.map((env, i) => (
            <Reveal key={env.code} delay={0.08 + i * 0.07} className="h-full"><EnvCard env={env} /></Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function EnvCard({ env }) {
  return (
    <div className="h-full flex flex-col p-8 md:p-12" style={{ background: "var(--color-bg)" }}>
      <div className="flex items-center justify-between mb-8">
        <span className="text-mono-xs text-ink-faint">{env.code}</span>
        {env.live ? (
          <span className="beacon-dot sm pulse" aria-hidden="true" />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-ink-faint)" }} aria-hidden="true" />
        )}
      </div>
      <h3 className="text-display-md text-ink mb-3 lowercase">{env.name}</h3>
      <p className="text-body-sm mb-8" style={{ color: env.live ? "var(--color-accent)" : "var(--color-ink-muted)" }}>{env.state}</p>
      <p className="text-mono-xs text-ink-faint mt-auto pt-5" style={{ borderTop: "1px solid var(--color-line)" }}>{env.region}</p>
    </div>
  );
}

export default Environments;
