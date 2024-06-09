/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "380px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      dark: "#383838",
      white: "#FFFFFF",
      dimwhite: "#F5F7F8",
      green: "#89C98D",
      red: "#F44336",
      blue: "#148ACA",
      darkgray: "#607D8B",
      gray:"#C6D0D5",
      lightgray:"#EFF2F3",

    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      sora: ["Sora", "sans-serif"],
    },
    fontSize: {
      fs1: "48px",
      fs2: "40px",
      fs3: "30px",
      fs4: "24px",
      fs5: "18px",
      fs6: "14px",
      ps: "12px",
    },
    extend: {
      keyframes: {
        scroll: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-100%)",
          },
        },
      },
      animation: {
        scroll: "scroll 10s linear infinite",
      },
    },
  },

  plugins: [],
};
