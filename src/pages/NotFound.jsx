import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 text-center">
      <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
        <p className="text-8xl font-bold text-blue-500 dark:text-blue-400 mb-4">404</p>
        <h1 className="text-2xl font-bold mb-2">Página no encontrada</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm">
          La ruta que buscas no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
        >
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
}
