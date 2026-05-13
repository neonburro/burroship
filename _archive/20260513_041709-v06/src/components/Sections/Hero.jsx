// src/components/Sections/Hero.jsx
import Container from "../Layout/Container";
import Eyebrow from "../Atoms/Eyebrow";
import Button from "../Atoms/Button";
import TopoLines from "../Atoms/TopoLines";
import Reveal from "../Atoms/Reveal";
 
function Hero() {
  return (
    <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      <TopoLines size={560} position="top-right" intensity="subtle" />
 
      <Container size="wide" className="relative z-10">
        <div className="max-w-[44ch]">
          <Reveal delay={0}>
            <Eyebrow>
              <span className="beacon-dot mr-2" aria-hidden="true" />
              San Juan Mountains · Ridgway
            </Eyebrow>
          </Reveal>
 
          <Reveal delay={0.06}>
            <h1 className="text-display-2xl mt-5 text-ink">
              Build. Deploy. Automate.
            </h1>
          </Reveal>
        </div>
 
        <Reveal delay={0.14}>
          <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-7">
              <p className="text-lead max-w-[54ch]">
                A working compound in the Cimarron Range. An agent council
                building small business automation.{" "}
                <span className="text-serif-accent text-ink">A real place</span>{" "}
                you can visit.
              </p>
 
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button to="/world/" variant="primary" arrow>
                  Board the airship
                </Button>
                <Button to="/build/" variant="ghost">
                  See what we build
                </Button>
              </div>
            </div>
 
            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-5 md:gap-6 pt-4 md:pt-0 md:border-l md:border-line md:pl-10">
                <Spec label="Mode" value="Cruise" />
                <Spec label="Altitude" value="18,000 ft" />
                <Spec label="Coordinates" value="38.15° N · 107.75° W" wide />
                <Spec label="Towns online" value="4 / 4" />
                <Spec label="Agents on deck" value="6" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
 
function Spec({ label, value, wide = false }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-mono-xs text-ink-faint mb-1.5">{label}</p>
      <p className="text-mono text-ink">{value}</p>
    </div>
  );
}
 
export default Hero;
