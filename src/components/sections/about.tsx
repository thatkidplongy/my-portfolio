"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { User, MapPin, Calendar, Mail, Phone, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { downloadCV } from "@/lib/utils";

// Floating Particle Component
const FloatingParticle = ({
  delay = 0,
  duration = 20,
  size = "w-2 h-2",
}: {
  delay?: number;
  duration?: number;
  size?: string;
}) => {
  const y = useMotionValue(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const animate = () => {
      y.set(0);
      x.set(0);

      setTimeout(() => {
        y.set(-100);
        x.set(Math.random() * 200 - 100);
      }, delay * 1000);
    };

    animate();
    const interval = setInterval(animate, duration * 1000);
    return () => clearInterval(interval);
  }, [y, x, delay, duration]);

  const springY = useSpring(y, { stiffness: 0.1, damping: 0.8 });
  const springX = useSpring(x, { stiffness: 0.1, damping: 0.8 });

  return (
    <motion.div
      style={{ y: springY, x: springX }}
      className={`absolute ${size} bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60`}
    />
  );
};

// Interactive Background Grid
const BackgroundGrid = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const gridX = useTransform(
    useMotionValue(mousePosition.x),
    [0, windowSize.width],
    [-20, 20]
  );
  const gridY = useTransform(
    useMotionValue(mousePosition.y),
    [0, windowSize.height],
    [-20, 20]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="absolute inset-0 opacity-5"
      >
        <div className="w-full h-full bg-[linear-gradient(90deg,transparent_98%,#3b82f6_100%)] bg-[length:50px_50px]" />
        <div className="w-full h-full bg-[linear-gradient(0deg,transparent_98%,#3b82f6_100%)] bg-[length:50px_50px]" />
      </motion.div>
    </div>
  );
};

// Animated Tech Icons
const TechIcon = ({
  icon,
  delay,
  className,
}: {
  icon: React.ReactNode;
  delay: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 200 }}
      whileHover={{
        scale: 1.2,
        rotate: 360,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`absolute ${className} p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg`}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const personalInfo = [
    {
      icon: <User className="h-5 w-5" />,
      label: "Name",
      value: "Florante G. Clavano Jr.",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Salay, Misamis Oriental, Philippines",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Experience",
      value: "4+ Years",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "fgclavano@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "09664532948",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: "Website",
      value: "fgclavano@gmail.com",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <BackgroundGrid />

      {/* Floating Particles */}
      <FloatingParticle delay={0} duration={25} size="w-3 h-3" />
      <FloatingParticle delay={5} duration={30} size="w-2 h-2" />
      <FloatingParticle delay={10} duration={35} size="w-4 h-4" />
      <FloatingParticle delay={15} duration={28} size="w-1 h-1" />
      <FloatingParticle delay={20} duration={32} size="w-3 h-3" />

      {/* Animated Tech Icons */}
      <TechIcon
        icon={<User className="h-6 w-6 text-blue-400" />}
        delay={0.2}
        className="top-20 right-20"
      />
      <TechIcon
        icon={<Mail className="h-6 w-6 text-purple-400" />}
        delay={0.4}
        className="top-32 left-16"
      />
      <TechIcon
        icon={<Calendar className="h-6 w-6 text-green-400" />}
        delay={0.6}
        className="bottom-32 right-32"
      />
      <TechIcon
        icon={<Globe className="h-6 w-6 text-yellow-400" />}
        delay={0.8}
        className="bottom-20 left-24"
      />

      {/* Floating Geometric Shapes */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-10 left-10 w-16 h-16 border-2 border-blue-300/30 rounded-full"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-10 right-10 w-20 h-20 border-2 border-purple-300/30 transform rotate-45"
      />
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-5 w-12 h-12 border-2 border-green-300/30 transform rotate-45"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Get to know me better and understand what drives me in the world of
            technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Profile Image */}
            <motion.div
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl shadow-2xl overflow-hidden relative group"
            >
              {/* Profile Image */}
              <Image
                src="/profile-image.jpg"
                alt="Profile Photo"
                fill
                className="object-cover"
                priority
                onError={() => {
                  // Fallback handled by CSS if image fails
                }}
              />

              {/* Fallback Emoji (shows if image fails) */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center text-white text-6xl font-bold bg-gradient-to-br from-blue-400 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300">
                👨‍💻
              </div>

              {/* Interactive Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Floating Elements with Enhanced Animation */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-80"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-80"
              />

              {/* Interactive Border Glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 40px rgba(147, 51, 234, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-2xl"
              />
            </motion.div>

            {/* Floating Tech Bubbles */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-8 -left-8 w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-300/30 flex items-center justify-center"
            >
              <span className="text-blue-600 text-lg">⚛️</span>
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 0.9, 1],
                rotate: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -right-6 w-10 h-10 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-300/30 flex items-center justify-center"
            >
              <span className="text-purple-600 text-sm">🚀</span>
            </motion.div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white"
            >
              Passionate Full Stack Developer
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-lg text-white/90 leading-relaxed"
            >
              I am an Electronics Engineer who has a passion for building web
              applications. I practiced my profession for a year before I
              shifted into the IT industry. My decision comes from my fondness
              of coding back in my college days.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="text-lg text-white/80 leading-relaxed"
            >
              I have over four years of experience building web applications for
              e-commerce, logistics applications, business valuation calculator
              and property technology both in front-end and back-end. My journey
              in technology started with curiosity and has evolved into a career
              filled with continuous learning and growth.
            </motion.p>

            {/* Enhanced Personal Information Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6"
            >
              {personalInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  className="flex items-center space-x-3 p-3 bg-muted rounded-lg border border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 cursor-pointer group"
                >
                  <motion.div
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.3 },
                    }}
                    className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200"
                  >
                    {info.icon}
                  </motion.div>
                  <div>
                    <p className="text-sm text-white/70 font-medium">
                      {info.label}
                    </p>
                    <p className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-200">
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Download CV Button */}
            <motion.button
              onClick={downloadCV}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.0 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 relative overflow-hidden group"
            >
              <span className="relative z-10">Download Full CV</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
