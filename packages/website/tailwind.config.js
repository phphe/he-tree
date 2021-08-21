// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultConfig = require('tailwindcss/defaultConfig')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        title: ['Cairo', ...defaultConfig.theme.fontFamily.sans],
      },
      colors: {
        primary: colors.blue,
        secondary: colors.yellow,
        neutral: colors.gray,
        warning: colors.amber,
        danger: colors.red,
        success: colors.green,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
