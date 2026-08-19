// src/pages/Home/sections/BannerHero.jsx
//
// A wide banner strip right under the nav, one of the etched burro airships. It
// fills the canvas, 99.5% on mobile and 97% on desktop, so only a hairline of the
// blue-gray ground shows at the edges and the rounded corners are barely there.
// That width is the house measure, it matches the gate and the aboard grid below.
// No text, it just sets the tone before the gate. v3 · fills the canvas.

function BannerHero() {
  return (
    <section aria-hidden="true" className="pt-16">
      <div
        className="relative mx-auto w-[99.5%] md:w-[97%] overflow-hidden"
        style={{
          background: "var(--color-gray-900)",
          height: "clamp(140px, 19vw, 360px)",
          borderRadius: "22px",
          border: "1px solid var(--color-line)",
          boxShadow: "0 12px 34px rgba(24, 36, 56, 0.14)",
        }}
      >
        <img
          src="/banners/burroship-banner-04.webp"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 34%" }}
        />
      </div>
    </section>
  );
}

export default BannerHero;
