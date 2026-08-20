// src/pages/Home/sections/TheLog.jsx
//
// The log, previewed on the home page. This is the mysterious front the town reads
// before it ever signs in, so it sits high on the page, right under the gate. It shows
// the three latest entries as compact cards that link into the reader, and never
// restates a post, it reads from LOG in src/data/log.js. Same inset as the bands,
// 99.5% on mobile and 97% on desktop. Lowercase, no oxford commas, no dashes.

import { Link } from "react-router-dom";
import { publishedPosts, postAuthor } from "../../../data/log";

function Monogram({ initial, size = 26 }) {
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

function Card({ post }) {
  const author = postAuthor(post);
  return (
    <Link
      to={`/log/${post.slug}/`}
      className="group flex flex-col rounded-2xl transition-all duration-200 overflow-hidden"
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-line)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {post.hero && (
        <div className="overflow-hidden" style={{ aspectRatio: "16 / 9", borderBottom: "1px solid var(--color-line)" }}>
          <img
            src={post.hero}
            alt={post.heroAlt || ""}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>
      )}

      <div className="flex flex-col flex-1" style={{ padding: "22px 24px 24px" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-mono-xs text-ink-faint lowercase">{post.kicker}</span>
          <span aria-hidden="true" className="text-ink-faint">·</span>
          <span className="text-mono-xs text-ink-faint lowercase">{post.dateLabel}</span>
        </div>

        <h3 className="text-display-sm text-ink lowercase mb-2.5 group-hover:text-accent transition-colors duration-200" style={{ textWrap: "balance" }}>
          {post.title}
        </h3>
        <p className="text-body-sm text-ink-muted lowercase mb-6" style={{ lineHeight: 1.55 }}>{post.excerpt}</p>

        <div className="flex items-center gap-2.5 mt-auto">
          <Monogram initial={author.initial} />
          <span className="text-body-sm text-ink lowercase">{author.name}</span>
          <span aria-hidden="true" className="text-ink-faint">·</span>
          <span className="text-mono-xs text-ink-faint lowercase">{author.role}</span>
        </div>
        {post.expanding && (
          <div className="text-mono-xs text-ink-faint lowercase mt-3">being expanded</div>
        )}
      </div>
    </Link>
  );
}

function TheLog() {
  const posts = publishedPosts().slice(0, 3);

  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto w-[99.5%] md:w-[97%]">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-2.5">
            <span className="beacon-dot sm pulse" aria-hidden="true" />
            <span className="text-mono text-ink-faint lowercase">the log</span>
          </div>
          <Link to="/log/" className="text-mono-sm text-ink-faint hover:text-ink transition-colors duration-200 lowercase inline-flex items-center gap-2">
            all entries
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {posts.map((post) => (
            <Card key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TheLog;
