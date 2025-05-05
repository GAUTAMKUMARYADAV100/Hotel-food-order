import React from "react";
import { motion } from "framer-motion";

export const DiwaliLamp = () => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="text-4xl text-yellow-500 mr-8 mt-4"
    >
      🪔
    </motion.div>
  );
};

export const RangoliPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-orange-300 opacity-30"
          style={{
            fontSize: `${10 + Math.random() * 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {["🌸", "🌺", "🌻", "🌼", "🌷", "💮", "🏵️"][Math.floor(Math.random() * 7)]}

        </motion.div>
      ))}
    </div>
  );
};