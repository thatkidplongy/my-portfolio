"use client";

import { motion } from "framer-motion";
import { Code, Database, Globe, Cpu, Shield } from "lucide-react";

const TechIcons = () => {
  const techStack = [
    { icon: Code, name: "Frontend", color: "text-gray-500 dark:text-gray-400" },
    {
      icon: Database,
      name: "Backend",
      color: "text-gray-600 dark:text-gray-300",
    },
    {
      icon: Globe,
      name: "Full Stack",
      color: "text-gray-700 dark:text-gray-200",
    },
    { icon: Cpu, name: "DevOps", color: "text-gray-500 dark:text-gray-400" },
    {
      icon: Shield,
      name: "Security",
      color: "text-gray-600 dark:text-gray-300",
    },
  ];

  return (
    <>
      {/* Floating Tech Stack Icons */}
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          className={`absolute ${tech.color} opacity-10 dark:opacity-15`}
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
    </>
  );
};

export default TechIcons;
