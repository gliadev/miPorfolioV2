// src/helpers/timeline.js
import {
  Calendar, GraduationCap, School, Code2,
  Brain, Smartphone, Globe, Trophy, Mic2,
} from "lucide-react";

const EDU_BLUE = "#60A5FA";

export const ICONS = {
  ios: Smartphone,
  ai: Brain,
  web: Globe,
  project: Code2,
  degree: GraduationCap,
  course: School,
  bootcamp: Code2,
  cert: Trophy,
  talk: Mic2,
  default: Calendar,
};

export const ACCENTS = {
  ios: "#F59E0B",
  ai:  "#A78BFA",
  web: "#10B981",

  // Educación
  edu:     EDU_BLUE,  // cuando uses area: "edu"
  degree:  EDU_BLUE,  // grado reglado SIEMPRE azul
  course:  "#38BDF8",
  bootcamp:"#34D399",
  cert:    "#8B5CF6",

  other: "#71717A",
};

const norm = (s = "") => s.toLowerCase();
export const isEducation = (k) => ["degree", "course", "bootcamp", "cert"].includes(k);

/** Devuelve una clave usada por los colores (ACCENTS) */
export function inferArea(item = {}) {
  // 1) Si marcas area de forma explícita (ios|ai|web|edu), gana.
  if (item.area) return item.area;

  const icon = item.icon ?? "";
  const tags = (item.tags ?? []).map(norm);

  // 2) Educación tiene prioridad sobre los tags (evita que "iOS" en tags pinte naranja).
  if (isEducation(icon)) return icon; // degree|course|bootcamp|cert

  // 3) Resto por tags/icon
  if (icon === "ios" || tags.some(t => ["swift","swiftui","uikit","xcode","ios"].includes(t))) return "ios";
  if (icon === "ai"  || tags.some(t => ["ai","ia","ml","machine learning","genai"].includes(t))) return "ai";
  if (icon === "web" || tags.some(t => ["react","tailwind","vercel","html","css","js","typescript"].includes(t))) return "web";

  return "other";
}

export function accentColor(item) {
  const key = inferArea(item);
  return ACCENTS[key] ?? ACCENTS.other;
}

/** Qué palabra de la leyenda activar (iOS | IA | Web | Formación) */
export function legendTargetForItem(item = {}) {
  const k = item.area ?? inferArea(item);
  if (k === "ios" || k === "ai" || k === "web") {
    return { key: k, color: ACCENTS[k] };
  }
  // Si el área es "edu" o el icono es educativo, activamos "Formación" en azul fijo
  if (k === "edu" || isEducation(item.icon)) {
    return { key: "edu", color: EDU_BLUE };
  }
  return { key: null, color: null };
}
