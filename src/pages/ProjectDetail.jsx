import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Link as LinkIcon, AppWindow, ArrowLeft, Code2 } from 'lucide-react';
import { fadeUp } from '../animations/variants';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';

function collectDemos(links = {}) {
  const arr = Array.isArray(links.demos) ? links.demos : [];
  return [...new Set([...arr, links.demo, links.demo2].filter(Boolean))];
}

function isVideo(url = '') {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/data/projects.json', { cache: 'no-store' });
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 gap-4">
        <p className="text-xl font-semibold">Proyecto no encontrado.</p>
        <Link to="/" className="text-blue-500 hover:underline">← Volver al inicio</Link>
      </div>
    );
  }

  const { title, description, tech = [], image, links = {}, status } = project;
  const demos = collectDemos(links);
  const externalLinks = [
    links.github  && { href: links.github,  label: 'GitHub',   icon: Github },
    links.website && { href: links.website, label: 'Web',      icon: LinkIcon },
    links.store   && { href: links.store,   label: 'App Store', icon: AppWindow },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-16">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-blue-500 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a proyectos
        </Link>

        <motion.article {...fadeUp} transition={{ duration: 0.35 }}>
          {/* Cabecera */}
          <div className="flex flex-wrap items-start gap-3 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
            {status === 'in-progress' && (
              <span className="mt-1.5 inline-flex items-center rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-semibold text-yellow-700 dark:text-yellow-300 border border-yellow-400/30">
                En progreso
              </span>
            )}
          </div>

          {/* Imagen principal */}
          {image && (
            <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <img
                src={image}
                alt={`${title} — captura`}
                className="w-full object-cover max-h-[480px]"
                loading="eager"
              />
            </div>
          )}

          {/* Descripción */}
          <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-8">
            {description}
          </p>

          {/* Tech stack */}
          {tech.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                Stack técnico
              </h2>
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-sm font-medium"
                  >
                    <Code2 className="h-3.5 w-3.5 opacity-60" aria-hidden />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links externos */}
          {externalLinks.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-3">
              {externalLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-blue-500 transition-colors"
                >
                  <Icon className="h-4 w-4" /> {label}
                </a>
              ))}
            </div>
          )}

          {/* Demos */}
          {demos.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                Demos
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {demos.map((url, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
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
                        className="w-full object-contain"
                        loading="lazy"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.article>
      </main>

      <ScrollToTop />
    </div>
  );
}
