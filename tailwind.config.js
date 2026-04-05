/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 60s linear infinite',
      },
      // Tokens semánticos — usar estos en vez de zinc/gray/slate directamente
      colors: {
        bg: {
          light: '#ffffff',
          dark: '#111827',   // gray-900
        },
        surface: {
          light: '#f4f4f5', // zinc-100
          dark: '#1f2937',  // gray-800
        },
      },
    },
  },
  plugins: [],
}
