import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      aria-label="Hero section with skatepark search"
      className="w-full flex flex-col items-center justify-center text-copy px-6 sm:px-10 md:px-16 py-20 gap-10"
      style={{ fontSize: "var(--user-font-size)" }}
    >
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-cta font-extrabold leading-tight text-[clamp(1.5em,4vw,3em)]">
          Discover Skateparks Near You
        </h1>

        <p className="text-copy-secondary text-[1em] leading-relaxed px-2 sm:px-4">
          Explore hundreds of skateparks across the country. Find hidden gems,
          plan your next trip, or simply cruise through what’s nearby.
        </p>
      </div>

      <form
        className="w-full max-w-xl flex items-center gap-2 bg-card border border-border rounded-full shadow-md px-4 py-3 focus-within:ring-2 focus-within:ring-cta transition"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search size={20} className="text-copy-secondary mr-2 flex-shrink-0" />
        <input
          id="park-search"
          placeholder="Search parks..."
          className="flex-grow min-w-0 bg-transparent text-copy outline-none placeholder-copy-secondary"
          style={{ fontSize: "inherit" }}
        />
        <button
          type="submit"
          className="bg-cta text-cta-text font-semibold rounded-full px-5 py-2 hover:bg-cta-active transition whitespace-nowrap"
          style={{ fontSize: "inherit" }}
        >
          Search
        </button>
      </form>
    </section>
  );
};

export default HeroSection;
