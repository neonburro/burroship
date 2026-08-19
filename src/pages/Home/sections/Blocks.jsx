// src/pages/Home/sections/Blocks.jsx
//
// What is aboard, as squares. Semi rounded tiles that hint and do not explain.
// Most are sealed for now, one carries the ship mark on a black tile, one opens
// the range. Two up on a phone, three on desktop. This is the mysterious teaser
// under the gate, it will hold real square art once we have it. Lowercase, no
// oxford commas, no dashes. v1.

import { Link } from "react-router-dom";

const TILES = [
  { n: "01", label: "the ship", logo: true },
  { n: "02", label: "the incubator", sub: "where the characters are built", locked: true },
  { n: "03", label: "the characters", sub: "the crew aboard", locked: true },
  { n: "04", label: "the academy", sub: "learn to fly one", locked: true },
  { n: "05", label: "the range", sub: "ridgway and the cimarrons", to: "/world/" },
  { n: "06", label: "the log", sub: "soon", locked: true },
];

function Lock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function Tile({ tile }) {
  if (tile.logo) {
    return (
      <div
        className="relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center"
        style={{ background: "var(--color-gray-900)" }}
      >
        <img src="/burroship-logo.webp" alt="the burroship" className="w-[70%] h-auto" style={{ filter: "drop-shadow(0 6px 24px rgba(46,155,230,0.28))" }} />
        <span className="absolute top-6 left-6 md:top-8 md:left-8 text-mono lowercase" style={{ color: "rgba(255,255,255,0.5)" }}>{tile.n}</span>
      </div>
    );
  }

  const body = (
    <div
      className="group relative aspect-square rounded-2xl flex flex-col justify-between p-6 md:p-8 transition-all duration-200"
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-line)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div className="flex items-center justify-between">
        <span className="text-mono text-ink-faint lowercase">{tile.n}</span>
        <span style={{ color: tile.locked ? "var(--color-ink-faint)" : "var(--color-accent)" }}>
          {tile.locked ? <Lock /> : <span className="beacon-dot sm" aria-hidden="true" />}
        </span>
      </div>
      <div>
        <div className="text-display-md text-ink lowercase group-hover:text-accent transition-colors duration-200">{tile.label}</div>
        {tile.sub && <div className="text-body text-ink-muted lowercase mt-1.5">{tile.sub}</div>}
      </div>
    </div>
  );

  if (tile.to) {
    return <Link to={tile.to} aria-label={tile.label} className="block">{body}</Link>;
  }
  return body;
}

function Blocks() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="mx-auto w-[99.5%] md:w-[97%]">
        <div className="flex items-center gap-2.5 mb-6 md:mb-8">
          <span className="beacon-dot sm" aria-hidden="true" />
          <span className="text-mono text-ink-faint lowercase">aboard</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {TILES.map((t) => <Tile key={t.n} tile={t} />)}
        </div>
      </div>
    </section>
  );
}

export default Blocks;
