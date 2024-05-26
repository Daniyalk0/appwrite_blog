/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        top: "0 -4px 6px -1px rgba(37, 84, 112, 0.5), 0 -2px 4px -1px rgba(37, 84, 112, 0.3)",
      },
      fontFamily: {
        custom: ["Ubuntu"],
      },
      colors: {
        darkgreen: "#282D2D",
        facebook: "#3b5998",
        bglight: "#A0DCEA",
        darkblue: "#131326",
        postcard: "#0c2737",
        footer: "#255470",
      },
      backgroundImage: {
        "dark-mode":
          "linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%)",
        "light-mode":
          "linear-gradient(90.9deg, rgb(3, 195, 195) 0.3%, rgb(37, 84, 112) 87.8%);",
      },
    },
    screens: {
      tablet: { max: "950px" },
      mobile: { max: "700px" },
      mobileAndTablet: { max: "950px", min: "0px" },
    },
    backgroundImage: {
      "auth-btn-img":
        "url('https://webgradients.com/public/webgradients_png/035%20Itmeo%20Branding.png')",
    },
  },
  plugins: [],
};
