/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0B5CAB',
          blueDark: '#032D60',
          blueLight: '#EAF2FC',
          orange: '#FF7A59',
          orangeDark: '#E8623D',
        },
      },
    },
  },
  plugins: [],
}