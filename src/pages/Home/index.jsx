// src/pages/Home/index.jsx
//
// The vessel. Hero + three operational rooms.
// Sections co-located under Home/sections since they are
// Home-specific and not shared anywhere else.
 
import Hero from "./sections/Hero";
import BuildSection from "./sections/BuildSection";
import DeploySection from "./sections/DeploySection";
import AutomateSection from "./sections/AutomateSection";
 
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
