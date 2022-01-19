module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "color-gray": "#FAFDFB",
      primary: "#1E90FF",
    }),
    extend: {},
  },
  plugins: [],
}