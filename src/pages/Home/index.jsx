// src/pages/Home/index.jsx
//
// The vessel. A sealed dark homepage: the approach, the operating
// layer, the invitation, the field. Common Nav and Footer come from App.

import Hero from "./sections/Hero";
import PillarsSection from "./sections/PillarsSection";
import Invitation from "./sections/Invitation";
import Collage from "./sections/Collage";

function Home() {
  return (
    <main id="main">
      <Hero />
      <PillarsSection />
      <Invitation />
      <Collage />
    </main>
  );
}

export default Home;
