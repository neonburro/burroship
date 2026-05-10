// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home/Home";
import BurroshipMap from "./pages/BurroshipMap";
import Aboard from "./pages/Aboard/Aboard";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/world/" element={<BurroshipMap />} />
        <Route path="/map/" element={<Navigate to="/world/" replace />} />
        <Route path="/aboard/" element={<Aboard />} />
      </Route>
    </Routes>
  );
}

export default App;