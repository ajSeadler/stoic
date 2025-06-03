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
    <section className="flex flex-col gap-16 w-full">
      {projects.map((project, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <div
            key={project.id}
            className={`
              flex flex-col md:flex-row items-center
              bg-[rgb(var(--card))]
              border border-[rgb(var(--border))]
              rounded-2xl overflow-hidden shadow-md
              ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
            `}
          >
            {/* Project Image */}
            <div className="w-full md:w-1/2 h-48 md:h-auto flex-shrink-0">
              <img
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Content */}
            <div className="w-full md:w-1/2 p-6 flex flex-col">
              <h3 className="text-2xl font-semibold text-[rgb(var(--copy))]">
                {project.title}
              </h3>
              <p className="mt-2 text-[rgb(var(--copy))]">
                {project.description}
              </p>

              {/* Tech Stack Badges */}
              <div className="mt-4 flex flex-wrap">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block text-sm text-[rgb(var(--copy-secondary))] border border-[rgb(var(--border))] rounded-full py-1 px-2 mr-2 mb-2"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[rgb(var(--cta))] hover:text-[rgb(var(--cta-active))] transition text-sm font-medium"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={16} className="mr-2 stroke-[2]" />
                  Live Demo
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[rgb(var(--cta))] hover:text-[rgb(var(--cta-active))] transition text-sm font-medium"
                  aria-label={`View GitHub repository of ${project.title}`}
                >
                  <DiGithub size={16} className="mr-2 stroke-[2]" />
                  Source Code
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default PortfolioSection;
