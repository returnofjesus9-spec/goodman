import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          // Tonal ramp, not a flat slab. Each step is a touch lighter *and*
          // a touch cooler (blue creeping into the graphite as it lifts),
          // so the darks read as material catching a faint cool light
          // rather than a neutral void — and so they sit comfortably next
          // to the #4F7FFF accent instead of fighting it.
          //   void    — true floor. Reserved for hero + final CTA only.
          //   deep    — page-level section background, one step up from void.
          //   surface — card/panel background, sits on deep or void.
          //   raised  — hover states, active nav items, elevated panels.
          void: '#050505',
          deep: '#0A0C10',
          surface: '#10131A',
          raised: '#171B24',
          // DEFAULT kept as an alias of void so any un-migrated `bg-bg`
          // usage still resolves to the correct floor tone.
          DEFAULT: '#050505',
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
        'display-xl': ['clamp(3.25rem, 10.5vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(3rem, 8vw, 7.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-stat': ['clamp(4rem, 13vw, 11rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        // Sized to fit one column of a 3-up grid inside max-w-6xl (~300–340px
        // per column) at any viewport width, unlike display-stat's vw-based
        // sizing which was written for a full-bleed single number and
        // overflows into neighboring columns once contained to a third of
        // the page.
        'display-stat-grid': ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        label: '0.22em',
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        'radial-fade': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,127,255,0.16), transparent 70%)',
        'radial-fade-sm': 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(79,127,255,0.14), transparent 70%)',
      },
      backgroundSize: {
        grid: '48px 48px',
        'grid-fine': '24px 24px',
        'grid-sparse': '96px 96px',
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 1s ease forwards',
        marquee: 'marquee 32s linear infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'grid-drift': 'grid-drift 24s linear infinite',
        'grid-drift-fine': 'grid-drift-fine 16s linear infinite',
        'grid-drift-sparse': 'grid-drift-sparse 40s linear infinite',
        scanline: 'scanline 6s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        'drift-slow': 'drift-slow 14s ease-in-out infinite',
        'dash-flow': 'dash-flow 1.2s linear infinite',
        'node-blink': 'node-blink 3.2s ease-in-out infinite',
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
        'grid-drift': {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '48px 48px' },
        },
        'grid-drift-fine': {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '24px 24px' },
        },
        'grid-drift-sparse': {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '96px 96px' },
        },
        scanline: {
          '0%, 100%': { transform: 'translateY(-10%)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '50%': { transform: 'translateY(110%)', opacity: '0.35' },
          '90%': { opacity: '0.6' },
        },
        'drift-slow': {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '50%': { transform: 'translate(18px, -14px)' },
        },
        'dash-flow': {
          '0%': { strokeDashoffset: '8' },
          '100%': { strokeDashoffset: '0' },
        },
        'node-blink': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
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
