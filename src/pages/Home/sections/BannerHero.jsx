// src/pages/Home/sections/BannerHero.jsx
//
// The wide banner right under the nav. The ship holding station over courthouse rock
// and chimney rock, the two landmarks you actually see from town, so the first thing a
// visitor meets is a real place and not a generic sky. We show the FULL image, no crop,
// so h-auto gives it its natural height at whatever width the band takes. The art is
// 1600x800, a clean 2:1, and lives in public/banners. It fills the canvas, 99.5% on
// mobile and 97% on desktop, just a hairline of blue-gray at the edges and barely
// rounded corners, the house measure the gate and the log below both match.
// v5 · courthouse and chimney rock.

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
          src="/banners/courthouse-chimney-airship.webp"
          alt=""
          className="block w-full h-auto"
        />
      </div>
    </section>
  );
}

export default BannerHero;
