import { useState } from 'react';
import { Link } from 'react-scroll';
import ThemeToggle from './ThemeToggle';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 px-6 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="intro"
          smooth
          duration={500}
          className="text-xl font-bold text-pink-500 cursor-pointer"
        >
          gliaDev
        </Link>

        <div
          className="md:hidden text-2xl text-black dark:text-white cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        <div className="hidden md:flex space-x-6 items-center text-black dark:text-white">
          <Link to="aboutme" smooth duration={500} className="cursor-pointer hover:text-blue-400 transition">
            Sobre mí
          </Link>
          <Link to="proyectos" smooth duration={500} className="cursor-pointer hover:text-blue-400 transition">
            Proyectos
          </Link>
          <Link to="contacto" smooth duration={500} className="cursor-pointer hover:text-blue-400 transition">
            Contacto
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 text-center text-black dark:text-white">
          <Link onClick={closeMenu} to="aboutme" smooth duration={500} className="block hover:text-blue-400 transition">
            Sobre mí
          </Link>
          <Link onClick={closeMenu} to="proyectos" smooth duration={500} className="block hover:text-blue-400 transition">
            Proyectos
          </Link>
          <Link onClick={closeMenu} to="contacto" smooth duration={500} className="block hover:text-blue-400 transition">
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
