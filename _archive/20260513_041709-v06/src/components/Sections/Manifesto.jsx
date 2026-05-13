// src/components/Sections/Manifesto.jsx
import Container from "../Layout/Container";
import Eyebrow from "../Atoms/Eyebrow";
import TopoLines from "../Atoms/TopoLines";
import Reveal from "../Atoms/Reveal";
 
function Manifesto() {
  return (
    <section className="relative bg-surface py-32 md:py-40 overflow-hidden">
      <TopoLines size={580} position="left-center" intensity="subtle" />
 
      <Container size="reading" className="relative z-10">
        <Reveal>
          <Eyebrow>Field notes</Eyebrow>
        </Reveal>
 
        <Reveal delay={0.08}>
          <h2 className="text-display-lg mt-6 text-ink">
            We are building one good thing in one good place.
          </h2>
        </Reveal>
 
        <div className="mt-12 space-y-8 text-ink-muted text-lg leading-relaxed">
          <Reveal delay={0.16}>
            <p>
              The Burroship is a working compound in Ridgway, Colorado. A
              physical place. We are also a small agency that builds and
              automates for clients across the Western Slope and beyond.
              Sometimes those are the same thing.
            </p>
          </Reveal>
 
          <Reveal delay={0.24}>
            <p>
              We chose this range, this town, this elevation on purpose. The
              San Juans are not the easiest place to be online. They are the
              right place to be online from. Slow internet keeps you honest.
              The view does the rest.
            </p>
          </Reveal>
 
          <Reveal delay={0.32}>
            <p>
              An airship cruises overhead at 18,000 feet. It is real to us. It
              is the lobby of the website, the cover of the book, the trailer
              for whatever we ship next. If that sounds like a metaphor, it
              isn't yet, but it will be.
            </p>
          </Reveal>
        </div>
 
        <Reveal delay={0.48}>
          <p className="mt-16 text-mono-sm text-ink-faint italic" style={{ fontFamily: "var(--font-display)", fontSize: "15px", letterSpacing: "0", textTransform: "none" }}>
            — From the StackHouse, May 2026
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
 
export default Manifesto;
