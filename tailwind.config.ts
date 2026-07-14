import type { Config } from "tailwindcss";

// Palette transcribed verbatim from RHPS_Frontier_Visual_System_and_Image_Prompt_Guide.docx §1.3
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        evergreen: "#0F4D3A",
        slateBlue: "#234A6F",
        mistBlue: "#BFD0E1",
        warmStone: "#E7E2D8",
        charcoal: "#2B2F33",
        copperAccent: "#C47A52",
      },
      fontFamily: {
        headline: ["var(--font-merriweather)", "serif"],
        body: ["var(--font-source-sans)", "sans-serif"],
        emphasis: ["var(--font-source-serif)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
