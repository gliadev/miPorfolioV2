// src/components/Projects.jsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Link as LinkIcon, AppWindow, Stars, Code2 } from "lucide-react";
import placeholderImg from "../assets/placeholder.png";

// ----------------------------------
// Constantes / utils
// ----------------------------------
const CATEGORIES = [
  { key: "all", label: "Todos" },
  { key: "ios", label: "iOS" },
  { key: "web", label: "Web" },
  { key: "ai", label: "IA" },
];

function clsx(...xs) {
  return xs.filter(Boolean).join(" ");
}

// Aspect ratio + límites de tamaño por categoría
function mediaStyles(project) {
  const isPortrait = project?.category === "ios";
  return {
    wrapper: isPortrait
      ? "aspect-[9/16] bg-black/30 p-2 max-h-[420px] mx-auto"
      : "aspect-[16/10] max-h-[260px] mx-auto",
    img: isPortrait ? "object-contain" : "object-cover",
  };
}

// ----------------------------------
// Hook: cargar /data/projects.json
// ----------------------------------
function useProjects(fallback = []) {
  const [projects, setProjects] = useState(fallback);

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const r = await fetch("/data/projects.json", { cache: "no-cache" });
        if (!r.ok) return;
        const json = await r.json();
        if (ok && Array.isArray(json)) setProjects(json);
      } catch {}
    })();
    return () => {
      ok = false;
    };
  }, []);

  return projects;
}

// ----------------------------------
// Subcomponentes
// ----------------------------------
function TechBadge({ label }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium opacity-90 ring-yellow-400/0 transition group-hover:ring-2 dark:border-zinc-800"
      aria-label={`Tecnología ${label}`}
    >
      <Code2 className="mr-1 h-3 w-3" aria-hidden />
      {label}
    </span>
  );
}

function ExternalLink({ href, children, ariaLabel }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:border-zinc-800"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

function FilterTabs({ active, onChange }) {
  return (
    <div className="mb-8 flex w-full flex-wrap items-center justify-center gap-3">
      {CATEGORIES.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className={clsx(
            "rounded-3xl px-5 py-2.5 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-yellow-500",
            active === c.key
              ? "bg-yellow-400 text-black shadow-md dark:bg-yellow-300"
              : "border dark:border-zinc-800 hover:bg-white/5 dark:hover:bg-white/5"
          )}
          aria-pressed={active === c.key}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

function ProjectCard({ project }) {
  // Portada: images[0] > image > placeholder
  const imgSrc =
    (project.images && project.images.length > 0 && project.images[0]) ||
    (project.image && project.image.length > 0 && project.image) ||
    placeholderImg;

  const { wrapper, img } = mediaStyles(project);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="group relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/70"
    >
      {/* Imagen con aspect adaptativo + límites */}
      <div
        className={clsx(
          "relative w-full overflow-hidden rounded-xl border dark:border-zinc-800",
          wrapper
        )}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={imgSrc}
          alt={`Imagen del proyecto ${project.title}`}
          className={clsx(
            "h-full w-full transition-transform duration-300 group-hover:scale-[1.02]",
            img
          )}
          loading="lazy"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm dark:bg-white/10">
          <Stars className="h-3 w-3" /> {project.category?.toUpperCase?.()}
        </span>
      </div>

      {/* Contenido */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
        <p className="mt-2 text-sm opacity-90">{project.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech?.slice(0, 10).map((t) => (
            <TechBadge key={t} label={t} />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <ExternalLink
            href={project.links?.github}
            ariaLabel={`Abrir GitHub de ${project.title}`}
          >
            <Github className="h-4 w-4" /> Código GitHub
          </ExternalLink>
          <ExternalLink
            href={project.links?.demo}
            ariaLabel={`Abrir demo de ${project.title}`}
          >
            <LinkIcon className="h-4 w-4" /> Ver sitio
          </ExternalLink>
          <ExternalLink
            href={project.links?.store}
            ariaLabel={`Abrir App Store de ${project.title}`}
          >
            <AppWindow className="h-4 w-4" /> App Store
          </ExternalLink>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectsGrid({ items }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects({
  initial = "all",
  title = "Proyectos",
  projects: incomingProjects = [],
}) {
  const data = useProjects(incomingProjects);
  const [active, setActive] = useState(initial);

  const filtered = useMemo(() => {
    if (active === "all") return data;
    return data.filter((p) => p.category === active);
  }, [active, data]);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 lg:pt-20">
      <header className="mb-4 text-center">
        <h2 className="text-3xl font-bold text-center mb-6 dark:text-blue-300 text-blue-700">
          {title}
        </h2>
      </header>

      <FilterTabs active={active} onChange={setActive} />
      <ProjectsGrid items={filtered} />
    </section>
  );
}
