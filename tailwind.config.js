/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14110f',
        paper: '#faf6ed',
        coral: '#ff7a59',
        moss: '#5a7d4d',
        gold: '#f5c842',
        charcoal: '#2e2e2e',
      },
      boxShadow: {
        card: '0 20px 60px rgba(20, 17, 15, 0.14)',
      },
      backgroundImage: {
        haze: 'radial-gradient(circle at top left, rgba(245, 200, 66, 0.4), transparent 35%), radial-gradient(circle at bottom right, rgba(245, 200, 66, 0.2), transparent 30%)',
      },
    },
  },
  plugins: [],
}