/** @type {import('tailwindcss').Config} */
export default {
  mode:"jit",
  //purge:["./src/**/*.vue"],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

