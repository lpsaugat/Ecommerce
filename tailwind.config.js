/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {
      fontFamily: {
        'font': ['Montserrat', ...defaultTheme.fontFamily.sans],
        'prox': ['Proxima Nova'],
        'poppins': ['Poppins'],
        'lato': ['Lato'],
        'roboto': ['Roboto'],

      },
      borderColor:{
        DEFAULT: '#c4c4c4',
      },
    },
  },
  plugins: [],
}
