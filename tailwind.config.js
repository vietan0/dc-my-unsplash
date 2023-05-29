/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  // any javascript/typescript files
  // inside src (doesn't matter how deep)
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },

    extend: { fontFamily: { sans: ['Sarabun', ...defaultTheme.fontFamily.sans] } },
  },
  plugins: [],
};
