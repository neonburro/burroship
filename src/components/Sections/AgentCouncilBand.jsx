// src/components/Sections/AgentCouncilBand.jsx
//
// Per designer: mono type + beacon dots + one short domain word per
// agent. No avatars, no illustrations. Whole band is clickable, with
// a low-key "View automations" label that only appears on hover.
 
import { Link } from "react-router-dom";
 
import Container from "../Layout/Container";
import Eyebrow from "../Atoms/Eyebrow";
import Reveal from "../Atoms/Reveal";
 
const AGENTS = [
  { name: "Warbleur", domain: "Voice", color: "#A8D055" },
  { name: "Cypher",   domain: "Data",  color: "#7BA8C4" },
  { name: "Lyra",     domain: "Tone",  color: "#C9A87C" },
  { name: "Volt",     domain: "Flow",  color: "#FFD166" },
  { name: "Ion",      domain: "Memory", color: "#06D6A0" },
  { name: "Canyon",   domain: "Terrain", color: "#E29578" },
];
 
function AgentCouncilBand() {
  return (
    <section className="bg-bg py-20 md:py-24">
      <Container size="wide">
        <Link
          to="/automate/"
          className="group block border-y border-line py-8 md:py-10 hover:bg-surface/60 transition-colors duration-200"
        >
          <div className="flex items-start justify-between flex-wrap gap-6 mb-8">
            <div>
              <Reveal>
                <Eyebrow>The Council</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="text-display-sm text-ink mt-3 max-w-[44ch]">
                  Six onboard systems. They surface on the maps and in your
                  automations.
                </p>
              </Reveal>
            </div>
 
            <Reveal delay={0.12}>
              <span className="text-mono-sm text-ink-faint opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                View automations →
              </span>
            </Reveal>
          </div>
 
          <Reveal delay={0.18}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-5">
              {AGENTS.map((agent) => (
                <div key={agent.name} className="flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: agent.color,
                      boxShadow: "0 0 0 3px " + agent.color + "1F",
                    }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-mono text-ink truncate">{agent.name}</p>
                    <p className="text-mono-xs text-ink-faint truncate">
                      {agent.domain}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Link>
      </Container>
    </section>
  );
}
 
export default AgentCouncilBand;
