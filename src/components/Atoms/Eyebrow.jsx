// src/components/Atoms/Eyebrow.jsx
//
// Eyebrow v2. Council design-system pass, Phase 2.
//
// v1 was colored uppercase mono text and nothing else. Ion's
// call: it is the single most-repeated identity marker on every
// page, so it must read as "operational intelligence," not a
// generic SaaS eyebrow. The upgrade is not decoration. It is
// making the eyebrow a compositional instrument, the way a real
// control panel labels a readout.
//
// New, all optional and restrained:
//   - tone variants mapped to surface context
//   - optional live signal dot (reuses the .beacon-dot system
//     already in index.css, so it is consistent with the rest
//     of the operational language)
//   - optional trailing hairline rule that extends the label
//     into the layout like an instrument scale
//
// Backward compatible: the v1 `tone` prop and its values
// (accent / muted / dark / default) still work unchanged. No
// existing page breaks.
 
const TONE_CLASS = {
  accent: "text-accent",
  muted: "text-ink-faint",
  dark: "text-dark-accent",
  default: "text-ink",
};
 
function Eyebrow({
  children,
  tone = "accent",
  signal = false,
  rule = false,
  className = "",
}) {
  const toneClass = TONE_CLASS[tone] || TONE_CLASS.default;
  const onDark = tone === "dark";
 
  return (
    <p
      className={
        "text-mono inline-flex items-center gap-3 " +
        toneClass +
        (className ? " " + className : "")
      }
      style={{ margin: 0 }}
    >
      {signal && (
        <span
          className={
            "beacon-dot sm pulse" + (onDark ? " on-dark" : "")
          }
          aria-hidden="true"
        />
      )}
 
      <span>{children}</span>
 
      {rule && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            flex: "1 1 auto",
            minWidth: "32px",
            height: "1px",
            background: onDark
              ? "var(--color-dark-line)"
              : "var(--color-line)",
            opacity: 0.9,
          }}
        />
      )}
    </p>
  );
}
 
export default Eyebrow;
