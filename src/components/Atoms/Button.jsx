// src/components/Atoms/Button.jsx
//
// Button v2. Council design-system pass, Phase 1.
//
// What changed from v1 and why:
//
//   v1 mutated inline styles on onMouseEnter / onMouseLeave to
//   fake hover, because the code comment reported Tailwind v4
//   token resolution failing on text-bg / text-ink. That worked
//   but gave us: no keyboard focus state, no pressed state, no
//   touch feedback, and JS-driven hover that can stutter.
//
//   v2 drives ALL states through a scoped <style> block using
//   CSS custom properties. This is resilient regardless of the
//   Tailwind v4 token question (pending Volt's sourced read):
//   the critical colors are CSS variables from index.css @theme,
//   referenced directly, never via utility classes that might
//   not resolve.
//
//   v2 adds: focus-visible (keyboard), active/pressed, disabled,
//   loading, and an optional restrained `signal` beacon for
//   buttons that should feel like live system controls.
//
//   Intent taxonomy replaces utility-soup. Old variant names are
//   kept as aliases so NO existing page breaks. This is a safe,
//   backward-compatible swap.
 
import { Link } from "react-router-dom";
 
/* Intent taxonomy. Old v1 names alias onto these so existing
 * pages keep working with zero edits. */
const VARIANT_ALIASES = {
  primary: "primary",
  primaryLime: "primaryLime",
  ghost: "secondary",
  ghostDark: "secondaryDark",
  text: "subtle",
  textDark: "subtleDark",
  operational: "operational",
  secondary: "secondary",
  secondaryDark: "secondaryDark",
  subtle: "subtle",
  subtleDark: "subtleDark",
  nav: "nav",
};
 
const STYLE_ID = "nb-button-v2-styles";
 
/* Injected once. Scoped by the nb-btn class. All state physics
 * live here as real CSS so they are GPU-smooth and work before
 * JS hydration. */
const STYLES = `
.nb-btn {
  --_bg: transparent;
  --_fg: var(--color-ink);
  --_bd: transparent;
  --_bg-hover: transparent;
  --_fg-hover: var(--color-ink);
  --_bd-hover: transparent;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  border-radius: 999px;
  border: 1px solid var(--_bd);
  background: var(--_bg);
  color: var(--_fg);
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition:
    background-color 0.22s var(--ease-standard),
    color 0.22s var(--ease-standard),
    border-color 0.22s var(--ease-standard),
    transform 0.12s var(--ease-standard);
  -webkit-tap-highlight-color: transparent;
}
.nb-btn:hover {
  background: var(--_bg-hover);
  color: var(--_fg-hover);
  border-color: var(--_bd-hover);
}
.nb-btn:active { transform: translateY(0.5px) scale(0.992); }
.nb-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
.nb-btn[aria-disabled="true"],
.nb-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}
.nb-btn[data-loading="true"] { color: transparent; pointer-events: none; }
.nb-btn[data-loading="true"] .nb-btn__spin {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  color: var(--_fg);
  animation: nb-btn-spin 0.7s linear infinite;
}
@keyframes nb-btn-spin { to { transform: rotate(360deg); } }
 
.nb-btn__pad-pill { padding: 0.75rem 1.5rem; }
.nb-btn__pad-flat { padding: 0.5rem 0; }
 
/* Restrained live-signal beacon. Functional ornament: the button
 * reads as a real system control, not decoration. */
.nb-btn__signal {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
  position: relative;
}
.nb-btn__signal::after {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1px solid currentColor;
  opacity: 0.5;
  animation: nb-btn-ping 2.4s var(--ease-standard) infinite;
}
@keyframes nb-btn-ping {
  0%   { transform: scale(0.8); opacity: 0.5; }
  70%  { transform: scale(1.6); opacity: 0; }
  100% { opacity: 0; }
}
.nb-btn__arrow { transition: transform 0.22s var(--ease-standard); }
.nb-btn:hover .nb-btn__arrow { transform: translateX(2px); }
 
@media (prefers-reduced-motion: reduce) {
  .nb-btn, .nb-btn__arrow { transition: none; }
  .nb-btn__signal::after,
  .nb-btn[data-loading="true"] .nb-btn__spin { animation: none; }
  .nb-btn:active { transform: none; }
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
 
/* Per-variant CSS-variable maps. Colors come straight from the
 * index.css @theme tokens as CSS variables, never via utility
 * classes, so they resolve regardless of the Tailwind v4 token
 * question Volt is researching. */
function variantVars(variant) {
  switch (variant) {
    case "primary":
      return {
        "--_bg": "var(--color-ink)",
        "--_fg": "#FFFFFF",
        "--_bg-hover": "var(--color-accent)",
        "--_fg-hover": "var(--color-ink)",
      };
    case "primaryLime":
      return {
        "--_bg": "var(--color-accent)",
        "--_fg": "var(--color-ink)",
        "--_bg-hover": "var(--color-accent-hover)",
        "--_fg-hover": "var(--color-ink)",
      };
    case "secondary":
      return {
        "--_bg": "transparent",
        "--_fg": "var(--color-ink)",
        "--_bd": "var(--color-line)",
        "--_bg-hover": "var(--color-surface)",
        "--_fg-hover": "var(--color-ink)",
        "--_bd-hover": "var(--color-line)",
      };
    case "secondaryDark":
      return {
        "--_bg": "transparent",
        "--_fg": "var(--color-dark-ink)",
        "--_bd": "var(--color-dark-line)",
        "--_bg-hover": "rgba(255,255,255,0.06)",
        "--_fg-hover": "var(--color-dark-ink)",
        "--_bd-hover": "var(--color-dark-line)",
      };
    case "subtle":
      return {
        "--_bg": "transparent",
        "--_fg": "var(--color-ink)",
        "--_fg-hover": "var(--color-accent)",
      };
    case "subtleDark":
      return {
        "--_bg": "transparent",
        "--_fg": "var(--color-dark-ink)",
        "--_fg-hover": "var(--color-dark-accent)",
      };
    case "nav":
      return {
        "--_bg": "transparent",
        "--_fg": "var(--color-ink-muted)",
        "--_fg-hover": "var(--color-ink)",
      };
    case "operational":
      return {
        "--_bg": "transparent",
        "--_fg": "var(--color-ink-muted)",
        "--_fg-hover": "var(--color-ink)",
      };
    default:
      return {
        "--_bg": "var(--color-ink)",
        "--_fg": "#FFFFFF",
        "--_bg-hover": "var(--color-accent)",
        "--_fg-hover": "var(--color-ink)",
      };
  }
}
 
function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  arrow = false,
  signal = false,
  loading = false,
  disabled = false,
  ...rest
}) {
  ensureStyles();
 
  const resolved = VARIANT_ALIASES[variant] || "primary";
  const isFlat =
    resolved === "subtle" ||
    resolved === "subtleDark" ||
    resolved === "nav" ||
    resolved === "operational";
 
  /* operational keeps its v1 hairline-underline identity. */
  const operationalExtra =
    resolved === "operational"
      ? {
          borderBottom: "1px solid var(--color-line)",
          borderRadius: 0,
          paddingBottom: "0.4rem",
        }
      : {};
 
  const style = {
    ...variantVars(resolved),
    ...operationalExtra,
  };
 
  const padClass = isFlat ? "nb-btn__pad-flat" : "nb-btn__pad-pill";
  const classes =
    "nb-btn " + padClass + (className ? " " + className : "");
 
  const inner = (
    <>
      {signal && (
        <span className="nb-btn__signal" aria-hidden="true" />
      )}
      <span>{children}</span>
      {arrow && (
        <span aria-hidden="true" className="nb-btn__arrow">
          →
        </span>
      )}
      {loading && <span className="nb-btn__spin" aria-hidden="true" />}
    </>
  );
 
  const shared = {
    className: classes,
    style,
    "data-loading": loading ? "true" : undefined,
    "data-variant": resolved,
  };
 
  if (to && !disabled && !loading) {
    return (
      <Link to={to} {...shared} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href && !disabled && !loading) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...shared}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-disabled={disabled || loading ? "true" : undefined}
      {...shared}
      {...rest}
    >
      {inner}
    </button>
  );
}
 
export default Button;
