import React from "react";
import { motion } from "framer-motion";

// Iconos de ejemplo (sustituye o añade más según tus necesidades)
import swiftLogo from "../assets/icons/swiftLogo.png";
import swiftUI from "../assets/icons/swiftUI.png";
import swiftSnake from "../assets/icons/swiftSnake.png";

import reactIcono from "../assets/icons/reactIcono.png";
import mongodbIcono from "../assets/icons/mongodb.png";

import pythonIcono from "../assets/icons/PythonIcono.png";

const iosSkills = [
  { name: "Swift", icon: swiftLogo },
  { name: "SwiftUI", icon: swiftUI },
  { name: "SwiftSnake", icon: swiftSnake },
];

const webSkills = [
  { name: "React", icon: reactIcono },
  { name: "MongoDB", icon: mongodbIcono },
];

const aiSkills = [
  { name: "Python", icon: pythonIcono },
];

function renderGalaxy(skills, title, color = "text-white") {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] mb-24">
      <h3
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        text-xl md:text-2xl font-semibold z-10 pointer-events-none ${color}`}
      >
        {title}
      </h3>

      {skills.map((skill, index) => {
        const angle = (index / skills.length) * 2 * Math.PI;
        const radius = 140 + Math.random() * 40;

        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;

        return (
          <motion.div
            key={index}
            className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full p-2
              bg-white/70 dark:bg-white/10
              backdrop-blur-md border border-zinc-300 dark:border-zinc-700
              shadow-md flex items-center justify-center
              transition-all duration-300
              cursor-pointer hover:scale-110 hover:shadow-xl"
            style={{
              top: `${y}%`,
              left: `${x}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              title={skill.name}
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
          </motion.div>
        );
      })}
    </div>
  );
}


export default function Skills() {
  return (
    <section className="min-h-screen px-4 py-20 bg-[#0a0a23] text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16 text-white">
          Galaxia de Conocimientos 🚀
        </h2>

        {renderGalaxy(iosSkills, "🌙 Galaxia iOS")}
        {renderGalaxy(webSkills, "🪐 Galaxia Web")}
        {renderGalaxy(aiSkills, "🔭 Galaxia IA")}
      </div>
    </section>
  );
}
