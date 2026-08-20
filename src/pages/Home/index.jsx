// src/pages/Home/index.jsx
//
// The ship, login first. A thin airship banner, the gate (a login on the page
// itself under one mysterious line), then the sealed squares that hint at what is
// aboard. The old studio-incubator sections are retired from the home and kept in
// the folder for reference, nothing imports them now.
// v4 · 2026-08-19 · login-first mystery

import BannerHero from "./sections/BannerHero";
import Gate from "./sections/Gate";
import TheLog from "./sections/TheLog";
import TwoThings from "./sections/TwoThings";
import Blocks from "./sections/Blocks";

function Home() {
  return (
    <main id="main">
      <BannerHero />
      <Gate />
      <TheLog />
      <TwoThings />
      <Blocks />
    </main>
  );
}

export default Home;
