import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: "rgb(var(--bg-base) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--bg-surface) / <alpha-value>)",
          raised: "rgb(var(--bg-surface-raised) / <alpha-value>)",
        },
        "surface-raised": "rgb(var(--bg-surface-raised) / <alpha-value>)",
        border: {
          subtle: "rgb(var(--border-subtle) / <alpha-value>)",
        },
        "border-subtle": "rgb(var(--border-subtle) / <alpha-value>)",
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
        },
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        primary: "rgb(var(--text-primary) / <alpha-value>)",
        secondary: "rgb(var(--text-secondary) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          warm: "rgb(var(--accent-warm) / <alpha-value>)",
        },
        status: {
          active: "rgb(var(--status-active) / <alpha-value>)",
          paused: "#FBBF24",
          archived: "rgb(var(--status-archived) / <alpha-value>)",
          shipped: "#34D399",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      maxWidth: {
        prose: "680px",
        content: "1280px",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        DEFAULT: "180ms",
        page: "220ms",
      },
    },
  },
  plugins: [],
};

export default config;
