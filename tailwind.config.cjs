/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        'green-custom': '#7bd95d',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('flowbite/plugin'),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
  daisyui: {
    themes: [
      {
        darker: {
          primary: '#666666',

          secondary: '#CCCCCC',

          accent: '#eab308',

          neutral: '#FFFFFF',

          'base-100': '#000000',

          info: '#22D3EE',

          success: '#1b7f11',

          warning: '#d8e000',

          error: '#cc2d19',
        },
      },
    ],
  },
  safelist: [
    {
      pattern: /(mt|mb|mr|ml|my|mx|px|py|pt|pb|pl|pr)-[0-9]+/,
    },
    {
      pattern: /flex-.*/,
    },
    {
      pattern: /(bottom|right|top|left)-[0-9]+/,
    },
    {
      pattern: /(w|h)-[0-9]+/,
    },
  ],
  darkMode: 'class',
}
