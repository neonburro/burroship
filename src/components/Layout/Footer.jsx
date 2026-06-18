// src/components/Layout/Footer.jsx
//
// Common footer for every page. Single dark sky-blue system.

import { Link } from "react-router-dom";
import Container from "./Container";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-16 pb-10" style={{ background: "var(--color-bg)" }}>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: "var(--color-accent)", opacity: 0.6, boxShadow: "0 0 12px var(--color-accent-glow)" }} />

      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-14">
          <div className="md:col-span-6">
            <Link to="/" className="inline-flex items-end text-ink hover:opacity-80 transition-opacity" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "20px", letterSpacing: "-0.04em", textTransform: "lowercase" }}>
              theburroship
              <span aria-hidden="true" style={{ display: "inline-block", width: "0.16em", height: "0.16em", borderRadius: "50%", marginLeft: "0.04em", marginBottom: "0.16em", background: "var(--color-accent)", boxShadow: "0 0 10px var(--color-accent-glow)" }} />
            </Link>
            <p className="text-body-sm text-ink-muted max-w-[42ch] leading-relaxed mt-5">
              A working compound in the San Juans. Sites, infrastructure, and a council of working agents. Build. Deploy. Automate.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="beacon-dot sm pulse" aria-hidden="true" />
              <span className="text-mono-xs text-ink-faint">Ridgway, Colorado · 38.155° N · 6,985 ft</span>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <p className="text-mono-xs text-ink-faint mb-5">Contact</p>
            <a href="mailto:hello@neonburro.com" className="text-body text-ink-muted hover:text-ink transition-colors duration-200">hello@neonburro.com</a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ borderTop: "1px solid var(--color-line)" }}>
          <div className="flex items-center gap-6 flex-wrap">
            <p className="text-mono-xs text-ink-faint">© {year} The Burroship</p>
            <div className="flex items-center gap-2">
              <span className="signal-bars" aria-hidden="true"><span /><span /><span /><span /></span>
              <span className="text-mono-xs text-ink-faint">Signal nominal</span>
            </div>
          </div>
          <p className="text-mono-xs text-ink-faint">A small bright thing</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
