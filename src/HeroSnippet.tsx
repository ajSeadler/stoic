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
                ? "bg-[var(--bg-card)] text-[var(--copy)] border-b-2 border-[rgb(var(--cta))]"
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
 * Core skills organized by domain
 */
interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Networking";
}

const skills: Skill[] = [
  // Frontend Development
  { name: "React.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },

  // Backend Development
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "RESTful API Design", category: "Backend" },

  // Networking & Infrastructure
  { name: "TCP/IP Fundamentals", category: "Networking" },
  { name: "Subnetting & VLAN Configuration", category: "Networking" },
  { name: "Network Security (Firewalls, VPNs)", category: "Networking" },
];

/**
 * Returns skill names filtered by category.
 */
export function getSkillsByCategory(category: Skill["category"]): string[] {
  return skills
    .filter((skill) => skill.category === category)
    .map((skill) => skill.name);
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
            <div>Frontend Skills: React.js, TypeScript, Tailwind CSS</div>
            <div>Backend Skills: Node.js, Express.js, RESTful API Design</div>
            <div>
              Networking Skills: TCP/IP Fundamentals, Subnetting &amp; VLAN
              Configuration, Network Security (Firewalls, VPNs)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSnippet;
