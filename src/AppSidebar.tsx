import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { SidebarOpen, SidebarClose } from "lucide-react";

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
  return (
    <aside
      className={`
        relative z-10 flex flex-col bg-card border-r border-border
        transition-all duration-300
        ${collapsed ? "w-16" : "w-full md:w-70"}
      `}
    >
      {/* ─── TOGGLE BUTTON ─── */}
      <button
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="
          self-end m-2 p-2 rounded-full border border-border bg-bg
          hover:bg-cta/10 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-cta
          flex items-center justify-center
        "
      >
        {collapsed ? (
          <SidebarOpen className="h-6 w-6 text-copy" />
        ) : (
          <SidebarClose className="h-6 w-6 text-copy" />
        )}
      </button>

      {/* ─── CONTENT (hidden when collapsed) ─── */}
      {!collapsed && (
        <div className="flex flex-col flex-1 p-6 space-y-6">
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
          <div className="flex-1" />
          <button className="w-full bg-cta text-cta-text px-4 py-2 rounded-lg font-semibold hover:bg-cta-active transition">
            Login
          </button>
          <button className="w-full bg-transparent border-border border-2 px-4 py-2 rounded-lg font-semibold hover:bg-cta-active transition">
            Sign Up!
          </button>
        </div>
      )}
    </aside>
  );
};

export default AppSidebar;
