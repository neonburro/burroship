// src/components/Layout/Nav.jsx
//
// Common nav, now a floating rounded bar. It sits inset like the hero, 99.5% on
// mobile and 97% on desktop, our darkest dark with a hairline of the blue-gray
// ground all the way around and a small gap off the top. It is auth aware through
// the shared session: signed out it shows a single enter trigger (desktop, mobile
// uses the bottom nav), signed in it shows your avatar on every breakpoint and a tap
// opens your account in the same slide out panel. Wordmark stays white on the dark bar.
// v3 · floating rounded plus auth aware.

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import LoginPanel, { AvatarChip } from "./LoginPanel";
import BottomNav from "./BottomNav";
import Wordmark from "../Atoms/Wordmark";
import ShipMark from "../Atoms/ShipMark";
import { useSession } from "../../lib/session";

function Nav() {
  const [open, setOpen] = useState(false);
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
      <nav className="fixed top-0 inset-x-0 z-50" style={{ paddingTop: "10px" }}>
        <div
          className="mx-auto w-[99.5%] md:w-[97%]"
          style={{ background: "var(--color-gray-900)", borderRadius: "22px", border: "1px solid var(--color-line-strong)", boxShadow: "0 10px 30px rgba(24, 36, 56, 0.16)" }}
        >
          <div className="flex items-center justify-between h-15 md:h-16 px-4 md:px-6" style={{ height: "60px" }}>
            <Link to="/" aria-label="the burroship home" className="hover:opacity-80 transition-opacity inline-flex items-center gap-2.5">
              <ShipMark height={26} />
              <Wordmark size="22px" color="#FFFFFF" />
            </Link>

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
      </nav>

      <BottomNav onEnter={() => setOpen(true)} />
      <LoginPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Nav;
