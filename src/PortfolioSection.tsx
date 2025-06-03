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
    title: "PixelPerfect UI Kit",
    description:
      "A design system focused on accessibility, pixel precision, and performance.",
    techStack: ["React", "TypeScript", "TailwindCSS", "Storybook"],
    demoUrl: "https://example.com/pixelperfect",
    repoUrl: "https://github.com/username/pixelperfect-ui",
    imageSrc:
      "https://blitapp.com/blog/articles/automated-website-screenshots-for-your-business/blit_shots.png",
  },
  {
    id: "proj2",
    title: "Performance Optimizer",
    description:
      "Tooling and techniques to boost frontend web app speed and SEO.",
    techStack: ["Next.js", "Vercel", "Lighthouse", "React Profiler"],
    demoUrl: "https://example.com/performance",
    repoUrl: "https://github.com/username/performance-optimizer",
    imageSrc:
      "https://www.sliderrevolution.com/wp-content/uploads/2021/09/Digeco.jpg",
  },
  {
    id: "proj3",
    title: "Accessibility Toolkit",
    description:
      "Set of utilities to improve web accessibility and compliance with WCAG.",
    techStack: ["React", "ARIA", "Jest", "Cypress"],
    demoUrl: "https://example.com/accessibility",
    repoUrl: "https://github.com/username/accessibility-toolkit",
    imageSrc:
      "https://www.sliderrevolution.com/wp-content/uploads/2021/09/Jumpx.jpg",
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
            className={`flex flex-col md:flex-row items-center bg-card border border-border rounded-2xl overflow-hidden shadow-md ${
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            }`}
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
              <h3 className=" text-2xl font-semibold text-copy">
                {project.title}
              </h3>
              <p className="mt-2  text-copy">{project.description}</p>

              {/* Tech Stack Badges */}
              <div className="mt-4 flex flex-wrap">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block text-sm text-copy-secondary border border-border rounded-full py-1 px-2 mr-2 mb-2"
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
                  className="inline-flex items-center text-cta hover:text-cta-active transition text-sm font-medium"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink size={16} className="mr-2 stroke-[2]" />
                  Live Demo
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cta hover:text-cta-active transition text-sm font-medium"
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
