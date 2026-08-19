// src/pages/Home/sections/BannerHero.jsx
//
// A thin full bleed banner strip right under the nav, one of the etched burro
// airships. No text, it just sets the tone before the white hero, and it fades
// into the white page at the bottom so the seam is soft. v1.

function BannerHero() {
  return (
    <section aria-hidden="true" className="pt-16">
      <div
        className="relative w-full overflow-hidden"
        style={{ background: "var(--color-gray-900)", height: "clamp(190px, 30vw, 340px)" }}
      >
        <img
          src="/banners/burroship-banner-04.webp"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 42%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 62%, var(--color-bg))",
          }}
        />
      </div>
    </section>
  );
}

export default BannerHero;
