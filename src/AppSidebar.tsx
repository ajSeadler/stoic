import {
  SidebarOpen,
  SidebarClose,
  Home,
  User,
  Settings,
  LifeBuoy,
} from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import FontSizeControl from "./FontSizeControl";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface AppSidebarProps {
  theme: string;
  setTheme: (theme: string) => void;
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  theme,
  setTheme,
  collapsed,
  toggleCollapsed,
}) => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", Icon: Home },
    { to: "/comingsoon", label: "About Me", Icon: User },
    { to: "/comingsoon", label: "Portfolio", Icon: Settings },
    { to: "/comingsoon", label: "Support", Icon: LifeBuoy },
  ];

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktopOpen = !collapsed;
  const mobileOpen = !collapsed && !isDesktop;

  return (
    <>
      {/* Overlay on mobile */}
      {mobileOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-30 bg-[rgba(var(--copy-primary),0.5)] backdrop-blur-sm"
          onClick={toggleCollapsed}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      <aside
        aria-label="Primary sidebar"
        className={`
          fixed top-0 left-0 z-[999] h-full
          bg-[rgb(var(--card))] border-r border-[rgb(var(--border))]
          shadow-lg flex flex-col transition-transform duration-300 ease-in-out
          ${
            isDesktop
              ? desktopOpen
                ? "w-72 md:translate-x-0"
                : "w-16 md:translate-x-0"
              : mobileOpen
              ? "w-full translate-x-0"
              : "-translate-x-full w-0"
          }
        `}
      >
        {/* Header */}
        <div
          className="flex items-center h-16 px-4 border-b border-[rgb(var(--border))] select-none"
          style={{ color: "rgb(var(--cta))" }}
        >
          {(desktopOpen || mobileOpen) && (
            <span
              className="text-xl font-bold truncate"
              title="App"
              aria-label="App name"
              style={{ color: "rgb(var(--cta))" }}
            >
              App
            </span>
          )}

          <button
            onClick={toggleCollapsed}
            aria-label={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={desktopOpen}
            type="button"
            className="ml-auto p-2 rounded-full hover:bg-[rgba(var(--cta),0.2)] transition-colors
              focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] focus:ring-offset-2 "
          >
            {collapsed ? (
              <SidebarOpen
                className="h-6 w-6"
                style={{ color: "rgb(var(--cta))" }}
                aria-hidden="true"
              />
            ) : (
              <SidebarClose
                className="h-6 w-6"
                style={{ color: "rgb(var(--cta))" }}
                aria-hidden="true"
              />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto mt-6 pt-2"
          aria-label="Primary navigation"
        >
          {links.map(({ to, label, Icon }) => {
            const isActive = location.pathname === to;

            return (
              <Link
                key={to}
                to={to}
                className={`
                  relative z-10 group flex items-center
                  ${
                    collapsed
                      ? "justify-center px-0 py-3"
                      : "px-4 py-3 gap-3 rounded-lg mx-2"
                  }
                  transition-colors duration-300 ease-in-out
                  ${
                    isActive
                      ? "bg-[rgb(var(--cta))] text-[rgb(var(--card))] font-semibold shadow-md"
                      : "text-[rgb(var(--cta))]"
                  }
                  hover:text-[rgb(var(--card))] hover:bg-[rgba(var(--cta),0.3)]
                  focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] focus:ring-offset-1
                `}
                aria-current={isActive ? "page" : undefined}
                tabIndex={0}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${
                    collapsed ? "mx-auto" : ""
                  }`}
                  aria-hidden="true"
                  style={{
                    color: isActive ? "rgb(var(--card))" : "rgb(var(--cta))",
                  }}
                />
                {!collapsed && (
                  <span className="font-medium truncate">{label}</span>
                )}
                {collapsed && (
                  <span
                    className="
                      absolute left-full ml-2 whitespace-nowrap
                      bg-[rgb(var(--cta))] text-[rgb(var(--card))] p-1 rounded-md text-sm opacity-0
                      group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg
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

        {/* Divider */}
        {desktopOpen && (
          <div
            className="border-t my-4"
            style={{ borderColor: "rgb(var(--cta))" }}
          />
        )}

        {/* Controls */}
        {desktopOpen && (
          <div className="px-4 space-y-4 mb-4">
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
            <FontSizeControl />
          </div>
        )}

        {/* Bottom buttons */}
        {desktopOpen && (
          <div className="mt-auto px-4 pb-6 space-y-3">
            <button
              type="button"
              className="relative z-10 w-full font-semibold rounded-lg px-4 py-2 shadow-sm transition-shadow
                bg-[rgb(var(--cta))] text-[rgb(var(--card))] hover:bg-[rgb(var(--cta-active))] focus:outline-none
                focus:ring-2 focus:ring-[rgb(var(--cta))] focus:ring-offset-2"
            >
              Login
            </button>

            <button
              type="button"
              className="relative z-10 w-full font-semibold rounded-lg px-4 py-2 border
                border-[rgb(var(--cta))] text-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] hover:text-[rgb(var(--card))]
                transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default AppSidebar;
