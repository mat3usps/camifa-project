/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "winter",
      "night",
      "business",
      "corporate",
      "valentine",
      "halloween",
      "aqua",
      "lofi",
      "black",
      "luxury",
      "night",
    ],
  },
};
