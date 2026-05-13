// src/pages/Automate/index.jsx
import Container from "../../components/Layout/Container";
import Eyebrow from "../../components/Atoms/Eyebrow";
import TopoLines from "../../components/Atoms/TopoLines";
import Reveal from "../../components/Atoms/Reveal";
import Button from "../../components/Atoms/Button";
 
function Automate() {
  return (
    <main id="main" className="relative pt-32 md:pt-40 pb-32 overflow-hidden min-h-screen">
      <TopoLines size={680} position="bottom-right" intensity="medium" />
 
      <Container size="wide" className="relative z-10">
        <div className="max-w-[20ch]">
          <Reveal>
            <Eyebrow>Phase 03</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-display-2xl mt-6 text-ink">
              <em className="italic text-accent">Automate.</em>
            </h1>
          </Reveal>
        </div>
 
        <Reveal delay={0.16}>
          <p className="text-lead mt-10 max-w-[54ch]">
            A council of six agents. Warbleur, Cypher, Lyra, Volt, Ion, Canyon.
            Each one a specialist. Together they make the boring work boring
            again.
          </p>
        </Reveal>
 
        <Reveal delay={0.24}>
          <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-[920px]">
            <AgentCard name="Warbleur" role="Voice & calls" beacon="#A8D055" />
            <AgentCard name="Cypher" role="Security & secrets" beacon="#7BA8C4" />
            <AgentCard name="Lyra" role="Tone & writing" beacon="#C9A87C" />
            <AgentCard name="Volt" role="Workflows & triggers" beacon="#FFD166" />
            <AgentCard name="Ion" role="Data & memory" beacon="#06D6A0" />
            <AgentCard name="Canyon" role="Maps & places" beacon="#E29578" />
          </div>
        </Reveal>
 
        <Reveal delay={0.32}>
          <div className="mt-20 flex flex-wrap items-center gap-3">
            <Button to="/world/" variant="primary" arrow>
              Meet them in the world
            </Button>
            <Button to="/" variant="text">
              Back home
            </Button>
          </div>
        </Reveal>
 
        <Reveal delay={0.4}>
          <p className="mt-24 text-mono-sm text-ink-faint italic" style={{ fontFamily: "var(--font-display)", fontSize: "14px", letterSpacing: "0", textTransform: "none" }}>
            The agents are not chatbots. The agents are working on it.
          </p>
        </Reveal>
      </Container>
    </main>
  );
}
 
function AgentCard({ name, role, beacon }) {
  return (
    <div className="bg-bg border border-line rounded-2xl p-6 md:p-8 hover:border-accent transition-colors duration-300">
      <div className="flex items-start gap-4">
        <div
          className="mt-1 w-3 h-3 rounded-full flex-shrink-0"
          style={{
            background: beacon,
            boxShadow: "0 0 0 4px " + beacon + "20",
          }}
          aria-hidden="true"
        />
        <div>
          <h3 className="text-display-sm text-ink">{name}</h3>
          <p className="text-mono-sm text-ink-faint mt-2">{role}</p>
        </div>
      </div>
    </div>
  );
}
 
export default Automate;
