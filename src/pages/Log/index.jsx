// src/pages/Log/index.jsx
//
// The log, the list. This is the ship's public face, readable before login, so it is
// the one section that never gates. It reads from LOG in src/data/log.js and never
// restates a post inline. Entries stack in a single reading column, newest first, each
// a link into the single post reader at /log/:slug/. Left aligned inside the column,
// generous air between entries, the mono kicker carries the callsign and the date.
// Lowercase throughout, no oxford commas, no dashes.

import { Link } from "react-router-dom";
import { LOG } from "../../data/log";

function Monogram({ initial, size = 30 }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size, borderRadius: "50%", background: "var(--color-accent)", color: "#0B0C0E", fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: Math.round(size * 0.42) }}
    >
      {initial}
    </span>
  );
}

function Entry({ post, first }) {
  return (
    <Link
      to={`/log/${post.slug}/`}
      className="group block"
      style={{ padding: "34px 0", borderTop: first ? "none" : "1px solid var(--color-line)" }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <span className="beacon-dot sm" aria-hidden="true" />
        <span className="text-mono text-ink-faint lowercase">{post.kicker}</span>
        <span aria-hidden="true" className="text-ink-faint">·</span>
        <span className="text-mono text-ink-faint lowercase">{post.dateLabel}</span>
      </div>

      <h2 className="text-display-lg text-ink lowercase mb-3 group-hover:text-accent transition-colors duration-200" style={{ textWrap: "balance" }}>
        {post.title}
      </h2>

      <p className="text-lead lowercase mb-6" style={{ maxWidth: "58ch" }}>{post.excerpt}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Monogram initial={post.author.initial} />
          <div className="leading-tight">
            <div className="text-body-sm text-ink lowercase">{post.author.name}</div>
            <div className="text-mono-xs text-ink-faint lowercase mt-0.5">{post.author.role}</div>
          </div>
        </div>
        <span className="text-mono-sm text-ink-faint group-hover:text-accent transition-colors duration-200 lowercase inline-flex items-center gap-2">
          read
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </div>
    </Link>
  );
}

function Log() {
  return (
    <main id="main" className="px-3">
      <section className="pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="w-full max-w-[760px] mx-auto">
          <header className="mb-4 md:mb-6">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="beacon-dot sm pulse" aria-hidden="true" />
              <span className="text-mono text-ink-faint lowercase">the log</span>
            </div>
            <h1 className="text-display-xl text-ink lowercase mb-4">the ship writes it down.</h1>
            <p className="text-lead lowercase" style={{ fontSize: "18px", maxWidth: "56ch" }}>
              entries from the crew above the range. what is running, what is being built, and the town it is all pointed at. no schedule, we write when there is something true to say.
            </p>
          </header>

          <div>
            {LOG.map((post, i) => (
              <Entry key={post.slug} post={post} first={i === 0} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Log;
