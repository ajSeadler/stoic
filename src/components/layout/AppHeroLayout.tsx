import HeroSection from "../sections/HeroSection";

const AppHeroLayout = () => {
  return (
    <main className="relative bg-bg min-h-screen w-full flex justify-center items-center font-sans text-copy">
      <div className="flex justify-center items-center w-full h-full">
        <HeroSection />
      </div>
    </main>
  );
};

export default AppHeroLayout;
