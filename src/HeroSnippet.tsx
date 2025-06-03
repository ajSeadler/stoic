import { useState } from "react";
import { TerminalSquare, X, Minus, Square } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const code = `// skills.ts

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
`;

const HeroSnippet = () => {
  const [showTerminal, setShowTerminal] = useState(true);

  return (
    <div
      className="
        overflow-x-hidden
        rounded-xl border shadow-xl mx-auto font-mono select-text 
        w-full max-w-full bg-[#282a36] border-[#6272a4] text-[#f8f8f2] 
        flex flex-col min-h-0
      "
      style={{
        fontSize: "var(--user-font-size, 1em)",
        boxShadow:
          "0 15px 40px -10px rgba(0, 0, 0, 0.7), 0 6px 10px -4px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Title Bar */}
      <header
        className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 rounded-t-xl select-none text-[0.85em] font-semibold tracking-wide"
        style={{
          backgroundColor: "#44475a",
          color: "#6272a4",
          letterSpacing: "0.04em",
        }}
      >
        <div className="flex items-center space-x-2">
          <TerminalSquare size={16} className="text-purple-400 flex-shrink-0" />
          <span
            className="ml-1 text-sm sm:text-base"
            style={{ color: "#f8f8f2" }}
          >
            skills.ts — Visual Studio Code
          </span>
        </div>
        <div
          className="flex space-x-2 cursor-default"
          style={{ color: "#6272a4" }}
          aria-hidden="true"
        >
          <Minus size={14} />
          <Square size={14} />
          <X size={14} />
        </div>
      </header>

      {/* Tabs */}
      <nav
        className="flex border-b overflow-x-auto"
        style={{ backgroundColor: "#44475a", borderColor: "#6272a4" }}
        aria-label="File tabs"
      >
        <button
          type="button"
          className="px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap focus:outline-none"
          aria-current="page"
          style={{
            backgroundColor: "#282a36",
            color: "#f8f8f2",
            borderBottom: "2px solid #ff79c6",
          }}
        >
          skills.ts
        </button>
      </nav>

      {/* Code & Terminal Container */}
      <section className="relative flex flex-col flex-grow min-h-0">
        {/* Code block container */}
        <div
          className="overflow-y-auto p-3 sm:p-5 flex-grow min-h-0 w-full"
          style={{ maxHeight: showTerminal ? "45vh" : "65vh" }}
        >
          <SyntaxHighlighter
            language="typescript"
            style={dracula}
            wrapLongLines={true}
            wrapLines={true}
            lineProps={{
              style: { whiteSpace: "pre-wrap", wordBreak: "break-word" },
            }}
            customStyle={{
              background: "transparent",
              fontSize: "calc(var(--user-font-size, 1em) * 0.85)",
              padding: 0,
              margin: 0,
              fontFamily: "var(--font-mono, monospace)",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        {/* Terminal Toggle Bar */}
        <div
          className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 border-t select-none cursor-default"
          style={{
            backgroundColor: "#282a36",
            borderColor: "#6272a4",
            color: "#6272a4",
            fontSize: "0.75em",
            letterSpacing: "0.1em",
            fontWeight: 600,
          }}
        >
          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors duration-200 focus:outline-none"
            aria-pressed={showTerminal}
          >
            <TerminalSquare size={16} />
            <span className="text-xs sm:text-sm">
              {showTerminal ? "Hide Terminal" : "Run"}
            </span>
          </button>
          <span
            className="tracking-widest opacity-50 select-none text-xs sm:text-sm"
            style={{ color: "#6272a4" }}
          >
            TERMINAL
          </span>
        </div>

        {/* Terminal Output */}
        <div
          className={`overflow-y-auto px-3 sm:px-5 py-3 border-t transition-opacity duration-300 ease-in-out ${
            showTerminal ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            borderColor: "#6272a4",
            backgroundColor: "#282a36",
            color: "#f8f8f2",
            fontSize: "calc(var(--user-font-size, 1em) * 0.85)",
            fontFamily: "monospace",
            lineHeight: 1.6,
            letterSpacing: "0.03em",
            whiteSpace: "pre-wrap",
            maxHeight: "18vh",
          }}
          aria-live="polite"
        >
          <div className="space-y-1 select-text text-[0.9em] sm:text-[1em]">
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
