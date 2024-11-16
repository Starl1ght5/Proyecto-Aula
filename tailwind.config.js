/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "monsterrat": ["Montserrat", "sans-serif"],
        "outfit": ["Outfit", "sans-serif"],
      },

      colors: {
        'complementary':'#48EC9A',
      },

      backgroundImage: theme => ({
        'login-background': "url('../public/ice_cream_bg_1.jpg')",
        'test-background': "url('../public/5949462.jpg')",
       })
    },
  },
  plugins: [],
}