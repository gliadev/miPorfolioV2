// src/components/Galaxy.jsx
import SkillIcon from "./SkillIcon";
import Starfield from "./Starfield";
import ConstellationLines from "./ConstellationLines";

const Galaxy = ({ title, skills, showLabels }) => {
  const centerX = 150; // Centro del div (ajusta si cambias ancho)
  const centerY = 200; // Centro vertical
  const radius = Math.max(80, 120 - skills.length * 4); // Ajuste dinámico por número de skills

  // Calculamos posiciones de los iconos
  const positions = skills.map((_, i) => {
    const angle = (i / skills.length) * 2 * Math.PI;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    return { x, y };
  });

  return (
    <div className="relative w-full lg:w-[300px] h-[450px] 
                rounded-xl shadow-xl border border-indigo-600
                bg-gradient-to-br from-indigo-800 to-gray-900 dark:from-slate-800 dark:to-slate-950
                overflow-hidden mx-auto
                animate-spin-slow">
      <h3 className="absolute top-3 left-4 text-white font-semibold text-lg z-10">
        {title}
      </h3>

      <div className="relative w-full h-full overflow-hidden">
        <Starfield count={50} />
        <ConstellationLines points={positions} />

        {skills.map((skill, i) => {
          const { x, y } = positions[i];
          return (
            <SkillIcon
              key={skill.name}
              icon={skill.icon}
              name={skill.name}
              showLabel={showLabels}
              x={`${x - 24}px`} // centramos icono (icono de 48px)
              y={`${y - 24}px`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Galaxy;
