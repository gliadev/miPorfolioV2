import { useEffect, useRef, useState } from "react";
import Starfield from "./Starfield";
import ConstellationPath from "./ConstellationPath";
import IconOnPath from "./IconOnPath";

const BASE_W = 300; 
const BASE_H = 450; 

function scalePathD(d, sx, sy) {
  const tokens = d.match(/[MLCSQTHVAZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi);
  if (!tokens) return d;

  let out = [];
  let i = 0;
  let cmd = "";

  const readNumber = () => parseFloat(tokens[i++]);

  while (i < tokens.length) {
    const t = tokens[i++];
    if (/^[MLCSQTHVAZ]$/i.test(t)) {
      cmd = t.toUpperCase();
      out.push(cmd);
      if (cmd === "Z") continue;
    } else {
      
      i--; 
    }

    switch (cmd) {
      case "M":
      case "L":
      case "T": {
        
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) {
          const x = readNumber() * sx;
          const y = readNumber() * sy;
          out.push(num(x), num(y));
        }
        break;
      }
      case "H": {
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) {
          const x = readNumber() * sx;
          out.push(num(x));
        }
        break;
      }
      case "V": {
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) {
          const y = readNumber() * sy;
          out.push(num(y));
        }
        break;
      }
      case "C": {
        // grupos de 6 números: (x1 y1 x2 y2 x y)
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) {
          const x1 = readNumber() * sx;
          const y1 = readNumber() * sy;
          const x2 = readNumber() * sx;
          const y2 = readNumber() * sy;
          const x = readNumber() * sx;
          const y = readNumber() * sy;
          out.push(num(x1), num(y1), num(x2), num(y2), num(x), num(y));
        }
        break;
      }
      case "S":
      case "Q": {
        // grupos de 4 números: (x1 y1 x y)  |  (x1 y1 x y)
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) {
          const x1 = readNumber() * sx;
          const y1 = readNumber() * sy;
          const x = readNumber() * sx;
          const y = readNumber() * sy;
          out.push(num(x1), num(y1), num(x), num(y));
        }
        break;
      }
      case "A": {
        // grupos de 7: rx ry rot largeArc sweep x y
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) {
          const rx = readNumber() * sx;
          const ry = readNumber() * sy;
          const rot = readNumber();                   // no se escala
          const large = readNumber();                 // flag
          const sweep = readNumber();                 // flag
          const x = readNumber() * sx;
          const y = readNumber() * sy;
          out.push(num(rx), num(ry), num(rot), num(large), num(sweep), num(x), num(y));
        }
        break;
      }
      default:
        // Z ya se añadió; nada que hacer
        break;
    }
  }

  return out.join(" ");

  function num(n) {
    return Number.isInteger(n) ? String(n) : n.toFixed(2);
  }
}

const Galaxy = ({ title, skills, showLabels, pathD }) => {
  const boxRef = useRef(null);
  const [scaledPath, setScaledPath] = useState(pathD);

  useEffect(() => {
    if (!boxRef.current) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      const w = entry.contentRect?.width ?? boxRef.current.clientWidth;
      const h = entry.contentRect?.height ?? boxRef.current.clientHeight;
      const sx = w / BASE_W;
      const sy = h / BASE_H;
      setScaledPath(scalePathD(pathD, sx, sy));
    });

    ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, [pathD]);

  const items = skills.map((s, i) => ({
    ...s,
    speed: s.speed ?? (18 + (i % 3) * 4),
    offset: s.offset ?? Math.round((i * 100) / skills.length),
    reverse: s.reverse ?? (i % 2 === 1),
  }));

  return (
    <div
      className="relative w-full max-w-[360px] aspect-[2/3] rounded-xl shadow-xl border border-indigo-600
                 overflow-hidden mx-auto bg-gradient-to-br from-indigo-100 to-slate-200 dark:from-slate-800 dark:to-slate-950"
      ref={boxRef}
    >
      <h3 className="absolute top-3 left-4 text-slate-800 dark:text-white font-semibold text-lg z-10">
        {title}
      </h3>

      <div className="relative w-full h-full overflow-hidden">
        {/* << ESTA línea estaba cortada en tu archivo >> */}
        <Starfield count={50} />

        {/* Dibujo (usa el path original con viewBox) */}
        <ConstellationPath pathD={pathD} />

        {/* Movimiento (usa el path escalado) */}
        {items.map((it, idx) => (
          <IconOnPath
            key={`${it.name}-${idx}`}
            pathD={scaledPath}
            icon={it.icon}
            name={it.name}
            showLabel={showLabels}
            speed={it.speed}
            offset={it.offset}
            reverse={it.reverse}
            href={it.href}
            size={it.size}
          />
        ))}
      </div>
    </div>
  );
};

export default Galaxy;
