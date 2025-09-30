import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { 50: "#eff9ff", 500: "#00A4F4", 600: "#0084d4" },
        neut: { 50:"#f6f6f6",100:"#e7e7e7",200:"#d1d1d1",300:"#b0b0b0",400:"#888888",500:"#6d6d6d",600:"#5d5d5d",700:"#4f4f4f",800:"#454545",900:"#3d3d3d",950:"#000000" },
      },
    },
  },
  plugins: [],
});
