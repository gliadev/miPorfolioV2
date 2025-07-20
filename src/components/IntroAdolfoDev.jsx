import { Typewriter } from 'react-simple-typewriter';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import iosDevImage from '../assets/img/gliadevFavicon.png';

export default function IntroAdolfoDev() {
  return (
    <section
      id="intro"
      className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center px-6 lg:px-20 gap-12 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
    >
      {/* Texto */}
      <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Hola, soy <span className="text-blue-400">Adolfo</span>
        </h1>

        <div className="mb-6 h-[3.5rem] flex items-center justify-center lg:justify-start">
          <span className="text-2xl md:text-3xl font-semibold inline-block min-w-[30ch]">
            <Typewriter
              words={[
                'De Técnico Emergencias Sanitarias',
                'gliaTEM',
                '.',
                '..',
                '...',
                'liveUpdate',
                'load',
                'loading',
                'a Desarrollador iOS',
                'gliaDev',
                '& IA 👀',
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

        <div className="space-y-2 mb-8">
          <p className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
            Transformando mi historia en código.
          </p>
          <p className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
            Ahora lucho con código en lugar de con botiquines.
          </p>
        </div>

        {/* Redes */}
        <div className="flex items-center justify-center lg:justify-start gap-6 text-2xl">
          <a
            href="https://github.com/gliadev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/gliadev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Imagen */}
      <div className="lg:w-1/2" data-aos="fade-left">
        <img
          src={iosDevImage}
          alt="Desarrollador iOS ilustrado"
          className="w-full max-w-md mx-auto drop-shadow-xl rounded-xl"
        />
      </div>
    </section>
  );
}
