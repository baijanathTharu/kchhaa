module.exports = {
  mode: "jit", // this will enable Tailwind JIT compiler to make the build faster
  purge: ["./app/**/*.{ts,tsx}"], // Here we are going to tell Tailwind to use any .ts or .tsx file to purge the CSS
  darkMode: "media", // Use media queries for dark mode, customize it as you want
  theme: {
    extend: {},
    fontFamily: {
      "poppins": ['Poppins']
    }
  }, // customize the theme however you want here
  variants: {}, // activate any variant you want here
  plugins: [
    require('daisyui')
  ], // add any plugin you need here
};