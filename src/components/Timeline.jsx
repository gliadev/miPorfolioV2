import { useEffect, useMemo, useRef, useState } from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import { ExternalLink, Image as ImageIcon, Play } from "lucide-react";

// 👇 Ajusta esta ruta según tu estructura:
import { ICONS, accentColor, legendTargetForItem } from "../helpers/timeline";

/* ───────────────────────── Hook datos ───────────────────────── */

function useTimeline(initialItems) {
  const [items, setItems] = useState(initialItems ?? []);
  const [loading, setLoading] = useState(!initialItems?.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    if (initialItems?.length) { setLoading(false); return; }
    (async () => {
      try {
        const res = await fetch("/data/timeline.json", { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (active) setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [initialItems]);

  return { items, loading, error };
}

/* ───────────────────────── UI auxiliares ───────────────────────── */

function Links({ links }) {
  if (!Array.isArray(links) || !links.length) return null;
  const valid = links.filter(l => l && l.url);
  if (!valid.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {valid.map((link, i) => ( 
        <a
          key={`${link.url}-${i}`}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 border-zinc-200/60 dark:border-zinc-800"
        >
          {link.label || "Enlace"} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
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
          <ImageIcon className="h-3 w-3" aria-hidden="true" /> media
        </span>
      )}
    </div>
  );
}

function Period({ period = {} }) {
  const { start, end } = period;
  if (!start && !end) return null;
  if (start && !end) return <p className="text-sm text-zinc-600 dark:text-zinc-400">{start} – Presente</p>;
  if (!start && end) return <p className="text-sm text-zinc-600 dark:text-zinc-400">{end}</p>;
  return <p className="text-sm text-zinc-600 dark:text-zinc-400">{start} – {end}</p>;
}

/** Palabra de la leyenda con subrayado animado */
function LegendWord({ children, active, color }) {
  return (
    <span className="relative inline-block px-0.5">
      <span
        className="transition-colors"
        style={active ? { color, fontWeight: 700 } : undefined}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 rounded-full transition-transform duration-200"
        style={{
          backgroundColor: color || "transparent",
          transform: active ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </span>
  );
}

/* ───────────────────────── Tarjeta ───────────────────────── */

function Card({ item, side, onLegendEnter, onLegendLeave }) {
  const color = accentColor(item);
  const Icon = ICONS[item.icon] || ICONS.default;
  const { title, org, period, description, tags, links, url } = item;
  const legendInfo = legendTargetForItem(item);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className={`group relative max-w-xl rounded-2xl border p-4 shadow-sm backdrop-blur 
        bg-white/80 border-zinc-200/60 dark:bg-zinc-900/70 dark:border-zinc-800/60 
        ${side === "left" ? "ml-auto" : "mr-auto"}`}
      style={{ boxShadow: `0 18px 40px -18px ${color}2a` }}
      onMouseEnter={() => onLegendEnter?.(legendInfo)}
      onMouseLeave={() => onLegendLeave?.()}
      onFocus={() => onLegendEnter?.(legendInfo)}
      onBlur={() => onLegendLeave?.()}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }}
      tabIndex={0}
      role="article"
    >
      {/* barra superior de acento */}
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${color}55, ${color})` }} />
      {/* conector hacia la línea central */}
      <span className={`absolute top-6 hidden h-[2px] w-8 sm:block ${side === "left" ? "-right-8" : "-left-8"}`} style={{ background: color }} />

      <div className={`flex items-start gap-4 ${side === "right" ? "sm:flex-row-reverse" : ""}`}>
        <span className="mt-0.5 rounded-xl border border-zinc-200/60 bg-zinc-50 p-2 text-zinc-800 dark:border-zinc-800/60 dark:bg-zinc-800 dark:text-zinc-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-base font-bold leading-6 text-zinc-900 dark:text-zinc-100">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-inherit font-bold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                  {title}
                </a>
              ) : title}
            </h3>
            <Period period={period} />
          </div>
          {org && <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{org}</p>}

          <div className={`mt-3 flex gap-3 sm:items-start ${side === "right" ? "sm:flex-row-reverse" : "sm:flex-row"} flex-col-reverse`}>
            <div className="sm:flex-1">
              {description && <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">{description}</p>}
              {Array.isArray(tags) && !!tags.length && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <span key={`${t}-${i}`} className="rounded-full border border-zinc-200/60 bg-zinc-50/70 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-800/60 dark:bg-zinc-800/60 dark:text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <Links links={links} />
            </div>
            <Media media={item.media} />
          </div>
        </div>
      </div>

      {/* halo radial en hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100"
        style={{ background: `radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), ${color}24, transparent 45%)` }}
      />
    </motion.article>
  );
}

/* ───────────────────────── Principal ───────────────────────── */

export default function Timeline({ items: initialItems = [], title = "Trayectoria", className = "" }) {
  const { items, loading, error } = useTimeline(initialItems);

  // Leyenda activa: { key: 'ios'|'ai'|'web'|'edu'|null, color }
  const [legend, setLegend] = useState({ key: null, color: null });

  // Agrupar por año (desc)
  const groups = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const aYear = a?.period?.start ?? a?.period?.end ?? "";
      const bYear = b?.period?.start ?? b?.period?.end ?? "";
      return String(bYear).localeCompare(String(aYear));
    });
    const yearMap = new Map();
    for (const it of sorted) {
      const year = String(it?.period?.start ?? it?.period?.end ?? "Otros").slice(0, 4);
      if (!yearMap.has(year)) yearMap.set(year, []);
      yearMap.get(year).push(it);
    }
    return Array.from(yearMap.entries());
  }, [items]);

  const lineRef = useRef(null);

  return (
    <Element name="trayectoria">
      <section
        className={`mx-auto max-w-7xl px-4 pt-16 pb-28 lg:pt-20 lg:pb-32 ${className}
        bg-zinc-100 text-zinc-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}
        aria-label="Línea temporal de proyectos y formación"
      >
        {/* Encabezado */}
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">{title}</h2>
          {/* Leyenda con subrayado animado y color por palabra */}
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 transition-colors duration-200">
            <LegendWord active={legend.key === "ios"} color={legend.color}>iOS</LegendWord>
            {" · "}
            <LegendWord active={legend.key === "ai"} color={legend.color}>IA</LegendWord>
            {" · "}
            <LegendWord active={legend.key === "web"} color={legend.color}>Web</LegendWord>
            {" · "}
            <LegendWord active={legend.key === "edu"} color={legend.color}>Formación</LegendWord>
          </p>
        </header>

        {/* Línea vertical central base */}
        <div ref={lineRef} className="relative">
          <div
            className="pointer-events-none absolute left-1/2 top-0 hidden -ml-[1px] h-full w-0.5 opacity-30
                       bg-gradient-to-b from-zinc-400/40 via-zinc-400/20 to-transparent
                       dark:from-zinc-300/30 dark:via-zinc-500/15 sm:block"
          />
        </div>

        {/* Loading / Empty */}
        {loading && (
          <div className="mt-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/60" />
            ))}
          </div>
        )}
        {!loading && groups.length === 0 && !error && (
          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">No hay elementos.</p>
        )}

        {/* Grupos por año */}
        {!!groups.length && (
          <div className="mt-6 space-y-14 sm:space-y-16">
            {groups.map(([year, itemsForYear]) => (
              <section key={year} className="relative">
                {/* Segmento por año */}
                <div
                  className="pointer-events-none absolute left-1/2 top-8 bottom-0 hidden -ml-[1px] w-0.5 sm:block
                             bg-gradient-to-b from-blue-400/60 via-blue-400/25 to-transparent
                             dark:from-blue-300/60 dark:via-blue-300/20"
                />

                {/* Chip año */}
                <div
                  className="sticky top-20 z-10 mx-auto mb-6 w-max rounded-full px-3 py-1 text-sm font-semibold shadow"
                  style={{ background: "#60A5FAcc", color: "#FFFFFF" }}
                >
                  {year}
                </div>

                {/* Items por año: alterno izquierda/derecha */}
                <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {itemsForYear.map((item, idx) => {
                    const side = (idx % 2 === 0) ? "left" : "right";
                    return (
                      <li
                        key={item.id ?? `${year}-${idx}`}
                        className={`relative sm:col-span-1 ${side === "left" ? "sm:pr-10" : "sm:pl-10"}`}
                      >
                        {/* Pin en la línea central */}
                        <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 sm:block" aria-hidden="true">
                          <span className="relative z-10 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 shadow ring-4 ring-blue-600/25 dark:bg-blue-500" />
                        </div>
                        <Card
                          item={item}
                          side={side}
                          onLegendEnter={(info) => setLegend(info)}
                          onLegendLeave={() => setLegend({ key: null, color: null })}
                        />
                      </li>
                    );
                  })}
                </ol>
              </section>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-6 text-center text-sm text-amber-600 dark:text-amber-400">
            No se pudo cargar <code>/data/timeline.json</code>.
          </p>
        )}
      </section>
    </Element>
  );
}
