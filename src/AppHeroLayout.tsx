import React from "react";
import HeroSection from "./HeroSection";

const AppHeroLayout: React.FC = () => {
  return (
    <main className="relative bg-bg min-h-screen w-full flex justify-center items-center font-sans text-copy">
      <div className="flex justify-center items-center w-full h-full">
        <HeroSection />
      </div>
    </main>
  );
};

export default AppHeroLayout;
