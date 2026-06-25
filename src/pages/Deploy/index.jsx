// src/pages/Deploy/index.jsx
//
// The deploy page. Quiet hero, how it runs, a signals strip and a
// closing band. Sharp and clean, matching the build page rhythm.
// Reuses the shared design system end to end.
// v1 · 2026-06-24

import DeployHero from "./sections/DeployHero";
import HowItRuns from "./sections/HowItRuns";
import Signals from "./sections/Signals";
import DeployClosing from "./sections/DeployClosing";

function Deploy() {
  return (
    <main id="main">
      <DeployHero />
      <HowItRuns />
      <Signals />
      <DeployClosing />
    </main>
  );
}

export default Deploy;
