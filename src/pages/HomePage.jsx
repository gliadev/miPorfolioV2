import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IntroAdolfoDev from '../components/IntroAdolfoDev';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import ScrollToTop from '../components/ScrollToTop';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <Navbar />
      <IntroAdolfoDev />
      <AboutMe />
      <Projects initial="all" title="Proyectos" />
      <Timeline title="Trayectoria" />
      <Footer />
      <ScrollToTop />
      <SpeedInsights />
    </div>
  );
}
