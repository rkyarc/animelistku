/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    colors: {
      color: {
        primary: '#f8fafc', // Crisp white (Slate 50) for readable text
        accent: '#facc15', // Vibrant modern yellow (Yellow 400)
        secondary: '#1e293b', // Sleek card background (Slate 800)
        dark: '#0f172a' // Deep, premium background (Slate 900)
      }
    }
  },
  plugins: [],
};
