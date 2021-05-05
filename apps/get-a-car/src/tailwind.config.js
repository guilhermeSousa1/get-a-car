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
      maxWidth: {
        '36': '9rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1060px',
        'xl': '1280px',
        '2xl': '1570px',
      },
      backgroundImage: () => ({
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
