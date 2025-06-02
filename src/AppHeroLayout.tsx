// AppHeroLayout.tsx
import React from "react";
import AppSidebar from "./AppSidebar";
import HeroSection from "./HeroSection";
import { useTheme } from "./useTheme"; // <-- import the hook
import { SidebarOpen, SidebarClose } from "lucide-react";

const AppHeroLayout: React.FC = () => {
  // Instead of useState + useEffect, do this:
  const [theme, setTheme] = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(true);

  const toggleSidebar = () => setSidebarCollapsed((c) => !c);

  return (
    <main className="relative bg-bg min-h-screen w-full flex flex-col-reverse md:flex-row font-sans text-copy">
      <AppSidebar
        theme={theme}
        setTheme={setTheme}
        collapsed={sidebarCollapsed}
        toggleCollapsed={toggleSidebar}
      />

      <div
        className={`
          flex-1 relative transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? "md:ml-16" : "md:ml-72"}
        `}
      >
        <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Open menu" : "Close menu"}
          className="md:hidden fixed top-4 left-4 z-50 bg-card border border-border p-2 rounded-full shadow hover:bg-cta/10 transition"
        >
          {sidebarCollapsed ? (
            <SidebarOpen className="h-6 w-6 text-copy" />
          ) : (
            <SidebarClose className="h-6 w-6 text-copy" />
          )}
        </button>

        <HeroSection />
      </div>
    </main>
  );
};

export default AppHeroLayout;
