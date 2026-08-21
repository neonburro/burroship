// src/pages/Log/index.jsx
//
// The log, the list. This is the ship's public face, readable before login, so it is the
// one section that never gates. It reads from LOG in src/data/log.js and never restates a
// post inline. Two bands. First the finished entries, each a row with its hero art beside
// the writing on desktop and stacked on a phone, linking into the reader. Then being
// written, the briefed pieces that are not reported yet, shown with their brief and the
// threads each one has to carry. That second band is deliberate, it tells a visitor and a
// crawler that this section is actively being written rather than abandoned, and it lets
// a researcher see exactly what we are gathering. Lowercase, no oxford commas, no dashes.

import { Link } from "react-router-dom";
import { publishedPosts, comingSoonPosts, postAuthor } from "../../data/log";
import Head from "../../components/SEO/Head";

function Monogram({ initial, size = 28 }) {
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

function Byline({ author }) {
  return (
    <div className="flex items-center gap-2.5">
      <Monogram initial={author.initial} />
      <div className="leading-tight">
        <div className="text-body-sm text-ink lowercase">{author.name}</div>
        <div className="text-mono-xs text-ink-faint lowercase mt-0.5">{author.role}</div>
      </div>
    </div>
  );
}

function Entry({ post, first }) {
  const author = postAuthor(post);
  return (
    <Link
      to={`/log/${post.slug}/`}
      className="group grid md:grid-cols-[300px_1fr] gap-5 md:gap-8"
      style={{ padding: "34px 0", borderTop: first ? "none" : "1px solid var(--color-line)" }}
    >
      {/* The image is absolutely filled rather than h-full. The global reset sets
          img height auto and that beats a utility class here, which left the art sitting
          at its natural ratio inside a 16 by 10 box with dead space under it. */}
      {post.hero && (
        <div className="rounded-2xl overflow-hidden self-start relative" style={{ aspectRatio: "16 / 10", border: "1px solid var(--color-line)" }}>
          <img
            src={post.hero}
            alt={post.heroAlt || ""}
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </div>
      )}

      <div>
        <div className="flex items-center gap-2.5 mb-3 flex-wrap">
          <span className="beacon-dot sm" aria-hidden="true" />
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

        <h2 className="text-display-lg text-ink lowercase mb-3 group-hover:text-accent transition-colors duration-200" style={{ textWrap: "balance" }}>
          {post.title}
        </h2>

        <p className="text-lead lowercase mb-6" style={{ maxWidth: "54ch" }}>{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <Byline author={author} />
          <span className="flex items-center gap-3">
          {post.expanding && (
            <span className="text-mono-xs lowercase" style={{ color: "var(--color-ink-faint)", border: "1px solid var(--color-line-strong)", borderRadius: "999px", padding: "5px 11px" }}>
              being expanded
            </span>
          )}
          <span className="text-mono-sm text-ink-faint group-hover:text-accent transition-colors duration-200 lowercase inline-flex items-center gap-2">
            read
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

// A briefed piece that is not written yet. Not a link, there is nothing to open. The
// brief carries the angle and the covers list carries the threads it has to hold, so a
// reader knows what is coming and a researcher knows what to gather.
function SoonEntry({ post }) {
  const author = postAuthor(post);
  return (
    <article
      className="rounded-2xl overflow-hidden grid md:grid-cols-[240px_1fr]"
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
    >
      {post.hero && (
        <div className="overflow-hidden relative" style={{ borderRight: "1px solid var(--color-line)", minHeight: "200px" }}>
          <img
            src={post.hero}
            alt={post.heroAlt || ""}
            loading="lazy"
            className="object-cover"
            style={{ opacity: 0.72, position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </div>
      )}

      <div style={{ padding: "24px 26px" }}>
        <div className="flex items-center gap-2.5 mb-3 flex-wrap">
          <span className="beacon-dot sm pulse" aria-hidden="true" />
          <span className="text-mono-xs text-ink-faint lowercase">{post.kicker}</span>
        </div>

        <h3 className="text-display-md text-ink lowercase mb-3" style={{ textWrap: "balance" }}>{post.title}</h3>
        <p className="text-body text-ink-muted lowercase mb-5" style={{ lineHeight: 1.65, maxWidth: "60ch" }}>{post.brief || post.excerpt}</p>

        {post.covers && post.covers.length > 0 && (
          <div className="mb-6">
            <div className="text-mono-xs text-ink-faint lowercase mb-2.5">what it has to carry</div>
            <ul className="flex flex-col gap-1.5">
              {post.covers.map((c) => (
                <li key={c} className="text-body-sm text-ink-muted lowercase flex items-start gap-2.5">
                  <span aria-hidden="true" className="shrink-0" style={{ color: "var(--color-ink-faint)", marginTop: "1px" }}>·</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Byline author={author} />
          <span className="text-mono-xs lowercase" style={{ color: "var(--color-ink-faint)", border: "1px solid var(--color-line-strong)", borderRadius: "999px", padding: "6px 12px" }}>
            being reported
          </span>
        </div>
      </div>
    </article>
  );
}

function Log() {
  const posts = publishedPosts();
  const soon = comingSoonPosts();

  // Declare the section as a Blog listing its entries. A crawler that reads this knows
  // the log is a real publication with dated pieces and named authors, which is what we
  // want it weighing rather than guessing from markup.
  const jsonLd = {
    "@type": "Blog",
    name: "the log",
    description: "Reporting from the Burroship on Ridgway, Colorado and the valley that built it.",
    url: "https://burroship.com/log/",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      url: `https://burroship.com/log/${p.slug}/`,
      author: { "@type": "Organization", name: "The Burroship" },
    })),
  };

  return (
    <main id="main" className="px-3">
      <Head
        title="the log"
        description="Reporting from the Burroship on Ridgway, Colorado. The valley trilogy, the map, and what the ship is building. New entries in progress."
        path="/log/"
        image="/log/ancient-ridgway/hero.webp"
        jsonLd={jsonLd}
      />
      <section className="pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="w-full max-w-[860px] mx-auto">
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
            {posts.map((post, i) => (
              <Entry key={post.slug} post={post} first={i === 0} />
            ))}
          </div>

          {soon.length > 0 && (
            <section className="mt-16" style={{ borderTop: "1px solid var(--color-line)", paddingTop: "36px" }}>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="beacon-dot sm pulse" aria-hidden="true" />
                <span className="text-mono text-ink-faint lowercase">being written</span>
              </div>
              <p className="text-lead lowercase mb-8" style={{ maxWidth: "58ch" }}>
                the valley trilogy, three features that tell one story, who has held this ground. deep time, the boom, and now. the briefs are set and the reporting is underway.
              </p>
              <div className="flex flex-col gap-4">
                {soon.map((post) => (
                  <SoonEntry key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

export default Log;
