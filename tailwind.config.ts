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
        dark: {
          "700": "#3f3f46",
          "900": "#18181b",
        },
        light: {
          "300": "#d4d4d8",
          "400": "#a1a1aa",
        },
      },
      backgroundImage: {
        "light-desktop":
          "url(/images/background/light-blur-blob-bg-desktop.png)",
        "dark-desktop": "url(/images/background/dark-blur-blob-bg-desktop.png)",
        "light-mobile": "url(/images/background/dark-blur-blob-bg-mobile.png)",
        "dark-mobile": "url(/images/background/dark-blur-blob-bg-mobile.png)",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        sarabun: ["var(--font-sarabun)"],
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
