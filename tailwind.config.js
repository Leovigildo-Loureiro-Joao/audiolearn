/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
            'top_image': "url('/assets/top_image.png')",
        },
        colors: {
            dark: '#121214',
            light: '#E1E1E6',
            primary: "#D20FC9",
            secondary: "#140152",
            title_color: '#100A2C',
            custom_color: '#242752',
            text_color: '#757575',
        },
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            mono: ['"Roboto Mono"', 'monospace'],
        },
        backgroundImage:{
          "footer-image": "url(./src/assets/footer.jpg)",
        }
    },
  },
  plugins: [],
}