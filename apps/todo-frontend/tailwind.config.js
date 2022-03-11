module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f9acbd",
          secondary: "#47cc49",
          accent: "#ed3487",
          neutral: "#212136",
          "base-100": "#F6F3F6",
          info: "#4D69D1",
          success: "#17A655",
          warning: "#A26407",
          error: "#E85E78",
        },
      },
    ],
  },
};
