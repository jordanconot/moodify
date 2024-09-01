/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#F9F9F9',
        'secondary': '#37C25E',
        'grey': '#A7AAB5',
        'grey-2': "#5B5C61",
        'modal': '#151A27'
      },
      backgroundColor: {
        'full': "#37C25E",
        'h1': 'radial-gradient(160% 160% at 50% 24.29%, #F9F4ED 0%, rgba(238, 231, 220, 0.00) 100%)',
        'primary': '#1D212E'
      },
      backgroundImage: {
        'custom-radial': 'radial-gradient(350.94% 343.49% at 51.82% -159.87%, #404657 0%, rgba(64, 70, 87, 0.00) 100%)',
      },
      fontFamily: {
        'h1': ['"Anton", sans-serif"'],
      },
    },
  },
  plugins: [],
};
