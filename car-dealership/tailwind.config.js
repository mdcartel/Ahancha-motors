/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#1C3879',
            light: '#2A4F9D',
            dark: '#152A5A',
          },
          secondary: {
            DEFAULT: '#D9D9D9',
            light: '#F5F5F5',
            dark: '#ABABAB',
          },
          accent: {
            DEFAULT: '#B91C1C',
            light: '#DC2626',
            dark: '#991B1B',
          },
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }