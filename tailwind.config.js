/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {                // fondo / texto principal
          light: '#ffffff',
          dark:  '#0f172a',
        },
        primary: {             // color de realce (links, títulos…)
          light: '#1d4ed8',
          dark:  '#60a5fa',
        },
      },
    },
  },
  plugins: [],
}
