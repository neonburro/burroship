// src/components/Sections/Closer.jsx
import Container from "../Layout/Container";
import Button from "../Atoms/Button";
import Eyebrow from "../Atoms/Eyebrow";
import TopoLines from "../Atoms/TopoLines";
import Reveal from "../Atoms/Reveal";
 
function Closer() {
  return (
    <section className="relative bg-bg py-32 md:py-40 overflow-hidden">
      <TopoLines size={520} position="bottom-right" intensity="medium" />
      <TopoLines size={420} position="top-left" intensity="subtle" />
 
      <Container size="reading" className="relative z-10">
        <Reveal>
          <Eyebrow>Come up the mountain.</Eyebrow>
        </Reveal>
 
        <Reveal delay={0.08}>
          <h2 className="text-display-xl mt-6 text-ink max-w-[18ch]">
            Or just{" "}
            <em className="italic text-accent">watch the airship</em> from
            anywhere.
          </h2>
        </Reveal>
 
        <Reveal delay={0.16}>
          <p className="text-lead mt-8 text-ink-muted max-w-[48ch]">
            The Burroship lives at one URL. The cruise loops day and night. New
            beacons appear when we add them. You don't need an account.
          </p>
        </Reveal>
 
        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Button to="/world/" variant="primary" arrow>
              Board The Burroship
            </Button>
            <Button to="/build/" variant="text" arrow>
              See what we are building
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
 
export default Closer;
