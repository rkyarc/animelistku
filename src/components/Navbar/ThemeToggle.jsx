"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-7 h-7"></div>; // Placeholder to avoid hydration mismatch
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-white text-color-accent p-1 md:p-1.5 rounded-full shadow hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun size={20} weight="bold" />
      ) : (
        <Moon size={20} weight="bold" />
      )}
    </button>
  );
};

export default ThemeToggle;
