// src/components/Atoms/Eyebrow.jsx

function Eyebrow({ children, tone = "accent", className = "" }) {
  const toneClass =
    tone === "accent"
      ? "text-accent"
      : tone === "muted"
      ? "text-ink-faint"
      : tone === "dark"
      ? "text-dark-accent"
      : "text-ink";

  return (
    <p className={"text-mono " + toneClass + (className ? " " + className : "")}>
      {children}
    </p>
  );
}

export default Eyebrow;