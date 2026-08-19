// src/components/Atoms/ShipMark.jsx
//
// The ship mark. The burroship logo cut free of its baked black background: the
// black field was flood filled to transparent while the ship interior was kept,
// saved as public/burroship-mark.webp. So the chrome airship sits directly on the
// light blue-gray chrome with no chip behind it. Pairs with Wordmark to make the
// nav and footer lockup.
//
// The art is landscape, roughly 1.76:1, so we size by height and let the width
// follow. The dark tile version of the logo still lives on the home grid (the 01
// tile) where it is meant to glow on black, that one is unchanged. If the mark ever
// needs to sit on a dark surface again, put a chip back or swap to burroship-logo.
// v2 · background free mark on light.

function ShipMark({ height = 26, className = "" }) {
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
