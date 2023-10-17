/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Roboto'],
    },
    screens: {
      'sm': '640px',

      'md': '768px',

      "md_2": '900px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1280px',
    },
  },
  plugins: [],
}
