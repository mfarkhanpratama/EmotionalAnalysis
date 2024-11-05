/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#212529",
        secDark: "#2A2E32",
        accent: "#EB8317",
        joy: "#FFBC2C",
        redis: "#FE413C",
      },
    },
  },
  plugins: [],
};
