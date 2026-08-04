/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        color: {
          primary: 'var(--color-primary)',
          accent: 'var(--color-accent)',
          secondary: 'var(--color-secondary)',
          dark: 'var(--color-dark)'
        }
      },
    },
  },
  plugins: [],
};
