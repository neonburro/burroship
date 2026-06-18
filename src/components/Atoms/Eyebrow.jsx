// src/components/Atoms/Eyebrow.jsx
//
// Eyebrow. The repeated operational label. Mono, uppercase, with an
// optional live signal dot (reuses .beacon-dot) and optional trailing
// hairline rule. Single dark system, sky-blue accent.

const TONE_CLASS = {
  accent: "text-accent",
  muted: "text-ink-faint",
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

  return (
    <p
      className={
        "text-mono inline-flex items-center gap-3 " +
        toneClass +
        (className ? " " + className : "")
      }
      style={{ margin: 0 }}
    >
      {signal && <span className="beacon-dot sm pulse" aria-hidden="true" />}
      <span>{children}</span>
      {rule && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            flex: "1 1 auto",
            minWidth: "32px",
            height: "1px",
            background: "var(--color-line)",
            opacity: 0.9,
          }}
        />
      )}
    </p>
  );
}

export default Eyebrow;
