import React from "react";
import { ExternalLink, Github } from "lucide-react";

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
      "A US National Parks trip planner. Built with React.ts, Tailwind, Vite, and Node.js. Utilizes the US National Parks REST API. Users can save various parks to an itenerary and view details of their trip, such as how the weather will be, how many days/nights, how many total miles, and more.",
    techStack: ["React", "TypeScript", "TailwindCSS", "REST API"],
    demoUrl: "https://nps-parks.netlify.app/",
    repoUrl: "https://github.com/ajSeadler/tw-layout",
    imageSrc: "/images/nps.png",
  },
  {
    id: "proj2",
    title: "sesh.",
    description:
      "A dynamic React Native app where skateboarding enthusiasts can discover local skate spots, share photos and posts, and connect with the community.",
    techStack: ["React Native", "Expo", "Postgres", "React Navigation"],
    demoUrl: "https://example.com/skatespot-social",
    repoUrl: "https://github.com/username/skatespot-social",
    imageSrc: "/images/skate-social.png",
  },
  {
    id: "proj3",
    title: "OKC Clean Skateparks",
    description:
      "A localized platform connecting Oklahoma City skate park enthusiasts with upcoming cleanup events and community initiatives. Users can discover park details, stay informed through event notifications, and subscribe to newsletters tailored specifically for the OKC skateboarding community.",
    techStack: ["React.ts", "Tailwind", "Node.js"],
    demoUrl: "https://example.com/accessibility",
    repoUrl: "https://github.com/username/accessibility-toolkit",
    imageSrc: "/images/okcs-new.png",
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
              flex flex-col md:flex-row items-stretch gap-8
              ${isEven ? "" : "md:flex-row-reverse"}
              rounded-2xl overflow-hidden bg-[rgb(var(--card))]
              border border-[rgb(var(--border))]
              shadow-sm hover:shadow-md
              transition-all duration-300
            `}
          >
            {/* Image Container */}
            <div className="w-full md:w-1/2 h-64 md:h-[400px] overflow-hidden">
              <img
                src={project.imageSrc}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Container */}
            <div className="w-full md:w-1/2 p-5 flex flex-col justify-center text-[rgb(var(--copy))]">
              <h3 className="text-[calc(var(--user-font-size)*1.75)] font-bold leading-tight mb-4 text-[rgb(var(--cta))]">
                {project.title}
              </h3>
              <p className="text-[rgb(var(--copy-secondary))] leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-[rgb(var(--copy-secondary))] mb-3">
                  TECH STACK
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="px-3 py-1 text-sm border border-[rgb(var(--border))] rounded-md bg-[rgb(var(--card))] text-[rgb(var(--copy-secondary))] font-medium"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-auto">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-[rgb(var(--background))] bg-[rgb(var(--cta))] rounded-md hover:bg-[rgb(var(--cta-active))] transition-colors"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={16} className="stroke-[2]" />
                  Live Demo
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-[rgb(var(--cta))] border border-[rgb(var(--border))] rounded-md hover:border-[rgb(var(--cta))] transition-colors"
                  aria-label={`View GitHub repository of ${project.title}`}
                >
                  <Github size={16} className="stroke-[2]" />
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
