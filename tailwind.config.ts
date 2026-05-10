import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './context/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 15px 45px rgba(15, 23, 42, 0.08)',
        sm: '0 1px 3px rgba(0,0,0,0.08)',
      },
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      backgroundImage: {
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
