import React, { useEffect, useState } from "react";
import AppSidebar from "./AppSidebar";
import { useTheme } from "./useTheme";
import { SidebarOpen } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [theme, setTheme] = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarPosition, setSidebarPosition] = useState<
    "left" | "right" | "top" | "bottom"
  >("left");

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  const getOffsetClass = () => {
    if (isMobile) return "";
    switch (sidebarPosition) {
      case "left":
        return sidebarCollapsed ? "md:ml-16" : "md:ml-72";
      case "right":
        return sidebarCollapsed ? "md:mr-16" : "md:mr-72";
      case "top":
        return sidebarCollapsed ? "mt-16" : "mt-72";
      case "bottom":
        return sidebarCollapsed ? "mb-16" : "mb-72";
      default:
        return "";
    }
  };

  return (
    <div
      className="app-layout relative min-h-screen w-full font-sans"
      style={{
        backgroundColor: "rgb(var(--background))",
        color: "rgb(var(--copy-primary))",
      }}
    >
      {/* ⬅️ Sidebar: shown if not mobile or mobile + open */}
      {(isMobile && !sidebarCollapsed) || !isMobile ? (
        <AppSidebar
          theme={theme}
          setTheme={setTheme}
          collapsed={sidebarCollapsed}
          toggleCollapsed={toggleSidebar}
          position={sidebarPosition}
          setPosition={setSidebarPosition}
        />
      ) : null}

      {/* 🍔 Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        aria-label={sidebarCollapsed ? "Open menu" : "Close menu"}
        className="md:hidden z-50 p-5 rounded-full shadow bg-rgb(var(--cta))"
      >
        {sidebarCollapsed ? (
          <SidebarOpen
            className="h-6 w-6"
            style={{ color: "rgb(var(--cta))" }}
          />
        ) : (
          <></>
        )}
      </button>

      {/* 📦 Main content with layout offset */}
      <div
        className={`transition-all duration-300 ease-in-out ${getOffsetClass()}`}
      >
        <main className="flex-1 flex justify-center items-center w-full min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
