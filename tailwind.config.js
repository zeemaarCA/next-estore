/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },

  daisyui: {
    themes: ["dark", "light"],
  },

  darkMode: ['class', '[data-theme="dark"]'],

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        opensans: ['Open Sans', 'sans-serif'],
        poppins: ["Poppins", 'sans-serif'],
        comforta: ["Comfortaa", 'sans-serif'],
        sora: ["Sora", 'sans-serif'],
        outfit: ["Outfit", 'sans-serif'],
        lora: ["Lora", 'serif']
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};

