/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E3A8A',
        'primary-dark': '#172c6a',
        'primary-light': '#3B6BBF',
        'secondary': '#F97316',
        'secondary-dark': '#B85A10',
        'background': '#242424',
        'background-hover': '#2e2e2e',
        'background-card': '#3A3A3A',
        'card-background': '#374151',
        'accent': '#DC2626',
        'accent-dark': '#B91C1C'
      },
      backgroundImage: {
        'game': "url('./src/assets/sparking-zero-background.png')"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
