module.exports = {
  important: true,
  prefix: '',
  purge: {
    content: [
      './apps/**/*.{html,ts}',
      './libs/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        'app-logo': "url('/assets/img/angular.svg')",
        'toyota-prius': "url('/assets/img/toyota-prius.png')",
        "jeep-wrangler": "url('/assets/img/jeep-wrangler.png')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
