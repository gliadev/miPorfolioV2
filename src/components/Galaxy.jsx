// src/components/Galaxy.jsx
import { useEffect, useRef, useState } from "react";
import Starfield from "./Starfield";
import ConstellationPath from "./ConstellationPath";
import IconOnPath from "./IconOnPath";

// Tamaño base del viewBox que usas en ConstellationPath
const BASE_W = 300;
const BASE_H = 450;

/**
 * Escala un path SVG (SOLO comandos en mayúscula M, L, C, S, Q, T, H, V, Z).
 * No uses 'A' (arcos) aquí. Si tienes A, dímelo y te paso versión extendida.
 */
function scalePathD(d, sx, sy) {
  const tokens = d.match(/[MLCSQTHVZ]|-?\d*\.?\d+/g);
  if (!tokens) return d;

  let out = [];
  let cmd = null;
  let isX = true; // alterna x/y para comandos que van por pares

  for (const t of tokens) {
    if (/^[MLCSQTHVZ]$/.test(t)) {
      cmd = t;
      out.push(cmd);
      // H => solo x; V => solo y; el resto alterna x/y desde x
      isX = true;
      continue;
    }

    // número
    let n = parseFloat(t);

    switch (cmd) {
      case "H":
        n = n * sx;
        break;
      case "V":
        n = n * sy;
        break;
      // M L C S Q T (pares x,y)
      default:
        if (isX) n = n * sx;
        else n = n * sy;
        isX = !isX;
        break;
    }

    // formato compacto sin perder precisión
    out.push(Number.isInteger(n) ? String(n) : n.toFixed(2));
  }

  return out.join(" ");
}

const Galaxy = ({ title, skills, showLabels, pathD }) => {
  const boxRef = useRef(null);
  const [scaledPath, setScaledPath] = useState(pathD); // para offset-path

  // Recalcula el path escalado cuando cambia el tamaño
  useEffect(() => {
    if (!boxRef.current) return;

    const ro = new ResizeObserver(([entry]) => {
      const { inlineSize: w, blockSize: h } = entry.contentBoxSize
        ? entry.contentBoxSize[0]
        : { inlineSize: entry.contentRect.width, blockSize: entry.contentRect.height };

      const sx = w / BASE_W;
      const sy = h / BASE_H;
      setScaledPath(scalePathD(pathD, sx, sy));
    });

    ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, [pathD]);

  // Respeta offset/speed si vienen desde Skills; si no, genera por defecto
  const items = skills.map((s, i) => ({
    ...s,
    speed:  s.speed  ?? (18 + (i % 3) * 4),
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

      {/* Lienzo; Starfield y Path se adaptan por viewBox */}
      <div className="relative w-full h-full overflow-hidden">
        <Starfield coun
