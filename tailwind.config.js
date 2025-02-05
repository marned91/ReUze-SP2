/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.{html,js,ts}', '!./node_modules/**/*'],
  theme: {
    extend: {
      fontFamily: {
        largeFont: ['Outfit', 'sans-serif'],
        mediumFont: ['Urbanist', 'sans-serif'],
        smallFont: ['Ubuntu', 'sans-serif'],
        headerFooter: ['Sora', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#DEE5E8',
          DEFAULT: '#437081',
          dark: '#383939',
        },
        accent: {
          light: '#7A8080',
          dark: '#196E8E',
        },
        highlight: '#DB764F',
      },
      screens: {
        xs: '460px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      boxShadow: {
        '3xl': '0 10px 30px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
