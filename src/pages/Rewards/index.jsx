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

import Head from "../../components/SEO/Head";

function Rewards() {
  return (
    <main id="main">
      <Head
        title="Rewards"
        description="One balance and more than one kind of value. A single membership that earns across every outlet on the network."
        path="/rewards/"
      />
      <RewardsHero />
      <HowItWorks />
      <RewardTypes />
      <Outlets />
      <RewardsClosing />
    </main>
  );
}

export default Rewards;
