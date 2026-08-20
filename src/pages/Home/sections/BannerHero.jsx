// src/pages/Home/sections/BannerHero.jsx
//
// The wide banner right under the nav, one of the etched burro airships. We show
// the FULL image now, no crop, so the airship, the range and the foreground all
// read. The art is 2172x724, a clean 3:1, so h-auto gives it its natural height at
// whatever width the band takes. It fills the canvas, 99.5% on mobile and 97% on
// desktop, just a hairline of blue-gray at the edges and barely rounded corners,
// the house measure that matches the gate and the aboard grid below.
// v4 · full image, no crop.

function BannerHero() {
  return (
    <section aria-hidden="true" className="pt-[86px]">
      <div
        className="relative mx-auto w-[99.5%] md:w-[97%] overflow-hidden"
        style={{
          background: "var(--color-gray-900)",
          borderRadius: "22px",
          border: "1px solid var(--color-line)",
          boxShadow: "0 12px 34px rgba(24, 36, 56, 0.14)",
        }}
      >
        <img
          src="/banners/burroship-banner-04.webp"
          alt=""
          className="block w-full h-auto"
        />
      </div>
    </section>
  );
}

export default BannerHero;
