/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
      colors: {
        accent: '#00B0FF',
        'accent-pink': '#FF95E5',
        'sidebar-bg': '#0C0C0C',
        'accent-light': '#00B0FF14',
      },
      letterSpacing: {
        'tight': '-0.025em',
      },
    },
  },
  plugins: [],
};