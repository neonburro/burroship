// src/pages/Log/Post.jsx
//
// The log, one entry. Reads the slug from the route and looks it up in LOG. An unknown
// slug is not an error page, it just sends the reader back to the list, the ship does
// not throw doors in your face. A wide hero sits under the title, then the byline, then
// the body. Body blocks render by type, p is a reading paragraph (and may carry inline
// links through parts, which is how entries point at each other in the prose), h is a
// subhead, quote is a pull line, img is an inline picture with a caption. The foot
// carries a curated more-from-the-log rail from relatedPosts so the log reads like a
// place, not a dead end. One reading column, left aligned. Lowercase, no oxford commas,
// no dashes.

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { logBySlug, relatedPosts, postAuthor } from "../../data/log";

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

// A run of text that may contain inline links. A plain string renders as text, an object
// { text, to } renders as an accent link into another entry or section.
function Parts({ parts }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <Link
            key={i}
            to={part.to}
            className="transition-colors duration-200"
            style={{ color: "var(--color-accent)", textDecoration: "underline", textDecorationThickness: "1px", textUnderlineOffset: "3px" }}
          >
            {part.text}
          </Link>
        )
      )}
    </>
  );
}

function Block({ block }) {
  if (block.t === "h") {
    return <h2 className="text-display-md text-ink lowercase mt-11 mb-3">{block.x}</h2>;
  }
  if (block.t === "quote") {
    return (
      <blockquote className="my-9" style={{ borderLeft: "2px solid var(--color-accent)", paddingLeft: "20px" }}>
        <p className="text-display-sm text-ink lowercase">{block.x}</p>
      </blockquote>
    );
  }
  if (block.t === "img") {
    return (
      <figure className="my-9">
        <img src={block.src} alt={block.alt || ""} loading="lazy" className="w-full rounded-2xl" style={{ border: "1px solid var(--color-line)" }} />
        {block.caption && (
          <figcaption className="text-mono-xs text-ink-faint lowercase mt-3 flex items-center gap-2">
            <span className="beacon-dot sm" aria-hidden="true" />
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  if (block.t === "aside") {
    return (
      <aside className="my-9 rounded-2xl" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", padding: "20px 22px" }}>
        {block.label && (
          <div className="text-mono-xs text-ink-faint lowercase mb-2 flex items-center gap-2">
            <span className="beacon-dot sm" aria-hidden="true" />
            {block.label}
          </div>
        )}
        <p className="text-body-sm text-ink-muted lowercase" style={{ lineHeight: 1.6 }}>{block.x}</p>
      </aside>
    );
  }
  const proseStyle = { fontSize: "16px", lineHeight: 1.7, color: "var(--color-ink-muted)" };
  if (block.parts) {
    return <p className="lowercase mb-5" style={proseStyle}><Parts parts={block.parts} /></p>;
  }
  return <p className="lowercase mb-5" style={proseStyle}>{block.x}</p>;
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

  const others = relatedPosts(post);
  const author = postAuthor(post);

  return (
    <main id="main" className="px-3">
      <article className="pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="w-full max-w-[720px] mx-auto">
          <Link to="/log/" className="inline-flex items-center gap-2 text-mono-sm text-ink-faint hover:text-ink transition-colors duration-200 lowercase mb-10">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
            the log
          </Link>

          <header className="mb-8">
            <div className="flex items-center gap-2.5 mb-5 flex-wrap">
              <span className="beacon-dot sm pulse" aria-hidden="true" />
              <span className="text-mono text-ink-faint lowercase">{post.kicker}</span>
              <span aria-hidden="true" className="text-ink-faint">·</span>
              <span className="text-mono text-ink-faint lowercase">{post.dateLabel}</span>
              {post.readMins && (
                <>
                  <span aria-hidden="true" className="text-ink-faint">·</span>
                  <span className="text-mono text-ink-faint lowercase">{post.readMins} min</span>
                </>
              )}
            </div>
            <h1 className="text-display-xl text-ink lowercase" style={{ textWrap: "balance" }}>{post.title}</h1>
          </header>

          {post.hero && (
            <img src={post.hero} alt={post.heroAlt || ""} className="w-full rounded-2xl mb-8" style={{ border: "1px solid var(--color-line)" }} />
          )}

          <div className="flex items-center justify-between gap-4 mb-10 flex-wrap" style={{ borderBottom: "1px solid var(--color-line)", paddingBottom: "22px" }}>
            <div className="flex items-center gap-3">
              <Monogram initial={author.initial} />
              <div className="leading-tight">
                <div className="text-body text-ink lowercase">{author.name}</div>
                <div className="text-mono-xs text-ink-faint lowercase mt-0.5">{author.role}</div>
              </div>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-mono-xs lowercase" style={{ color: "var(--color-ink-faint)", border: "1px solid var(--color-line)", borderRadius: "999px", padding: "4px 10px" }}>{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div>
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {post.sponsor && (
            <div className="mt-12 rounded-2xl flex items-center gap-2.5 flex-wrap" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", padding: "14px 18px" }}>
              <span className="text-mono-xs text-ink-faint lowercase">{post.sponsor.label || "with"}</span>
              {post.sponsor.url ? (
                <a href={post.sponsor.url} target="_blank" rel="noopener noreferrer" className="text-body-sm lowercase transition-colors duration-200" style={{ color: "var(--color-accent)" }}>{post.sponsor.name}</a>
              ) : (
                <span className="text-body-sm text-ink lowercase">{post.sponsor.name}</span>
              )}
            </div>
          )}

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
                  className="group flex items-center gap-4 rounded-2xl transition-all duration-200 overflow-hidden"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-line)"; }}
                >
                  {p.hero && (
                    <span className="shrink-0 hidden sm:block" style={{ width: "108px", alignSelf: "stretch" }}>
                      <img src={p.hero} alt="" className="w-full h-full object-cover" style={{ minHeight: "100%" }} />
                    </span>
                  )}
                  <span className="flex items-center justify-between flex-1 min-w-0" style={{ padding: "18px 20px" }}>
                    <span className="min-w-0">
                      <span className="block text-mono-xs text-ink-faint lowercase mb-1.5">{p.kicker}</span>
                      <span className="block text-display-sm text-ink lowercase group-hover:text-accent transition-colors duration-200 truncate">{p.title}</span>
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-faint)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 ml-4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
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
