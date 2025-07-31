import { a } from 'framer-motion/client';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animate: {
        'spin-slow': 'spin 60s linear infinite',
    },
  },
  plugins: [],
}
