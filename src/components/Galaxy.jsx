import { useEffect, useRef, useState, useMemo } from "react";
import Starfield from "./Starfield";
import ConstellationPath from "./ConstellationPath";
import IconOnPath from "./IconOnPath";

const BASE_W = 300;
const BASE_H = 450;

// --- escalar path ---
function scalePathD(d, sx, sy) {
  const tokens = d.match(/[MLCSQTHVAZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi);
  if (!tokens) return d;
  let out = [], i = 0, cmd = "";
  const read = () => parseFloat(tokens[i++]);

  while (i < tokens.length) {
    const t = tokens[i++];
    if (/^[MLCSQTHVAZ]$/i.test(t)) { cmd = t.toUpperCase(); out.push(cmd); if (cmd === "Z") continue; }
    else { i--; }

    switch (cmd) {
      case "M": case "L": case "T":
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) out.push(num(read()*sx), num(read()*sy));
        break;
      case "H":
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) out.push(num(read()*sx));
        break;
      case "V":
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) out.push(num(read()*sy));
        break;
      case "C":
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) {
          const x1 = read()*sx, y1 = read()*sy, x2 = read()*sx, y2 = read()*sy, x = read()*sx, y = read()*sy;
          out.push(num(x1), num(y1), num(x2), num(y2), num(x), num(y));
        } break;
      case "S": case "Q":
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) {
          const x1 = read()*sx, y1 = read()*sy, x = read()*sx, y = read()*sy;
          out.push(num(x1), num(y1), num(x), num(y));
        } break;
      case "A":
        while (i < tokens.length && !/^[MLCSQTHVAZ]$/i.test(tokens[i])) {
          const rx = read()*sx, ry = read()*sy, rot = read(), large = read(), sweep = read(), x = read()*sx, y = read()*sy;
          out.push(num(rx), num(ry), num(rot), num(large), num(sweep), num(x), num(y));
        } break;
      default: break;
    }
  }
  return out.join(" ");
  function num(n) { return Number.isInteger(n) ? String(n) : n.toFixed(2); }
}

const Galaxy = ({
  title, skills, showLabels, pathD, className = "",
  starDensity = 1/6000, minStars = 28, maxStars = 80,
  lockSpacing = true,   // evita solapes
  orbitSpeed = 20,      // misma velocidad
  rotateWithPath = false,
  freeze = false,
  pauseOnHidden = true,
}) => {
  const boxRef = useRef(null);
  const [scaledPath, setScaledPath] = useState(pathD);
  const [starCount, setStarCount] = useState(50);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!boxRef.current) return;
    let rafId = 0;
    const el = boxRef.current;

    const measure = (w, h) => {
      const sx = w / BASE_W, sy = h / BASE_H;
      setScaledPath(scalePathD(pathD, sx, sy));
      const est = Math.round(w * h * starDensity);
      setStarCount(Math.max(minStars, Math.min(maxStars, est)));
    };

    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect?.width ?? el.clientWidth ?? BASE_W;
      const h = entry.contentRect?.height ?? el.clientHeight ?? BASE_H;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => measure(w, h));
    });

    ro.observe(el);
    measure(el.clientWidth || BASE_W, el.clientHeight || BASE_H);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, [pathD, starDensity, minStars, maxStars]);

  useEffect(() => {
    if (!pauseOnHidden) return;
    const onVis = () => setHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [pauseOnHidden]);

  const items = useMemo(() => {
    const n = Math.max(1, skills.length);
    // Evita poner offset exactamente en 100%, que es la "costura" del path.
    const eps = 0.001; // <- micro-desfase para que nunca caiga en el 100% exacto
    if (!lockSpacing) {
      return skills.map((s, i) => ({
        ...s,
        speed: s.speed ?? (18 + (i % 3) * 4),
        offset: s.offset ?? Number((((i * 100) / n) % 100 + eps).toFixed(3)),
        rotateWithPath,
      }));
    }
    const spacing = 100 / n;
    return skills.map((s, i) => ({
      ...s,
      speed: orbitSpeed,
      offset: Number((((i * spacing) % 100) + eps).toFixed(3)), // <- aquí el ajuste
      rotateWithPath,
    }));
  }, [skills, lockSpacing, orbitSpeed, rotateWithPath]);

  const paused = freeze || hidden;

  return (
    <div
      ref={boxRef}
      className={
        "relative w-full max-w-[360px] aspect-[2/3] rounded-xl shadow-xl border border-indigo-600 " +
        "overflow-hidden mx-auto bg-gradient-to-br from-indigo-100 to-slate-200 " +
        "dark:from-slate-800 dark:to-slate-950 " + className
      }
      aria-label={title}
    >
      <h3 className="absolute top-3 left-4 text-slate-800 dark:text-white font-semibold text-lg z-10">
        {title}
      </h3>

      {/* Contenedor de capa: debe ser relative para anclar offset-path (0,0) */}
      <div className="relative w-full h-full overflow-hidden">
        <Starfield count={starCount} />

        {/* El trazo usa EXACTAMENTE el mismo path escalado que los iconos */}
        <ConstellationPath pathD={scaledPath} />

        {/* Iconos orbitando en el MISMO path y con override de Reduced Motion */}
        {items.map((it, idx) => (
          <IconOnPath
            key={`${it.name}-${idx}`}
            pathD={scaledPath}
            icon={it.icon}
            name={it.name}
            showLabel={showLabels}
            speed={it.speed}
            offset={it.offset}
            rotateWithPath={it.rotateWithPath}
            paused={paused}
            href={it.href}
            size={it.size}
            respectReducedMotion={false}   // fuerza animación en iOS aunque el sistema tenga “Reducir movimiento”
          />
        ))}
      </div>
    </div>
  );
};

export default Galaxy;
