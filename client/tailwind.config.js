module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#14171a',
          200: '#657786',
          300: '#aab8c2',
          400: '#e1e8ed',
          500: '#f5f8fa',
        },
        tur : {
          100 : '#b0e7e1',
          200 : '#defffa',
        },
        brand: {
          100: '#1da1f2',
        },
        pal : {
          75 : "#75DDDD",
          50 : "#508991",
          17 : "#172A3A",
          00 : "#004346",
          09 : "#09BC8A",
        }
      },
      height : {
        100 : "450px",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
