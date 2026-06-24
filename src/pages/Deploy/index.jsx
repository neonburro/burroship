// src/pages/Deploy/index.jsx
//
// The deploy page. A scroll zoom hero into the live core then grounded
// sections: the three environments, a signals strip and a closing band
// back to the gate. Reuses the shared design system end to end.
// v1 · 2026-06-18

import DeployHero from "./sections/DeployHero";
import Environments from "./sections/Environments";
import Signals from "./sections/Signals";
import DeployClosing from "./sections/DeployClosing";

function Deploy() {
  return (
    <main id="main">
      <DeployHero />
      <Environments />
      <Signals />
      <DeployClosing />
    </main>
  );
}

export default Deploy;
