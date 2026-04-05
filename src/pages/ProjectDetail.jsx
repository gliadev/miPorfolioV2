import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Link as LinkIcon, AppWindow, ArrowLeft, Code2 } from 'lucide-react';
import { fadeUp } from '../animations/variants';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';

/* ── helpers ── */
function collectDemos(links = {}) {
  const arr = Array.isArray(links.demos) ? links.demos : [];
  return [...new Set([...arr, links.demo, links.demo2].filter(Boolean))];
}
function isVideo(url = '') {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

const CATEGORY_LABEL = { ios: 'iOS', web: 'Web', ai: 'IA' };
const CATEGORY_COLOR = {
  ios: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  web: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  ai:  'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

/* ── estados de carga ── */
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  );
}

function NotFoundScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 gap-4">
      <p className="text-xl font-semibold">Proyecto no encontrado.</p>
      <Link to="/#proyectos" className="inline-flex items-center gap-2 text-blue-500 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Volver a proyectos
      </Link>
    </div>
  );
}

/* ── componente principal ── */
export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('/data/projects.json', { cache: 'no-store' });
        const data = await res.json();
        const found = data.find((p) => p.slug === slug);
        if (found) setProject(found);
        else setNotFound(true);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  // Actualiza el <title> del navegador con el nombre del proyecto
  useEffect(() => {
    if (project) {
      document.title = `${project.title} — gliadev`;
    }
    return () => { document.title = 'Adolfo Gómez — iOS Developer (Swift, SwiftUI) | gliadev'; };
  }, [project]);

  if (loading)           return <LoadingScreen />;
  if (notFound || !project) return <NotFoundScreen />;

  const { title, description, tech = [], image, links = {}, status, category } = project;
  const demos = collectDemos(links);
  const isPortrait = category === 'ios';

  const externalLinks = [
    links.github  && { href: links.github,  label: 'GitHub',    icon: Github },
    links.website && { href: links.website, label: 'Sitio web', icon: LinkIcon },
    links.store   && { href: links.store,   label: 'App Store', icon: AppWindow },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12 lg:py-16">

        {/* Volver */}
        <Link
          to="/#proyectos"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-500 transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a proyectos
        </Link>

        <motion.article {...fadeUp} transition={{ duration: 0.35 }}>

          {/* ── Cabecera ── */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {/* Badge categoría */}
            {category && (
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${CATEGORY_COLOR[category] ?? ''}`}>
                {CATEGORY_LABEL[category] ?? category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{title}</h1>
            {status === 'in-progress' && (
              <span className="inline-flex items-center rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-semibold text-yellow-700 dark:text-yellow-300 border border-yellow-400/30">
                En progreso
              </span>
            )}
          </div>

          {/* ── Layout principal: imagen + info ── */}
          <div className={`flex flex-col gap-8 mb-10 ${image ? 'lg:flex-row lg:items-start' : ''}`}>

            {/* Imagen principal */}
            {image && (
              <div className={`overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 shrink-0 ${isPortrait ? 'lg:w-56' : 'w-full lg:w-1/2'}`}>
                <img
                  src={image}
                  alt={`${title} — captura`}
                  className={`w-full ${isPortrait ? 'object-contain max-h-[420px]' : 'object-cover max-h-[320px]'}`}
                  loading="eager"
                />
              </div>
            )}

            {/* Info lateral */}
            <div className="flex-1 min-w-0">
              {/* Descripción */}
              <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6">
                {description}
              </p>

              {/* Tech stack */}
              {tech.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                    Stack técnico
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        <Code2 className="h-3.5 w-3.5 opacity-50" aria-hidden />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links externos */}
              {externalLinks.length > 0 && (
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                    Enlaces
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {externalLinks.map(({ href, label, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 text-sm font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                      >
                        <Icon className="h-4 w-4" /> {label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Demos ── */}
          {demos.length > 0 && (
            <section aria-labelledby="demos-title">
              <h2
                id="demos-title"
                className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4"
              >
                Demos
              </h2>
              <div className={`grid gap-6 ${isPortrait ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {demos.map((url, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
                  >
                    {isVideo(url) ? (
                      <video
                        src={url}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full"
                        title={`Demo ${i + 1} de ${title}`}
                      />
                    ) : (
                      <img
                        src={url}
                        alt={`Demo ${i + 1} de ${title}`}
                        className={`w-full ${isPortrait ? 'object-contain' : 'object-cover'}`}
                        loading="lazy"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </motion.article>
      </main>

      <ScrollToTop />
    </div>
  );
}
