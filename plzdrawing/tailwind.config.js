/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'black': '#000000',

        'light-gray-1': '#F9F9F9',
        'light-gray-2': '#D9D9D9',
        'light-gray-3': '#DCDFDF',
        'dark-gray-1': '#A8A8A8',
        'dark-gray-2': '#767A7A',
        'separator': '#DCDFDF',

        'highlight-orange': '#FFA011',
        'main-yellow': '#FFC311',
        'sub-yellow': '#FFE18D',

        'sub-green-1': '#84DAAB',
        'sub-green-2': '#D0F2DF',
        'error-red': '#FF7E7E',
      },
    },
  },
}
