// src/components/Atoms/Reveal.jsx
import { motion } from "framer-motion";

function Reveal({
  children,
  delay = 0,
  duration = 0.48,
  yOffset = 12,
  once = true,
  className = "",
  as = "div",
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;