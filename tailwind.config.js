const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        Cairo: ['Cairo', ...fontFamily.sans], // Add the new font here
      },
    },
  },
}
