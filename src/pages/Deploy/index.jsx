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

import Head from "../../components/SEO/Head";

function Deploy() {
  return (
    <main id="main">
      <Head
        title="Deploy"
        description="Getting it running and keeping it that way. Hosting, releases and the signals that say whether last night actually went through."
        path="/deploy/"
      />
      <DeployHero />
      <HowItRuns />
      <Signals />
      <DeployClosing />
    </main>
  );
}

export default Deploy;
