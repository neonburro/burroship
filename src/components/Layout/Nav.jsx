// src/components/Layout/Nav.jsx
//
// Common nav, a floating rounded bar. It sits inset like the hero, 99.5% on mobile and
// 97% on desktop, our darkest dark with a hairline of the blue-gray ground all the way
// around and a small gap off the top. It is auth aware through the shared session.
//
// Signed out it is quiet: wordmark on the left, a single enter trigger on the right
// (desktop, mobile uses the bottom nav). Signed in the bar opens up into an app nav:
// the live sections appear inline on desktop and the avatar opens the account panel.
// APP_LINKS holds only routes that actually exist, so the nav grows as sections come
// online, it never points at a section that is not built. The homepage blocks are the
// full directory, this is the quick rail. Wordmark stays white on the dark bar.
// v4 · app nav on login.

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import LoginPanel, { AvatarChip } from "./LoginPanel";
import BottomNav from "./BottomNav";
import Wordmark from "../Atoms/Wordmark";
import ShipMark from "../Atoms/ShipMark";
import { useSession } from "../../lib/session";

// Live app sections only. Add the crew and the academy here as each is built, never
// before, a nav link that goes nowhere reads as broken.
const APP_LINKS = [
  { to: "/world/", label: "the range" },
  { to: "/log/", label: "the log" },
];

function Nav() {
  const [open, setOpen] = useState(false);

  // ── THE RAIL IS PART OF THE HERO UNTIL YOU SCROLL, 2026-09-28 ────────────
  //
  // Tyler. "I'd love for the hero and navigation to merge more, like neonburro
  // does. I think theburroship should have a centered logo."
  //
  // It was a floating chrome pill, ten pixels down, ninety nine and a half
  // percent wide, with a border and a drop shadow. Under it sat the hero as a
  // SECOND floating card with its own border and shadow and an eighty six pixel
  // gap between them. Two stacked cards with a gap is the opposite of merged,
  // and no amount of matching the colours closes a gap.
  //
  // So at the top of the page the rail has no ground, no border and no shadow,
  // and the hero runs full bleed to the very top edge underneath it. One object
  // with the house corner on its bottom edge only.
  //
  // It takes the pill back past twenty four pixels of scroll, because below the
  // hero it floats over #DFE7F0 and white type on that is nothing. Twenty four
  // rather than zero so a one pixel touch scroll does not flicker it.
  const [sunk, setSunk] = useState(false);
  useEffect(() => {
    const onScroll = () => setSunk(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const location = useLocation();
  const { user, profile } = useSession();

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
      <nav
        className="fixed top-0 inset-x-0 z-50"
        style={{ paddingTop: sunk ? "10px" : "0px", transition: "padding-top 260ms cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div
          className={sunk ? "mx-auto w-[99.5%] md:w-[97%]" : "w-full"}
          style={{
            background: sunk ? "var(--color-chrome)" : "transparent",
            borderRadius: sunk ? "22px" : "0px",
            border: sunk ? "1px solid var(--color-line-strong)" : "1px solid transparent",
            boxShadow: sunk ? "0 10px 30px rgba(24, 36, 56, 0.16)" : "none",
            transition: "background-color 260ms cubic-bezier(0.16,1,0.3,1), border-color 260ms cubic-bezier(0.16,1,0.3,1), box-shadow 260ms cubic-bezier(0.16,1,0.3,1), border-radius 260ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* ── THE MARK MOVED LEFT, AND THE ART DECIDED IT ─────────────────
              Tyler, 2026-09-28. "The image logo to the left of the burroship,
              typed out, is hard to see. I'm not sure if we move it over to the
              left because it's darker over there, like the sky."

              He read the picture correctly. airship-crown.webp is a wood
              engraving whose brightest region by a wide margin is the crown of
              cloud, and that crown sits dead centre. A white lockup centred on
              the rail lands exactly on the one part of the art that cannot hold
              white type. The far left and far right corners are near black.

              There is a second reason and it is the better one. The airship is
              already the centred object in that picture. A wordmark centred on
              top of it is two things competing for the same axis, and the
              wordmark loses because the airship is the reason anybody looks.
              Moving the lockup left hands the centre back to the art.

              So the grid stays three columns, because it still keeps the
              account control pinned right whatever the left side weighs, and
              the mark simply takes the left column. */}
          <div
            className="grid items-center px-4 md:px-6"
            style={{ height: "60px", gridTemplateColumns: "1fr auto 1fr" }}
          >
            <div className="flex items-center gap-3 md:gap-5 justify-self-start">
              <Link
                to="/"
                aria-label="the burroship home"
                className="hover:opacity-80 transition-opacity inline-flex items-center gap-2.5"
              >
                <ShipMark height={26} />
                <Wordmark size="22px" color="#FFFFFF" />
              </Link>
              {user && (
                <nav aria-label="sections" className="hidden md:flex items-center gap-1 mr-2">
                  {APP_LINKS.map((link) => {
                    const active = location.pathname.startsWith(link.to);
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="text-mono lowercase transition-all duration-200"
                        style={{
                          padding: "8px 14px",
                          borderRadius: "999px",
                          color: active ? "var(--color-accent)" : "rgba(255,255,255,0.72)",
                          background: active ? "rgba(79,176,240,0.12)" : "transparent",
                        }}
                        onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "#FFFFFF"; }}
                        onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.72)"; }}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              )}
            </div>

            <div aria-hidden="true" />

            <div className="flex items-center gap-1 md:gap-2 justify-self-end">
              {user ? (
                <button
                  onClick={() => setOpen(true)}
                  aria-label="your account"
                  aria-expanded={open}
                  className="inline-flex items-center transition-transform duration-200 hover:scale-105"
                  style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", borderRadius: "50%" }}
                >
                  <AvatarChip profile={profile} user={user} size={34} />
                </button>
              ) : (
                <button
                  onClick={() => setOpen(true)}
                  aria-label="enter"
                  aria-expanded={open}
                  className="group hidden md:inline-flex items-center gap-2.5 transition-all duration-200"
                  style={{ padding: "8px 16px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.18)", background: "transparent", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
                >
                  <span className="beacon-dot sm" aria-hidden="true" />
                  <span className="text-mono lowercase" style={{ color: "rgba(255,255,255,0.72)" }}>enter</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <BottomNav onEnter={() => setOpen(true)} />
      <LoginPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Nav;
