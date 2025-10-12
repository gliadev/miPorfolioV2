import React from "react";
import { Element } from "react-scroll";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 text-center text-sm">
      {/* Sección Contacto con react-scroll */}
      <Element name="contacto">
         <div className="h-24 -mt-24" aria-hidden />
        <section className="py-20 px-4" data-aos="fade-up">
          <h2 className="text-3xl font-semibold text-center mb-8">Contacto</h2>
          <p className="text-center">
            ¿Quieres conectar? Escríbeme a
            <a
              href="mailto:gliadev@icloud.com"
              className="text-blue-500 hover:underline"
            >
              gliadev@icloud.com
            </a>
          </p>
        </section>
      </Element>

      {/* Pie */}
      <div className="opacity-80">
        © {year} Adolfo Gomez @gliadev
      </div>
      <p className="text-center mt-1">
        👨🏻‍💻 iOS Developer exploring — Enthusiast of AI / Frontend
        (sometimes, when caffeine helps ☕️)
      </p>
    </footer>
  );
}
