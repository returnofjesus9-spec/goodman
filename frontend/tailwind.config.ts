import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#201D19',
        paper: '#FAF6EF',
        navy: { DEFAULT: '#1E3A5F', dark: '#14283F', light: '#3A587D' },
        rust: { DEFAULT: '#AE5330', dark: '#93441F', light: '#C97847' },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
