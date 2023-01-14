const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    './components/**/*.{html,js}'
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
  },
  variants: {},
  plugins: [
    require("tailwindcss-animation-delay")
  ],
}