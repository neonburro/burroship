// src/pages/Home/sections/BannerHero.jsx
//
// A thin banner strip right under the nav, one of the etched burro airships. Not
// full bleed anymore, it is inset a touch and barely rounded so the blue-gray
// ground reads down both sides and around the corners. That is the house vibe,
// even the wide images sit on the main color instead of covering it edge to edge.
// No text, it just sets the tone before the gate. v2 · inset and barely rounded.

function BannerHero() {
  return (
    <section aria-hidden="true" className="pt-16 px-3 md:px-4">
      <div
        className="relative w-full overflow-hidden mx-auto"
        style={{
          background: "var(--color-gray-900)",
          height: "clamp(128px, 21vw, 240px)",
          maxWidth: "1440px",
          borderRadius: "22px",
          border: "1px solid var(--color-line)",
          boxShadow: "0 12px 34px rgba(24, 36, 56, 0.14)",
        }}
      >
        <img
          src="/banners/burroship-banner-04.webp"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 38%" }}
        />
      </div>
    </section>
  );
}

export default BannerHero;
