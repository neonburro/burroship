// src/components/Atoms/Button.jsx
import { Link } from "react-router-dom";
 
// Tailwind v4 token resolution was failing on `text-bg` inside `bg-ink`
// pills. The v0.5 bug repeated in v0.6. Now using inline style for the
// dark-on-light pill so the text is guaranteed visible. Other variants
// use Tailwind classes that are known to compile correctly.
 
const BASE =
  "inline-flex items-center gap-2 font-sans text-[13px] font-semibold " +
  "rounded-full select-none transition-all duration-200 ease-[var(--ease-standard)]";
 
function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  arrow = false,
  ...rest
}) {
 
  // Variant-specific class strings AND optional inline styles.
  // We use inline `style` for guaranteed color rendering on the pill
  // variants since Tailwind v4's `text-bg` / `text-ink` resolution has
  // been unreliable.
  let variantClasses = "";
  let variantStyle = {};
 
  switch (variant) {
    case "primary":
      // Dark pill, white text. Hover flips to lime green.
      variantClasses = "px-6 py-3";
      variantStyle = {
        background: "var(--color-ink)",
        color: "#FFFFFF",
        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
      };
      break;
 
    case "primaryLime":
      // Lime pill on dark surfaces, dark text.
      variantClasses = "px-6 py-3";
      variantStyle = {
        background: "var(--color-accent)",
        color: "var(--color-ink)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
      };
      break;
 
    case "ghost":
      // Outlined pill on light surfaces.
      variantClasses =
        "px-6 py-3 bg-transparent border hover:bg-surface";
      variantStyle = {
        color: "var(--color-ink)",
        borderColor: "var(--color-line)",
      };
      break;
 
    case "ghostDark":
      // Outlined pill on dark surfaces.
      variantClasses = "px-6 py-3 bg-transparent border";
      variantStyle = {
        color: "var(--color-dark-ink)",
        borderColor: "var(--color-dark-line)",
      };
      break;
 
    case "text":
      // Inline text link with hover color.
      variantClasses =
        "px-0 py-2 bg-transparent hover:text-accent";
      variantStyle = { color: "var(--color-ink)" };
      break;
 
    case "textDark":
      // Inline text link on dark surfaces.
      variantClasses =
        "px-0 py-2 bg-transparent hover:text-dark-accent";
      variantStyle = { color: "var(--color-dark-ink)" };
      break;
 
    case "operational":
      // Section-CTA style: "Open the table" / "Open the room" / etc.
      // Hairline underline, mono'd hover state.
      variantClasses =
        "px-0 py-2 bg-transparent border-b border-line hover:border-accent rounded-none";
      variantStyle = { color: "var(--color-ink-muted)" };
      break;
 
    default:
      variantClasses = "px-6 py-3";
      variantStyle = {
        background: "var(--color-ink)",
        color: "#FFFFFF",
      };
  }
 
  const classes =
    BASE + " " + variantClasses + (className ? " " + className : "");
 
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
 
  // Hover handling for variants that need a color flip. We use
  // onMouseEnter / onMouseLeave on the pill variants since CSS-only
  // hover with inline style would require a `:hover` rule we don't have.
  const isPillPrimary = variant === "primary";
  const isPillLime = variant === "primaryLime";
 
  const handleMouseEnter = (e) => {
    if (isPillPrimary) {
      e.currentTarget.style.background = "var(--color-accent)";
      e.currentTarget.style.color = "var(--color-ink)";
    } else if (isPillLime) {
      e.currentTarget.style.background = "var(--color-accent-hover)";
    }
  };
 
  const handleMouseLeave = (e) => {
    if (isPillPrimary) {
      e.currentTarget.style.background = "var(--color-ink)";
      e.currentTarget.style.color = "#FFFFFF";
    } else if (isPillLime) {
      e.currentTarget.style.background = "var(--color-accent)";
    }
  };
 
  const interactiveProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
 
  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        style={variantStyle}
        {...(isPillPrimary || isPillLime ? interactiveProps : {})}
        {...rest}
      >
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        style={variantStyle}
        {...(isPillPrimary || isPillLime ? interactiveProps : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      className={classes}
      style={variantStyle}
      {...(isPillPrimary || isPillLime ? interactiveProps : {})}
      {...rest}
    >
      {inner}
    </button>
  );
}
 
export default Button;
