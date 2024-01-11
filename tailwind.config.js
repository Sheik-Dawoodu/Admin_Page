/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f7f7f8',
          '100': '#eeedf1',
          '200': '#d7d7e0',
          '300': '#b4b4c5',
          '400': '#8b8ca5',
          '500': '#6d6e8a',
          '600': '#585971',
          '700': '#48485c',
          '800': '#3c3c4c',
          '900': '#373743',
          '950': '#25242d',
        },
        secondary: {
          '50': '#fef8ec',
          '100': '#fbebca',
          '200': '#f7d590',
          '300': '#f2ba57',
          '400': '#efa130',
          '500': '#e88018',
          '600': '#c55a11',
          '700': '#ab4012',
          '800': '#8b3315',
          '900': '#722b15',
          '950': '#411307',
      },
      },

    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

