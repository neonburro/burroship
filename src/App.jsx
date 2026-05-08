// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Gateway from "./pages/Gateway";
import Aboard from "./pages/Aboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Gateway />} />
      <Route path="/aboard/" element={<Aboard />} />
    </Routes>
  );
}
