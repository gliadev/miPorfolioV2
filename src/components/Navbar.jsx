import { useEffect, useState, useCallback } from 'react';
import ThemeToggle from './ThemeToggle';
import { FiMenu, FiX } from 'react-icons/fi';

const NAV_ITEMS = [
  { id: 'intro', label: 'Inicio' },
  { id: 'aboutme', label: 'Sobre mí' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('intro');

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    // IntersectionObserver para resaltar sección activa
    const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);
    if (!('IntersectionObserver' in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.1, 0.5, 1] }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const baseItem = "relative px-2 py-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded-md";
  const activeItem = "text-blue-600 dark:text-blue-400 underline underline-offset-8 decoration-2";

  const handleAnchorClick = (e, id) => {
    // Smooth scroll manual (además del href para crawlers)
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
      setActive(id);
      closeMenu();
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/70 dark:bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Main">
        <a href="/" className="text-xl font-bold hover:opacity-90 focus-visible:outline" aria-label="Ir a la página de inicio">
          gliaDev
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${baseItem} ${active === item.id ? activeItem : ''}`}
                aria-current={active === item.id ? 'page' : undefined}
                onClick={(e) => handleAnchorClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center justify-center rounded-md border p-2 md:hidden"
          onClick={() => setIsOpen(v => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Abrir menú"
        >
          {isOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div id="mobile-menu" className="border-t px-4 pb-4 pt-2 md:hidden">
          <ul className="space-y-2">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`${baseItem} block ${active === item.id ? activeItem : ''}`}
                  aria-current={active === item.id ? 'page' : undefined}
                  onClick={(e) => handleAnchorClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
