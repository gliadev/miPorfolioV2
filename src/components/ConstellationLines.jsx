// src/components/ConstellationLines.jsx
const ConstellationLines = ({ points }) => {
  if (points.length < 2) return null;

  return (
    <svg className="absolute w-full h-full z-0" viewBox="0 0 300 450">
      <g stroke="#c084fc" strokeWidth="1" fill="none" strokeOpacity="0.6">
        {points.map((point, i) => {
          const next = points[i + 1];
          if (!next) return null;
          return (
            <line
              key={i}
              x1={point.x}
              y1={point.y}
              x2={next.x}
              y2={next.y}
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
};

export default ConstellationLines;
