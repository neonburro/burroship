// src/components/Layout/Footer.jsx
//
// Common footer. Wordmark, a short line, contact, a single vessel nav
// column and a live status strip. Clean lowercase content with no
// oxford commas and no dashes. Vessel links are placeholders until the
// routes are built. 97% width on desktop and edge to edge on mobile.
// v2 · 2026-06-18 · removed fellowship column

import { Link } from "react-router-dom";
import Container from "./Container";
import Wordmark from "../Atoms/Wordmark";

const VESSEL = [
  { label: "build", to: "/build/" },
  { label: "deploy", to: "/deploy/" },
  { label: "automate", to: "/automate/" },
  { label: "world", to: "/world/" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 w-full" style={{ background: "var(--color-bg)" }}>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: "var(--color-accent)", opacity: 0.55, boxShadow: "0 0 12px var(--color-accent-glow)" }} />

      <Container size="full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-16">
          <div className="md:col-span-6">
            <Link to="/" className="hover:opacity-80 transition-opacity inline-flex"><Wordmark size="22px" /></Link>
            <p className="text-body-sm text-ink-muted max-w-[40ch] leading-relaxed mt-6">Quiet machines for the people who keep things running. Built in the San Juans and sent wherever the work is.</p>
            <a href="mailto:hello@neonburro.com" className="inline-block text-body text-ink hover:text-accent transition-colors duration-200 mt-6">hello@neonburro.com</a>
          </div>

          <div className="md:col-span-3">
            <p className="text-mono-xs text-ink-faint mb-5">vessel</p>
            <ul className="space-y-3">
              {VESSEL.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-body text-ink-muted hover:text-ink transition-colors duration-200 lowercase">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-mono-xs text-ink-faint mb-5">status</p>
            <div className="flex items-center gap-3 mb-4">
              <span className="beacon-dot sm pulse" aria-hidden="true" />
              <span className="text-mono-sm text-ink">signal nominal</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="signal-bars" aria-hidden="true"><span /><span /><span /><span /></span>
              <span className="text-mono-xs text-ink-faint">ridgway colorado &nbsp; 6,985 ft</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ borderTop: "1px solid var(--color-line)" }}>
          <p className="text-mono-xs text-ink-faint">copyright {year} the burroship</p>
          <p className="text-mono-xs text-ink-faint">a small bright thing</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
