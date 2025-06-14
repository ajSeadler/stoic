import { SwatchBook } from "lucide-react";
import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ThemeSwitcherProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const themeColors: Record<
  string,
  { background: string; border: string; card: string; cta: string }
> = {
  light: {
    background: "rgb(245, 245, 245)",
    border: "rgb(212, 212, 212)",
    card: "rgb(255, 255, 255)",
    cta: "rgb(139, 92, 246)",
  },
  dark: {
    background: "rgb(20, 20, 20)",
    border: "rgb(50, 50, 50)",
    card: "rgb(30, 30, 30)",
    cta: "rgb(120, 100, 230)",
  },

  // Color Accent Themes
  redlight: {
    background: "rgb(245, 245, 245)",
    border: "rgb(212, 212, 212)",
    card: "rgb(255, 255, 255)",
    cta: "rgb(239, 68, 68)",
  },
  reddark: {
    background: "rgb(20, 20, 20)",
    border: "rgb(50, 50, 50)",
    card: "rgb(30, 30, 30)",
    cta: "rgb(239, 68, 68)",
  },
  greenlight: {
    background: "rgb(245, 245, 245)",
    border: "rgb(212, 212, 212)",
    card: "rgb(255, 255, 255)",
    cta: "rgb(16, 73, 17)",
  },
  forest: {
    background: "rgb(20, 20, 20)",
    border: "rgb(50, 50, 50)",
    card: "rgb(30, 30, 30)",
    cta: "rgb(90, 150, 80)",
  },
  red: {
    background: "rgb(30, 10, 20)",
    border: "rgb(70, 40, 50)",
    card: "rgb(50, 20, 30)",
    cta: "rgb(255, 80, 110)",
  },

  // Environmental Themes

  desert: {
    background: "rgb(240, 220, 180)",
    border: "rgb(200, 170, 130)",
    card: "rgb(255, 245, 220)",
    cta: "rgb(180, 100, 30)",
  },
  ocean: {
    background: "rgb(10, 30, 40)",
    border: "rgb(30, 70, 90)",
    card: "rgb(20, 50, 70)",
    cta: "rgb(0, 140, 190)",
  },
  sunset: {
    background: "rgb(255, 245, 230)",
    border: "rgb(255, 200, 160)",
    card: "rgb(255, 250, 240)",
    cta: "rgb(255, 130, 10)",
  },

  // Futuristic / Creative Themes
  darktech: {
    background: "rgb(15, 15, 20)",
    border: "rgb(40, 40, 50)",
    card: "rgb(25, 25, 30)",
    cta: "rgb(100, 255, 180)",
  },
  quantum: {
    background: "rgb(10, 10, 15)",
    border: "rgb(30, 30, 45)",
    card: "rgb(20, 20, 30)",
    cta: "rgb(0, 180, 180)",
  },
  infrauv: {
    background: "rgb(15, 5, 25)",
    border: "rgb(60, 10, 80)",
    card: "rgb(35, 15, 55)",
    cta: "rgb(255, 0, 130)",
  },
  midnight: {
    background: "rgb(10, 10, 50)",
    border: "rgb(20, 20, 70)",
    card: "rgb(30, 30, 90)",
    cta: "rgb(170, 190, 220)",
  },

  // Accessibility Theme
  highcontrast: {
    background: "rgb(0, 0, 0)",
    border: "rgb(255, 255, 255)",
    card: "rgb(0, 0, 0)",
    cta: "rgb(255, 255, 0)",
  },
};

const themes = Object.keys(themeColors);

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  const [expanded, setExpanded] = useState(false);

  // On mount, read from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("app-theme");
    if (saved && theme !== saved) {
      setTheme(saved);
    }
  }, [setTheme, theme]);

  // Whenever `theme` prop changes, write it into localStorage
  useEffect(() => {
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  return (
    <div className="flex flex-col w-full select-none">
      {/* Toggle header */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls="theme-switcher-panel"
        className="flex items-center justify-between w-full px-3 py-2 font-semibold  text-[rgb(var(--copy-secondary))] hover:text-[rgb(var(--card))] hover:bg-[rgba(var(--cta),0.3)] cursor-pointer rounded-full transition-colors duration-300 ease-in-out"
      >
        <div className="flex items-center">
          <SwatchBook className="w-5 h-5 text-[rgb(var(--cta))] mr-1" />
          <span>Theme</span>
        </div>
        <svg
          className={`w-5 h-5 ml-auto transition-transform duration-300 ${
            expanded ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible panel */}
      <div
        className={`mt-2 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          expanded ? "max-h-96" : "max-h-0"
        }`}
      >
        <div id="theme-switcher-panel" className="grid grid-cols-4 gap-1">
          {themes.map((t) => {
            const colors = themeColors[t];
            const isActive = theme === t;
            const isHighContrast = t === "highcontrast";

            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                aria-label={`Select ${t} theme`}
                className={`
        relative w-full aspect-square rounded transition-colors duration-200
        border
        ${isActive ? "border-cta p-[2px]" : "border-border hover:border-cta"}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-1
      `}
              >
                {/* Four‐color preview inside */}
                <div
                  className="absolute inset-1 flex space-x-1 rounded overflow-hidden"
                  style={{ pointerEvents: "none" }}
                >
                  <div
                    className="flex-1 rounded"
                    style={{ backgroundColor: colors.background }}
                    title="Background"
                  />
                  <div
                    className="flex-1 rounded"
                    style={{ backgroundColor: colors.card }}
                    title="Card"
                  />
                  <div
                    className="flex-1 rounded"
                    style={{ backgroundColor: colors.border }}
                    title="Border"
                  />
                  <div
                    className="flex-1 rounded"
                    style={{ backgroundColor: colors.cta }}
                    title="CTA"
                  />
                </div>

                {/* Add high contrast icon if applicable */}
                {isHighContrast && (
                  <Eye
                    className="absolute top-1 right-1 w-5 h-5 bg-gray-100 rounded-full text-black drop-shadow"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
