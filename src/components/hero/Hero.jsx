// src/components/hero/Hero.jsx
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(168,208,85,0.08) 0%, rgba(5,15,5,1) 70%)",
          }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono-label mb-6"
        >
          THE BURROSHIP
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-primary text-5xl md:text-7xl font-medium tracking-tight max-w-4xl"
          style={{ lineHeight: 1.04 }}
        >
          Build. Deploy. Automate.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-secondary text-lg md:text-xl mt-6 max-w-2xl"
        >
          Building bright tools and bold experiences for brands, creators, and fellow burros.
        </motion.p>
      </div>
    </section>
  );
}

export default Hero;