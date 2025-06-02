import {
  useState,
  useLayoutEffect,
  type Dispatch,
  type SetStateAction,
} from "react";

export function useTheme(): [string, Dispatch<SetStateAction<string>>] {
  // 1. Read localStorage (or default to "light") synchronously
  const getInitial = (): string => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app-theme");
      return saved ?? "light";
    }
    return "light";
  };

  const [theme, setTheme] = useState<string>(getInitial);

  // 2. Whenever theme changes, sync to HTML class and to localStorage
  useLayoutEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  return [theme, setTheme];
}
