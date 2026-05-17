// src/pages/Home/sections/AutomateSection.jsx
//
// Section 03 · Automate · The Bridge.
//
// The coordination layer. Six agents emerge as onboard systems,
// not characters. Subtle layered-signal motif behind the names
// hints at orbital coordination without ever announcing it.
 
import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";
import Button from "../../../components/Atoms/Button";
 
const AGENTS = [
  { name: "Warbleur", role: "Voice",   color: "#A8D055" },
  { name: "Cypher",   role: "Data",    color: "#7BA8C4" },
  { name: "Lyra",     role: "Tone",    color: "#C9A87C" },
  { name: "Volt",     role: "Flow",    color: "#FFD166" },
  { name: "Ion",      role: "Memory",  color: "#06D6A0" },
  { name: "Canyon",   role: "Terrain", color: "#E29578" },
];
 
function AutomateSection() {
  return (
    <section className="relative bg-bg py-24 md:py-32 border-t border-line overflow-hidden">
      <ArcBackdrop />
 
      <Container size="wide" className="relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
 
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Section 03 · Automate</Eyebrow>
            </Reveal>
 
            <Reveal delay={0.06}>
              <h2 className="text-display-lg mt-5 text-ink">
                The bridge.
              </h2>
            </Reveal>
 
            <Reveal delay={0.12}>
              <p className="text-lead mt-5 max-w-[44ch]">
                Six onboard systems coordinating the work. They monitor
                signals, manage flow, hold context, and answer when
                called. Not assistants. Operational intelligence.
              </p>
            </Reveal>
 
            <Reveal delay={0.2}>
              <div className="mt-10">
                <Button to="/automate/" variant="operational" arrow>
                  Open the bridge
                </Button>
              </div>
            </Reveal>
          </div>
 
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AGENTS.map((agent) => (
                  <AgentTile key={agent.name} agent={agent} />
                ))}
              </div>
            </Reveal>
 
            <Reveal delay={0.28}>
              <div className="mt-6 pt-6 border-t border-line flex items-center gap-3">
                <span className="beacon-dot pulse" aria-hidden="true" />
                <span className="text-mono-sm text-ink">
                  Council operational
                </span>
                <span className="text-mono-xs text-ink-faint ml-auto">
                  Six systems online
                </span>
              </div>
            </Reveal>
          </div>
 
        </div>
      </Container>
    </section>
  );
}
 
function AgentTile({ agent }) {
  return (
    <div className="bg-bg border border-line rounded-xl p-5 hover:border-accent transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{
            background: agent.color,
            boxShadow: "0 0 0 3px " + agent.color + "1F",
          }}
          aria-hidden="true"
        />
        <span className="text-mono-xs text-ink-faint">{agent.role}</span>
      </div>
      <p className="text-display-sm text-ink">{agent.name}</p>
    </div>
  );
}
 
function ArcBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -right-32 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none"
      width="800"
      height="800"
      viewBox="0 0 800 800"
      fill="none"
    >
      <defs>
        <linearGradient id="arc-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7AB300" stopOpacity="0" />
          <stop offset="50%" stopColor="#7AB300" stopOpacity="1" />
          <stop offset="100%" stopColor="#7AB300" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="400" cy="400" r="180" stroke="url(#arc-fade)" strokeWidth="1" />
      <circle cx="400" cy="400" r="260" stroke="url(#arc-fade)" strokeWidth="1" />
      <circle cx="400" cy="400" r="340" stroke="url(#arc-fade)" strokeWidth="1" />
      <circle cx="400" cy="400" r="420" stroke="url(#arc-fade)" strokeWidth="1" />
      <circle cx="400" cy="400" r="500" stroke="url(#arc-fade)" strokeWidth="1" />
    </svg>
  );
}
 
export default AutomateSection;
