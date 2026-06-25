// src/components/Atoms/Btn.jsx
//
// The one button. Every button and link cta on the site uses this so
// hover and color logic is identical everywhere and text is always
// visible. Three intents:
//
//   solid    sky blue fill, black text. The primary action.
//   outline  hairline border, ink text, fills faint on hover.
//   quiet    text only with an arrow nudge, for soft secondary links.
//
// Renders as a router Link when given to, an anchor when given href,
// otherwise a button. Optional arrow. Clean lowercase friendly.
// v1 · 2026-06-24

import { Link } from "react-router-dom";

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 select-none cursor-pointer";

function classesFor(intent) {
  switch (intent) {
    case "outline":
      return BASE + " btn-outline rounded-full px-6 py-3 text-[13px]";
    case "quiet":
      return BASE + " btn-quiet text-[13px]";
    case "solid":
    default:
      return BASE + " btn-solid rounded-full px-6 py-3 text-[13px]";
  }
}

const STYLE_ID = "burroship-btn-styles";
const STYLES = `
.btn-solid {
  background: var(--color-accent);
  color: #000000;
  border: 1px solid var(--color-accent);
  box-shadow: 0 0 0 var(--color-accent-glow);
}
.btn-solid:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
  box-shadow: 0 0 18px var(--color-accent-glow);
}
.btn-solid:active { transform: translateY(0.5px) scale(0.99); }

.btn-outline {
  background: transparent;
  color: var(--color-ink);
  border: 1px solid var(--color-line-strong);
}
.btn-outline:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: var(--color-accent-soft);
}
.btn-outline:active { transform: translateY(0.5px) scale(0.99); }

.btn-quiet {
  background: transparent;
  color: var(--color-ink-muted);
  border: none;
  padding: 4px 0;
}
.btn-quiet:hover { color: var(--color-accent); }

.btn-arrow { transition: transform 0.2s var(--ease-standard); }
.btn-solid:hover .btn-arrow,
.btn-outline:hover .btn-arrow,
.btn-quiet:hover .btn-arrow { transform: translateX(3px); }

@media (prefers-reduced-motion: reduce) {
  .btn-solid, .btn-outline, .btn-quiet, .btn-arrow { transition: none; }
  .btn-solid:active, .btn-outline:active { transform: none; }
}
`;

function ensureStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = STYLES;
  document.head.appendChild(el);
}

function Btn({ children, to, href, intent = "solid", arrow = false, className = "", ...rest }) {
  ensureStyles();
  const cls = classesFor(intent) + (className ? " " + className : "");

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <svg className="btn-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
        </svg>
      )}
    </>
  );

  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}

export default Btn;
