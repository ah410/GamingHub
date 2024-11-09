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
        'secondary': '#F97316',
        'background': '#242424',
        'card-background': '#374151'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

