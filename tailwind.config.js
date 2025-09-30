/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./context/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'brand-dark': '#1A1A1A',
          'brand-dark-2': '#2C2C2C',
          'brand-red': '#E53E3E',
          'brand-light': '#F7FAFC',
          'brand-gray': '#A0AEC0',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }