"use client";

import { motion } from "framer-motion";
import { ChevronDown, Download, Mail } from "lucide-react";
import { downloadCV } from "@/lib/utils";

interface HeroContentProps {
  handleNameHover: () => void;
  handleNameLeave: () => void;
  scrollToAbout: () => void;
}

const HeroContent = ({
  handleNameHover,
  handleNameLeave,
  scrollToAbout,
}: HeroContentProps) => {
  return (
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
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium"
          whileHover={{
            scale: 1.05,
            textShadow: "0 0 20px rgba(107, 114, 128, 0.5)",
          }}
        >
          Hello, I&apos;m
        </motion.p>

        {/* Interactive Name with Simple Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white cursor-pointer select-none"
          onHoverStart={handleNameHover}
          onHoverEnd={handleNameLeave}
          whileHover={{
            textShadow: "0 0 20px rgba(107, 114, 128, 0.5)",
            filter: "brightness(1.1)",
            scale: 1.02,
          }}
        >
          Engr. Florante G. Clavano Jr.
        </motion.h1>

        {/* Animated Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300"
          whileHover={{
            scale: 1.05,
            color: "#6b7280",
          }}
        >
          Electronics and Software Engineer
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
          back in my college days. I have over four years of experience building
          web applications for e-commerce, logistics applications, business
          valuation calculator and property technology both in front-end and
          back-end.
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
              boxShadow: "0 10px 25px rgba(107, 114, 128, 0.3)",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
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
              className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-500 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
              boxShadow: "0 10px 25px rgba(107, 114, 128, 0.2)",
              y: -2,
              borderColor: "#6b7280",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400 hover:bg-gray-600 dark:hover:bg-gray-400 hover:text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gray-600 dark:bg-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
  );
};

export default HeroContent;
