import { useState } from "react";
import { TerminalSquare } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  VscLayoutPanelCenter,
  VscLayoutPanelLeft,
  VscLayoutPanelRight,
} from "react-icons/vsc";

const code = `// skills.js

/**
 * Core skills organized by domain
 */
const skills = [
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
 * @param {string} category - One of: "Frontend", "Backend", "Networking"
 * @returns {string[]} Array of skill names
 */
function getSkillsByCategory(category) {
  return skills
    .filter((skill) => skill.category === category)
    .map((skill) => skill.name);
}

// Example usage:
console.log("Frontend Skills:", getSkillsByCategory("Frontend"));
console.log("Backend Skills:", getSkillsByCategory("Backend"));
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
      <header
        className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 rounded-t-xl select-none text-[0.85em] font-semibold tracking-wide"
        style={{
          backgroundColor: "#44475a",
          color: "#6272a4",
          letterSpacing: "0.04em",
        }}
      >
        {/* macOS window controls on left */}
        <div className="flex items-center space-x-2">
          {/* red, yellow, green circles */}
          <span
            aria-label="Close"
            className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer"
          />
          <span
            aria-label="Minimize"
            className="w-3 h-3 rounded-full bg-[#ffbd2e] cursor-pointer"
          />
          <span
            aria-label="Maximize"
            className="w-3 h-3 rounded-full bg-[#27c93f] cursor-pointer"
          />
        </div>

        {/* Terminal icon + file name */}
        <div className="flex items-center space-x-2 flex-grow justify-center">
          <TerminalSquare size={16} className="text-purple-400 flex-shrink-0" />
          <span className="text-sm sm:text-base" style={{ color: "#f8f8f2" }}>
            skills.js — Visual Studio Code
          </span>
        </div>

        {/* Layout panel icons on right */}
        <div
          className="flex space-x-2 cursor-default"
          style={{ color: "#6272a4" }}
          aria-hidden="true"
        >
          <VscLayoutPanelLeft size={14} />
          <VscLayoutPanelCenter size={14} />
          <VscLayoutPanelRight size={14} />
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
          skills.js
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

        <div
          className={`transition-opacity duration-300 ease-in-out rounded-md shadow-xl ring-1 ring-black/10 overflow-hidden ${
            showTerminal ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            backgroundColor: "#282a36",
            color: "#f8f8f2",
            fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: "calc(var(--user-font-size, 1em) * 0.85)",
            lineHeight: 1.6,
            letterSpacing: "0.02em",
          }}
          aria-live="polite"
        >
          {/* Terminal Header */}
          <div
            className="flex items-center h-8 px-3 border-b border-[rgba(255,255,255,0.1)] bg-[#21222C]"
            style={{ fontSize: "0.75rem" }}
          >
            <div className="flex space-x-2 mr-4">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-400">bash — 80x24</span>
          </div>

          {/* Terminal Body */}
          <div
            className="overflow-y-auto px-4 py-3 scroll-smooth scrollbar-hide"
            style={{ maxHeight: "22vh", whiteSpace: "pre-wrap" }}
          >
            <div className="space-y-1 select-text text-sm">
              <div>
                <span className="text-[#50fa7b]">aj@dev-machine</span>
                <span className="text-white">:</span>
                <span className="text-[#8be9fd]">~/projects/portfolio</span>
                <span className="text-white">$</span>{" "}
                <span className="text-white">node skills.ts</span>
              </div>
              <div>
                <span className="text-[#f1fa8c]">Frontend Skills</span>:{" "}
                {`['React.js', 'TypeScript', 'Tailwind CSS']`}
              </div>
              <div>
                <span className="text-[#f1fa8c]">Backend Skills</span>:{" "}
                {`['Node.js', 'Express.js', 'RESTful API Design']`}
              </div>
              <div>
                <span className="text-[#f1fa8c]">Networking Skills</span>:{" "}
                {`['TCP/IP Fundamentals', 'Subnetting & VLAN Configuration', 'Network Security (Firewalls, VPNs)']`}
              </div>
              <div>
                <span className="text-[#50fa7b]">aj@dev-machine</span>
                <span className="text-white">:</span>
                <span className="text-[#8be9fd]">~/projects/portfolio</span>
                <span className="text-white">$</span>{" "}
                <span className="text-white blink">█</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSnippet;
