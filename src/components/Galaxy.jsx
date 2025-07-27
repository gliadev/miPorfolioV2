import SkillIcon from "./SkillIcon";

const Galaxy = ({ title, skills, showLabels }) => {
  return (
    <div className="relative w-full h-[350px] bg-gradient-to-br from-indigo-800 to-gray-900 rounded-xl shadow-xl border border-indigo-600">
      <h3 className="absolute top-2 left-4 text-white font-semibold text-lg">{title}</h3>

      <div className="relative w-full h-full">
        {skills.map((skill, i) => (
          <SkillIcon
            key={skill.name}
            icon={skill.icon}
            name={skill.name}
            showLabel={showLabels}
            x={`${Math.cos(i * 2) * 100}px`}
            y={`${Math.sin(i * 2) * 100}px`}
          />
        ))}
      </div>
    </div>
  );
};

export default Galaxy;
