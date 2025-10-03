"use client";

import { useSpring, useMotionValue, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import BackgroundEffects from "./hero/BackgroundEffects";
import CodeSnippets from "./hero/CodeSnippets";
import TechIcons from "./hero/TechIcons";
import HeroContent from "./hero/HeroContent";
import CursorTrail from "./hero/CursorTrail";

const Hero = () => {
  const controls = useAnimationControls();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;

      mouseX.set(x * 50);
      mouseY.set(y * 50);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Initial animation for the name
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4 },
    });
  }, [controls]);

  const scrollToAbout = () => {
    if (typeof document !== "undefined") {
      const element = document.querySelector("#about");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNameHover = () => {
    controls.start({
      opacity: 1,
      y: 0,
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    });
  };

  const handleNameLeave = () => {
    controls.start({ scale: 1, rotate: 0 });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <BackgroundEffects springX={springX} springY={springY} />
      <CodeSnippets />
      <TechIcons />
      <CursorTrail springX={springX} springY={springY} />
      <HeroContent
        handleNameHover={handleNameHover}
        handleNameLeave={handleNameLeave}
        scrollToAbout={scrollToAbout}
      />
    </section>
  );
};

export default Hero;
