// src/components/Atoms/Wordmark.jsx
//
// The wordmark. theburroship in lowercase with the signature sky blue
// dot acting as the period. The dot sits on the text baseline using a
// flex row with a shared baseline so it never floats. One source of
// truth for every placement: nav, footer, hero.
// v1 · 2026-06-18

function Wordmark({ size = "20px", className = "", glow = true }) {
  return (
    <span
      className={"inline-flex items-baseline text-ink " + className}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: size,
        letterSpacing: "-0.04em",
        textTransform: "lowercase",
        lineHeight: 1,
      }}
    >
      theburroship
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "0.14em",
          height: "0.14em",
          borderRadius: "50%",
          marginLeft: "0.05em",
          background: "var(--color-accent)",
          boxShadow: glow ? "0 0 10px var(--color-accent-glow)" : "none",
        }}
      />
    </span>
  );
}

export default Wordmark;
