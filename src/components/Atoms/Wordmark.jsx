// src/components/Atoms/Wordmark.jsx
//
// The wordmark. theburroship in lowercase with the signature sky blue dot acting as
// the period. The dot sits on the text baseline using a flex row with a shared
// baseline so it never floats. One source of truth for every placement: nav, footer,
// hero. color defaults to the ink token, pass a light color (for the black nav) to
// flip the letters white without touching the accent period.
// v4 · retracked for the rounded gothic. Zen Maru Gothic has no 600, so this is 500,
// and a rounded face needs almost no tightening, its terminals collide if you tighten
// them the way a geometric sans wants. -0.005em, not the -0.04em this started at.

function Wordmark({ size = "20px", className = "", glow = true, color = "var(--color-ink)" }) {
  return (
    <span
      className={"inline-flex items-baseline " + className}
      style={{
        color,
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: size,
        letterSpacing: "-0.005em",
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
