/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          lime: "#84cc16",
        },
        secondary: {
          orange: "#f97316",
        },
        dark: {
          "700": "#3f3f46",
          "900": "#18181b",
        },
        light: {
          "100": "#ffffff",
          "300": "#d4d4d8",
          "400": "#a1a1aa",
        },
      },
      gradientColorStops: {},
      backgroundImage: {
        "light-desktop":
          "url(/images/background/light-blur-blob-bg-desktop.png)",
        "dark-desktop": "url(/images/background/dark-blur-blob-bg-desktop.png)",
        "light-mobile": "url(/images/background/light-blur-blob-bg-mobile.png)",
        "dark-mobile": "url(/images/background/dark-blur-blob-bg-mobile.png)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        sarabun: ["var(--font-sarabun)"],
        firaCode: ["var(--font-firaCode)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwindcss-jun-layout"),
  ],
} satisfies Config;
