/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF9F6', // page background (warm off-white)
        surface: '#FFFFFF',
        ink: '#17161C', // main text
        muted: '#5E5B66', // secondary text (7:1 on paper)
        line: '#E3E0D8', // hairlines and borders
        accent: {
          DEFAULT: '#4B2E83', // deep purple, the only accent colour
          dark: '#3A2366',
          soft: '#EEE9F6',
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      maxWidth: {
        page: '72rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
