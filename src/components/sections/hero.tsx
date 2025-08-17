"use client";

import {
  motion,
  useSpring,
  useMotionValue,
  useAnimationControls,
} from "framer-motion";
import {
  ChevronDown,
  Download,
  Mail,
  Code,
  Zap,
  Sparkles,
  Database,
  Globe,
  Cpu,
  Shield,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { downloadCV } from "@/lib/utils";

const Hero = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const controls = useAnimationControls();
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const techStack = [
    { icon: Code, name: "Frontend", color: "text-blue-500" },
    { icon: Database, name: "Backend", color: "text-green-500" },
    { icon: Globe, name: "Full Stack", color: "text-purple-500" },
    { icon: Cpu, name: "DevOps", color: "text-orange-500" },
    { icon: Shield, name: "Security", color: "text-red-500" },
  ];

  const nameVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  // Typing effect for name
  useEffect(() => {
    const fullName = "Engr. Florante G. Clavano Jr.";
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayText(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    // Set dimensions on mount
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;

      mouseX.set(x * 50);
      mouseY.set(y * 50);

      // Cursor trail effect
      if (cursorRef.current) {
        cursorRef.current.style.left = clientX + "px";
        cursorRef.current.style.top = clientY + "px";
      }
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
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(30deg,#4f46e5_12%,transparent_12.5%,transparent_87%,#4f46e5_87.5%,#4f46e5)] bg-[length:20px_20px]" />
      </motion.div>

      {/* Morphing Background Shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        animate={{
          borderRadius: ["50%", "30%", "70%", "50%"],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 180, 360, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"
        animate={{
          borderRadius: ["30%", "70%", "50%", "30%"],
          scale: [0.8, 1.2, 1, 0.8],
          rotate: [360, 180, 0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 text-blue-400/20 dark:text-blue-300/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Code size={40} />
      </motion.div>

      <motion.div
        className="absolute top-40 right-32 text-purple-400/20 dark:text-purple-300/20"
        animate={{
          y: [0, 20, 0],
          rotate: [360, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Zap size={32} />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-32 text-green-400/20 dark:text-green-300/20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Sparkles size={36} />
      </motion.div>

      {/* Floating Tech Stack Icons */}
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          className={`absolute ${tech.color} opacity-20`}
          style={{
            left: `${20 + index * 15}%`,
            top: `${30 + index * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        >
          <tech.icon size={24 + index * 2} />
        </motion.div>
      ))}

      {/* Interactive Background Blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
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

      {/* Cursor Trail Effect */}
      <motion.div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-blue-500/30 rounded-full pointer-events-none z-50 mix-blend-difference"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-medium"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
          >
            Hello, I&apos;m
          </motion.p>

          {/* Interactive Name with Typing Effect */}
          <motion.h1
            variants={nameVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white cursor-pointer select-none"
            onHoverStart={handleNameHover}
            onHoverEnd={handleNameLeave}
            whileHover={{
              textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
              filter: "brightness(1.1)",
            }}
          >
            {displayText.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
                whileHover={{
                  scale: 1.2,
                  y: -10,
                  rotateY: 360,
                  transition: { duration: 0.3 },
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
            {isTyping && (
              <motion.span
                className="inline-block w-1 h-16 bg-blue-500 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.h1>

          {/* Animated Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300"
            whileHover={{
              scale: 1.05,
              color: "#4f46e5",
            }}
          >
            Software Engineer
          </motion.h2>

          {/* Enhanced Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            I am an Electronics Engineer who has a passion for building web
            applications. I practiced my profession for a year before I shifted
            into the IT industry. My decision comes from my fondness of coding
            back in my college days. I have over four years of experience
            building web applications for e-commerce, logistics applications,
            business valuation calculator and property technology both in
            front-end and back-end.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
              onClick={() => {
                if (typeof document !== "undefined") {
                  const element = document.querySelector("#contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Get In Touch
              </span>
            </motion.button>

            <motion.button
              onClick={downloadCV}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
                y: -2,
                borderColor: "#4f46e5",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download CV
              </span>
            </motion.button>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToAbout}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              }}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              aria-label="Scroll to about section"
            >
              <ChevronDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {dimensions.width > 0 &&
          [...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0
                  ? "w-2 h-2 bg-blue-400/40"
                  : i % 3 === 1
                  ? "w-1 h-1 bg-purple-400/30"
                  : "w-1.5 h-1.5 bg-green-400/35"
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
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
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
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-400/20 to-transparent"
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
    </section>
  );
};

export default Hero;
