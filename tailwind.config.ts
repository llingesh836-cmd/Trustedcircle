import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 15px 45px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        brand: {
          50: '#eef2ff',
          500: '#4f46e5',
          600: '#4338ca',
        },
      },
    },
  },
  plugins: [],
};

export default config;
