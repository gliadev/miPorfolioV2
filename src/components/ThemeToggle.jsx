/* import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoMoon, IoSunny } from 'react-icons/io5';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className="p-2 rounded focus:outline-none text-black dark:text-white hover:text-blue-400 transition"
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <IoSunny size={24} /> : <IoMoon size={24} />}
      </motion.div>
    </button>
  );
}
  */
 
import { useState, useEffect } from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light')

  // Cargar tema desde localStorage o preferencia del sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    localStorage.setItem('theme', nextTheme)
  }

  if (!mounted) return null // Evita parpadeos hasta que el DOM se monte

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-transparent hover:border-blue-500 bg-white dark:bg-gray-800 hover:shadow-md transition"
      aria-label="Cambiar tema"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'dark' ? (
            <IoSunny size={22} className="text-yellow-400" />
          ) : (
            <IoMoon size={22} className="text-blue-500" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
