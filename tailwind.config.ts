import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          main: "#232c57",       // Deep navy blue from layalikerala.com
          hover: "#181f3d",
          light: "#343e74",
          black: "#1E293B",      // Main text color
          paragraph: "#818090",  // Subdued body text
          bg: "#F3F6FD",         // Soft icy background
          accent: "#F79837",     // Warm golden/amber highlight
          gold: "#D4AF37",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        heading: ["var(--font-josefin)", "Josefin Sans", "sans-serif"],
        body: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px rgba(35, 44, 87, 0.08)",
        hover: "0 18px 40px rgba(35, 44, 87, 0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
