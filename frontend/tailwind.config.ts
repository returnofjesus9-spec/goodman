import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050505',
          secondary: '#0B0B0B',
          surface: '#111111',
        },
        line: '#242424',
        ink: {
          DEFAULT: '#FFFFFF',
          secondary: '#A3A3A3',
          muted: '#666666',
        },
        accent: {
          DEFAULT: '#4F7FFF',
          dark: '#3860D6',
          light: '#8CA9FF',
          dim: 'rgba(79, 127, 255, 0.12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-lg': ['clamp(3rem, 8vw, 7.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        label: '0.22em',
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        'radial-fade': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,127,255,0.16), transparent 70%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 1s ease forwards',
        marquee: 'marquee 32s linear infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        prose: '38rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
