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
        'max-base': { max: '569px' }, // Para max-width 569px
        'max-md': { max: '767px' }, // Para max-width 767px
        'max-lg': { max: '1023px' }, // Para max-width 1023px
        'max-xl': { max: '1259px' }, // Para max-width 1259px
        'max-2xl': { max: '1359px' }, // Para max-width 1359px
        'max-3xl': { max: '1439px' }, // Para max-width 1439px

        'sm': { min: '375px' }, // Para min-width 375px
        'bs': { min: '570px' }, // Para min-width 570px
        'md': { min: '768px' }, // Para min-width 768px
        'lg': { min: '1024px' }, // Para min-width 1024px
        'xl': { min: '1260px' }, // Para min-width 1280px
        '2xl': { min: '1360px' }, // Para min-width 1360px
        '3xl': { min: '1440px' }, // Para min-width 1440px

      },
      colors: {
        pinkSecondary: '#E65BA5', // Substitua pelo código hexadecimal desejado
      },
    },
  },
  plugins: [],
}
