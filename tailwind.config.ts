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
        platform: {
          instagram: "#E1306C",
          tiktok: "#000000",
          linkedin: "#0A66C2",
          youtube: "#FF0000",
          facebook: "#1877F2",
          pinterest: "#E60023",
        },
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#3b82f6",
          500: "#002D72", // Official Pace University Blue (Pantone 288 C)
          600: "#00255e",
          700: "#001d4a",
          800: "#001538",
          900: "#000e26",
          950: "#000817",
        },
        pace: {
          navy: "#001C48",
          blue: "#002D72",
          blueLight: "#0A4694",
          blueMuted: "#EBF3FA",
          gold: "#FFB81C", // Official Pace University Gold (Pantone 1235 C)
          goldHover: "#E5A417",
          goldLight: "#FFF1CC",
          goldMuted: "#FFF8E7",
          slate: "#F8FAFC",
          border: "#E2E8F0",
        },
        surface: {
          950: "#001026",
          900: "#001C48",
          850: "#052559",
          800: "#0A2F6E",
          700: "#133E87",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "pulse-subtle": "pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
