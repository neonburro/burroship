// src/components/Sections/Hero.jsx
import Container from "../Layout/Container";
import Eyebrow from "../Atoms/Eyebrow";
import Button from "../Atoms/Button";
import TopoLines from "../Atoms/TopoLines";
import Reveal from "../Atoms/Reveal";
 
function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden">
      <TopoLines size={680} position="top-right" intensity="medium" />
 
      <Container size="wide" className="relative z-10">
        <div className="max-w-[18ch]">
          <Reveal delay={0}>
            <Eyebrow>
              <span className="beacon-dot mr-2" aria-hidden="true" />
              San Juan Mountains · Ridgway
            </Eyebrow>
          </Reveal>
 
          <Reveal delay={0.08}>
            <h1 className="text-display-2xl mt-6 text-ink">
              Build. Deploy.{" "}
              <em className="italic text-accent">Automate.</em>
            </h1>
          </Reveal>
        </div>
 
        <div className="mt-10 max-w-[52ch]">
          <Reveal delay={0.16}>
            <p className="text-lead">
              A working compound in the Cimarron Range. An agent council
              building small business automation. Tracked airships, mapped
              towns, a real place you can visit.
            </p>
          </Reveal>
        </div>
 
        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Button to="/world/" variant="primary" arrow>
              Board The Burroship
            </Button>
            <Button to="/build/" variant="ghost">
              See what we build
            </Button>
          </div>
        </Reveal>
 
        <Reveal delay={0.36}>
          <div className="mt-20 md:mt-24 grid grid-cols-3 gap-8 max-w-[640px]">
            <Stat label="Towns mapped" value="4" />
            <Stat label="Agents in council" value="6" />
            <Stat label="Cruise altitude" value="18kft" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
 
function Stat({ label, value }) {
  return (
    <div>
      <p className="text-mono-sm text-ink-faint mb-2">{label}</p>
      <p className="text-display-sm text-ink">{value}</p>
    </div>
  );
}
 
export default Hero;
