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
  const links = [
    { href: "#dashboard", label: "Dashboard", Icon: Home },
    { href: "#profile", label: "Profile", Icon: User },
    { href: "#settings", label: "Account Settings", Icon: Settings },
    { href: "#support", label: "Support", Icon: LifeBuoy },
  ];

  // Track desktop vs. mobile
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Determine open/closed
  const desktopOpen = !collapsed;
  const mobileOpen = !collapsed && !isDesktop;

  return (
    <>
      {/* ─── Overlay for mobile when open ─── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={toggleCollapsed}
          aria-hidden="true"
        />
      )}

      {/* ─── Sidebar Container ─── */}
      <aside
        className={`
          fixed top-0 z-999 left-0 h-full bg-card border-r border-border shadow-lg
          flex flex-col transition-transform duration-300 ease-in-out

          /* DESKTOP: expanded = w-72, collapsed = w-16 */
          ${
            isDesktop
              ? desktopOpen
                ? "w-72 md:translate-x-0"
                : "w-16 md:translate-x-0"
              : /* MOBILE: if open, w-full; if closed, off-screen */
              mobileOpen
              ? "w-full translate-x-0"
              : "-translate-x-full w-0"
          }
        `}
      >
        {/* ─── Header (always shows toggle) ─── */}
        <div className="flex items-center h-16 px-4 border-b border-border">
          {/* Brand when expanded or drawer‐open */}
          {(desktopOpen || mobileOpen) && (
            <span className="text-xl font-bold text-copy">MyApp</span>
          )}

          {/* Header Toggle (always shown on both desktop & mobile) */}
          <button
            onClick={toggleCollapsed}
            aria-label={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="
              ml-auto p-2 rounded-full hover:bg-cta/10 transition-colors
              focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-1
            "
          >
            {collapsed ? (
              <SidebarOpen className="h-6 w-6 text-copy" />
            ) : (
              <SidebarClose className="h-6 w-6 text-copy" />
            )}
          </button>
        </div>

        {/* ─── Navigation Links ─── */}
        <nav className="flex-1 overflow-y-auto mt-4">
          {links.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              className={`
                group flex items-center ${
                  desktopOpen ? "px-4 py-3 gap-3" : "justify-center px-0 py-3"
                } rounded-lg mx-2
                hover:bg-cta/10 hover:text-cta-text transition-colors
                focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-1
              `}
            >
              <Icon
                className={`
                  h-5 w-5 flex-shrink-0 text-cta transition-colors duration-200
                  ${desktopOpen ? "" : "mx-auto"}
                `}
              />
              {/* Label only when desktopOpen */}
              {desktopOpen && (
                <span className="text-base font-medium text-copy group-hover:text-cta-text">
                  {label}
                </span>
              )}
              {/* Tooltip on collapsed desktop */}
              {!desktopOpen && isDesktop && (
                <span
                  className="
                    absolute left-full ml-2 whitespace-nowrap
                    bg-copy text-copy p-1 rounded-md text-sm opacity-0
                    group-hover:opacity-100 transition-opacity duration-200
                    pointer-events-none
                  "
                >
                  {label}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* ─── Divider (desktop only) ─── */}
        {desktopOpen && <div className="border-t border-border my-4" />}

        {/* ─── Theme & Font Controls (desktop only) ─── */}
        {desktopOpen && (
          <div className="px-4 space-y-4">
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
            <FontSizeControl />
          </div>
        )}

        {/* ─── Footer Buttons (desktop only) ─── */}
        {desktopOpen && (
          <div className="mt-auto px-4 pb-6 space-y-3">
            <button className="w-full bg-cta text-cta-text font-semibold rounded-lg px-4 py-2 hover:bg-cta-active transition-shadow shadow-sm">
              Login
            </button>
            <button className="w-full border border-border text-copy font-semibold rounded-lg px-4 py-2 hover:bg-cta-active transition-colors">
              Sign Up
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default AppSidebar;
