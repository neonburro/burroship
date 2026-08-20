// src/pages/Home/index.jsx
//
// The ship, login first, stripped to the essentials. The gate now owns the banner and
// the login as ONE sheet, see Gate.jsx, so there is no separate hero section any more.
// Then the log, the ship's public writing. Everything else is hidden for now while we decide what the front should say.
// TwoThings and Blocks (the six squares) are kept in the folder, nothing imports them,
// bring them back by re-adding the import and the tag.
// v5 · 2026-08-20 · hero, login, blog only

import Gate from "./sections/Gate";
import TheLog from "./sections/TheLog";

function Home() {
  return (
    <main id="main">
      <Gate />
      <TheLog />
    </main>
  );
}

export default Home;
