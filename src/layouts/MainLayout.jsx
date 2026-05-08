// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-text-primary">
      <Header />
      <main className="flex-1 relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
