import { useState, useEffect } from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light')

  // Inicializa el tema al montar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')

    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    setMounted(true)
  }, [])

  // Cambia el tema manualmente
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }

  // Evita parpadeos de render hasta que esté montado
  if (!mounted) return null

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
