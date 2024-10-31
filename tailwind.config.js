/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "opensans": ["Open Sans", "sans-serif"],
        "yellowtail": ["Yellowtail", "cursive"],
      },

      colors: {
        'complementary':'#48EC9A',
      },

      backgroundImage: theme => ({
        'login-background': "url('../public/ice_cream_bg_1.jpg')",
       })
    },
  },
  plugins: [],
}