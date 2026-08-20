// src/pages/Log/Post.jsx
//
// The log, one entry. Reads the slug from the route and looks it up in LOG. An unknown
// slug is not an error page, it just sends the reader back to the list, the ship does
// not throw doors in your face. Body blocks render by type, p is a reading paragraph,
// h is a subhead, quote is a pull line set off with an accent rule. One reading column,
// left aligned, sized for prose. A small next-below-this rail at the foot points at the
// other entries so the log reads like a place not a dead end. Lowercase, no oxford
// commas, no dashes.

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LOG, logBySlug } from "../../data/log";

function Monogram({ initial, size = 40 }) {
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

function Block({ block }) {
  if (block.t === "h") {
    return <h2 className="text-display-md text-ink lowercase mt-10 mb-3">{block.x}</h2>;
  }
  if (block.t === "quote") {
    return (
      <blockquote className="my-9" style={{ borderLeft: "2px solid var(--color-accent)", paddingLeft: "20px" }}>
        <p className="text-display-sm text-ink lowercase" style={{ fontStyle: "normal" }}>{block.x}</p>
      </blockquote>
    );
  }
  return <p className="text-body lowercase mb-5" style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--color-ink-muted)" }}>{block.x}</p>;
}

function Post() {
  const { slug } = useParams();
  const post = logBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!post) {
    return (
      <main id="main" className="px-3">
        <section className="pt-32 pb-32 md:pt-40 text-center">
          <div className="w-full max-w-[560px] mx-auto">
            <div className="flex items-center justify-center gap-2.5 mb-6">
              <span className="beacon-dot sm" aria-hidden="true" />
              <span className="text-mono text-ink-faint lowercase">no such entry</span>
            </div>
            <h1 className="text-display-lg text-ink lowercase mb-8">that page is not in the log.</h1>
            <Link
              to="/log/"
              className="inline-block text-mono-sm lowercase transition-colors duration-200"
              style={{ padding: "14px 22px", borderRadius: "14px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink-muted)" }}
            >
              back to the log
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const others = LOG.filter((p) => p.slug !== post.slug);

  return (
    <main id="main" className="px-3">
      <article className="pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="w-full max-w-[720px] mx-auto">
          <Link to="/log/" className="inline-flex items-center gap-2 text-mono-sm text-ink-faint hover:text-ink transition-colors duration-200 lowercase mb-10">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
            the log
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="beacon-dot sm pulse" aria-hidden="true" />
              <span className="text-mono text-ink-faint lowercase">{post.kicker}</span>
              <span aria-hidden="true" className="text-ink-faint">·</span>
              <span className="text-mono text-ink-faint lowercase">{post.dateLabel}</span>
            </div>
            <h1 className="text-display-xl text-ink lowercase mb-6" style={{ textWrap: "balance" }}>{post.title}</h1>
            <div className="flex items-center gap-3" style={{ borderTop: "1px solid var(--color-line)", paddingTop: "20px" }}>
              <Monogram initial={post.author.initial} />
              <div className="leading-tight">
                <div className="text-body text-ink lowercase">{post.author.name}</div>
                <div className="text-mono-xs text-ink-faint lowercase mt-0.5">{post.author.role}</div>
              </div>
            </div>
          </header>

          <div>
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          <div className="mt-16" style={{ borderTop: "1px solid var(--color-line)", paddingTop: "28px" }}>
            <div className="flex items-center gap-2.5 mb-6">
              <span className="beacon-dot sm" aria-hidden="true" />
              <span className="text-mono text-ink-faint lowercase">more from the log</span>
            </div>
            <div className="flex flex-col gap-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to={`/log/${p.slug}/`}
                  className="group flex items-center justify-between rounded-2xl transition-all duration-200"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", padding: "18px 20px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-line)"; }}
                >
                  <div>
                    <div className="text-mono-xs text-ink-faint lowercase mb-1.5">{p.kicker}</div>
                    <div className="text-display-sm text-ink lowercase group-hover:text-accent transition-colors duration-200">{p.title}</div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-faint)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 ml-4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export default Post;
