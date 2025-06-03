import React from "react";
import AppSidebar from "./AppSidebar";
import { useTheme } from "./useTheme";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [theme, setTheme] = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(true);

  const toggleSidebar = () => setSidebarCollapsed((c) => !c);

  return (
    <div
      className="app-layout relative min-h-screen w-full flex flex-col-reverse md:flex-row font-sans"
      style={{
        backgroundColor: "rgb(var(--background))",
        color: "rgb(var(--copy-primary))",
      }}
    >
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
          flex flex-col min-h-screen
        `}
      >
        {/* Sidebar toggle button for mobile */}
        {/* <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Open menu" : "Close menu"}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full shadow transition"
          style={{
            backgroundColor: "rgb(var(--card))",
            border: "1px solid rgb(var(--border))",
          }}
        >
          {sidebarCollapsed ? (
            <SidebarOpen
              className="h-6 w-6"
              style={{ color: "rgb(var(--copy-primary))" }}
            />
          ) : (
            <SidebarClose
              className="h-6 w-6"
              style={{ color: "rgb(var(--copy-primary))" }}
            />
          )}
        </button> */}

        {/* Main content area */}
        <main className="flex-1 flex justify-center items-center w-full h-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
