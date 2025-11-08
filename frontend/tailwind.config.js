/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B7355',
          light: '#A08978',
          dark: '#6D5A43'
        },
        secondary: {
          DEFAULT: '#E8DDD3',
          light: '#F5F0EA',
          dark: '#D4C5B5'
        },
        accent: {
          DEFAULT: '#D4AF77',
          light: '#E5C89A',
          dark: '#B8935E'
        },
        background: '#FAF8F5',
        text: {
          dark: '#2C2C2C',
          light: '#FFFFFF',
          muted: '#6B7280'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(60px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
