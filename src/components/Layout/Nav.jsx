// src/components/Layout/Nav.jsx
//
// Common nav. The wordmark on the left and a single enter trigger on
// the right that opens the login panel. The panel doubles as the
// mobile nav surface. 97% width on desktop and edge to edge mobile.
// v1 · 2026-06-18

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Container from "./Container";
import LoginPanel from "./LoginPanel";
import Wordmark from "../Atoms/Wordmark";

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <>
      <nav className={"fixed top-0 inset-x-0 z-50 transition-all duration-300 " + (scrolled ? "backdrop-blur-md" : "")} style={{ background: scrolled ? "rgba(8,9,11,0.72)" : "transparent", borderBottom: scrolled ? "1px solid var(--color-line)" : "1px solid transparent" }}>
        <Container size="full">
          <div className="flex items-center justify-between h-16">
            <Link to="/" aria-label="the burroship home" className="hover:opacity-80 transition-opacity inline-flex"><Wordmark size="19px" /></Link>

            <button onClick={() => setOpen(true)} aria-label="enter" aria-expanded={open} className="group inline-flex items-center gap-2.5 transition-all duration-200" style={{ padding: "8px 16px", borderRadius: "999px", border: "1px solid var(--color-line)", background: "transparent", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-line)"; }}>
              <span className="beacon-dot sm" aria-hidden="true" />
              <span className="text-mono text-ink-muted group-hover:text-ink transition-colors duration-200 lowercase">enter</span>
            </button>
          </div>
        </Container>
      </nav>

      <LoginPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Nav;
