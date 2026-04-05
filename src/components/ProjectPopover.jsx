import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Link as LinkIcon, AppWindow, ArrowRight, Code2, PlayCircle, X } from "lucide-react";

const GAP_V = 8;

/* Calcula posición fija (viewport-relative) sobre la misma tarjeta */
function calcPosition(rect) {
  const w = rect.width;
  const left = Math.max(8, Math.min(window.innerWidth - w - 8, rect.left));

  const estimatedH = 460;
  let top = rect.top;
  if (top + estimatedH > window.innerHeight - GAP_V) {
    top = window.innerHeight - estimatedH - GAP_V;
  }
  top = Math.max(GAP_V, top);

  return { left, top, width: w };
}

/* ── Desktop popover ── */
function DesktopPopover({ project, anchorRect, visible, onMouseEnter, onMouseLeave }) {
  const ref = useRef(null);

  // Cerrar al hacer scroll — la tarjeta se aleja y el popover quedaría huérfano
  useEffect(() => {
    const onScroll = () => onMouseLeave?.();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onMouseLeave]);

  if (!anchorRect) return null;
  const pos = calcPosition(anchorRect);
  const { title, description, tech = [], links = {}, status, slug } = project;

  const externalLinks = [
    links.github  && { href: links.github,  label: "GitHub",    icon: Github },
    links.website && { href: links.website, label: "Web",       icon: LinkIcon },
    links.store   && { href: links.store,   label: "App Store", icon: AppWindow },
  ].filter(Boolean);

  const hasDemos = Array.isArray(links.demos) && links.demos.length > 0;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, zIndex: 9999 }}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-2xl p-5 pointer-events-auto"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="flex items-center gap-2 min-w-0 mb-3">
            <h4 className="font-bold text-base text-zinc-900 dark:text-zinc-100 leading-tight truncate">
              {title}
            </h4>
            {status === "in-progress" && (
              <span className="shrink-0 inline-flex items-center rounded-full bg-yellow-400/20 px-2 py-0.5 text-[11px] font-semibold text-yellow-700 dark:text-yellow-300 border border-yellow-400/30">
                En progreso
              </span>
            )}
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-4">
            {description}
          </p>

          {tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tech.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                  <Code2 className="h-3 w-3" aria-hidden /> {t}
                </span>
              ))}
            </div>
          )}

          {(externalLinks.length > 0 || hasDemos) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {externalLinks.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors">
                  <Icon className="h-3.5 w-3.5" /> {label}
                </a>
              ))}
              {hasDemos && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  <PlayCircle className="h-3.5 w-3.5" /> Demo disponible
                </span>
              )}
            </div>
          )}

          <Link to={`/proyectos/${slug}`}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
            Ver detalle <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ── Mobile bottom sheet ── */
function MobileSheet({ project, visible, onClose }) {
  const { title, description, tech = [], links = {}, status, slug } = project;

  const externalLinks = [
    links.github  && { href: links.github,  label: "GitHub",    icon: Github },
    links.website && { href: links.website, label: "Web",       icon: LinkIcon },
    links.store   && { href: links.store,   label: "App Store", icon: AppWindow },
  ].filter(Boolean);

  const hasDemos = Array.isArray(links.demos) && links.demos.length > 0;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] rounded-t-2xl border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 pb-10 pointer-events-auto max-h-[85vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />

            {/* Cerrar */}
            <button onClick={onClose} aria-label="Cerrar"
              className="absolute top-4 right-4 rounded-full border border-zinc-200 dark:border-zinc-700 p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 min-w-0 mb-3">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 leading-tight">
                {title}
              </h3>
              {status === "in-progress" && (
                <span className="shrink-0 inline-flex items-center rounded-full bg-yellow-400/20 px-2 py-0.5 text-[11px] font-semibold text-yellow-700 dark:text-yellow-300 border border-yellow-400/30">
                  En progreso
                </span>
              )}
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
              {description}
            </p>

            {tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {tech.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    <Code2 className="h-3 w-3" aria-hidden /> {t}
                  </span>
                ))}
              </div>
            )}

            {(externalLinks.length > 0 || hasDemos) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {externalLinks.map(({ href, label, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors">
                    <Icon className="h-4 w-4" /> {label}
                  </a>
                ))}
                {hasDemos && (
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-500">
                    <PlayCircle className="h-4 w-4" /> Demo disponible
                  </span>
                )}
              </div>
            )}

            <Link to={`/proyectos/${slug}`} onClick={onClose}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
              Ver detalle <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ── Export principal ── */
export default function ProjectPopover({ project, anchorRect, visible, onMouseEnter, onMouseLeave, isTouch, onClose }) {
  if (isTouch) {
    return <MobileSheet project={project} visible={visible} onClose={onClose} />;
  }
  return (
    <DesktopPopover
      project={project}
      anchorRect={anchorRect}
      visible={visible}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
