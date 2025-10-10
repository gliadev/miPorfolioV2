import React from "react";

export default function Footer() {
  return (
    <footer className="py-6 text-center text-sm">
      <section id="contacto" className="py-20 px-4" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center mb-8">Contacto</h2>
        <p className="text-center">
          ¿Quieres conectar? Escríbeme a <a href="mailto:tuemail@dominio.com" className="text-blue-500 hover:underline">gliadev@icloud.com</a>
        </p>
      </section>
      © {new Date().getFullYear()} Adolfo Gomez @gliadev
      <p className="text-center">
          
        </p>
        <p className="text-center">
          👨🏻‍💻 iOS Developer exploring - Enthusiast the power of AI / Frontend (sometimes, when caffeine helps ☕️)
        </p>
      
      
      
    </footer>
  );
}
