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
        'background': '#242424',
        'background-hover': '#2e2e2e',
        'card-background': '#374151'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

