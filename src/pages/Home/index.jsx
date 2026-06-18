// src/pages/Home/index.jsx
//
// The vessel. A sealed dark homepage: the approach, the operating
// layer, the gate, the field. Common Nav and Footer come from App.

import Hero from "./sections/Hero";
import PillarsSection from "./sections/PillarsSection";
import CodeGate from "./sections/CodeGate";
import Collage from "./sections/Collage";

function Home() {
  return (
    <main id="main">
      <Hero />
      <PillarsSection />
      <CodeGate />
      <Collage />
    </main>
  );
}

export default Home;
