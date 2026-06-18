// src/App.jsx
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";

import Home from "./pages/Home";
import Build from "./pages/Build";
import Deploy from "./pages/Deploy";
import Automate from "./pages/Automate";
import CommandCenter from "./pages/CommandCenter";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  // The Cesium /world map runs full-bleed with no chrome.
  const onWorld = location.pathname.startsWith("/world");

  // Common Nav + Footer on every page except the world map.
  const showChrome = !onWorld;

  return (
    <>
      <ScrollToTop />
      {showChrome && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build/" element={<Build />} />
        <Route path="/deploy/" element={<Deploy />} />
        <Route path="/automate/" element={<Automate />} />
        <Route path="/world/" element={<CommandCenter />} />
        <Route path="*" element={<Home />} />
      </Routes>

      {showChrome && <Footer />}
    </>
  );
}

export default App;
