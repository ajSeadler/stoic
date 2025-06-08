import { Home, User, Briefcase, Menu, X, BookOpenIcon } from "lucide-react";
import ThemeSwitcher from "../common/ThemeSwitcher";
import FontSizeControl from "../common/FontSizeControl";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RiLayoutLeftLine,
  RiLayoutRightLine,
  RiLayoutTopLine,
  RiLayoutBottomLine,
} from "react-icons/ri";

interface AppSidebarProps {
  theme: string;
  setTheme: (theme: string) => void;
  collapsed: boolean;
  toggleCollapsed: () => void;
  position: "left" | "right" | "top" | "bottom";
  setPosition: (pos: "left" | "right" | "top" | "bottom") => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  theme,
  setTheme,
  collapsed,
  toggleCollapsed,
  position,
  setPosition,
}) => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", Icon: Home },
    { to: "/about", label: "About Me", Icon: User },
    { to: "/portfolio", label: "Portfolio", Icon: Briefcase },
    { to: "/books", label: "Good Reads", Icon: BookOpenIcon },
  ];

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // "open" = not collapsed
  const desktopOpen = !collapsed;
  const mobileOpen = !collapsed && !isDesktop;

  //
  // Build the wrapper class string based on position + open/collapse + screen size
  //
  let wrapperClass = `
    fixed z-50
    bg-[rgb(var(--card))] border-[rgb(var(--border))] shadow-lg
    flex flex-col transition-all duration-300 ease-in-out overflow-auto
  `;

  if (position === "left") {
    wrapperClass += `
      top-0 left-0 h-full border-r
      ${
        isDesktop
          ? desktopOpen
            ? "w-72 translate-x-0"
            : "w-16 translate-x-0"
          : mobileOpen
          ? "w-full translate-x-0"
          : "w-0 -translate-x-full"
      }
    `;
  } else if (position === "right") {
    wrapperClass += `
      top-0 right-0 h-full border-l
      ${
        isDesktop
          ? desktopOpen
            ? "w-72 translate-x-0"
            : "w-16 translate-x-0"
          : mobileOpen
          ? "w-full translate-x-0"
          : "w-0 translate-x-full"
      }
    `;
  } else if (position === "top") {
    wrapperClass += `
      top-0 left-0 w-full border-b
      ${
        isDesktop
          ? desktopOpen
            ? "h-auto p-2 translate-y-0"
            : "h-16 translate-y-0"
          : mobileOpen
          ? "h-72 translate-y-0"
          : "h-0 -translate-y-full"
      }
      ${collapsed ? "h-16" : ""}
    `;
  } else {
    // position === "bottom"
    wrapperClass += `
      bottom-0 left-0 w-full border-t
      ${
        isDesktop
          ? desktopOpen
            ? "h-auto p-2 translate-y-0"
            : "h-16 translate-y-0"
          : mobileOpen
          ? "h-72 translate-y-0"
          : "h-0 translate-y-full"
      }
      ${collapsed ? "h-16" : ""}
    `;
  }

  // Determine if we're in a horizontal "strip" mode (top/bottom) or a vertical sidebar (left/right)
  const isHorizontal = position === "top" || position === "bottom";

  return (
    <>
      {/* Overlay on mobile, covers entire viewport whenever sidebar is open */}
      {mobileOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-40 bg-black/40"
          onClick={toggleCollapsed}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      <aside aria-label="Primary sidebar" className={wrapperClass}>
        {/* ───────── Header ───────── */}
        <div
          className={`
            flex items-center h-16
            px-4 border-b border-[rgb(var(--border))] select-none
            ${isHorizontal ? "justify-center" : "justify-between"}
          `}
        >
          {/* Show "aj.dev" text only when open (desktopOpen or mobileOpen) */}
          {(desktopOpen || mobileOpen) && (
            <span
              className="text-xl font-bold truncate"
              title="App"
              aria-label="App name"
            >
              aj.dev
            </span>
          )}

          {!isHorizontal && (
            <button
              onClick={toggleCollapsed}
              aria-label={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
              aria-expanded={desktopOpen}
              type="button"
              className="ml-auto p-2 rounded-full hover:bg-[rgba(var(--cta),0.2)] transition-colors"
            >
              {collapsed ? (
                <Menu
                  className="h-6 w-6"
                  style={{ color: "rgb(var(--cta))" }}
                  aria-hidden="true"
                />
              ) : (
                <X
                  className="h-6 w-6"
                  style={{ color: "rgb(var(--cta))" }}
                  aria-hidden="true"
                />
              )}
            </button>
          )}
        </div>

        {/* ───────── Main Content Area ───────── */}
        {(isDesktop || mobileOpen) && (
          <div
            className={`
            ${isHorizontal ? "flex items-center justify-between px-4" : ""}
            ${isHorizontal && collapsed ? "h-16" : "flex-1"}
          `}
          >
            {/* Navigation Links */}
            <nav
              className={`
                ${
                  isHorizontal
                    ? "flex flex-row items-center gap-2"
                    : "mt-6 pt-2"
                }
                ${isHorizontal ? "flex-1" : "flex-1 overflow-y-auto"}
              `}
              aria-label="Primary navigation"
            >
              {links.map(({ to, label, Icon }) => {
                const isActive = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`
                      relative z-10 group flex items-center overflow-hidden m-1
                      ${
                        isHorizontal
                          ? collapsed
                            ? "px-2 py-2"
                            : "px-3 py-2 rounded-full"
                          : collapsed
                          ? "justify-center px-0 py-3"
                          : "px-4 py-3 gap-3 rounded-full mx-2"
                      }
                      transition-colors duration-300 ease-in-out
                      ${
                        isActive
                          ? "bg-[rgb(var(--cta))] text-[rgb(var(--card))] font-semibold shadow-md"
                          : ""
                      }
                      hover:text-[rgb(var(--card))] hover:bg-[rgba(var(--cta),0.3)]
                    `}
                    aria-current={isActive ? "page" : undefined}
                    tabIndex={0}
                  >
                    <Icon
                      className={`h-5 w-5 flex-shrink-0 mr-1${
                        collapsed ? "mx-auto" : ""
                      }`}
                      aria-hidden="true"
                      style={{
                        color: isActive
                          ? "rgb(var(--card))"
                          : "rgb(var(--cta))",
                      }}
                    />
                    {!collapsed && (
                      <span className="font-medium truncate">{label}</span>
                    )}
                    {collapsed && !isHorizontal && (
                      <span
                        className="
                          absolute left-full ml-2 whitespace-nowrap
                          bg-[rgb(var(--cta))] text-[rgb(var(--card))] p-1 rounded-md text-sm
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          pointer-events-none shadow-lg
                        "
                        role="tooltip"
                      >
                        {label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Controls Section */}
            {!collapsed && (
              <div
                className={`
                ${
                  isHorizontal
                    ? "flex items-center gap-4"
                    : "px-4 space-y-4 mb-4"
                }
                ${
                  isHorizontal
                    ? "border-l border-[rgb(var(--border))] pl-2 mt-1"
                    : ""
                }
              `}
              >
                <ThemeSwitcher theme={theme} setTheme={setTheme} />
                <FontSizeControl />
              </div>
            )}

            {/* Position Picker and Toggle (for horizontal) */}
            <div
              className={`
              ${
                isHorizontal
                  ? "flex items-center gap-2"
                  : "flex flex-col items-start gap-3 px-4 py-3 border-t border-[rgb(var(--border))]"
              }
              ${isHorizontal ? "border-l border-[rgb(var(--border))] pl-4" : ""}
            `}
            >
              {isHorizontal && (
                <button
                  onClick={toggleCollapsed}
                  aria-label={
                    desktopOpen ? "Collapse sidebar" : "Expand sidebar"
                  }
                  aria-expanded={desktopOpen}
                  type="button"
                  className="p-2 rounded-full hover:bg-[rgba(var(--cta),0.2)] transition-colors"
                >
                  {collapsed ? (
                    <Menu
                      className="h-6 w-6"
                      style={{ color: "rgb(var(--cta))" }}
                      aria-hidden="true"
                    />
                  ) : (
                    <X
                      className="h-6 w-6"
                      style={{ color: "rgb(var(--cta))" }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              )}

              <button
                onClick={() => setPosition("left")}
                aria-label="Move sidebar to left"
                className={`
                  p-2 rounded-full transition-colors
                  ${
                    position === "left"
                      ? "bg-[rgb(var(--background))]"
                      : "hover:bg-[rgba(var(--copy-secondary),0.1)]"
                  }
                `}
              >
                <RiLayoutLeftLine className="w-6 h-6 text-[rgb(var(--cta))]" />
              </button>

              <button
                onClick={() => setPosition("right")}
                aria-label="Move sidebar to right"
                className={`
                  p-2 rounded-full transition-colors
                  ${
                    position === "right"
                      ? "bg-[rgb(var(--background))]"
                      : "hover:bg-[rgba(var(--copy-secondary),0.1)]"
                  }
                `}
              >
                <RiLayoutRightLine className="w-6 h-6 text-[rgb(var(--cta))]" />
              </button>

              <button
                onClick={() => setPosition("top")}
                aria-label="Move sidebar to top"
                className={`
                  p-2 rounded-full transition-colors
                  ${
                    position === "top"
                      ? "bg-[rgb(var(--background))]"
                      : "hover:bg-[rgba(var(--copy-secondary),0.1)]"
                  }
                `}
              >
                <RiLayoutTopLine className="w-6 h-6 text-[rgb(var(--cta))]" />
              </button>

              <button
                onClick={() => setPosition("bottom")}
                aria-label="Move sidebar to bottom"
                className={`
                  p-2 rounded-full transition-colors
                  ${
                    position === "bottom"
                      ? "bg-[rgb(var(--background))]"
                      : "hover:bg-[rgba(var(--copy-secondary),0.1)]"
                  }
                `}
              >
                <RiLayoutBottomLine className="w-6 h-6 text-[rgb(var(--cta))]" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default AppSidebar;
