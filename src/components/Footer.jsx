import { Element } from "react-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ContactForm from "./ContactForm";

const NAV_LINKS = [
  { id: "intro",       label: "Inicio" },
  { id: "aboutme",     label: "Sobre mí" },
  { id: "proyectos",   label: "Proyectos" },
  { id: "trayectoria", label: "Trayectoria" },
  { id: "contacto",    label: "Contacto" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (e, id) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-gray-900 text-zinc-700 dark:text-zinc-300">
      <Element name="contacto">
        <div className="h-24 -mt-24" aria-hidden />
        <section
          id="contacto"
          className="scroll-mt-24 py-20 px-4"
          aria-labelledby="contacto-title"
        >
          <h2 id="contacto-title" className="text-3xl font-semibold text-center mb-2 text-zinc-900 dark:text-zinc-100">
            Contacto
          </h2>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-8">
            ¿Tienes un proyecto, una duda o simplemente quieres conectar?
          </p>

          <ContactForm />

          <div className="mt-8 flex justify-center gap-6 text-2xl">
            <a
              href="https://github.com/gliadev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de gliadev"
              className="hover:text-blue-500 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/gliadev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de gliadev"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
        </section>
      </Element>

      {/* Pie */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Nav rápida */}
          <nav aria-label="Navegación pie de página">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
              {NAV_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => scrollTo(e, id)}
                    className="hover:text-blue-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-center opacity-70">
            © {year} Adolfo Gómez · gliadev
          </p>
        </div>
      </div>
    </footer>
  );
}
