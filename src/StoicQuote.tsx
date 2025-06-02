// components/StoicQuote.tsx
import { useEffect, useState } from "react";

const themes = [
  "light",
  "dark",
  "forest",
  "desert",
  "ocean",
  "midnight",
  "quantum",
  "sunset",
  "red",
  "darktech",
  "infrauv",
];

type Quote = {
  quote: string;
  author: string;
};

export const StoicQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [animate, setAnimate] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    setAnimate(false);
    setTimeout(async () => {
      try {
        const res = await fetch("https://stoic-quotes.com/api/quote");
        const json = await res.json();
        setQuote({ quote: json.text, author: json.author });
      } catch (err) {
        console.error("Failed to fetch quote", err);
        setQuote({
          quote: "Stillness is the key.",
          author: "Unknown",
        });
      } finally {
        setLoading(false);
        // trigger fade-in after content is set
        setAnimate(true);
      }
    }, 200); // short delay so fade-out completes
  };

  useEffect(() => {
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <main
      className="min-h-screen w-full bg-bg text-copy font-serif flex flex-col md:flex-row"
      role="main"
      aria-live="polite"
    >
      {/* ─── LEFT SIDE: Quote Display ─── */}
      <section
        aria-busy={loading}
        className={`
          flex-1 flex flex-col justify-center px-8 md:px-16 py-16
          transition-opacity duration-500 ease-in-out transform
          ${
            loading
              ? "opacity-50"
              : animate
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }
        `}
        style={{ transitionProperty: "opacity, transform" }}
      >
        {loading ? (
          <p className="text-3xl md:text-4xl text-copy/60 animate-pulse max-w-2xl leading-snug">
            Loading…
          </p>
        ) : (
          <blockquote className="max-w-2xl space-y-6">
            <p className="text-4xl md:text-5xl italic font-semibold leading-snug">
              “{quote?.quote}”
            </p>
            <footer className="mt-4 text-xl md:text-2xl text-copy-secondary font-sans tracking-wide">
              — {quote?.author}
            </footer>
          </blockquote>
        )}
      </section>

      {/* ─── RIGHT SIDE: Controls ─── */}
      <aside className="flex flex-col w-full md:w-80 bg-card border-l border-border p-6 md:p-8 space-y-8 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="theme-select"
            className="text-copy-secondary text-sm font-medium uppercase tracking-wide"
          >
            Theme
          </label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-bg text-copy text-base px-3 py-2 rounded-lg border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-cta focus:ring-opacity-50 transition"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={fetchQuote}
          aria-label="New Stoic Quote"
          className="mt-auto bg-cta text-cta-text text-base font-semibold px-4 py-2 rounded-xl shadow hover:bg-cta-active focus:outline-none focus:ring-2 focus:ring-cta focus:ring-opacity-50 transition"
        >
          New Quote
        </button>
      </aside>
    </main>
  );
};
