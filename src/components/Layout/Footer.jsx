// src/components/Layout/Footer.jsx
//
// Common footer, now a floating rounded bar that bookends the nav. Same measure as
// the hero and the nav, 99.5% on mobile and 97% on desktop, our darkest dark with
// the blue-gray ground showing all around it and barely rounded corners. Text goes
// light on the dark surface, using the dark map tokens so it always reads. The ship
// mark is the bare chrome logo since the surface itself is already black.
// v3 · floating rounded dark bar.

import { Link } from "react-router-dom";
import Wordmark from "../Atoms/Wordmark";
import ShipMark from "../Atoms/ShipMark";

const VESSEL = [
  { label: "build", to: "/build/" },
  { label: "deploy", to: "/deploy/" },
  { label: "automate", to: "/automate/" },
  { label: "world", to: "/world/" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full pt-8 pb-4 md:pb-6">
      <div
        className="mx-auto w-[99.5%] md:w-[97%] relative overflow-hidden"
        style={{ background: "var(--color-gray-900)", borderRadius: "22px", border: "1px solid var(--color-line-strong)" }}
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: "var(--color-accent)", opacity: 0.5, boxShadow: "0 0 12px var(--color-accent-glow)" }} />

        <div className="px-6 md:px-12 pt-14 pb-10" style={{ color: "var(--color-dark-ink)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-14">
            <div className="md:col-span-6">
              <Link to="/" className="hover:opacity-80 transition-opacity inline-flex items-center gap-2.5">
                <ShipMark height={28} />
                <Wordmark size="22px" color="#FFFFFF" />
              </Link>
              <p className="text-body-sm max-w-[40ch] leading-relaxed mt-6" style={{ color: "var(--color-dark-ink-muted)" }}>Quiet machines for the people who keep things running. Built in the San Juans and sent wherever the work is.</p>
              <a href="mailto:hello@neonburro.com" className="inline-block text-body mt-6 transition-colors duration-200" style={{ color: "var(--color-dark-ink)" }}>hello@neonburro.com</a>
            </div>

            <div className="md:col-span-3">
              <p className="text-mono-xs mb-5" style={{ color: "var(--color-dark-ink-faint)" }}>vessel</p>
              <ul className="space-y-3">
                {VESSEL.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-body lowercase transition-colors duration-200 hover:text-accent" style={{ color: "var(--color-dark-ink-muted)" }}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <p className="text-mono-xs mb-5" style={{ color: "var(--color-dark-ink-faint)" }}>status</p>
              <div className="flex items-center gap-3 mb-4">
                <span className="beacon-dot sm pulse" aria-hidden="true" />
                <span className="text-mono-sm" style={{ color: "var(--color-dark-ink)" }}>signal nominal</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="signal-bars" aria-hidden="true"><span /><span /><span /><span /></span>
                <span className="text-mono-xs" style={{ color: "var(--color-dark-ink-faint)" }}>ridgway colorado &nbsp; 6,985 ft</span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-mono-xs" style={{ color: "var(--color-dark-ink-faint)" }}>copyright {year} the burroship</p>
            <p className="text-mono-xs" style={{ color: "var(--color-dark-ink-faint)" }}>a small bright thing</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
