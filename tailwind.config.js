module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8D7966', // dark brown
        secondary: '#A8A39D', // dark gray
        accent: '#D8C8B8', // yellowish brown
        custom1: '#E2DDD9', // corrected hex code for gray
        custom2: '#F8F1E9', // super light
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: [''],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {},
};
