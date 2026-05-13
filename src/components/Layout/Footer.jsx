// src/components/Layout/Footer.jsx
//
// Dark footer. The horizon line at the top is a 1px Topo Lime
// hairline — the seam between the page and the field manual.
 
import { Link } from "react-router-dom";
 
import Container from "./Container";
 
function Footer() {
  const year = new Date().getFullYear();
 
  return (
    <footer
      className="relative pt-16 pb-10"
      style={{ background: "var(--color-dark-bg)" }}
    >
      {/* The horizon hairline — 1px Topo Lime line at the top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "var(--color-accent)",
          opacity: 0.7,
          boxShadow: "0 0 12px rgba(122, 179, 0, 0.4)",
        }}
      />
 
      <Container size="wide">
 
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          <div className="md:col-span-5">
            <p
              className="text-mono mb-4"
              style={{ color: "var(--color-dark-ink)" }}
            >
              The Burroship
            </p>
            <p
              className="text-body-sm max-w-[40ch] leading-relaxed"
              style={{ color: "var(--color-dark-ink-muted)" }}
            >
              A working compound in the Cimarron Range. Sites, infrastructure,
              and a council of working agents. The airship cruises the San
              Juans.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="beacon-dot sm pulse on-dark" aria-hidden="true" />
              <span
                className="text-mono-xs"
                style={{ color: "var(--color-dark-ink-faint)" }}
              >
                Ridgway, Colorado · 38.155° N · 6,985 ft
              </span>
            </div>
          </div>
 
          <div className="md:col-span-3 md:col-start-7">
            <p
              className="text-mono-xs mb-5"
              style={{ color: "var(--color-dark-ink-faint)" }}
            >
              Pillars
            </p>
            <ul className="space-y-2.5">
              <FooterLink to="/build/">Build</FooterLink>
              <FooterLink to="/deploy/">Deploy</FooterLink>
              <FooterLink to="/automate/">Automate</FooterLink>
            </ul>
          </div>
 
          <div className="md:col-span-3">
            <p
              className="text-mono-xs mb-5"
              style={{ color: "var(--color-dark-ink-faint)" }}
            >
              Vessel
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/world/"
                  className="text-body inline-flex items-center gap-2 transition-colors duration-200"
                  style={{ color: "var(--color-dark-ink)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-dark-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-dark-ink)")
                  }
                >
                  <span className="beacon-dot sm on-dark" aria-hidden="true" />
                  The Burroship
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@neonburro.com"
                  className="text-body transition-colors duration-200"
                  style={{ color: "var(--color-dark-ink-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-dark-ink)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-dark-ink-muted)")
                  }
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
 
        <div
          className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ borderTop: "1px solid var(--color-dark-line)" }}
        >
          <div className="flex items-center gap-6 flex-wrap">
            <p
              className="text-mono-xs"
              style={{ color: "var(--color-dark-ink-faint)" }}
            >
              © {year} The Burroship
            </p>
            <div className="flex items-center gap-2">
              <span
                className="signal-bars on-dark"
                aria-hidden="true"
                style={{
                  // Override the signal bars color for dark surface
                  filter:
                    "drop-shadow(0 0 4px rgba(168, 208, 85, 0.4))",
                }}
              >
                <span />
                <span />
                <span />
                <span />
              </span>
              <span
                className="text-mono-xs"
                style={{ color: "var(--color-dark-ink-faint)" }}
              >
                Signal nominal
              </span>
            </div>
          </div>
          <p
            className="italic"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "15px",
              color: "var(--color-dark-accent)",
              textShadow: "0 0 12px rgba(168, 208, 85, 0.3)",
            }}
          >
            A small bright thing
          </p>
        </div>
 
      </Container>
    </footer>
  );
}
 
function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-body transition-colors duration-200"
        style={{ color: "var(--color-dark-ink-muted)" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--color-dark-ink)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--color-dark-ink-muted)")
        }
      >
        {children}
      </Link>
    </li>
  );
}
 
export default Footer;
