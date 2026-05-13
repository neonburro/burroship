// src/components/Sections/AreasGrid.jsx
import Container from "../Layout/Container";
import Eyebrow from "../Atoms/Eyebrow";
import Reveal from "../Atoms/Reveal";
import { Link } from "react-router-dom";
 
const AREAS = [
  {
    slug: "ridgway",
    name: "Ridgway",
    coords: "38.155° N · 107.755° W",
    elevation: "2,080 m",
    blurb: "True Grit town. Trains and rivers and the brewery. The Compound sits just outside.",
    status: "Living",
  },
  {
    slug: "ouray",
    name: "Ouray",
    coords: "38.023° N · 107.671° W",
    elevation: "2,380 m",
    blurb: "Switzerland of America. Box canyon, hot springs, ice park in winter.",
    status: "Living",
  },
  {
    slug: "telluride",
    name: "Telluride",
    coords: "37.938° N · 107.812° W",
    elevation: "2,670 m",
    blurb: "Free gondola, free spirit. A mountain town in a box canyon.",
    status: "Living",
  },
  {
    slug: "mountain-village",
    name: "Mountain Village",
    coords: "37.936° N · 107.856° W",
    elevation: "2,910 m",
    blurb: "Resort village above Telluride, gondola-connected, snow in season.",
    status: "Living",
  },
];
 
function AreasGrid() {
  return (
    <section className="relative bg-bg py-32 md:py-40">
      <Container>
        <div className="max-w-[680px] mb-16 md:mb-20">
          <Reveal>
            <Eyebrow>Four towns. One range.</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-display-lg mt-6 text-ink">
              The places we are mapping.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lead mt-4 text-ink-muted">
              Each town gets its own page with businesses, events, and eventually a
              Gaussian Splat library. Walking the streets without leaving home.
            </p>
          </Reveal>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {AREAS.map((area, idx) => (
            <Reveal key={area.slug} delay={idx * 0.06}>
              <AreaCard area={area} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
 
function AreaCard({ area }) {
  return (
    <Link
      to={"/" + area.slug + "/"}
      className="group block bg-bg p-8 md:p-10 hover:bg-surface transition-colors duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="beacon-dot" aria-hidden="true" />
          <p className="text-mono-sm text-ink-faint">{area.status}</p>
        </div>
        <span
          className="text-mono-sm text-ink-faint group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
          aria-hidden="true"
        >
          →
        </span>
      </div>
 
      <h3 className="text-display-md text-ink mb-3 group-hover:text-accent transition-colors duration-300">
        {area.name}
      </h3>
 
      <p className="text-body text-ink-muted leading-relaxed max-w-[44ch] mb-8">
        {area.blurb}
      </p>
 
      <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-line">
        <div>
          <p className="text-mono-sm text-ink-faint mb-1">Coordinates</p>
          <p className="text-mono text-ink">{area.coords}</p>
        </div>
        <div>
          <p className="text-mono-sm text-ink-faint mb-1">Elevation</p>
          <p className="text-mono text-ink">{area.elevation}</p>
        </div>
      </div>
    </Link>
  );
}
 
export default AreasGrid;
