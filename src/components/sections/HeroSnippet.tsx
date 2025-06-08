import { useState } from "react";
import {
  TerminalSquare,
  Code2,
  Layers,
  Sparkles,
  Zap,
  GitBranch,
} from "lucide-react";
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
console.log("Networking Skills:", getSkillsByCategory("Networking"));`;

const PreviewContent = () => {
  const categories = {
    Frontend: ["React.js", "TypeScript", "Tailwind CSS"],
    Backend: ["Node.js", "Express.js", "RESTful API Design"],
    Networking: [
      "TCP/IP Fundamentals",
      "Subnetting & VLAN Configuration",
      "Network Security (Firewalls, VPNs)",
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {Object.entries(categories).map(([category, skills]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-semibold text-[#ff79c6]">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="p-3 rounded-lg bg-[#383a59] border border-[#6272a4] hover:border-[#ff79c6] transition-colors duration-200"
              >
                <span className="text-[#f8f8f2]">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const HeroSnippet = () => {
  const [showTerminal, setShowTerminal] = useState(true);
  const [activeTab, setActiveTab] = useState("code");

  return (
    <div
      className="
        overflow-x-hidden
        rounded-2xl border shadow-2xl mx-auto font-mono select-text 
        w-full max-w-full bg-gradient-to-br from-[#282a36] to-[#1a1b26] border-[#6272a4] text-[#f8f8f2] 
        flex flex-col min-h-0 backdrop-blur-sm relative
      "
      style={{
        fontSize: "var(--user-font-size, 1em)",
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 8px 20px -5px rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 rounded-2xl opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 121, 198, 0.1), transparent 70%)",
          animation: "pulse 8s ease-in-out infinite",
        }}
      />

      <header
        className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 rounded-t-2xl select-none text-[0.85em] font-semibold tracking-wide relative z-10"
        style={{
          background: "linear-gradient(to right, #44475a, #383a59)",
          color: "#6272a4",
          letterSpacing: "0.04em",
        }}
      >
        <div className="flex items-center space-x-2">
          <span
            aria-label="Close"
            className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer hover:opacity-80 transition-all duration-200 hover:scale-110"
          />
          <span
            aria-label="Minimize"
            className="w-3 h-3 rounded-full bg-[#ffbd2e] cursor-pointer hover:opacity-80 transition-all duration-200 hover:scale-110"
          />
          <span
            aria-label="Maximize"
            className="w-3 h-3 rounded-full bg-[#27c93f] cursor-pointer hover:opacity-80 transition-all duration-200 hover:scale-110"
          />
        </div>

        <div className="flex items-center space-x-2 flex-grow justify-center">
          <TerminalSquare size={16} className="text-purple-400 flex-shrink-0" />
          <span
            className="text-sm sm:text-base font-medium"
            style={{ color: "#f8f8f2" }}
          >
            skills.js — Visual Studio Code
          </span>
          <div className="flex items-center space-x-2 ml-2">
            <GitBranch size={12} className="text-[#6272a4]" />
            <span className="text-xs text-[#6272a4]">main</span>
          </div>
        </div>

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

      <nav
        className="flex border-b overflow-x-auto relative z-10"
        style={{ backgroundColor: "#44475a", borderColor: "#6272a4" }}
        aria-label="File tabs"
      >
        <div className="flex space-x-1 px-2">
          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap focus:outline-none rounded-t-lg transition-all duration-200 flex items-center ${
              activeTab === "code"
                ? "bg-[#282a36] text-[#f8f8f2] border-b-2 border-[#ff79c6]"
                : "text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#383a59]"
            }`}
          >
            <Code2 size={14} className="inline-block mr-2" />
            Code
            {activeTab === "code" && (
              <Sparkles
                size={12}
                className="ml-2 text-[#ff79c6] animate-pulse"
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2.5 text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap focus:outline-none rounded-t-lg transition-all duration-200 flex items-center ${
              activeTab === "preview"
                ? "bg-[#282a36] text-[#f8f8f2] border-b-2 border-[#ff79c6]"
                : "text-[#6272a4] hover:text-[#f8f8f2] hover:bg-[#383a59]"
            }`}
          >
            <Layers size={14} className="inline-block mr-2" />
            Preview
            {activeTab === "preview" && (
              <Sparkles
                size={12}
                className="ml-2 text-[#ff79c6] animate-pulse"
              />
            )}
          </button>
        </div>
      </nav>

      <section className="relative flex flex-col flex-grow min-h-0">
        <div
          className="overflow-y-auto p-4 sm:p-6 flex-grow min-h-0 w-full relative z-10"
          style={{ maxHeight: showTerminal ? "45vh" : "65vh" }}
        >
          {activeTab === "code" && (
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
          )}

          {activeTab === "preview" && <PreviewContent />}
        </div>

        <div
          className="flex items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3.5 border-t select-none cursor-default relative z-10"
          style={{
            background: "linear-gradient(to right, #282a36, #383a59)",
            borderColor: "#6272a4",
            color: "#6272a4",
            fontSize: "0.75em",
            letterSpacing: "0.1em",
            fontWeight: 600,
          }}
        >
          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-all duration-200 hover:scale-105 focus:outline-none group"
            aria-pressed={showTerminal}
          >
            <TerminalSquare size={16} className="group-hover:animate-pulse" />
            <span className="text-xs sm:text-sm">
              {showTerminal ? "Hide Terminal" : "Run"}
            </span>
            <Zap
              size={12}
              className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </button>
          <span
            className="tracking-widest opacity-50 select-none text-xs sm:text-sm"
            style={{ color: "#6272a4" }}
          >
            TERMINAL
          </span>
        </div>

        <div
          className={`transition-all duration-300 ease-in-out rounded-b-xl shadow-xl ring-1 ring-black/10 overflow-hidden relative z-10 ${
            showTerminal
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-4 pointer-events-none"
          }`}
          style={{
            background: "linear-gradient(to bottom, #282a36, #1a1b26)",
            color: "#f8f8f2",
            fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: "calc(var(--user-font-size, 1em) * 0.85)",
            lineHeight: 1.6,
            letterSpacing: "0.02em",
          }}
          aria-live="polite"
        >
          <div
            className="flex items-center h-8 px-4 border-b border-[rgba(255,255,255,0.1)]"
            style={{
              background: "linear-gradient(to right, #21222C, #282a36)",
            }}
          >
            <div className="flex space-x-2 mr-4">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-400">bash — 80x24</span>
          </div>

          <div
            className="overflow-y-auto px-5 py-4 scroll-smooth scrollbar-hide"
            style={{ maxHeight: "22vh", whiteSpace: "pre-wrap" }}
          >
            <div className="space-y-1.5 select-text text-sm">
              <div>
                <span className="text-[#50fa7b]">aj@dev-machine</span>
                <span className="text-white">:</span>
                <span className="text-[#8be9fd]">~/projects/portfolio</span>
                <span className="text-white">$</span>{" "}
                <span className="text-white">node skills.js</span>
              </div>
              <div className="text-[#f1fa8c]">
                Frontend Skills: {`['React.js', 'TypeScript', 'Tailwind CSS']`}
              </div>
              <div className="text-[#f1fa8c]">
                Backend Skills:{" "}
                {`['Node.js', 'Express.js', 'RESTful API Design']`}
              </div>
              <div className="text-[#f1fa8c]">
                Networking Skills:{" "}
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

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};

export default HeroSnippet;
