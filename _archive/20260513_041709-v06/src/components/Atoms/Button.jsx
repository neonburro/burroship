// src/components/Atoms/Button.jsx
import { Link } from "react-router-dom";
 
const BASE =
  "inline-flex items-center gap-2 font-sans text-[13px] font-semibold transition-all duration-[180ms] ease-[var(--ease-standard)] rounded-full select-none";
 
const VARIANTS = {
  primary:
    "bg-ink text-bg px-6 py-3 hover:bg-accent hover:text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
  primaryLime:
    "bg-accent text-ink px-6 py-3 hover:bg-accent-hover shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
  ghost:
    "bg-transparent text-ink px-6 py-3 border border-line hover:border-accent hover:text-accent",
  ghostDark:
    "bg-transparent text-dark-ink px-6 py-3 border border-dark-line hover:border-dark-accent hover:text-dark-accent",
  text:
    "px-0 py-2 text-ink hover:text-accent",
  textDark:
    "px-0 py-2 text-dark-ink hover:text-dark-accent",
};
 
function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  arrow = false,
  ...rest
}) {
  const classes = BASE + " " + VARIANTS[variant] + (className ? " " + className : "");
 
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span aria-hidden="true" className="inline-block translate-y-[-0.5px]">
          →
        </span>
      )}
    </>
  );
 
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
 
export default Button;
