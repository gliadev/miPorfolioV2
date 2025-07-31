// src/App.jsx
import { useEffect, useState } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import IntroAdolfoDev from './components/IntroAdolfoDev';
import AboutMe from './components/AboutMe';
import IntroSplash from './components/IntroSplash'; 
function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });

    
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
      <SpeedInsights />

      

      
      <div className="p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"> </div>


      

      

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
