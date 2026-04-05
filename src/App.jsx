import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/motion-path.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroAdolfoDev from './components/IntroAdolfoDev';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Timeline from './components/Timeline';
import ScrollToTop from './components/ScrollToTop';




function App() {
  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <Navbar />
      <IntroAdolfoDev /> 
      <AboutMe />
      <SpeedInsights />
      <Projects initial="all" title="Proyectos" />
      <Timeline title="Trayectoria" />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
