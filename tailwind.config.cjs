const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#202225",
        secondary: "#5865f2",
        gray: colors.coolGray,
      },
    },
  },
  plugins: [],
};
