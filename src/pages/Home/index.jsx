// src/pages/Home/index.jsx
//
// The vessel. The studio incubator homepage in descending order:
// studio hero, the work itself, the incubator, the network of
// ventures, operations, rewards, then the invitation gate. Common Nav
// and Footer come from App.
// v3 · 2026-06-24 · studio incubator reframe

import BannerHero from "./sections/BannerHero";
import Hero from "./sections/Hero";
import PillarsSection from "./sections/PillarsSection";
import Incubator from "./sections/Incubator";
import Ventures from "./sections/Ventures";
import Operations from "./sections/Operations";
import Rewards from "./sections/Rewards";
import Invitation from "./sections/Invitation";

function Home() {
  return (
    <main id="main">
      <BannerHero />
      <Hero />
      <PillarsSection />
      <Incubator />
      <Ventures />
      <Operations />
      <Rewards />
      <Invitation />
    </main>
  );
}

export default Home;
