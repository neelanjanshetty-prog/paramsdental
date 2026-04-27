/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F2F8FD',
          100: '#DBEEFA',
          200: '#B7E3F6',
          300: '#89D0EF',
          400: '#4CB9E7',
          500: '#239ED6',
          600: '#0D4C92',
          700: '#0A3D77',
          800: '#082C55',
          900: '#061C36',
        },
        secondary: '#4CB9E7',
        accent: '#B7E3F6',
        dark: '#1A1A1A',
        light: '#F5FAFD',
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          elevated: 'rgb(var(--surface-elevated) / <alpha-value>)',
        },
        ink: 'rgb(var(--ink) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 80px rgba(13, 76, 146, 0.15)',
        panel: '0 18px 50px rgba(8, 44, 85, 0.10)',
        glow: '0 0 40px rgba(76, 185, 231, 0.35)',
        halo: '0 35px 80px rgba(13, 76, 146, 0.18)',
      },
      backgroundImage: {
        aurora:
          'radial-gradient(circle at 20% 20%, rgba(76,185,231,0.22), transparent 28%), radial-gradient(circle at 80% 0%, rgba(13,76,146,0.24), transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.9), rgba(183,227,246,0.45))',
        'hero-grid':
          'linear-gradient(rgba(13, 76, 146, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 76, 146, 0.08) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.5' },
          '100%': { transform: 'scale(1.25)', opacity: '0' },
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0px, 0px, 0px)' },
          '50%': { transform: 'translate3d(12px, -16px, 0px)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.5s ease-out infinite',
        shine: 'shine 6s linear infinite',
        drift: 'drift 10s ease-in-out infinite',
      },
      backdropBlur: {
        xl: '28px',
      },
    },
  },
  plugins: [],
};
