/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nyc-taxi': '#fbbf24',
        'nyc-black': '#050505',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
