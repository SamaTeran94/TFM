/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navbar: '#FDF5E6',
        coloresbg: '#333333',
        colorestxbg: '#F5F5F5',
        preguntasbg: '#556B2F'
      },
    },
  },
}