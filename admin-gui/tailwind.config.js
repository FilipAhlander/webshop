module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      mono: ['Ubuntu Mono'],
      body: ['Ubuntu'],
    },
    // Ubuntu mono rubriker och Ubuntu för resten
    extend: {},
  },
  plugins: [],
};
