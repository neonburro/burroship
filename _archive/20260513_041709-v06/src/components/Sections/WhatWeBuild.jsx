// src/components/Sections/WhatWeBuild.jsx
import { Link } from "react-router-dom";
 
import Container from "../Layout/Container";
import Eyebrow from "../Atoms/Eyebrow";
import Reveal from "../Atoms/Reveal";
 
const CHIPS = [
  {
    to: "/build/",
    label: "Build",
    desc: "Marketing sites, custom dashboards, internal tools.",
    num: "01",
  },
  {
    to: "/deploy/",
    label: "Deploy",
    desc: "Modern infrastructure without the modern infrastructure tax.",
    num: "02",
  },
  {
    to: "/automate/",
    label: "Automate",
    desc: "A council of six agents that makes the boring work boring.",
    num: "03",
  },
];
 
function WhatWeBuild() {
  return (
    <section className="bg-surface border-y border-line py-16 md:py-20">
      <Container size="wide">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-mono-sm text-ink-faint">Three modes · One ship</p>
          </Reveal>
        </div>
 
        <div className="grid md:grid-cols-3 gap-5">
          {CHIPS.map((chip, idx) => (
            <Reveal key={chip.to} delay={idx * 0.06}>
              <Link
                to={chip.to}
                className="group block bg-bg border border-line rounded-xl p-6 hover:border-accent transition-all duration-200 h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <p className="text-mono-xs text-ink-faint">{chip.num}</p>
                  <span
                    aria-hidden="true"
                    className="text-mono-sm text-ink-faint group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200"
                  >
                    →
                  </span>
                </div>
                <h3 className="text-display-md text-ink mb-2 group-hover:text-accent transition-colors duration-200">
                  {chip.label}
                </h3>
                <p className="text-body-sm text-ink-muted leading-relaxed">
                  {chip.desc}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
 
export default WhatWeBuild;
