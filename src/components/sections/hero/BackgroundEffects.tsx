"use client";

import { motion, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface BackgroundEffectsProps {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

const BackgroundEffects = ({ springX, springY }: BackgroundEffectsProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: typeof window !== "undefined" ? window.innerWidth : 0,
      height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <>
      {/* Code Pattern Background */}
      <motion.div
        className="absolute inset-0 opacity-5 dark:opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(30deg,#374151_12%,transparent_12.5%,transparent_87%,#374151_87.5%,#374151)] bg-[length:20px_20px]" />
      </motion.div>

      {/* Abstract Tech Circuit Pattern */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-gray-300/10 to-gray-400/10 dark:from-gray-600/20 dark:to-gray-500/20 rounded-lg blur-xl"
        animate={{
          borderRadius: ["20%", "50%", "30%", "20%"],
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-gray-400/10 to-gray-300/10 dark:from-gray-500/20 dark:to-gray-600/20 rounded-lg blur-xl"
        animate={{
          borderRadius: ["50%", "20%", "40%", "50%"],
          scale: [0.9, 1.1, 1, 0.9],
          rotate: [360, 270, 180, 90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Interactive Background Blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-gray-300/10 to-gray-400/10 dark:from-gray-600/20 dark:to-gray-500/20 rounded-full blur-3xl"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: [1, 1.2, 1],
          borderRadius: ["50%", "40%", "60%", "50%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Enhanced Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {dimensions.width > 0 &&
          [...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0
                  ? "w-2 h-2 bg-gray-400/30 dark:bg-gray-500/40"
                  : i % 3 === 1
                  ? "w-1 h-1 bg-gray-500/20 dark:bg-gray-400/30"
                  : "w-1.5 h-1.5 bg-gray-600/25 dark:bg-gray-300/35"
              }`}
              initial={{
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                scale: 0,
              }}
              animate={{
                y: [0, -150, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-gray-400/10 dark:via-gray-500/20 to-transparent"
            style={{ top: `${(i + 1) * 10}%` }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-gray-500/10 dark:via-gray-400/20 to-transparent"
            style={{ left: `${(i + 1) * 10}%` }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3 + 1.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;
