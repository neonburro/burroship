// src/pages/Build/index.jsx
import Container from "../../components/Layout/Container";
import Eyebrow from "../../components/Atoms/Eyebrow";
import TopoLines from "../../components/Atoms/TopoLines";
import Reveal from "../../components/Atoms/Reveal";
import Button from "../../components/Atoms/Button";
 
function Build() {
  return (
    <main id="main" className="relative pt-32 md:pt-40 pb-32 overflow-hidden min-h-screen">
      <TopoLines size={620} position="top-right" intensity="medium" />
 
      <Container size="wide" className="relative z-10">
        <div className="max-w-[20ch]">
          <Reveal>
            <Eyebrow>Phase 01</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-display-2xl mt-6 text-ink">
              <em className="italic text-accent">Build.</em>
            </h1>
          </Reveal>
        </div>
 
        <Reveal delay={0.16}>
          <p className="text-lead mt-10 max-w-[52ch]">
            Sites, dashboards, internal tools, custom CRMs. Hand-crafted for the
            people who run them. We use modern stacks, but we never make you
            adopt them.
          </p>
        </Reveal>
 
        <Reveal delay={0.24}>
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden max-w-[1100px]">
            <BuildCard
              num="01"
              title="Marketing sites"
              body="Static where it can be, dynamic where it needs to be. Lighthouse 100 by default."
            />
            <BuildCard
              num="02"
              title="Internal dashboards"
              body="Operations tooling for teams who outgrew the spreadsheet but don't want SaaS."
            />
            <BuildCard
              num="03"
              title="Custom platforms"
              body="Multi-tenant systems, agent infrastructure, the harder stuff. Cimarron Engineering is one."
            />
          </div>
        </Reveal>
 
        <Reveal delay={0.32}>
          <div className="mt-20 flex flex-wrap items-center gap-3">
            <Button to="/world/" variant="primary" arrow>
              See the working compound
            </Button>
            <Button to="/" variant="text">
              Back home
            </Button>
          </div>
        </Reveal>
 
        <Reveal delay={0.4}>
          <p className="mt-24 text-mono-sm text-ink-faint italic" style={{ fontFamily: "var(--font-display)", fontSize: "14px", letterSpacing: "0", textTransform: "none" }}>
            Full case studies coming soon. We're picky about what we ship.
          </p>
        </Reveal>
      </Container>
    </main>
  );
}
 
function BuildCard({ num, title, body }) {
  return (
    <div className="bg-bg p-8 md:p-10">
      <p className="text-mono-sm text-ink-faint mb-6">{num}</p>
      <h3 className="text-display-sm text-ink mb-3">{title}</h3>
      <p className="text-body text-ink-muted leading-relaxed max-w-[36ch]">
        {body}
      </p>
    </div>
  );
}
 
export default Build;
