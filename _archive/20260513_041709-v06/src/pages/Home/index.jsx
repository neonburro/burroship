// src/pages/Home/index.jsx
import Hero from "../../components/Sections/Hero";
import WhatWeBuild from "../../components/Sections/WhatWeBuild";
import CesiumPreview from "../../components/Sections/CesiumPreview";
import AreasGrid from "../../components/Sections/AreasGrid";
import AgentCouncilBand from "../../components/Sections/AgentCouncilBand";
import Manifesto from "../../components/Sections/Manifesto";
import Closer from "../../components/Sections/Closer";
 
function Home() {
  return (
    <main id="main">
      <Hero />
      <WhatWeBuild />
      <CesiumPreview />
      <AreasGrid />
      <AgentCouncilBand />
      <Manifesto />
      <Closer />
    </main>
  );
}
 
export default Home;
