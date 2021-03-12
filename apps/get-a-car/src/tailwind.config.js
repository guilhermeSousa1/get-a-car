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
      backgroundImage: theme => ({
        'app-logo': "url('/assets/img/angular.svg')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
