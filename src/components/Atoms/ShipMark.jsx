// src/components/Atoms/ShipMark.jsx
//
// The ship mark, two modes.
//
//   bare (default) • the logo cut free of its baked black background (flood filled
//     transparent, ship interior kept, public/burroship-mark.webp) so the chrome
//     airship sits directly on a surface. Reads on light AND on a dark surface like
//     the black nav, because the ship art is bright.
//
//   chip • the original on-black logo (public/burroship-logo.webp) set in a small
//     dark rounded square, for when the surface is light but we still want the black
//     backed mark, like the footer. The art carries its own black margin so we zoom
//     in a touch to fill the chip.
//
// bare sizes by height, chip sizes by chipSize (a square edge). The 01 home tile
// still uses burroship-logo.webp on its own black tile, unchanged.
// v3 · bare and chip modes.

function ShipMark({ height = 26, chip = false, chipSize = 40, className = "" }) {
  if (chip) {
    const r = Math.round(chipSize * 0.3);
    return (
      <span
        aria-hidden="true"
        className={"inline-flex items-center justify-center overflow-hidden shrink-0 " + className}
        style={{
          width: chipSize,
          height: chipSize,
          borderRadius: r,
          background: "var(--color-gray-900)",
          border: "1px solid var(--color-line)",
        }}
      >
        <img
          src="/burroship-logo.webp"
          alt=""
          className="w-full h-full object-cover"
          style={{ transform: "scale(1.45)" }}
        />
      </span>
    );
  }

  return (
    <img
      src="/burroship-mark.webp"
      alt=""
      aria-hidden="true"
      className={"block w-auto shrink-0 " + className}
      style={{ height }}
    />
  );
}

export default ShipMark;
