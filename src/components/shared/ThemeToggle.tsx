import { useState, useEffect, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

type Theme = "light" | "dark";
const STORAGE_KEY = "gelbit_theme";

export default function ThemeToggle() {
  const { lang } = useLanguage();
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(STORAGE_KEY) as Theme) || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const label = lang === "he"
    ? theme === "light" ? "מעבר למצב כהה" : "מעבר למצב בהיר"
    : theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-surface text-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Sun className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
