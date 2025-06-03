import React, { useState, useEffect, useCallback } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
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

// Utility easing cubic-bezier for smooth transitions
const easing = "cubic-bezier(0.4, 0, 0.2, 1)";

const ProjectCard = ({
  project,
  isActive,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  rotation,
  translateY,
  zIndex,
}: {
  project: Project;
  isActive: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  rotation: string;
  translateY: string;
  zIndex: number;
}) => {
  // For subtle parallax effect on mouse move inside active card
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffsetX(x * 0.05);
    setOffsetY(y * 0.05);
  };

  const handleMouseLeave = () => {
    setOffsetX(0);
    setOffsetY(0);
    onMouseLeave();
  };

  return (
    <article
      tabIndex={0}
      aria-labelledby={`${project.id}-title`}
      aria-describedby={`${project.id}-desc`}
      aria-expanded={isActive}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`cursor-pointer select-text rounded-3xl border backdrop-blur-[28px] shadow-lg
        focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(var(--cta),0.5)] focus-visible:ring-offset-2
        transition-transform duration-500 ${easing} relative overflow-hidden
        max-w-[400px]
        md:max-w-[380px]
        `}
      style={{
        zIndex,
        borderColor: isActive ? "rgb(var(--cta))" : "rgba(var(--cta),0.3)",
        boxShadow: isActive
          ? `
            0 30px 60px rgba(var(--cta), 0.6),
            inset 0 0 40px rgba(var(--cta), 0.2),
            0 0 20px 3px rgba(var(--cta), 0.35)
          `
          : "0 12px 24px rgba(var(--cta), 0.18)",
        transformOrigin: "center bottom",
        // On mobile: no rotation or translation or scale for clarity
        transform:
          window.innerWidth >= 768
            ? `
          rotate(${rotation}) translateY(${translateY}) scale(${
                isActive ? 1.15 : 1
              }) translate3d(${offsetX}px, ${offsetY}px, 0)
        `
            : "none",
        backdropFilter: isActive ? "blur(20px)" : "none",
        userSelect: "text",
        marginBottom: window.innerWidth < 768 ? "2.5rem" : undefined,
      }}
    >
      {/* Image with subtle gradient overlay */}
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-2xl shadow-inner relative"
        style={{ boxShadow: "inset 0 0 25px rgb(var(--cta) / 0.15)" }}
      >
        <img
          src={project.imageSrc}
          alt={`Screenshot preview of ${project.title}`}
          className="w-full h-42 object-cover transition-transform duration-700 ease-out"
          loading="lazy"
          style={{
            transform: isActive ? "scale(1.12)" : "scale(1)",
            transitionTimingFunction: easing,
            filter: isActive ? "brightness(1.05)" : "brightness(1)",
          }}
        />
        {isActive && (
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-t-3xl pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(var(--cta),0.35), transparent 60%)",
              mixBlendMode: "screen",
              transition: `opacity 500ms ${easing}`,
              opacity: 1,
            }}
          />
        )}
      </div>

      {/* Content */}
      {/* Content container */}
      <div
        className={`px-6 py-6 select-text transition-all duration-500 ease-out
    ${
      isActive
        ? "opacity-100 max-h-[800px]"
        : "opacity-0 max-h-0 pointer-events-none"
    }
  `}
        style={{
          color: "rgb(var(--cta))",
          letterSpacing: "0.015em",
          userSelect: "text",
        }}
      >
        <h3 id={`${project.id}-title`} className="mb-4 font-bold">
          {project.title}
        </h3>

        <p
          id={`${project.id}-desc`}
          className="mb-6 font-normal text-[rgba(var(--copy-secondary),0.9)] leading-relaxed"
          style={{ letterSpacing: "0.01em" }}
        >
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-3 mb-6" aria-label="Tech stack used">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-gradient-to-tr from-[rgba(var(--cta),0.3)] to-[rgba(var(--cta),0.05)] px-2 py-2 text-[rgb(var(--cta))] font-semibold text-sm shadow-inner"
              style={{
                letterSpacing: "0.02em",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(var(--cta), 0.4)",
              }}
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[rgb(var(--cta))] px-5 py-1.5 text-sm font-medium text-[rgb(var(--cta-text))] shadow-md transition duration-200 hover:bg-[rgb(var(--cta-active))] focus:outline-none focus:ring-2 focus:ring-[rgba(var(--cta),0.45)]"
              aria-label={`View live demo of ${project.title}`}
              style={{
                boxShadow:
                  "0 4px 12px rgb(var(--cta) / 0.25), inset 0 -2px 6px rgb(var(--cta-active) / 0.5)",
                letterSpacing: "0.02em",
              }}
            >
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-[rgb(var(--cta))] px-4 py-1.5 text-sm font-medium text-[rgb(var(--cta))] transition duration-200 hover:bg-[rgb(var(--cta)/0.05)] focus:outline-none focus:ring-2 focus:ring-[rgba(var(--cta),0.25)]"
              aria-label={`View source code of ${project.title}`}
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const PortfolioSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Keyboard navigation: arrow left/right to cycle active card
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activeId) return;
      const currentIndex = projects.findIndex((p) => p.id === activeId);
      if (currentIndex === -1) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % projects.length;
        setActiveId(projects[nextIndex].id);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex =
          (currentIndex - 1 + projects.length) % projects.length;
        setActiveId(projects[prevIndex].id);
      }
    },
    [activeId]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section
      aria-label="Portfolio projects"
      className="max-w-7xl mx-auto px-6 md:px-12 py-24 select-none"
      style={{
        fontSize: "var(--user-font-size)",
        fontFamily:
          "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "rgb(var(--copy-primary))",
        lineHeight: 1.5,
        backgroundColor: "rgb(var(--background))",
      }}
    >
      {/* On desktop, grid with overlapping cards and rotation */}
      {/* On mobile, stack cards vertically without rotation */}
      <div
        className="relative flex flex-col md:grid md:grid-cols-[repeat(3,minmax(0,1fr))] md:gap-12 items-center justify-center"
        style={{
          perspective: "1200px",
        }}
      >
        {projects.map((project, index) => {
          const isActive = activeId === project.id;

          // Compute desktop card transforms for overlapping effect
          // Positions are symmetrical around the active card
          let rotation = "0deg";
          let translateY = "0px";
          let zIndex = 10;

          if (window.innerWidth >= 768) {
            // To keep consistent with number of projects 3 here
            if (index === projects.findIndex((p) => p.id === activeId)) {
              rotation = "0deg";
              translateY = "-20px";
              zIndex = 30;
            } else if (
              index ===
              (projects.findIndex((p) => p.id === activeId) + 1) %
                projects.length
            ) {
              rotation = "7deg";
              translateY = "10px";
              zIndex = 20;
            } else if (
              index ===
              (projects.findIndex((p) => p.id === activeId) + 2) %
                projects.length
            ) {
              rotation = "-7deg";
              translateY = "10px";
              zIndex = 20;
            }
          } else {
            rotation = "0deg";
            translateY = "0px";
            zIndex = 10;
          }

          return (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={isActive}
              onFocus={() => setActiveId(project.id)}
              onBlur={() => setActiveId(null)}
              onMouseEnter={() => setActiveId(project.id)}
              onMouseLeave={() => setActiveId(null)}
              rotation={rotation}
              translateY={translateY}
              zIndex={zIndex}
            />
          );
        })}
      </div>

      {/* Hint for keyboard navigation */}
      <p className="mt-12 text-center select-text text-[rgba(var(--copy-secondary),0.8)] text-sm pt-10">
        Use{" "}
        <kbd className="rounded bg-[rgba(var(--cta),0.15)] px-2 py-1">←</kbd>{" "}
        and{" "}
        <kbd className="rounded bg-[rgba(var(--cta),0.15)] px-2 py-1">→</kbd>{" "}
        keys to navigate projects.
      </p>
    </section>
  );
};

export default PortfolioSection;
