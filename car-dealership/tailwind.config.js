/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional blue color palette
        primary: {
          50: '#e6f0fa',
          100: '#cce0f5',
          200: '#99c2eb',
          300: '#66a3e0',
          400: '#3385d6',
          500: '#1C3879', // Main primary color
          600: '#152c5e',
          700: '#0e2043',
          800: '#081529',
          900: '#040b14',
          DEFAULT: '#1C3879',
          light: '#2A4F9D',
          dark: '#152A5A',
        },
        // Warm gray color palette for secondary
        secondary: {
          50: '#f9f9f9',
          100: '#f1f1f1',
          200: '#e1e1e1',
          300: '#d1d1d1',
          400: '#c2c2c2',
          500: '#D9D9D9', // Main secondary color
          600: '#adadad',
          700: '#8a8a8a',
          800: '#676767',
          900: '#444444',
          DEFAULT: '#D9D9D9',
          light: '#F5F5F5',
          dark: '#ABABAB',
        },
        // Premium red accent color
        accent: {
          50: '#fee7e7',
          100: '#fecfcf',
          200: '#fd9f9f',
          300: '#fc6f6f',
          400: '#fb3f3f',
          500: '#B91C1C', // Main accent color
          600: '#941616',
          700: '#6f1111',
          800: '#4a0b0b',
          900: '#250606',
          DEFAULT: '#B91C1C',
          light: '#DC2626',
          dark: '#991B1B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'fadeDown': 'fadeDown 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}