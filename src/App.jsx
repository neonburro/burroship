// src/App.jsx
//
// App shell and routes. Common Nav and Footer on every page except the
// full bleed world map.
// v2 · 2026-06-26 · add rewards route

import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";

import Home from "./pages/Home";
import Build from "./pages/Build";
import Deploy from "./pages/Deploy";
import Automate from "./pages/Automate";
import Rewards from "./pages/Rewards";
import CommandCenter from "./pages/CommandCenter";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  const onWorld = location.pathname.startsWith("/world");
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
        <Route path="/rewards/" element={<Rewards />} />
        <Route path="/contact/" element={<Contact />} />
        <Route path="/world/" element={<CommandCenter />} />
        <Route path="*" element={<Home />} />
      </Routes>

      {showChrome && <Footer />}
    </>
  );
}

export default App;
