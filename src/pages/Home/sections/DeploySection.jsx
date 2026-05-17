// src/pages/Home/sections/DeploySection.jsx
//
// Section 02 · Deploy · The Engine Room.
//
// Operational credibility. Real infrastructure made visible. The
// dev/staging/production triad with live beacons. Subtly darker
// surface (warm off-white) for the engine-room feel.
 
import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";
import Button from "../../../components/Atoms/Button";
 
const ENVIRONMENTS = [
  {
    code: "DEV",
    name: "Development",
    status: "Active",
    detail: "Vessel under construction",
    region: "Localhost",
  },
  {
    code: "STG",
    name: "Staging",
    status: "Holding",
    detail: "Awaiting final review",
    region: "Netlify Preview",
  },
  {
    code: "PRD",
    name: "Production",
    status: "Live",
    detail: "Cruising. Uptime nominal",
    region: "Netlify. Supabase",
    live: true,
  },
];
 
function DeploySection() {
  return (
    <section
      className="relative py-24 md:py-32 border-t border-line"
      style={{ background: "var(--color-surface-engine)" }}
    >
      <Container size="wide">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
 
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Section 02 · Deploy</Eyebrow>
            </Reveal>
 
            <Reveal delay={0.06}>
              <h2 className="text-display-lg mt-5 text-ink">
                The engine room.
              </h2>
            </Reveal>
 
            <Reveal delay={0.12}>
              <p className="text-lead mt-5 max-w-[44ch]">
                The systems run on real infrastructure. Continuous
                deploys, three environments, signals visible from anywhere.
                The room where the vessel is actually moving.
              </p>
            </Reveal>
 
            <Reveal delay={0.2}>
              <div className="mt-10">
                <Button to="/deploy/" variant="operational" arrow>
                  Open the room
                </Button>
              </div>
            </Reveal>
          </div>
 
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <div className="grid sm:grid-cols-3 gap-3">
                {ENVIRONMENTS.map((env) => (
                  <EnvironmentCard key={env.code} env={env} />
                ))}
              </div>
            </Reveal>
 
            <Reveal delay={0.24}>
              <div className="mt-6 pt-6 border-t border-line flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="beacon-dot pulse" aria-hidden="true" />
                  <span className="text-mono-sm text-ink">
                    Signal nominal
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="signal-bars" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="text-mono-xs text-ink-faint">UPTIME</span>
                  </div>
                  <span className="text-mono-xs text-ink-faint">
                    Last deploy. 12 min ago
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
 
        </div>
      </Container>
    </section>
  );
}
 
function EnvironmentCard({ env }) {
  return (
    <div className="bg-bg border border-line rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-mono-xs text-ink-faint">{env.code}</span>
        {env.live ? (
          <span className="beacon-dot sm pulse" aria-hidden="true" />
        ) : (
          <span
            className="w-1.5 h-1.5 rounded-full bg-ink-faint"
            aria-hidden="true"
          />
        )}
      </div>
      <p className="text-display-sm text-ink mb-1">{env.name}</p>
      <p
        className={
          "text-mono-sm mb-3 " + (env.live ? "text-accent" : "text-ink-muted")
        }
      >
        {env.status}
      </p>
      <p className="text-body-sm text-ink-muted leading-relaxed">
        {env.detail}
      </p>
      <p className="text-mono-xs text-ink-faint mt-4 pt-3 border-t border-line">
        {env.region}
      </p>
    </div>
  );
}
 
export default DeploySection;
