import React from "react";
import Skills from "./Skills";
import { Element } from "react-scroll";


export default function AboutMe() {
  return (
    <Element name="aboutme">

      <section
      className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300"
>
      <div
        className="max-w-4xl mx-auto text-center lg:text-left px-6 py-16 lg:px-32"
        data-aos="fade-up"
        >
        <h2 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">
          Sobre mí
        </h2>
        <p
          className="mb-4 text-lg text-zinc-700 dark:text-gray-300"
          data-aos="fade-up"
          data-aos-delay="100"
          >
          Soy Adolfo, ex Técnico en Emergencias Sanitarias en una unidad de Soporte Vital Avanzado de Enfermería. Durante años trabajé en situaciones de alta presión, aprendiendo a priorizar, mantener la calma y resolver con eficacia. Hoy, aplico esos mismos valores en el desarrollo de software.
        </p>
        <p
          className="mb-4 text-lg text-zinc-700 dark:text-gray-300"
          data-aos="fade-up"
          data-aos-delay="200"
          >
          Una lesión deportiva me obligó a replantearme mi futuro. La recuperación fue larga y difícil, pero me empujó a explorar una nueva pasión: la programación. Esa experiencia me enseñó la importancia de la resiliencia, la accesibilidad y la mejora continua.
        </p>
        <p
          className="mb-4 text-lg text-zinc-700 dark:text-gray-300"
          data-aos="fade-up"
          data-aos-delay="300"
          >
          Empecé con desarrollo web y fullstack en el bootcamp de Code4Jobs, descubrí Swift durante el grado superior DAM, y profundicé aún más en el Swift Developer Program de Apple Coding. Ahí nació mi enfoque hacia el desarrollo iOS accesible, útil y centrado en las personas.
        </p>
        <p
          className="mb-4 text-lg text-zinc-700 dark:text-gray-300"
          data-aos="fade-up"
          data-aos-delay="400"
          >
          Actualmente me centro en crear aplicaciones con Swift y SwiftUI, combinando mis habilidades técnicas con los valores humanos que arrastro del mundo sanitario. Quiero desarrollar soluciones que marquen la diferencia, especialmente para quienes enfrentan barreras reales.
        </p>
        <p
          className="text-lg text-zinc-700 dark:text-gray-300"
          data-aos="fade-up"
          data-aos-delay="500"
          >
          La tecnología es mi nuevo medio para ayudar. Este es solo el comienzo.
        </p>
      </div>

        <Skills />
      </section>
    </Element>

    
  );
}
