import { useEffect, useState } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroAdolfoDev from './components/IntroAdolfoDev';
import AboutMe from './components/AboutMe';
import IntroSplash from './components/IntroSplash'; 
import Projects from './components/Projects'




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
      <Projects initial="all" title="Proyectos" />
      <Footer />
    </div>
  );
}

export default App;
