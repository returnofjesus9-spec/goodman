import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#131211',
        gold: { DEFAULT: '#A87C2E', light: '#C79A4B' },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
