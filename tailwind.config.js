/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3061AF',
        border: '#dadce0',
        ...colors
      },
      borderColor: {
        primary: '#dadce0'
      },
      textColor: {
        primary: '#3c4043',
        secondary: '#5f6368'
      }
    }
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
})
