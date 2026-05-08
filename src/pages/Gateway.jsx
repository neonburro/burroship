// src/pages/Gateway.jsx
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import Footer from "../components/footer/Footer";

export default function Gateway() {
  return (
    <main className="relative bg-background text-text-primary">
      <Header />
      <Hero />

      {/* Map placeholder for now. Real Mapbox integration next batch. */}
      <section
        id="map"
        className="relative w-full h-screen flex items-center justify-center border-y border-border"
      >
        <div className="text-center">
          <p className="font-mono-label mb-4">SECTION 003 / MAP</p>
          <p className="text-text-secondary max-w-md mx-auto">
            The world below. Mapbox integration coming next.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
