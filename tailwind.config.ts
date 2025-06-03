import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,astro,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,astro,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: "var(--user-font-size)", // supports dynamic user-defined font size
      },
      colors: {
        // These align with your CSS variable setup
        bg: "rgb(var(--background) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        copy: "rgb(var(--copy-primary) / <alpha-value>)",
        "copy-secondary": "rgb(var(--copy-secondary) / <alpha-value>)",
        cta: "rgb(var(--cta) / <alpha-value>)",
        "cta-active": "rgb(var(--cta-active) / <alpha-value>)",
        "cta-text": "rgb(var(--cta-text) / <alpha-value>)",
      },
      textColor: {
        copy: "rgb(var(--copy-primary) / <alpha-value>)",
        "copy-secondary": "rgb(var(--copy-secondary) / <alpha-value>)",
        cta: "rgb(var(--cta) / <alpha-value>)",
      },
      backgroundColor: {
        bg: "rgb(var(--background) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        cta: "rgb(var(--cta) / <alpha-value>)",
        "cta-active": "rgb(var(--cta-active) / <alpha-value>)",
      },
      borderColor: {
        border: "rgb(var(--border) / <alpha-value>)",
      },

      // Add blinking keyframes and animation here:
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1.2s steps(2, start) infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".text-base-dynamic": {
          "font-size": "var(--font-size-base)",
        },
      });
    },
  ],
};

export default config;
