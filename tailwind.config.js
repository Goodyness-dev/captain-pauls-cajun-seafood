/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050507',
          900: '#09090d',
          850: '#0c0c12',
          800: '#111116',
          700: '#16161d',
          600: '#22222b',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(249, 115, 22, 0.4)',
        },
        cajun: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          400: '#fb923c',
          500: '#f97316', // Primary Cajun Ember
          600: '#ea580c', // Deep Ember Hover
          700: '#c2410c',
          glow: 'rgba(249, 115, 22, 0.28)',
        },
        spicedGold: '#fbbf24',
        garnishGreen: '#22c55e',
      },
      fontFamily: {
        heading: ['"Montserrat"', '"Inter"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
