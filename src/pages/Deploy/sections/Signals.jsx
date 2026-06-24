// src/pages/Deploy/sections/Signals.jsx
//
// Signals strip. A calm operational readout that the vessel is moving.
// Reuses the beacon and signal bar language from the rest of the site.
// Clean lowercase content with no oxford commas and no dashes.
// v1 · 2026-06-18

import Container from "../../../components/Layout/Container";
import Reveal from "../../../components/Atoms/Reveal";

const READOUTS = [
  { label: "uptime", value: "99.9 percent" },
  { label: "last deploy", value: "minutes ago" },
  { label: "regions", value: "global edge" },
  { label: "rollbacks", value: "one click" },
];

function Signals() {
  return (
    <section className="relative py-20 md:py-28 w-full overflow-hidden" style={{ background: "var(--color-surface-engine)", borderTop: "1px solid var(--color-line)" }}>
      <Container size="full">
        <Reveal>
          <div className="flex items-center gap-3 mb-12">
            <span className="beacon-dot sm pulse" aria-hidden="true" />
            <span className="text-mono-sm text-ink">signal nominal</span>
            <span className="signal-bars ml-2" aria-hidden="true"><span /><span /><span /><span /></span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "var(--color-line)" }}>
          {READOUTS.map((r, i) => (
            <Reveal key={r.label} delay={0.06 + i * 0.06} className="h-full">
              <div className="h-full p-7 md:p-9" style={{ background: "var(--color-surface-engine)" }}>
                <p className="text-mono-xs text-ink-faint mb-3">{r.label}</p>
                <p className="text-display-sm text-ink lowercase">{r.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Signals;
