// src/components/SkillIcon.jsx
import { motion } from "framer-motion";

const SkillIcon = ({ icon, name, showLabel, x, y }) => {
  return (
    <motion.div
      className="absolute flex flex-col items-center text-center cursor-pointer"
      animate={{ x, y }}
      transition={{
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <img src={icon} alt={name} title={name} className="w-12 h-12" />
      {showLabel && <span className="mt-1 text-xs text-white">{name}</span>}
    </motion.div>
  );
};

export default SkillIcon;
