import { useState } from "react";
import { TerminalSquare, X, Minus, Square } from "lucide-react";

const HeroSnippet = () => {
  const [showTerminal, setShowTerminal] = useState(true);

  return (
    <div
      className="rounded-xl border shadow-xl mx-auto font-mono select-text"
      style={{
        fontSize: "var(--user-font-size)",
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        color: "var(--copy)",
        boxShadow:
          "0 10px 30px -10px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
      }}
    >
      {/* Title Bar */}
      <header
        className="flex items-center justify-between px-4 py-2 rounded-t-xl"
        style={{
          backgroundColor: "var(--bg-card-alt)",
          color: "var(--copy-secondary)",
          userSelect: "none",
          fontWeight: 600,
          fontSize: "0.85rem",
          letterSpacing: "0.04em",
        }}
      >
        <div className="flex items-center space-x-3">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#f56565" }}
            aria-label="Close"
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#ecc94b" }}
            aria-label="Minimize"
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "#48bb78" }}
            aria-label="Maximize"
          />
          <span
            className="ml-5 tracking-wide font-semibold select-text"
            style={{ color: "var(--copy)" }}
          >
            skills.ts - Visual Studio Code
          </span>
        </div>
        <div
          className="flex space-x-3 opacity-60 cursor-default"
          style={{ color: "var(--copy-secondary)" }}
          aria-hidden="true"
        >
          <Minus size={14} />
          <Square size={14} />
          <X size={14} />
        </div>
      </header>

      {/* Tabs */}
      <nav
        className="flex bg-[var(--bg-card-alt)] border-b border-[var(--border)]"
        aria-label="File tabs"
      >
        {["skills.ts"].map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={`flex-1 px-5 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 focus:outline-none ${
              i === 0
                ? "bg-[var(--bg-card)] text-[var(--copy)] border-b-2 border-green-500 shadow-[inset_0_-2px_0_0_rgb(72,187,120)]"
                : "text-[var(--copy-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--copy)]"
            }`}
            aria-current={i === 0 ? "page" : undefined}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Code & Terminal Container */}
      <section
        className={`relative flex flex-col transition-all duration-300 ease-in-out ${
          showTerminal ? "h-[420px]" : "h-[520px]"
        }`}
      >
        {/* Code block */}
        <pre
          className="flex-1 overflow-y-auto p-6 font-mono whitespace-pre-wrap leading-relaxed"
          style={{
            fontSize: "calc(var(--user-font-size) * 0.75)",
            color: "var(--copy)",
            backgroundColor: "var(--bg-card)",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            userSelect: "text",
            margin: 0,
          }}
        >
          {`// skills.ts

/**
 * Core skills split by domain
 */
interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Networking";
}

const skills: Skill[] = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Performance Optimization", category: "Backend" },
  { name: "Network Protocols", category: "Networking" },
  { name: "STP (Spanning Tree Protocol)", category: "Networking" },
  { name: "UDP Cable Configuration", category: "Networking" },
];

/**
 * Returns skills filtered by category.
 */
export function getSkillsByCategory(category: Skill["category"]): string[] {
  return skills.filter(skill => skill.category === category).map(skill => skill.name);
}

// Example usage:
console.log("Frontend Skills:", getSkillsByCategory("Frontend"));
console.log("Networking Skills:", getSkillsByCategory("Networking"));
`}
        </pre>

        {/* Terminal Toggle Bar */}
        <div
          className="flex items-center justify-between px-5 py-2 border-t select-none cursor-default"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            color: "var(--copy-secondary)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            fontWeight: 600,
            userSelect: "none",
          }}
        >
          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className="inline-flex items-center space-x-2 text-green-500 hover:text-green-400 transition-colors duration-200 focus:outline-none"
            aria-pressed={showTerminal}
          >
            <TerminalSquare size={16} />
            <span>{showTerminal ? "Hide Terminal" : "Run"}</span>
          </button>
          <span className="tracking-widest opacity-50 select-none">
            TERMINAL
          </span>
        </div>

        {/* Terminal Output */}
        <div
          className={`overflow-y-auto px-6 py-4 border-t transition-opacity duration-300 ease-in-out ${
            showTerminal
              ? "opacity-100 h-36"
              : "opacity-0 h-0 pointer-events-none"
          }`}
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-card)",
            color: "var(--copy)",
            fontSize: "calc(var(--user-font-size) * 0.75)",
            fontFamily: "monospace",
            lineHeight: 1.5,
            userSelect: "text",
            letterSpacing: "0.03em",
          }}
          aria-live="polite"
        >
          <div className="space-y-1 select-text">
            <div>Frontend Skills: React, TypeScript, CSS</div>
            <div>
              Backend Skills: Node.js, Express, Performance Optimization
            </div>
            <div>
              Networking Skills: Network Protocols, STP (Spanning Tree
              Protocol), UDP Cable Configuration
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSnippet;
