import { useState, useEffect } from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light')

  
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
    localStorage.setItem('theme', nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }

  
  if (!mounted) return null

  return (
    <button
  onClick={toggleTheme}
  className="
    p-2 rounded-full 
    border border-gray-300 dark:border-gray-700 
    bg-white dark:bg-gray-800 
    hover:bg-zinc-200 dark:hover:bg-gray-700 
    transition-colors duration-200
  "
  aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
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
        <IoMoon size={22} className="text-blue-600" />
      )}
    </motion.div>
  </AnimatePresence>
</button>

  )
}
