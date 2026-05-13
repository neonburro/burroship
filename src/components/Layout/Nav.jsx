// src/components/Layout/Nav.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";

import Container from "./Container";

const PRIMARY_LINKS = [
  { to: "/build/", label: "Build" },
  { to: "/deploy/", label: "Deploy" },
  { to: "/automate/", label: "Automate" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onWorld = location.pathname.startsWith("/world");

  // On the Cesium /world page, nav floats over the dark map
  const darkMode = onWorld;

  const baseBg = darkMode
    ? "bg-dark-bg/0"
    : scrolled
    ? "bg-bg/85 backdrop-blur-md border-b border-line"
    : "bg-bg/0";

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <nav
        className={
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-[var(--ease-standard)] " +
          baseBg
        }
      >
        <Container size="wide">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className={
                "text-mono tracking-[0.14em] " +
                (darkMode ? "text-dark-ink" : "text-ink") +
                " hover:opacity-70 transition-opacity"
              }
            >
              The Burroship
            </Link>

            <div className="hidden md:flex items-center gap-9">
              {PRIMARY_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    "text-mono transition-colors duration-200 " +
                    (darkMode
                      ? isActive
                        ? "text-dark-accent"
                        : "text-dark-ink-muted hover:text-dark-ink"
                      : isActive
                      ? "text-accent"
                      : "text-ink-muted hover:text-ink")
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/world/"
                className={
                  "hidden lg:inline-flex items-center gap-2 text-mono px-3 py-1.5 rounded-full transition-all duration-200 " +
                  (darkMode
                    ? "text-dark-ink-muted hover:text-dark-accent border border-dark-line"
                    : "text-ink-muted hover:text-accent border border-line hover:border-accent")
                }
                title="The Burroship Cesium map"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: darkMode ? "#A8D055" : "#7AB300",
                    boxShadow: darkMode
                      ? "0 0 6px rgba(168,208,85,0.6)"
                      : "none",
                  }}
                />
                World
              </Link>

              <button
                aria-label="Sign in"
                className={
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 " +
                  (darkMode
                    ? "bg-dark-surface hover:bg-dark-accent text-dark-ink-muted hover:text-dark-bg"
                    : "bg-surface hover:bg-accent text-ink-muted hover:text-ink")
                }
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}

export default Nav;