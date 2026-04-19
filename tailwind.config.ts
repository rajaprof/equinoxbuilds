import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        giggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg) scale(1.02)' },
          '50%': { transform: 'rotate(3deg) scale(1.02)' },
          '75%': { transform: 'rotate(-3deg) scale(1.02)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        giggle: 'giggle 0.6s ease-in-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      }
    },
  },
  plugins: [],
};

export default config;
