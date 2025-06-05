import React from "react";
import { ExternalLink } from "lucide-react";
import { DiGithub } from "react-icons/di";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl: string;
  repoUrl: string;
  imageSrc: string;
}

const projects: Project[] = [
  {
    id: "proj1",
    title: "Explore Parks",
    description:
      "A sophisticated trip planner for U.S. National Parks, crafted to help users effortlessly discover, organize, and customize their outdoor adventures with an intuitive React and TypeScript-powered interface.",
    techStack: ["React", "TypeScript", "TailwindCSS", "Storybook"],
    demoUrl: "https://example.com/pixelperfect",
    repoUrl: "https://github.com/username/pixelperfect-ui",
    imageSrc: "/images/nps.png",
  },
  {
    id: "proj2",
    title: "Skate Spot Social",
    description:
      "A dynamic React Native app where skateboarding enthusiasts can discover local skate spots, share photos and posts, and connect with the community—all optimized for seamless performance and smooth user experience.",
    techStack: ["React Native", "Expo", "Firebase", "React Navigation"],
    demoUrl: "https://example.com/skatespot-social",
    repoUrl: "https://github.com/username/skatespot-social",
    imageSrc: "/images/skate-social.png",
  },
  {
    id: "proj3",
    title: "OKC Clean Skateparks",
    description:
      "A localized platform connecting Oklahoma City skate park enthusiasts with upcoming cleanup events and community initiatives. Users can discover park details, stay informed through event notifications, and subscribe to newsletters tailored specifically for the OKC skateboarding community.",
    techStack: ["React", "ARIA", "Jest", "Cypress"],
    demoUrl: "https://example.com/accessibility",
    repoUrl: "https://github.com/username/accessibility-toolkit",
    imageSrc: "/images/okcs.png",
  },
];

const PortfolioSection: React.FC = () => {
  return (
    <section
      className="flex flex-col gap-24 w-full"
      style={{ fontSize: "var(--user-font-size)" }}
    >
      {projects.map((project, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <article
            key={project.id}
            className={`
              flex flex-col md:flex-row items-center gap-8
              ${isEven ? "" : "md:flex-row-reverse"}
              rounded-2xl overflow-hidden bg-[rgb(var(--card))]
              border border-[rgb(var(--border))]
              shadow-[0_4px_20px_rgba(0,0,0,0.05)]
            `}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 h-64 md:h-96 overflow-hidden">
              <img
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-[rgb(var(--copy))]">
              <h3 className="text-[calc(var(--user-font-size)*1.8)] font-bold leading-snug">
                {project.title}
              </h3>
              <p className="mt-4 leading-relaxed text-[rgb(var(--copy-secondary))]">
                {project.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="px-3 py-1 text-xs border border-[rgb(var(--border))] rounded-full bg-[rgba(var(--border),0.05)] text-[rgb(var(--copy-secondary))]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-4 flex-wrap">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[rgb(var(--cta))] hover:text-[rgb(var(--cta-active))] transition"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={16} className="stroke-[2]" />
                  Live Demo
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[rgb(var(--cta))] hover:text-[rgb(var(--cta-active))] transition"
                  aria-label={`View GitHub repository of ${project.title}`}
                >
                  <DiGithub size={18} className="stroke-[2]" />
                  Source Code
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default PortfolioSection;
