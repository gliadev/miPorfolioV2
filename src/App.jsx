// src/App.jsx
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import IntroAdolfoDev from './components/IntroAdolfoDev';
import AboutMe from './components/AboutMe';
import IntroSplash from './components/IntroSplash'; // 👈 nuevo componente

function App() {
  const [showSplash, setShowSplash] = useState(true); // 👈 estado para mostrar intro

  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });

    // Gestión del tema desde cookies
    function getCookie(name) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    const savedTheme = getCookie('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  if (showSplash) {
    return <IntroSplash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <Navbar />
      <IntroAdolfoDev />
      <AboutMe />

      <header id="sobre-mi" className="pt-24 flex items-center justify-center h-screen" data-aos="fade-up">
        <div className="text-center px-4">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Hola, soy Adolfo</h1>
          <p className="text-xl">Desarrollador iOS Junior – Swift · SwiftUI · UIKit</p>
        </div>
      </header>

      <div className="p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        ¡Tailwind + modo claro/oscuro funcionan!
      </div>
      <div className="p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        ¡Modo claro/oscuro de Tailwind v4 funcionando!
      </div>

      <div className="bg-red-500 text-white p-4 rounded-lg">
        ¡Tailwind funciona perfectamente!
      </div>

      <div className="bg-glia text-white p-4">
        Color personalizado funcionando 🎨
      </div>

      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h1 className="text-2xl font-bold">Hola</h1>
        <p className="text-gray-700 dark:text-gray-300">Texto que cambia de color</p>
      </div>

      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

      <section id="proyectos" className="py-20 px-4" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center mb-8">Proyectos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6" data-aos="zoom-in">
            <h3 className="text-2xl font-bold mb-2">Mi App iOS</h3>
            <p>Descripción breve del proyecto, tecnologías usadas y resultado.</p>
            <a href="#" className="inline-block mt-4 text-blue-500 hover:underline">
              Ver en GitHub
            </a>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20 px-4" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center mb-8">Contacto</h2>
        <p className="text-center">
          ¿Quieres conectar? Escríbeme a <a href="mailto:tuemail@dominio.com" className="text-blue-500 hover:underline">tuemail@dominio.com</a>
        </p>
      </section>

      <footer className="py-6 text-center text-sm">
        © {new Date().getFullYear()} Adolfo. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;
