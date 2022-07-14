/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["node_modules/daisyui/dist/**/*.js"],
  theme: {
    extend: {},
  },
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  plugins: [require("daisyui")],
}