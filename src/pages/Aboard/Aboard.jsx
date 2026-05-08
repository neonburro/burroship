// src/pages/Aboard.jsx
import { motion } from "framer-motion";

function Aboard() {
  return (
    <main className="relative w-full h-screen bg-background text-text-primary flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono-label mb-6"
        >
          IDENTIFICATION CONFIRMED
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-medium tracking-tight"
          style={{ lineHeight: 1.04 }}
        >
          Welcome aboard.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-secondary text-lg mt-6"
        >
          Stand by.
        </motion.p>
      </div>
    </main>
  );
}

export default Aboard;