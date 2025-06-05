import React from "react";
import GithubStats from "../GithubStats";
import { Mail } from "lucide-react";
import GithubCallout from "../GithubCallout";

const roles = [
  "Full-Stack Developer",
  "Cybersecurity Enthusiast",
  "Network Engineer",
  "Tech Learner",
];

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "TailwindCSS",
  "Docker",
  "PostgreSQL",
  "Networking",
  "Cybersecurity",
  "CI/CD",
];

const AboutMePage: React.FC = () => {
  return (
    <main
      className="overflow-x-hidden min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--copy))] px-4 sm:px-6 md:px-12 py-12 sm:py-16"
      style={{ fontSize: "var(--user-font-size)" }}
    >
      <section className="w-full max-w-2xl mx-auto space-y-8 sm:space-y-10">
        {/* ── Title */}
        <h1 className="w-full text-[1.75em] sm:text-[2.25em] md:text-[2.75em] font-extrabold tracking-tight text-center leading-tight">
          About Me
        </h1>

        {/* ── Roles */}
        <div className="w-full flex flex-wrap justify-center gap-1 sm:gap-2">
          {roles.map((role) => (
            <span
              key={role}
              className="px-1.5 py-0.5 text-[0.7rem] sm:text-[0.85rem] font-semibold text-[rgb(var(--copy-secondary))] bg-[rgba(var(--cta),0.2)] border border-[rgb(var(--border))] rounded-full"
            >
              {role}
            </span>
          ))}
        </div>

        {/* ── Bio */}
        <div className="w-full space-y-3 text-[rgb(var(--copy-secondary))] leading-relaxed text-[0.875rem] sm:text-base">
          <p>
            I’m a full-stack developer and cybersecurity enthusiast who builds
            scalable, secure applications. Currently pursuing my cybersecurity
            bachelor’s while honing skills in React, Node.js, and network
            security.
          </p>
          <p>
            When I’m not coding or studying, you’ll find me skating, exploring
            national parks, or digging into the latest tech trends.
          </p>
        </div>

        {/* ── Technical Skills */}
        <div className="w-full">
          <h2 className="text-[1.25em] sm:text-[1.5em] font-semibold mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-1.5 py-0.5 text-[0.7rem] sm:text-[0.85rem] font-semibold text-[rgb(var(--copy-secondary))] bg-[rgba(var(--cta),0.2)] border border-[rgb(var(--border))] rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ── Contact Button + Callout */}
        <div className="w-full flex flex-col items-center space-y-3">
          <a
            href="mailto:your.email@example.com"
            className="inline-flex items-center gap-2 bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--background))] px-4 py-2 rounded-full shadow-md transition text-[0.9rem] sm:text-base font-medium"
            aria-label="Contact me via email"
          >
            <Mail className="w-5 h-5 stroke-[3]" />
            <span>Contact Me</span>
          </a>
          <GithubCallout />
        </div>

        {/* ── Divider */}
        <hr className="border-[rgb(var(--border))] my-6" />

        {/* ── GitHub Stats */}
      </section>
      <GithubStats />
    </main>
  );
};

export default AboutMePage;
