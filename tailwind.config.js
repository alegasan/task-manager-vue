/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          border: '#334155',
          text: '#e2e8f0',
          textSecondary: '#cbd5e1',
        },
        blue: {
          accent: '#3b82f6',
          accentDark: '#1d4ed8',
          light: '#0ea5e9',
        }
      }
    },
  },
  plugins: [],
}
