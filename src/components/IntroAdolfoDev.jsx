// src/components/IntroAdolfoDev.jsx
import { Element } from 'react-scroll';
import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import iosDevImage from '../assets/img/gliadevFavicon.png';

export default function IntroAdolfoDev() {
  return (
    <Element name="intro">
      <section
        id="intro"
        className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center px-6 lg:px-20 gap-12 bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300"
      >
        {/* Texto */}
        <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Hola, soy <span className="text-blue-500 dark:text-blue-400">Adolfo</span>
          </h1>

          <h2 className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-4">
            Desarrollador Junior – Swift · SwiftUI · UIKit
          </h2>

          {/* Typewriter */}
          <div className="mb-6 h-[3.5rem] flex items-center justify-center lg:justify-start">
            <span className="text-2xl md:text-3xl font-semibold inline-block min-w-[30ch]">
              <Typewriter
                words={[
                  'De Técnico Emergencias Sanitarias',
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

          {/* Subtexto */}
          <div className="space-y-2 mb-8">
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              Transformando mi historia en código.
            </p>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              Ahora lucho con código en lugar de con botiquines.
            </p>
          </div>

          {/* CTA */}
          <div className="mb-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a
              href="#proyectos"
              onClick={(e) => {
                const el = document.getElementById("proyectos");
                if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 transition-colors"
            >
              Ver proyectos
            </a>
            <a
              href="#contacto"
              onClick={(e) => {
                const el = document.getElementById("contacto");
                if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 transition-colors"
            >
              Contacto
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center justify-center lg:justify-start gap-6 text-2xl">
            <a
              href="https://github.com/gliadev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              aria-label="Abrir GitHub de gliadev"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/gliadev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              aria-label="Abrir LinkedIn de gliadev"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Imagen */}
        <div className="lg:w-1/2" data-aos="fade-left">
          <img
            src={iosDevImage}
            alt="Desarrollador iOS ilustrado"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto drop-shadow-xl rounded-xl"
            width={500}
            height={500}
            loading="eager"
            decoding="async"
          />
        </div>
      </section>
    </Element>
  );
}
