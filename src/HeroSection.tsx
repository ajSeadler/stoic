import React, { useState, useEffect, useRef } from "react";
import { MapPin, Search } from "lucide-react";

const popularParks = [
  "Venice Beach Skatepark, CA",
  "Burnside Skatepark, OR",
  "FDR Skatepark, PA",
  "Love Park, PA",
  "Southbank Skatepark, UK",
];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = popularParks.filter((park) =>
        park.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
      setActiveSuggestion(-1);
    }
  }, [query]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSuggestion >= 0) {
        setQuery(filteredSuggestions[activeSuggestion]);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const onSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <section
      aria-label="Hero section with skatepark search"
      className="flex flex-col justify-center items-center flex-1 px-16 py-20 max-w-[calc(100vw-280px)] mx-auto"
    >
      <h1 className="text-5xl font-extrabold text-cta flex items-center gap-4 justify-center mb-6">
        Find Your Perfect Skatepark
      </h1>
      <p className="max-w-xl text-copy-secondary text-lg text-center mb-12">
        Explore skateparks near you. Filter by location, features, and
        difficulty. Join thousands of skaters discovering the best spots every
        day.
      </p>

      <div className="relative w-full max-w-md">
        <label htmlFor="park-search" className="sr-only">
          Search skateparks by name or location
        </label>
        <div className="flex items-center bg-card border border-border rounded-full shadow-sm px-4 py-3 focus-within:ring-2 focus-within:ring-cta transition">
          <Search
            size={24}
            className="text-copy-secondary mr-3 flex-shrink-0"
          />
          <input
            id="park-search"
            ref={inputRef}
            type="search"
            placeholder="Search skateparks (e.g. Venice Beach, Burnside)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            aria-autocomplete="list"
            aria-controls="suggestion-list"
            aria-activedescendant={
              activeSuggestion >= 0
                ? `suggestion-${activeSuggestion}`
                : undefined
            }
            className="flex-grow bg-transparent text-copy outline-none text-lg placeholder-copy-secondary"
          />
          <button
            type="submit"
            aria-label="Search skateparks"
            className="ml-4 bg-cta text-cta-text font-semibold rounded-full px-6 py-3 hover:bg-cta-active transition"
          >
            Search
          </button>
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul
            id="suggestion-list"
            role="listbox"
            className="absolute z-50 top-full mt-2 w-full max-h-56 overflow-y-auto bg-card border border-border rounded-lg shadow-lg"
          >
            {filteredSuggestions.map((suggestion, i) => (
              <li
                key={suggestion}
                id={`suggestion-${i}`}
                role="option"
                aria-selected={activeSuggestion === i}
                tabIndex={-1}
                onClick={() => onSuggestionClick(suggestion)}
                onMouseEnter={() => setActiveSuggestion(i)}
                className={`cursor-pointer px-4 py-3 flex items-center gap-2 transition-colors ${
                  activeSuggestion === i
                    ? "bg-cta text-cta-text"
                    : "text-copy hover:bg-cta/10"
                }`}
              >
                <MapPin
                  size={16}
                  className={
                    activeSuggestion === i
                      ? "text-cta-text"
                      : "text-copy-secondary"
                  }
                />
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
