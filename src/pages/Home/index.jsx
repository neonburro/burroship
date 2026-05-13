// src/pages/Home/index.jsx
//
// The vessel. Hero + three operational rooms.

import Hero from "../../components/Sections/Hero";
import BuildSection from "../../components/Sections/BuildSection";
import DeploySection from "../../components/Sections/DeploySection";
import AutomateSection from "../../components/Sections/AutomateSection";

function Home() {
  return (
    <main id="main">
      <Hero />
      <BuildSection />
      <DeploySection />
      <AutomateSection />
    </main>
  );
}

export default Home;
