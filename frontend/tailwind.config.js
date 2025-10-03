/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "custom-gradient": "linear-gradient(180deg, #fde1ff, #e1ffea22 60%)",
      colors: {
        primary: '#D81B60', // Pink
        secondary: '#EC4899', // Light Pink
        btnHover: '#F880B0',
        heading: '#203061', // Dark Blue
        subHeading: '#304680' // Violet

      },
    },
  },
  plugins: [require("daisyui")],
};
