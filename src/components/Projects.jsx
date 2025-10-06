// src/components/Projects.jsx
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Link as LinkIcon,
  AppWindow,
  Stars,
  Code2,
  PlayCircle,
  X as XIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import placeholderImg from "../assets/placeholder.png";

/* -----------------------------
   Constantes / utils
----------------------------- */
const CATEGORIES = [
  { key: "all", label: "Todos" },
  { key: "ios", label: "iOS" },
  { key: "web", label: "Web" },
  { key: "ai", label: "IA" },
];

function clsx(...xs) {
  return xs.filter(Boolean).join(" ");
}
function isVideo(url = "") {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}
function isGif(url = "") {
  return /\.gif(\?.*)?$/i.test(url);
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

/* -----------------------------
   Hooks auxiliares
----------------------------- */
function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)");
    setTouch(!!(mq && mq.matches));
  }, []);
  return touch;
}

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

/* -----------------------------
   Subcomponentes básicos
----------------------------- */
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

/* -----------------------------
   Normalizadores
----------------------------- */
function collectDemos(links = {}) {
  // Prioriza links.demos (array). Mantén compatibilidad con demo/demo2 si existen.
  const arr = Array.isArray(links.demos) ? links.demos : [];
  const retro = [links.demo, links.demo2].filter(Boolean);
  return [...new Set([...arr, ...retro])]; // sin duplicados
}

function getProjectLinks(project) {
  const out = [];
  const links = project?.links || {};

  if (links.github) {
    out.push({
      key: "github",
      label: "Código GitHub",
      href: links.github,
      icon: Github,
      aria: `Abrir GitHub de ${project.title}`,
    });
  }
  const website = links.website || "";
  if (website) {
    out.push({
      key: "website",
      label: "Ver sitio",
      href: website,
      icon: LinkIcon,
      aria: `Abrir sitio de ${project.title}`,
    });
  }
  if (links.store) {
    out.push({
      key: "store",
      label: "App Store",
      href: links.store,
      icon: AppWindow,
      aria: `Abrir App Store de ${project.title}`,
    });
  }
  return out;
}

/* -----------------------------
   Modal de demos (carrusel)
----------------------------- */
function DemoModal({ open, onClose, demos = [], startIndex = 0 }) {
  const [index, setIndex] = useState(startIndex);
  const len = demos.length;

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  if (!open || len === 0) return null;
  const url = demos[index];
  const video = isVideo(url);
  const gif = isGif(url);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative z-[61] w-[92vw] max-w-4xl rounded-2xl border bg-zinc-950 p-4 shadow-2xl dark:border-zinc-800"
          initial={{ scale: 0.97, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.97, y: 10, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full border p-2 opacity-80 hover:opacity-100 dark:border-zinc-800"
            aria-label="Cerrar"
          >
            <XIcon className="h-5 w-5" />
          </button>

          <div className="relative aspect-video overflow-hidden rounded-xl border bg-black dark:border-zinc-800">
            {video ? (
              <video
                key={url}
                src={url}
                controls
                playsInline
                className="h-full w-full object-contain"
                preload="metadata"
              />
            ) : gif ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img src={url} className="h-full w-full object-contain" loading="eager" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm opacity-70">
                No se puede previsualizar este tipo de demo.
                <a href={url} target="_blank" rel="noreferrer" className="underline ml-2">
                  Abrir enlace
                </a>
              </div>
            )}
          </div>

          {len > 1 && (
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={() => setIndex((i) => (i - 1 + len) % len)}
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold dark:border-zinc-800"
              >
                <ChevronLeft className="h-4 w-4" /> Anterior
              </button>
              <div className="text-xs opacity-80">{index + 1} / {len}</div>
              <button
                onClick={() => setIndex((i) => (i + 1) % len)}
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold dark:border-zinc-800"
              >
                Siguiente <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* -----------------------------
   Media con hover preview
----------------------------- */
function HoverPreview({
  project,
  posterSrc,
  previewSrc, // gif o video
  className,
  onOpenModal,
  isTouch,
}) {
  const { img } = mediaStyles(project);
  const [hover, setHover] = useState(false);
  const vidRef = useRef(null);

  const showPreview = !isTouch && hover && previewSrc;

  useEffect(() => {
    if (showPreview && isVideo(previewSrc) && vidRef.current) {
      const v = vidRef.current;
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      v.play().catch(() => {});
    }
  }, [showPreview, previewSrc]);

  return (
    <div
      className={clsx("relative w-full overflow-hidden rounded-xl border dark:border-zinc-800", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (isTouch && previewSrc) onOpenModal?.();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && previewSrc) onOpenModal?.();
      }}
      aria-label={`Previsualización de ${project.title}`}
    >
      {/* Poster */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        src={posterSrc}
        className={clsx(
          "h-full w-full transition-transform duration-300 group-hover:scale-[1.02]",
          img,
          showPreview ? "opacity-0 absolute inset-0" : "opacity-100"
        )}
        loading="lazy"
      />

      {/* Preview (video/gif) */}
      {previewSrc && (
        <>
          {isVideo(previewSrc) ? (
            <video
              ref={vidRef}
              src={previewSrc}
              muted
              playsInline
              loop
              preload="metadata"
              className={clsx(
                "h-full w-full object-contain transition-opacity duration-200",
                showPreview ? "opacity-100" : "opacity-0 absolute inset-0"
              )}
            />
          ) : isGif(previewSrc) ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              src={previewSrc}
              className={clsx(
                "h-full w-full object-contain transition-opacity duration-200",
                showPreview ? "opacity-100" : "opacity-0 absolute inset-0"
              )}
            />
          ) : null}
        </>
      )}

      {/* Chips */}
      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm dark:bg-white/10">
        <Stars className="h-3 w-3" /> {project.category?.toUpperCase?.()}
      </span>
      {previewSrc && (
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm dark:bg-white/10">
          <PlayCircle className="h-3 w-3" />
          {isTouch ? "Tocar para ver" : "Hover para ver"}
        </span>
      )}
    </div>
  );
}

/* -----------------------------
   Tarjeta de proyecto
----------------------------- */
function ProjectCard({ project, onOpenDemos }) {
  const posterSrc =
    (project.images && project.images.length > 0 && project.images[0]) ||
    (project.image && project.image.length > 0 && project.image) ||
    placeholderImg;

  const demos = collectDemos(project?.links);
  // Preview en hover: prioriza vídeo; si no hay, gif
  const previewSrc =
    demos.find((u) => isVideo(u)) || demos.find((u) => isGif(u)) || null;

  const { wrapper } = mediaStyles(project);
  const links = getProjectLinks(project);
  const isTouch = useIsTouch();

  const videoBtnLabel = demos.length <= 1 ? "Vídeo" : `Vídeos (${demos.length})`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="group relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/70"
    >
      {/* Media con preview */}
      <HoverPreview
        project={project}
        posterSrc={posterSrc}
        previewSrc={previewSrc}
        className={wrapper}
        isTouch={isTouch}
        onOpenModal={() => onOpenDemos(demos, 0)}
      />

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
          {links.map(({ key, label, href, icon: Icon, aria }) => (
            <ExternalLink key={key} href={href} ariaLabel={aria}>
              <Icon className="h-4 w-4" /> {label}
            </ExternalLink>
          ))}

          {/* Único botón de vídeo(s) */}
          {demos.length > 0 && (
            <button
              onClick={() => onOpenDemos(demos, 0)}
              className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:border-zinc-800"
              aria-label={`Abrir ${videoBtnLabel.toLowerCase()} de ${project.title}`}
            >
              <PlayCircle className="h-4 w-4" /> {videoBtnLabel}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectsGrid({ items, onOpenDemos }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((p) => (
          <ProjectCard key={p.id} project={p} onOpenDemos={onOpenDemos} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

/* -----------------------------
   Componente principal
----------------------------- */
export default function Projects({
  initial = "all",
  title = "Proyectos",
  projects: incomingProjects = [],
}) {
  const data = useProjects(incomingProjects);
  const [active, setActive] = useState(initial);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDemos, setModalDemos] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  const filtered = useMemo(() => {
    if (active === "all") return data;
    return data.filter((p) => p.category === active);
  }, [active, data]);

  const openDemos = (demos, index = 0) => {
    setModalDemos(demos);
    setModalIndex(index);
    setModalOpen(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 lg:pt-20">
      <header className="mb-4 text-center">
        <h2 className="text-3xl font-bold text-center mb-6 dark:text-blue-300 text-blue-700">
          {title}
        </h2>
      </header>

      <div className="mb-8 flex w-full flex-wrap items-center justify-center gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
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

      <ProjectsGrid items={filtered} onOpenDemos={openDemos} />

      <DemoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        demos={modalDemos}
        startIndex={modalIndex}
      />
    </section>
  );
}
