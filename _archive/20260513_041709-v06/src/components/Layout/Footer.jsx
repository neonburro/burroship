// src/components/Layout/Footer.jsx
import { Link } from "react-router-dom";
 
import Container from "./Container";
import TopoLines from "../Atoms/TopoLines";
 
const AREAS = [
  { to: "/ridgway/", label: "Ridgway" },
  { to: "/ouray/", label: "Ouray" },
  { to: "/telluride/", label: "Telluride" },
  { to: "/mountain-village/", label: "Mountain Village" },
];
 
const BURROSHIP_LINKS = [
  { to: "/world/", label: "The Burroship", accent: true },
  { to: "/build/", label: "Build" },
  { to: "/deploy/", label: "Deploy" },
  { to: "/automate/", label: "Automate" },
];
 
const COMPOUND_LINKS = [
  { to: "/about/", label: "About" },
  { to: "/manifesto/", label: "Manifesto" },
  { to: "/field-notes/", label: "Field Notes" },
];
 
function FooterColumn({ heading, links }) {
  return (
    <div>
      <p className="text-mono-sm text-ink-faint mb-6">{heading}</p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={
                "text-body inline-flex items-center gap-2 transition-colors duration-200 " +
                (link.accent
                  ? "text-ink hover:text-accent"
                  : "text-ink-muted hover:text-ink")
              }
            >
              {link.accent && <span className="beacon-dot" aria-hidden="true" />}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
function Footer() {
  const year = new Date().getFullYear();
 
  return (
    <footer className="relative bg-bg border-t border-line pt-24 pb-10 overflow-hidden">
      <TopoLines size={520} position="bottom-right" intensity="subtle" />
 
      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8 mb-20">
          <div className="col-span-2 md:col-span-5">
            <p className="text-mono text-ink mb-4">The Burroship</p>
            <p className="text-body text-ink-muted max-w-[40ch] leading-relaxed">
              A working compound in the Cimarron Range. An agent council
              building the future of small business automation. A real place
              you can visit.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="beacon-dot" aria-hidden="true" />
              <span className="text-mono-sm text-ink-faint">
                Ridgway, Colorado · 38.155° N
              </span>
            </div>
          </div>
 
          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <FooterColumn heading="Areas" links={AREAS} />
          </div>
 
          <div className="col-span-1 md:col-span-2">
            <FooterColumn heading="Burroship" links={BURROSHIP_LINKS} />
          </div>
 
          <div className="col-span-2 md:col-span-2">
            <FooterColumn heading="Compound" links={COMPOUND_LINKS} />
          </div>
        </div>
 
        <div className="border-t border-line pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-mono-sm text-ink-faint">
            © {year} The Burroship
          </p>
          <p className="text-mono-sm text-ink-faint italic" style={{ fontFamily: "var(--font-display)", textTransform: "none", letterSpacing: "0", fontSize: "13px" }}>
            A small bright thing
          </p>
        </div>
      </Container>
    </footer>
  );
}
 
export default Footer;
