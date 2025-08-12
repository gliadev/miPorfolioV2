import { Typewriter } from "react-simple-typewriter";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import logo from "../assets/img/gliadevFavicon.png";

export default function HeroAboutSplit() {
  return (
    <section
      id="intro-about"
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-6 lg:px-20 py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
    >
      {}
      <div
        className="space-y-6 text-center lg:text-left flex flex-col justify-start min-h-[70vh] translate-y-[-1.5rem] pl-6 lg:pl-20"
        data-aos="fade-right"
      >
        <div className="flex flex-col items-center lg:items-start gap-2 self-start">
          <img
            src={logo}
            alt="Logo de gliaDev"
            className="w-48 lg:w-64 drop-shadow-md"
          />
          <h2 className="text-lg text-pink-400 font-semibold tracking-wide">
            iOS Developer
          </h2>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Hola, soy{" "}
            <span className="text-blue-500 dark:text-blue-400">Adolfo</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg">
            Desarrollador Junior – Swift · SwiftUI · UIKit
          </p>
        </div>

        <div className="h-[3rem] flex items-center justify-center lg:justify-start">
          <span className="text-xl font-semibold min-w-[30ch]">
            <Typewriter
              words={[
                "De Técnico en Emergencias Sanitarias",
                "gliaTEM",
                "a Desarrollador iOS",
                "gliaDev",
                "& IA 👀",
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

        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            Transformando mi historia en código.
          </p>
          <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            Ahora lucho con código en lugar de con botiquines.
          </p>
        </div>

        <div className="flex gap-6 justify-center lg:justify-start text-2xl">
          <a
            href="https://github.com/gliadev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visita mi GitHub"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/gliadev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visita mi perfil de LinkedIn"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {}
      <div
        className="text-base lg:text-lg space-y-4 max-w-2xl mx-auto"
        data-aos="fade-left"
      >
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          Sobre mí
        </h2>
        <p>
          Soy Adolfo, ex Técnico en Emergencias Sanitarias en una unidad de
          Soporte Vital Avanzado de Enfermería (SVAe). Durante años trabajé en
          situaciones de alta presión, desarrollando la capacidad de priorizar,
          mantener la calma y resolver con eficacia. Hoy, aplico esos mismos
          valores en el desarrollo de software.
        </p>
        <p>
          Una lesión deportiva me obligó a replantearme mi futuro. La
          recuperación fue larga y desafiante, pero me impulsó a descubrir una
          nueva pasión: la programación. Esa experiencia fortaleció mi
          compromiso con la resiliencia, la accesibilidad y la mejora continua.
        </p>
        <p>
          Comencé en el desarrollo web y fullstack con el bootcamp de
          Code4Jobs. Luego, durante el grado superior en DAM, conocí Swift, y
          fue en el Swift Developer Program de Apple Coding donde profundicé en
          el desarrollo iOS accesible, útil y centrado en las personas.
        </p>
        <p>
          Hoy me especializo en crear aplicaciones con Swift y SwiftUI,
          combinando habilidades técnicas con los valores humanos que me dejó
          el mundo sanitario. Aspiro a desarrollar soluciones que realmente
          marquen la diferencia, especialmente para quienes enfrentan barreras
          reales.
        </p>
        <p>
          La tecnología es ahora mi medio para ayudar. Y este, solo es el
          comienzo.
        </p>
      </div>
    </section>
  );
}
