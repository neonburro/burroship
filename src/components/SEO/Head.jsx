// src/components/SEO/Head.jsx
//
// Per page title, description, canonical, share tags and structured data.
//
// WHY THIS IS AN EFFECT AND NOT RENDERED TAGS. React 19 does hoist a rendered <title>,
// <meta> and <link> into the head, and it dedupes the title, but it does NOT dedupe meta
// or link. Rendering them alongside the static tags in index.html produced two
// descriptions and two canonicals on every page, and two canonicals is worse than none
// because a crawler is entitled to ignore both. So this writes the tags with a plain
// effect instead: set document.title, upsert each meta and link by selector, then replace
// the json-ld block. The static tags in index.html stay as the first paint and the
// fallback for scrapers that do not run javascript, this keeps them current after that.
// Same approach as the studio repo's Head, deliberately, so the two behave alike.
//
// Never add react-helmet here. It emits nothing under React 19.
//
// THE AUTHOR IS THE SHIP, NEVER A BURRO. The visible byline is a character and that is
// the point, but a fictional Person in schema is a claim a search engine is entitled to
// check and it would not survive checking. An Organization author is the honest answer.
//
// No oxford commas, no dashes.

import { useEffect } from "react";

const SITE = "https://burroship.com";
const DEFAULT_TITLE = "The Burroship";
const DEFAULT_DESCRIPTION =
  "A floating incubator above the range. The Burroship maps Ridgway, Colorado, writes about the valley that built it, and is open to those aboard.";

const ORG = {
  "@type": "Organization",
  name: "The Burroship",
  url: SITE,
  address: { "@type": "PostalAddress", addressLocality: "Ridgway", addressRegion: "CO", addressCountry: "US" },
};

// Find or create one head element by selector, then set its attributes.
function upsert(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    el.setAttribute("data-bs-head", "");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => {
    if (v != null) el.setAttribute(k, v);
  });
  return el;
}

function meta(key, kind, content) {
  if (content == null) return;
  upsert(
    `meta[${kind}="${key}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute(kind, key);
      return m;
    },
    { content }
  );
}

function Head({ title, description, path, image, jsonLd, noIndex = false }) {
  // Serialise once so a caller passing a fresh object literal each render does not
  // re-run the effect on every render.
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";
  const fullTitle = title ? `${title} · the burroship` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESCRIPTION;
  const url = path ? `${SITE}${path}` : SITE;
  const img = image ? `${SITE}${image}` : `${SITE}/banners/courthouse-chimney-airship.webp`;

  useEffect(() => {
    document.title = fullTitle;

    meta("description", "name", desc);
    meta("robots", "name", noIndex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1");

    upsert('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    }, { href: url });

    meta("og:title", "property", fullTitle);
    meta("og:description", "property", desc);
    meta("og:url", "property", url);
    meta("og:image", "property", img);
    meta("twitter:card", "name", "summary_large_image");
    meta("twitter:title", "name", fullTitle);
    meta("twitter:description", "name", desc);
    meta("twitter:image", "name", img);

    // One page level json-ld block, replaced each time. The Organization block in
    // index.html is separate and stays, this is the page's own schema.
    const existing = document.head.querySelector('script[data-bs-jsonld]');
    if (existing) existing.remove();
    if (jsonLdKey) {
      const s = document.createElement("script");
      s.setAttribute("type", "application/ld+json");
      s.setAttribute("data-bs-jsonld", "");
      s.textContent = JSON.stringify({ "@context": "https://schema.org", publisher: ORG, ...JSON.parse(jsonLdKey) });
      document.head.appendChild(s);
    }
  }, [fullTitle, desc, url, img, noIndex, jsonLdKey]);

  return null;
}

export default Head;
