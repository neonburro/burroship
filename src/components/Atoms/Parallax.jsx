// src/components/Atoms/Parallax.jsx
//
// Restrained scroll parallax. Translates its child on the y axis as
// the element moves through the viewport. Used for ambient backdrops
// like the topo rings so sections feel alive without images. Respects
// reduced motion. Keep speed small. Positive speed drifts up.
// v1 · 2026-06-18

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

function Parallax({ children, speed = 40, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={"relative " + className}>
      <motion.div style={{ y: reduce ? 0 : y }}>{children}</motion.div>
    </div>
  );
}

export default Parallax;
