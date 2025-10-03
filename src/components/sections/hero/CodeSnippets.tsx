"use client";

import { motion } from "framer-motion";

const CodeSnippets = () => {
  return (
    <>
      {/* Code Snippet Elements */}
      <motion.div
        className="absolute top-20 left-20 text-gray-400/30 dark:text-gray-500/40 font-mono text-xs"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="bg-gray-100/50 dark:bg-gray-800/50 p-2 rounded border-l-2 border-gray-300 dark:border-gray-600">
          <div className="text-green-600 dark:text-green-400">const</div>
          <div className="text-blue-600 dark:text-blue-400">developer</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-40 right-32 text-gray-400/30 dark:text-gray-500/40 font-mono text-xs"
        animate={{
          y: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="bg-gray-100/50 dark:bg-gray-800/50 p-2 rounded border-l-2 border-gray-300 dark:border-gray-600">
          <div className="text-purple-600 dark:text-purple-400">function</div>
          <div className="text-orange-600 dark:text-orange-400">create()</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-32 text-gray-400/30 dark:text-gray-500/40 font-mono text-xs"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="bg-gray-100/50 dark:bg-gray-800/50 p-2 rounded border-l-2 border-gray-300 dark:border-gray-600">
          <div className="text-red-600 dark:text-red-400">return</div>
          <div className="text-gray-600 dark:text-gray-400">innovation</div>
        </div>
      </motion.div>
    </>
  );
};

export default CodeSnippets;
