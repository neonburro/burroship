// src/components/Layout/BottomNav.jsx
//
// Mobile bottom nav, floating. A semi rounded frosted bar that hovers off the
// bottom edge with a margin all around, so the blue-gray ground shows through it
// and past it on every side. Translucent surface plus a blur, not a solid slab
// stuck to the edge. This is the house vibe, everything sits on the main color
// with barely rounded corners and lets it read through. The core destinations are
// tap targets, a final enter action opens the access panel. Hidden on md and up
// where the top nav serves. Active route gets the accent. Lowercase, no oxford
// commas, no dashes. v2 · floating frosted bar.

import { Link, useLocation } from "react-router-dom";

const ITEMS = [
  { to: "/", label: "home", icon: "home" },
  { to: "/build/", label: "build", icon: "build" },
  { to: "/deploy/", label: "deploy", icon: "deploy" },
  { to: "/rewards/", label: "rewards", icon: "rewards" },
];

function Icon({ name, active }) {
  const stroke = active ? "var(--color-accent)" : "currentColor";
  const common = { width: 21, height: 21, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  if (name === "home") return (<svg {...common}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>);
  if (name === "build") return (<svg {...common}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h10" /></svg>);
  if (name === "deploy") return (<svg {...common}><path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M5 21h14" /></svg>);
  if (name === "rewards") return (<svg {...common}><circle cx="12" cy="8" r="5" /><path d="M8 13l-2 8 6-3 6 3-2-8" /></svg>);
  if (name === "enter") return (<svg {...common}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /></svg>);
  return null;
}

function BottomNav({ onEnter }) {
  const location = useLocation();

  return (
    <nav
      aria-label="mobile navigation"
      className="md:hidden fixed z-50"
      style={{
        left: "12px",
        right: "12px",
        bottom: "calc(env(safe-area-inset-bottom) + 12px)",
        borderRadius: "22px",
        background: "rgba(226, 233, 242, 0.55)",
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",
        border: "1px solid var(--color-line-strong)",
        boxShadow: "0 12px 34px rgba(24, 36, 56, 0.16)",
        overflow: "hidden",
      }}
    >
      <div className="grid grid-cols-5">
        {ITEMS.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center justify-center gap-1 py-3 transition-colors duration-200"
              style={{ color: active ? "var(--color-accent)" : "var(--color-ink-muted)" }}
            >
              <Icon name={item.icon} active={active} />
              <span className="text-mono-xs lowercase">{item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={onEnter}
          aria-label="enter"
          className="flex flex-col items-center justify-center gap-1 py-3 transition-colors duration-200"
          style={{ color: "var(--color-ink-muted)", background: "transparent", border: "none", cursor: "pointer" }}
        >
          <Icon name="enter" active={false} />
          <span className="text-mono-xs lowercase">enter</span>
        </button>
      </div>
    </nav>
  );
}

export default BottomNav;
