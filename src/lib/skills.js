// skills.js

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
console.log("Networking Skills:", getSkillsByCategory("Networking"));
console.log("Backend Skills:", getSkillsByCategory("Backend"));
