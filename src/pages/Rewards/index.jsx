// src/pages/Rewards/index.jsx
//
// The rewards page. One membership across every outlet. Hero, how it
// works, the reward currencies, the outlets and a join the list close.
// Reuses the shared design system end to end.
// v1 · 2026-06-26

import RewardsHero from "./sections/RewardsHero";
import HowItWorks from "./sections/HowItWorks";
import RewardTypes from "./sections/RewardTypes";
import Outlets from "./sections/Outlets";
import RewardsClosing from "./sections/RewardsClosing";

function Rewards() {
  return (
    <main id="main">
      <RewardsHero />
      <HowItWorks />
      <RewardTypes />
      <Outlets />
      <RewardsClosing />
    </main>
  );
}

export default Rewards;
