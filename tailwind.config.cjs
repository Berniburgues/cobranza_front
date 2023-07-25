module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        '3xl': '2000px', // Establece el ancho máximo para la clase '3xl'
      },
    },
  },
  plugins: [],
};
