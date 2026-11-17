/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        morandi: {
          bg: '#F8F7F4',
          surface: '#FFFFFF',
          border: '#E6E2DA',
          text: '#33363A',
          muted: '#6E737B',
          n1: '#5B7C99',
          korean: '#C98A7A',
          geo1: '#6B8E78',
          geo2: '#5C8D89',
          history: '#B56555',
          civics: '#84709B',
          math: '#6A7B9C',
          endo: '#A68A64',
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans TC"',
          '"Noto Sans JP"',
          '"Noto Sans KR"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(45, 48, 52, 0.05), 0 1px 3px 0 rgba(45, 48, 52, 0.03)',
        card: '0 4px 20px -4px rgba(45, 48, 52, 0.06)',
      },
    },
  },
  plugins: [],
};
