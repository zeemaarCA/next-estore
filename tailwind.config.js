/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    // preflight: false,
  },

  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#f8c617",
          "secondary": "#6b7280",
          "accent": "#7c3aed",
          "neutral": "#374151",
          "base-100": "#252c37",
          "info": "#6366f1",
          "success": "#4ade80",
          "warning": "#fbbf24",
          "error": "#ef4444",
        },
        light: {
          "primary": "#15803d",
          "secondary": "#6b7280",
          "accent": "#7c3aed",
          "neutral": "#374151",
          "base-100": "#f1f1f1",
          "info": "#6366f1",
          "success": "#4ade80",
          "warning": "#fbbf24",
          "error": "#ef4444",
        },
      },
      ],
  },

  darkMode: ['class', '[data-theme="dark"]', "class"],

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
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		fontFamily: {
  			opensans: ['Open Sans', 'sans-serif'],
  			poppins: ["Poppins", 'sans-serif'],
  			comforta: ["Comfortaa", 'sans-serif'],
  			sora: ["Sora", 'sans-serif'],
  			outfit: ["Outfit", 'sans-serif'],
  			lora: ["Lora", 'serif']
  		},
  		colors: {
  			cgreen: {
  				'50': '#f6f9f4',
  				'100': '#e8f3e5',
  				'200': '#d0e7cb',
  				'300': '#abd3a2',
  				'400': '#7eb672',
  				'500': '#15803d',
  				'600': '#487d3c',
  				'700': '#3d6734',
  				'800': '#31502b',
  				'900': '#294225',
  				'950': '#122310'
  			},
  			supernova: {
  				'50': '#fefce8',
  				'100': '#fdf8c4',
  				'200': '#fded8b',
  				'300': '#fbdb49',
  				'400': '#f8c617',
  				'500': '#e8ad0a',
  				'600': '#c88506',
  				'700': '#a05f08',
  				'800': '#844b0f',
  				'900': '#703d13',
  				'950': '#411f07'
  			},


  		},

		},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};

