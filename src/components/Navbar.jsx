import { useState, useEffect, useCallback } from 'react';
import { Link, scrollSpy } from 'react-scroll';
import ThemeToggle from './ThemeToggle';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  // Actualiza el spy al montar y al redimensionar
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    scrollSpy.update();
    const onResize = () => scrollSpy.update();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const handleSetActive = useCallback((section) => {
    setActiveSection(section);
  }, []);

  const OFFSET = -96; // compensa navbar fijo

  const baseItem =
    "relative cursor-pointer transition-colors hover:text-blue-600 dark:hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";
  const activeItem =
    "text-blue-600 dark:text-blue-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600 dark:after:bg-blue-400";
  const mobileMenuId = 'primary-navigation';

  return (
    <nav className="fixed top-0 w-full bg-zinc-100 dark:bg-gray-900 text-zinc-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 shadow-md z-50 px-6 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="intro"
          smooth
          duration={500}
          offset={OFFSET}
          spy
          hashSpy
          spyThrottle={100}
          activeClass={activeItem}
          className="text-xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          onClick={closeMenu}
          onSetActive={handleSetActive}
          aria-current={activeSection === 'intro' ? 'page' : undefined}
        >
          gliaDev
        </Link>

        <button
          type="button"
          className="md:hidden text-2xl text-zinc-900 dark:text-gray-100 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          onClick={toggleMenu}
          aria-label="Abrir o cerrar el menú de navegación"
          aria-expanded={isOpen}
          aria-controls={mobileMenuId}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop */}
        <div className="hidden md:flex space-x-6 items-center text-zinc-900 dark:text-gray-100">
          <Link to="aboutme" smooth duration={500} offset={OFFSET} spy hashSpy spyThrottle={100}
            activeClass={activeItem} className={baseItem} onSetActive={handleSetActive}
            aria-current={activeSection === 'aboutme' ? 'page' : undefined}>
            Sobre mí
          </Link>

          <Link to="trayectoria" smooth duration={500} offset={OFFSET} spy hashSpy spyThrottle={100}
            activeClass={activeItem} className={baseItem} onSetActive={handleSetActive}
            aria-current={activeSection === 'trayectoria' ? 'page' : undefined}>
            Trayectoria
          </Link>

          <Link to="proyectos" smooth duration={500} offset={OFFSET} spy hashSpy spyThrottle={100}
            activeClass={activeItem} className={baseItem} onSetActive={handleSetActive}
            aria-current={activeSection === 'proyectos' ? 'page' : undefined}>
            Proyectos
          </Link>

          <Link to="contacto" smooth duration={500} offset={OFFSET} spy hashSpy spyThrottle={100}
            activeClass={activeItem} className={baseItem} onSetActive={handleSetActive}
            aria-current={activeSection === 'contacto' ? 'page' : undefined}>
            Contacto
          </Link>

          <ThemeToggle />
        </div>
      </div>

      {/* Móvil */}
      {isOpen && (
        <div id={mobileMenuId} className="md:hidden mt-4 space-y-3 text-center text-zinc-900 dark:text-gray-100">
          <Link onClick={closeMenu} to="aboutme" smooth duration={500} offset={OFFSET}
            spy hashSpy spyThrottle={100} activeClass={activeItem} className={`${baseItem} block`} onSetActive={handleSetActive}
            aria-current={activeSection === 'aboutme' ? 'page' : undefined}>
            Sobre mí
          </Link>

          <Link onClick={closeMenu} to="trayectoria" smooth duration={500} offset={OFFSET}
            spy hashSpy spyThrottle={100} activeClass={activeItem} className={`${baseItem} block`} onSetActive={handleSetActive}
            aria-current={activeSection === 'trayectoria' ? 'page' : undefined}>
            Trayectoria
          </Link>

          <Link onClick={closeMenu} to="proyectos" smooth duration={500} offset={OFFSET}
            spy hashSpy spyThrottle={100} activeClass={activeItem} className={`${baseItem} block`} onSetActive={handleSetActive}
            aria-current={activeSection === 'proyectos' ? 'page' : undefined}>
            Proyectos
          </Link>

          <Link onClick={closeMenu} to="contacto" smooth duration={500} offset={OFFSET}
            spy hashSpy spyThrottle={100} activeClass={activeItem} className={`${baseItem} block`} onSetActive={handleSetActive}
            aria-current={activeSection === 'contacto' ? 'page' : undefined}>
            Contacto
          </Link>

          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
