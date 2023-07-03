/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,vue,js,jsx,ts,tsx}'

  ],
  theme: {
    extend: {
      darkMode: [ 'class', '[data-theme="dark"]' ],
      colors: {
        primary: "#fff017",
        dark: "#121212",
        light: "#fff",
        muted: "#f9f9f9",
      },
    },
  },
  plugins: [],
}

