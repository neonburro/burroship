// src/components/Atoms/TopoLines.jsx
//
// The signature ambient decoration. Concentric rings rendered as 1px
// SVG strokes in accent color. Used:
//   - As watermark behind hero headlines
//   - As section divider element
//   - As pin decoration on cards
//   - Never as foreground

const POSITIONS = {
  "top-right":     "top-[-15%] right-[-15%]",
  "top-left":      "top-[-15%] left-[-15%]",
  "bottom-right":  "bottom-[-15%] right-[-15%]",
  "bottom-left":   "bottom-[-15%] left-[-15%]",
  "center":        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "right-center":  "top-1/2 right-[-10%] -translate-y-1/2",
  "left-center":   "top-1/2 left-[-10%] -translate-y-1/2",
};

const INTENSITIES = {
  subtle: "intensity-subtle",
  medium: "intensity-medium",
  strong: "intensity-strong",
};

function TopoLines({
  size = 420,
  position = "top-right",
  intensity = "subtle",
  onDark = false,
  className = "",
}) {
  return (
    <div
      aria-hidden="true"
      className={
        "absolute topo-rings " +
        INTENSITIES[intensity] +
        " " +
        POSITIONS[position] +
        (onDark ? " on-dark" : "") +
        (className ? " " + className : "")
      }
      style={{
        width: size + "px",
        height: size + "px",
        zIndex: 0,
      }}
    />
  );
}

export default TopoLines;