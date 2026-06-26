// src/pages/Home/sections/Operations.jsx
//
// Operations. The unglamorous competence. We do not only launch the
// ventures, we run them day to day. A clean readout of the moving
// parts. Clean lowercase content with no oxford commas and no dashes.
// v1 · 2026-06-24

import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const OPS = [
  { label: "kitchens", line: "Order ahead, prep flow, stock gating and pickup that does not feel rushed." },
  { label: "vending", line: "Owned machines tracked from one place. Restock, repair and demand by location." },
  { label: "payments", line: "Checkout, webhooks and clean books across every outlet we run." },
  { label: "comms", line: "The hooded warbler keeps clients and guests in the loop without the noise." },
];

function Operations() {
  return (
    <section className="relative py-24 md:py-36 w-full overflow-hidden" style={{ background: "var(--color-surface-engine)", borderTop: "1px solid var(--color-line)" }}>
      <Container size="full" className="relative z-10">
        <div className="max-w-[54ch] mb-14 md:mb-20">
          <Reveal><Eyebrow signal>operations</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="text-display-xl mt-5 text-ink lowercase">we keep them running.</h2></Reveal>
          <Reveal delay={0.12}><p className="text-lead mt-5 max-w-[50ch]">Launching is the easy part. The real work is the quiet daily operation behind every outlet.</p></Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: "var(--color-line)" }}>
          {OPS.map((o, i) => (
            <Reveal key={o.label} delay={0.08 + i * 0.06} className="h-full">
              <div className="h-full flex flex-col p-8 md:p-10" style={{ background: "var(--color-surface-engine)" }}>
                <h3 className="text-display-sm text-ink mb-3 lowercase">{o.label}</h3>
                <p className="text-body-sm text-ink-muted">{o.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Operations;
