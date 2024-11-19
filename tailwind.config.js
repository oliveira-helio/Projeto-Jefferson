/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'max-md': { max: '767px' }, // Para max-width 767px
        'max-sm': { max: '639px' }, // Para max-width 639px
      },
      colors: {
        pinkSecondary: '#E65BA5', // Substitua pelo código hexadecimal desejado
      },
    },
  },
  plugins: [],
}
