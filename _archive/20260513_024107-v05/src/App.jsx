// src/App.jsx
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
 
 
 
import Nav from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";
 
import Home from "./pages/Home";
import Build from "./pages/Build";
import Deploy from "./pages/Deploy";
import Automate from "./pages/Automate";
import BurroshipMap from "./pages/BurroshipMap";
 
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
 
  return (
    <>
      <ScrollToTop />
      <Nav />
 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build/" element={<Build />} />
        <Route path="/deploy/" element={<Deploy />} />
        <Route path="/automate/" element={<Automate />} />
        <Route path="/world/" element={<BurroshipMap />} />
        <Route path="*" element={<Home />} />
      </Routes>
 
      {!onWorld && <Footer />}
    </>
  );
}
 
export default App;
