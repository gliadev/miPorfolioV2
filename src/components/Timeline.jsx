import { useEffect, useMemo, useRef, useState } from "react";
import { Element } from "react-scroll";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar, GraduationCap, School, Code2, Cpu, Sparkles, Smartphone,
  Globe, Brain, Trophy, Mic2, ExternalLink, Image as ImageIcon, Play, Search
} from "lucide-react";

/* -------------------------- CONFIG -------------------------- */
const ICONS = {
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

const FILTERS = [
  { key: "all", label: "Todos" },
  { key: "ios", label: "iOS" },
  { key: "ai", label: "IA" },
  { key: "web", label: "Web" },
  { key: "edu", label: "Formación" }, // degree/course/bootcamp/cert
];

const cn = (...xs) => xs.filter(Boolean).join(" ");
const normalize = (s = "") => s.toLowerCase();

/* -------------------------- HELPERS ------------------------- */
function formatPeriod({ start, end } = {}) {
  if (!start && !end) return "";
  if (start && !end) return `${start} – Presente`;
  if (!start && end) return `${end}`;
  return `${start} – ${end}`;
}

function inferArea(item = {}) {
  // prioriza 'area' si viene en el JSON, si no infiere por icon/tags
  if (item.area) return item.area;
  const icon = item.icon ?? "";
  const tags = (item.tags ?? []).map(normalize);
  if (icon === "ios" || tags.some(t => ["swift", "swiftui", "uikit", "xcode", "ios"].includes(t))) return "ios";
  if (icon === "ai" || tags.some(t => ["ia", "ai", "ml", "machine learning", "genai"].includes(t))) return "ai";
  if (icon === "web" || tags.some(t => ["react", "tailwind", "vercel", "html", "css", "js", "typescript"].includes(t))) return "web";
  if (["degree", "course", "bootcamp", "cert"].includes(icon)) return "edu";
  return "other";
}

function matchesFilter(item, active) {
  if (active === "all") return true;
  if (active === "edu") return ["degree", "course", "bootcamp", "cert"].includes(item.icon);
  return inferArea(item) === active;
}

function matchesQuery(item, q) {
  if (!q) return true;
  const hay = [
    item.title, item.org, item.description,
    ...(item.tags || []),
    item?.period?.start, item?.period?.end
  ].filter(Boolean).join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}

/* ---------------------------- DATA -------------------------- */
function useTimeline(initialItems) {
  const [items, setItems] = useState(initialItems ?? []);
  const [loading, setLoading] = useState(!initialItems?.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    let live = true;
    (async () => {
      if (initialItems?.length) return;
      try {
        const res = await fetch("/data/timeline.json", { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (live) setItems(Array.isArray(json) ? json : []);
      } catch (e) {
        if (live) setError(e);
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => { live = false; };
  }, [initialItems]);

  return { items, loading, error };
}

/* ------------------------ SUBCOMPONENTES -------------------- */
function Toolbar({ active, onFilter, query, onQuery, compact, onCompact }) {
  return (
    <div className="sticky top-14 z-20 -mx-2 mb-6 flex flex-col gap-3 rounded-xl bg-white/60 p-3 backdrop-blur dark:bg-zinc-950/60 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3 border border-zinc-200/50 dark:border-zinc-800/60">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => onFilter(f.key)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-semibold transition border",
              active === f.key
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-zinc-100/60 text-zinc-700 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800/70 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <label className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Buscar (título, tags, org)…"
            className="w-64 rounded-lg border border-zinc-200 bg-white/70 py-2 pl-9 pr-3 text-sm outline-none ring-blue-500/40 placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100"
          />
        </label>
        <button
          onClick={() => onCompact(!compact)}
          className={cn(
            "rounded-lg border px-3 py-2 text-sm font-semibold transition",
            compact
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-zinc-100/60 text-zinc-700 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800/70 dark:text-zinc-200 dark:border-zinc-700"
          )}
          aria-pressed={compact}
        >
          {compact ? "Vista amplia" : "Vista compacta"}
        </button>
      </div>
    </div>
  );
}

function YearChip({ year }) {
  return (
    <div className="sticky top-28 z-10 mx-auto mb-6 w-max rounded-full bg-blue-600/15 px-3 py-1 text-sm font-semibold text-blue-700 backdrop-blur dark:text-blue-300">
      {year}
    </div>
  );
}

function Links({ links }) {
  if (!Array.isArray(links) || !links.length) return null;
  const clean = links.filter(l => l?.url);
  if (!clean.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {clean.map((l, i) => (
        <a
          key={`${l.url}-${i}`}
          href={l.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 border-zinc-200/60 dark:border-zinc-800"
        >
          {l.label || "Enlace"} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}

function Media({ media }) {
  if (!media?.url) return null;
  const isVideo = media.type === "video";
  return (
    <div className="relative ml-auto shrink-0 w-full sm:w-60 aspect-video overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50/70 dark:border-zinc-800/60 dark:bg-zinc-800/60">
      {isVideo ? (
        <div className="flex h-full w-full items-center justify-center">
          <Play className="h-8 w-8 opacity-80" aria-hidden="true" />
        </div>
      ) : (
        <img src={media.url} alt={media.alt ?? ""} className="h-full w-full object-cover" loading="lazy" />
      )}
      {!media.type && (
        <span className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-zinc-900/70 px-2 py-1 text-[10px] font-medium text-white ring-1 ring-white/10 backdrop-blur dark:bg-zinc-100/10">
          <ImageIcon className="h-3 w-3" /> media
        </span>
      )}
    </div>
  );
}

function Dot({ active }) {
  return (
    <span
      className={cn(
        "relative z-10 inline-flex h-4 w-4 items-center justify-center rounded-full shadow ring-4 ring-blue-600/25 transition",
        active ? "bg-blue-600" : "bg-zinc-400 dark:bg-zinc-600"
      )}
      aria-hidden="true"
    />
  );
}

function Card({ item, side = "left", compact }) {
  const { title, org, period, description, tags, links, icon, media } = item;
  const Icon = ICONS[icon] || ICONS.default;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.28 }}
      tabIndex={0}
      role="article"
      className={cn(
        "group relative rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur-sm transition will-change-transform",
        "dark:border-zinc-800 dark:bg-zinc-900/70",
        "hover:-translate-y-0.5 hover:shadow-md",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={cn("flex items-start gap-4", side === "right" && "sm:flex-row-reverse")}>
        <span className="mt-0.5 rounded-xl border border-zinc-200/60 bg-zinc-50 p-2 text-zinc-800 dark:border-zinc-800/60 dark:bg-zinc-800 dark:text-zinc-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-base font-bold leading-6 text-zinc-900 dark:text-zinc-100">{title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{formatPeriod(period)}</p>
          </div>
          {org && <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{org}</p>}

          <div className={cn(
            "mt-3 flex gap-3 sm:items-start",
            compact ? "flex-col" : "flex-col-reverse sm:flex-row",
            side === "right" && !compact ? "sm:flex-row-reverse" : ""
          )}>
            <div className="sm:flex-1">
              {description && (
                <p className={cn("text-sm leading-6 text-zinc-700 dark:text-zinc-300", compact && "line-clamp-3")}>
                  {description}
                </p>
              )}

              {!!(tags?.length) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <span
                      key={`${t}-${i}`}
                      className="rounded-full border border-zinc-200/60 bg-zinc-50/70 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-800/60 dark:bg-zinc-800/60 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <Links links={links} />
            </div>

            {!compact && <Media media={media} />}
          </div>
        </div>
      </div>

      {/* efecto “tilt” sutil */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100"
           style={{ background: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(59,130,246,0.12), transparent 40%)" }} />
    </motion.article>
  );
}

/* ------------------------- PRINCIPAL ------------------------ */
export default function Timeline({ items: itemsProp = [], className = "", title = "Trayectoria" }) {
  const { items, loading, error } = useTimeline(itemsProp);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [compact, setCompact] = useState(false);

  // ordenar + agrupar por año
  const groups = useMemo(() => {
    const filtered = items
      .filter(it => matchesFilter(it, filter))
      .filter(it => matchesQuery(it, query));

    const sorted = [...filtered].sort((a, b) => {
      const sa = a?.period?.start ?? a?.period?.end ?? "";
      const sb = b?.period?.start ?? b?.period?.end ?? "";
      return String(sb).localeCompare(String(sa));
    });

    const map = new Map();
    for (const it of sorted) {
      const year = String(it?.period?.start ?? it?.period?.end ?? "Otros").slice(0, 4);
      if (!map.has(year)) map.set(year, []);
      map.get(year).push(it);
    }
    return Array.from(map.entries());
  }, [items, filter, query]);

  // scroll progress para la línea central
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 10%", "end 80%"] });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // mouse pos para efecto glow en cards
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const handler = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  return (
    <Element name="trayectoria">
      <section
        className={cn("mx-auto max-w-7xl px-4 pt-16 pb-28 lg:pt-20 lg:pb-32", className)}
        aria-label="Línea temporal de proyectos, iOS/IA y formación"
      >
        {/* header */}
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">{title}</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">iOS · IA · Web · Formación</p>
        </header>

        {/* toolbar */}
        <Toolbar
          active={filter}
          onFilter={setFilter}
          query={query}
          onQuery={setQuery}
          compact={compact}
          onCompact={setCompact}
        />

        {/* línea central + progreso */}
        <div ref={wrapRef} className="relative">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden -ml-[1px] h-full w-0.5 bg-gradient-to-b from-blue-500/40 via-zinc-500/30 to-transparent dark:from-blue-400/40 dark:via-zinc-400/30 sm:block" />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-0 hidden -ml-[1px] w-0.5 bg-blue-600 sm:block"
            style={{ height: progress }}
          />
        </div>

        {/* estados */}
        {loading && (
          <div className="space-y-4 mt-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/60" />
            ))}
          </div>
        )}

        {!loading && groups.length === 0 && !error && (
          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            No hay elementos para los filtros actuales.
          </p>
        )}

        {/* contenido */}
        {!!groups.length && (
          <div className="space-y-14">
            {groups.map(([year, arr]) => (
              <div key={year} className="relative">
                <YearChip year={year} />

                <ol className={cn("relative grid grid-cols-1 gap-6 sm:grid-cols-2", compact && "gap-4")}>
                  {arr.map((it, idx) => {
                    const side = idx % 2 === 0 ? "left" : "right";
                    return (
                      <li
                        key={it.id ?? `${year}-${idx}`}
                        className={cn("relative sm:col-span-1", side === "left" ? "sm:pr-8" : "sm:pl-8")}
                      >
                        {/* punto activo sobre la línea */}
                        <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 sm:block" aria-hidden="true">
                          <Dot active={idx === 0} />
                        </div>
                        <Card item={it} side={side} compact={compact} />
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-6 text-center text-sm text-amber-600 dark:text-amber-400">
            No se pudo cargar <code>/data/timeline.json</code>. Revisa que exista en <code>/public/data</code>.
          </p>
        )}
      </section>
    </Element>
  );
}
