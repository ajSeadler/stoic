import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

const DEFAULT_SIZE = 16;

const FontSizeControl = () => {
  const [fontSize, setFontSize] = useState<number>(DEFAULT_SIZE);

  useEffect(() => {
    const saved = localStorage.getItem("user-font-size");
    const size = saved ? parseInt(saved, 10) : DEFAULT_SIZE;
    setFontSize(size);
    document.documentElement.style.setProperty("--user-font-size", `${size}px`);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setFontSize(newSize);
    document.documentElement.style.setProperty(
      "--user-font-size",
      `${newSize}px`
    );
    localStorage.setItem("user-font-size", `${newSize}`);
  };

  const handleReset = () => {
    setFontSize(DEFAULT_SIZE);
    document.documentElement.style.setProperty(
      "--user-font-size",
      `${DEFAULT_SIZE}px`
    );
    localStorage.removeItem("user-font-size");
  };

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-2xl border shadow-sm w-full max-w-sm"
      style={{
        backgroundColor: "rgb(var(--card))",
        borderColor: "rgb(var(--border))",
      }}
    >
      <div className="flex items-center justify-between">
        <h2
          className="text-sm font-semibold"
          style={{ color: "rgb(var(--copy))" }}
        >
          Font Size
        </h2>
        <button
          onClick={handleReset}
          className="flex items-center text-sm gap-1 transition cursor-pointer"
          style={{ color: "rgb(var(--copy-secondary))" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgb(var(--cta))")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgb(var(--copy-secondary))")
          }
          aria-label="Reset font size"
        >
          <RotateCcw size={16} className="stroke-[2.5]" />
          Reset
        </button>
      </div>

      <div className="flex items-center gap-4">
        <input
          id="font-size"
          type="range"
          min={12}
          max={24}
          step={1}
          value={fontSize}
          onChange={handleChange}
          className="w-full cursor-pointer"
          style={{
            accentColor: "rgb(var(--cta))",
          }}
        />
        <span
          className="text-sm w-10 text-right"
          style={{ color: "rgb(var(--copy-secondary))" }}
        >
          {fontSize}px
        </span>
      </div>
    </div>
  );
};

export default FontSizeControl;
