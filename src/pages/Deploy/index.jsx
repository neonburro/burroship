// src/pages/Deploy/index.jsx
import Container from "../../components/Layout/Container";
import Eyebrow from "../../components/Atoms/Eyebrow";
import TopoLines from "../../components/Atoms/TopoLines";
import Reveal from "../../components/Atoms/Reveal";
import Button from "../../components/Atoms/Button";
 
function Deploy() {
  return (
    <main id="main" className="relative pt-32 md:pt-40 pb-32 overflow-hidden min-h-screen">
      <TopoLines size={620} position="top-left" intensity="medium" />
 
      <Container size="wide" className="relative z-10">
        <div className="max-w-[20ch]">
          <Reveal>
            <Eyebrow>Phase 02</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-display-2xl mt-6 text-ink">
              <em className="italic text-accent">Deploy.</em>
            </h1>
          </Reveal>
        </div>
 
        <Reveal delay={0.16}>
          <p className="text-lead mt-10 max-w-[52ch]">
            Modern infrastructure without the modern infrastructure tax.
            Netlify, Supabase, Cesium, Mapbox. We pick the boring tools that
            quietly do their job.
          </p>
        </Reveal>
 
        <Reveal delay={0.24}>
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden max-w-[1100px]">
            <DeployCard
              num="01"
              title="Continuous deploys"
              body="Every push goes to production. Every PR gets a preview. The old way is gone."
            />
            <DeployCard
              num="02"
              title="Real databases"
              body="Postgres via Supabase. Row-level security. Realtime when it matters. Pulse admin where useful."
            />
            <DeployCard
              num="03"
              title="Beautiful maps"
              body="Cesium for cinematic. Mapbox for utility. Gaussian Splats for the future."
            />
          </div>
        </Reveal>
 
        <Reveal delay={0.32}>
          <div className="mt-20 flex flex-wrap items-center gap-3">
            <Button to="/automate/" variant="primary" arrow>
              Next: Automate
            </Button>
            <Button to="/" variant="text">
              Back home
            </Button>
          </div>
        </Reveal>
 
        <Reveal delay={0.4}>
          <p className="mt-24 text-mono-sm text-ink-faint italic" style={{ fontFamily: "var(--font-display)", fontSize: "14px", letterSpacing: "0", textTransform: "none" }}>
            We deploy on Tuesdays when we can help it. Mondays are for thinking.
          </p>
        </Reveal>
      </Container>
    </main>
  );
}
 
function DeployCard({ num, title, body }) {
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
 
export default Deploy;
