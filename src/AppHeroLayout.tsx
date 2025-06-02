// AppHeroLayout.tsx
import React, { useEffect, useState } from "react";
import AppSidebar from "./AppSidebar";
import HeroSection from "./HeroSection";

const AppHeroLayout: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [bgUrl, setBgUrl] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Initial theme from document or fallback
    setTheme(document.documentElement.className || "light");
  }, []);

  useEffect(() => {
    // Sync document theme
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    // Dynamic background on mount
    setBgUrl(
      `https://source.unsplash.com/featured/1600x900/?technology,landscape,abstract&${Date.now()}`
    );
  }, []);

  const toggleSidebar = () => setSidebarCollapsed((c) => !c);

  return (
    <main className="bg-bg relative min-h-screen w-full flex flex-col-reverse md:flex-row font-sans text-copy">
      {/* ─── SIDEBAR ON LEFT ─── */}
      <AppSidebar
        theme={theme}
        setTheme={setTheme}
        collapsed={sidebarCollapsed}
        toggleCollapsed={toggleSidebar}
      />

      {/* ─── BACKGROUND ─── */}
      {bgUrl && (
        <div
          className="absolute inset-0 z-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      )}
      <div className="absolute inset-0 z-0" />

      {/* ─── HERO CONTENT ─── */}
      <HeroSection />
    </main>
  );
};

export default AppHeroLayout;
