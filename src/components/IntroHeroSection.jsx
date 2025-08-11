import { Typewriter } from "react-simple-typewriter";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import logo from "../assets/img/gliadevFavicon.png";

export default function IntroHeroSection() {
  return (
    <section
      id="intro"
      role="region"
      aria-labelledby="intro-heading"
      className="
        min-h-screen
        grid grid-cols-1 lg:grid-cols-2
        items-center
        justify-center
        gap-10
        px-6 lg:px-20
        py-16
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-white
        transition-colors duration-300
      "
    >
      {/* Columna izquierda: presentación */}
      <div className="text-center lg:text-left space-y-6" data-aos="fade-right">
        <h1 id="intro-heading" className="text-4xl sm:text-5xl font-bold leading-tight">
          Hola, soy <span className="text-blue-500 dark:text-blue-400">Adolfo</span>
        </h1>

        <h2 className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
          Desarrollador Junior – Swift · SwiftUI · UIKit
        </h2>

        {/* Typewriter */}
        <div className="h-[3.5rem] flex items-center justify-center lg:justify-start">
          <span
            className="text-2xl md:text-3xl font-semibold inline-block min-w-[30ch]"
            aria-label="Animación de presentación"
          >
            <Typewriter
              words={[
                'De Técnico en Emergencias Sanitarias',
                'gliaTEM',
                '.',
                '..',
                '...',
                'liveUpdate',
                'load',
                'loading',
                'a Desarrollador iOS',
                'gliaDev',
                '& IA 👀',
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </span>
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            Transformando mi historia en código.
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            Ahora lucho con código en lugar de con botiquines.
          </p>
        </div>

        {/* Redes */}
        <div className="flex items-center justify-center lg:justify-start gap-6 text-2xl pt-2">
          <a
            href="https://github.com/gliadev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visita mi GitHub"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/gliadev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visita mi perfil de LinkedIn"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Columna derecha: Logo gliaDev */}
      <div className="flex justify-center lg:justify-end" data-aos="fade-left">
        <div className="text-center space-y-4">
          <img
            src={logo}
            alt="Logo de gliaDev - Desarrollador iOS"
            className="w-48 sm:w-64 mx-auto drop-shadow-xl rounded-xl"
          />
          <h3 className="text-3xl font-bold text-pink-500 dark:text-pink-400">
            gliaDev
          </h3>
          <p className="text-lg tracking-widest text-pink-500 dark:text-pink-400">
            iOS DEVELOPER
          </p>
        </div>
      </div>
    </section>
  );
}
