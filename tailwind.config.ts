import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Standard colors
        primary: colors.indigo,
        secondary: colors.pink,
        success: colors.green,
        warning: colors.amber,
        error: colors.red,
        // Custom colors and hyperlink color
        background: "var(--background)",
        foreground: "var(--foreground)",
        hyperlink: colors.blue["600"],
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
