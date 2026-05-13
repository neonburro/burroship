// src/pages/Home/index.jsx
import Hero from "../../components/Sections/Hero";
import CesiumPreview from "../../components/Sections/CesiumPreview";
import AreasGrid from "../../components/Sections/AreasGrid";
import Manifesto from "../../components/Sections/Manifesto";
import Closer from "../../components/Sections/Closer";
 
function Home() {
  return (
    <main id="main">
      <Hero />
      <CesiumPreview />
      <AreasGrid />
      <Manifesto />
      <Closer />
    </main>
  );
}
 
export default Home;
