"use client";

import { motion, MotionValue } from "framer-motion";
import { useRef } from "react";

interface CursorTrailProps {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

const CursorTrail = ({ springX, springY }: CursorTrailProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed w-4 h-4 bg-gray-500/30 dark:bg-gray-400/30 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        scale: [1, 2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    />
  );
};

export default CursorTrail;
