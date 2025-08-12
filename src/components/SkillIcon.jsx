import { motion } from "framer-motion";
import { useState } from "react";

const SkillIcon = ({ icon, name, showLabel, x, y }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute flex flex-col items-center text-center cursor-pointer group"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, x, y }}
      transition={{
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-full bg-black/20 backdrop-blur-sm p-2 relative">
        <img
          src={icon}
          alt={name}
          title={name}
          className="w-12 h-12 drop-shadow-lg brightness-110 dark:brightness-125"
        />

        {}
        {isHovered && (
          <motion.div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-sm text-black dark:text-white px-3 py-2 rounded-lg shadow-lg z-50 whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-semibold">{name}</p>
            <p className="text-xs opacity-80">Nivel: Intermedio</p>
            <p className="text-xs opacity-60">Proyecto: App X</p>
          </motion.div>
        )}
      </div>

      {}
      {showLabel && (
        <span className="mt-1 text-xs font-medium text-white drop-shadow-[0_0_2px_black] dark:text-gray-200">
          {name}
        </span>
      )}
    </motion.div>
  );
};

export default SkillIcon;
