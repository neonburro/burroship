// src/pages/Home/sections/Blocks.jsx
//
// What is aboard, as squares. This is the app directory now. Signed out, every tile is
// a locked teaser, hinting and not explaining. Signed in, the tiles that have a real
// destination unlock and become entrances, the rest read as coming soon (you are
// aboard, they are just being built). Two up on a phone, three on desktop. Lowercase,
// no oxford commas, no dashes. v2 · unlocks on login.

import { Link } from "react-router-dom";
import { useSession } from "../../../lib/session";

const TILES = [
  { n: "01", label: "the ship", sub: "a floating incubator above the range" },
  { n: "02", label: "the incubator", sub: "where the characters are built" },
  { n: "03", label: "the crew", sub: "the characters aboard" },
  { n: "04", label: "the academy", sub: "learn to fly one" },
  { n: "05", label: "the range", sub: "ridgway and the cimarrons", to: "/world/" },
  { n: "06", label: "the log", sub: "the ship writes it down" },
];

function Lock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function Tile({ tile, user }) {
  const mode = !user ? "locked" : tile.to ? "live" : "soon";
  const live = mode === "live";

  const body = (
    <div
      className="group relative aspect-square rounded-2xl flex flex-col justify-between p-6 md:p-8 transition-all duration-200"
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", opacity: mode === "soon" ? 0.82 : 1 }}
      onMouseEnter={live ? (e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.transform = "translateY(-3px)"; } : undefined}
      onMouseLeave={live ? (e) => { e.currentTarget.style.borderColor = "var(--color-line)"; e.currentTarget.style.transform = "translateY(0)"; } : undefined}
    >
      <div className="flex items-center justify-between">
        <span className="text-mono text-ink-faint lowercase">{tile.n}</span>
        <span style={{ color: live ? "var(--color-accent)" : "var(--color-ink-faint)" }}>
          {mode === "locked" ? <Lock /> : <span className={"beacon-dot sm" + (live ? "" : "")} style={live ? undefined : { opacity: 0.4 }} aria-hidden="true" />}
        </span>
      </div>
      <div>
        <div className={"text-display-md text-ink lowercase transition-colors duration-200" + (live ? " group-hover:text-accent" : "")}>{tile.label}</div>
        <div className="text-body text-ink-muted lowercase mt-1.5">{mode === "soon" ? "coming aboard" : tile.sub}</div>
      </div>
    </div>
  );

  if (live) {
    return <Link to={tile.to} aria-label={tile.label} className="block">{body}</Link>;
  }
  return body;
}

function Blocks() {
  const { user } = useSession();

  return (
    <section className="pb-24 md:pb-32">
      <div className="mx-auto w-[99.5%] md:w-[97%]">
        <div className="flex items-center gap-2.5 mb-6 md:mb-8">
          <span className="beacon-dot sm" aria-hidden="true" />
          <span className="text-mono text-ink-faint lowercase">{user ? "aboard" : "what is aboard"}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {TILES.map((t) => <Tile key={t.n} tile={t} user={user} />)}
        </div>
      </div>
    </section>
  );
}

export default Blocks;
