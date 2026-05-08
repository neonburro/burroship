// src/App.jsx
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import Aboard from "./pages/Aboard/Aboard";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/map/" element={<Map />} />
        <Route path="/aboard/" element={<Aboard />} />
      </Route>
    </Routes>
  );
}

export default App;