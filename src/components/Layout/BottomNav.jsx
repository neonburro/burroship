// src/components/Layout/BottomNav.jsx
//
// Mobile bottom nav. A clean fixed bar shown only on small screens. The
// core destinations sit as tap targets with a small icon and label, and
// a final enter action opens the combined access panel. Hidden on md
// and up where the top nav already serves. The active route gets the
// accent. Clean lowercase labels with no oxford commas and no dashes.
// v1 · 2026-06-26

import { Link, useLocation } from "react-router-dom";

const ITEMS = [
  { to: "/", label: "home", icon: "home" },
  { to: "/build/", label: "build", icon: "build" },
  { to: "/deploy/", label: "deploy", icon: "deploy" },
  { to: "/rewards/", label: "rewards", icon: "rewards" },
];

function Icon({ name, active }) {
  const stroke = active ? "var(--color-accent)" : "currentColor";
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
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
    <nav aria-label="mobile navigation" className="md:hidden fixed bottom-0 inset-x-0 z-50" style={{ background: "rgba(8,9,11,0.86)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderTop: "1px solid var(--color-line)", paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="grid grid-cols-5">
        {ITEMS.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link key={item.to} to={item.to} className="flex flex-col items-center justify-center gap-1 py-2.5 transition-colors duration-200" style={{ color: active ? "var(--color-accent)" : "var(--color-ink-faint)" }}>
              <Icon name={item.icon} active={active} />
              <span className="text-mono-xs lowercase">{item.label}</span>
            </Link>
          );
        })}
        <button type="button" onClick={onEnter} aria-label="enter" className="flex flex-col items-center justify-center gap-1 py-2.5 transition-colors duration-200" style={{ color: "var(--color-ink-faint)", background: "transparent", border: "none", cursor: "pointer" }}>
          <Icon name="enter" active={false} />
          <span className="text-mono-xs lowercase">enter</span>
        </button>
      </div>
    </nav>
  );
}

export default BottomNav;
