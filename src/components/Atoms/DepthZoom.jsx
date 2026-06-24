// src/components/Atoms/DepthZoom.jsx
//
// Scroll driven dolly zoom. Stacked transparent layers each scale and
// fade at a different rate tied to scroll progress through the host
// section. Nearer layers grow faster so the eye reads depth and you
// feel like you are flying into the picture. No images and no 3d
// engine, just transforms and opacity. Respects reduced motion.
//
// Pass an array of layers. Each layer renders centered and absolutely
// positioned. depth 0 is far and slow, depth 1 is near and fast.
// v1 · 2026-06-18

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

function Layer({ progress, depth, fromScale, toScale, children, reduce }) {
  const scale = useTransform(progress, [0, 1], [fromScale, toScale]);
  const opacity = useTransform(
    progress,
    [0, 0.15 + depth * 0.1, 0.7 + depth * 0.2, 1],
    [0, 1, 1, 0]
  );
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={reduce ? { opacity: 0.6 } : { scale, opacity }}
    >
      {children}
    </motion.div>
  );
}

function DepthZoom({ layers, className = "", children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div ref={ref} className={"relative " + className}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {layers.map((layer, i) => (
          <Layer
            key={i}
            progress={scrollYProgress}
            depth={layer.depth}
            fromScale={layer.fromScale}
            toScale={layer.toScale}
            reduce={reduce}
          >
            {layer.node}
          </Layer>
        ))}
        {children}
      </div>
    </div>
  );
}

export default DepthZoom;
