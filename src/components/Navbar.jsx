import { useState, useEffect } from 'react';
import { Link, scrollSpy } from 'react-scroll';
import ThemeToggle from './ThemeToggle';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Actualiza el spy al montar y al redimensionar
  useEffect(() => {
    scrollSpy.update();
    const onResize = () => scrollSpy.update();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const OFFSET = -96; // compensa navbar fijo

  const baseItem =
    "relative cursor-pointer transition-colors hover:text-blue-600 dark:hover:text-blue-400";
  const activeItem =
    "text-blue-600 dark:text-blue-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600 dark:after:bg-blue-400";

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
          className="text-xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
          onClick={closeMenu}
        >
          gliaDev
        </Link>

        <div
          className="md:hidden text-2xl text-zinc-900 dark:text-gray-100 cursor-pointer"
          onClick={toggleMenu}
          aria-label="Abrir/cerrar menú"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        {/* Desktop */}
        <div className="hidden md:flex space-x-6 items-center text-zinc-900 dark:text-gray-100">
          <Link to="aboutme" smooth duration={500} offset={OFFSET} spy hashSpy spyThrottle={100}
            activeClass={activeItem} className={baseItem}>
            Sobre mí
          </Link>

          <Link to="trayectoria" smooth duration={500} offset={OFFSET} spy hashSpy spyThrottle={100}
            activeClass={activeItem} className={baseItem}>
            Trayectoria
          </Link>

          <Link to="proyectos" smooth duration={500} offset={OFFSET} spy hashSpy spyThrottle={100}
            activeClass={activeItem} className={baseItem}>
            Proyectos
          </Link>

          <Link to="contacto" smooth duration={500} offset={OFFSET} spy hashSpy spyThrottle={100}
            activeClass={activeItem} className={baseItem}>
            Contacto
          </Link>

          <ThemeToggle />
        </div>
      </div>

      {/* Móvil */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 text-center text-zinc-900 dark:text-gray-100">
          <Link onClick={closeMenu} to="aboutme" smooth duration={500} offset={OFFSET}
            spy hashSpy spyThrottle={100} activeClass={activeItem} className={`${baseItem} block`}>
            Sobre mí
          </Link>

          <Link onClick={closeMenu} to="trayectoria" smooth duration={500} offset={OFFSET}
            spy hashSpy spyThrottle={100} activeClass={activeItem} className={`${baseItem} block`}>
            Trayectoria
          </Link>

          <Link onClick={closeMenu} to="proyectos" smooth duration={500} offset={OFFSET}
            spy hashSpy spyThrottle={100} activeClass={activeItem} className={`${baseItem} block`}>
            Proyectos
          </Link>

          <Link onClick={closeMenu} to="contacto" smooth duration={500} offset={OFFSET}
            spy hashSpy spyThrottle={100} activeClass={activeItem} className={`${baseItem} block`}>
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
