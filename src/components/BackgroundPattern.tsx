'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundPatternProps {
  isDarkMode: boolean;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ isDarkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background SVG Grid Pattern */}
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? "bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:32px_32px] opacity-40"
            : "bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:28px_28px] opacity-35"
        }`}
      />

      {/* Floating Glowing Animated Mesh Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute top-10 right-10 w-96 h-96 rounded-full blur-[100px] ${
          isDarkMode
            ? "bg-gradient-to-br from-blue-600/20 to-cyan-500/15"
            : "bg-gradient-to-br from-blue-400/25 to-indigo-300/25"
        }`}
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute bottom-10 left-10 w-[30rem] h-[30rem] rounded-full blur-[110px] ${
          isDarkMode
            ? "bg-gradient-to-tr from-purple-600/20 to-pink-500/15"
            : "bg-gradient-to-tr from-purple-300/25 to-pink-200/25"
        }`}
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full blur-[120px] ${
          isDarkMode
            ? "bg-gradient-to-r from-indigo-600/10 to-blue-500/10"
            : "bg-gradient-to-r from-sky-200/30 to-blue-200/30"
        }`}
      />
    </div>
  );
};

export default BackgroundPattern;
