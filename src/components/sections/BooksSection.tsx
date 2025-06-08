import { useState, useEffect } from "react";
import { Star, ExternalLink } from "lucide-react";

interface Book {
  id: string;
  title: string;
  authors: string[];
  imageUrl: string;
  publishedDate: string;
  rating: number;
  categories: string[];
  infoLink?: string;
  description?: string;
  publisher?: string;
  subtitle?: string;
}

const initialBooks: Array<{ title: string; authors: string[]; isbn: string }> =
  [
    { title: "Spam Nation", authors: ["Brian Krebs"], isbn: "9781492603231" },
    {
      title: "Practice of Network Security Monitoring",
      authors: ["Richard Bejtlich"],
      isbn: "9781593275099",
    },
    {
      title: "The Name of the Wind",
      authors: ["Patrick Rothfuss"],
      isbn: "9780756404741",
    },
    { title: "Desperation", authors: ["Stephen King"], isbn: "9780670868360" },
  ];

const formatDate = (raw: string) => {
  if (raw === "Unknown") return raw;
  const date = new Date(raw);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
  }).format(date);
};

const BookCard = ({ book }: { book: Book }) => (
  <div className="flex flex-col md:flex-row items-start gap-6 p-6 border border-[rgb(var(--border))] rounded-xl hover:shadow-md transition-shadow bg-[rgb(var(--card))]">
    <div className="flex-shrink-0">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-24 h-36 object-cover rounded shadow-sm"
      />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-lg font-semibold text-[rgb(var(--copy-primary))]">
          {book.title}
          {book.subtitle && (
            <span className="text-sm font-normal text-[rgb(var(--copy-secondary))] ml-2">
              — {book.subtitle}
            </span>
          )}
        </h3>
        {book.categories.length > 0 && (
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-[rgb(var(--cta-active))] text-white whitespace-nowrap">
            {book.categories.join(", ")}
          </span>
        )}
      </div>
      <p className="text-sm text-[rgb(var(--copy-secondary))] mt-1 truncate">
        {book.authors.join(", ")}
      </p>
      <p className="text-xs text-[rgb(var(--copy-secondary))] mt-2 italic">
        {book.publisher || ""}
      </p>
      {book.description && (
        <p className="mt-3 text-[rgb(var(--copy-secondary))] text-sm line-clamp-4">
          {book.description}
        </p>
      )}
      <div className="flex items-center justify-between text-sm text-[rgb(var(--copy-secondary))] mt-3 flex-wrap gap-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(book.rating)
                  ? "text-[rgb(var(--cta))] fill-[rgb(var(--cta))]"
                  : ""
              }`}
            />
          ))}
          {book.rating > 0 && (
            <span className="ml-1">{book.rating.toFixed(1)}</span>
          )}
        </div>
        <time className="whitespace-nowrap">
          {formatDate(book.publishedDate)}
        </time>
      </div>
      {book.infoLink && (
        <a
          href={book.infoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-[rgb(var(--cta))] mt-3 hover:underline"
        >
          <ExternalLink size={12} className="stroke-[2]" />
          <span>View Details</span>
        </a>
      )}
    </div>
  </div>
);

const BooksSection = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetched = await Promise.all(
          initialBooks.map(async ({ isbn }) => {
            const res = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
            );
            const data = await res.json();
            const info = data.items?.[0]?.volumeInfo;
            if (!info) return null;
            return {
              id: data.items[0].id,
              title: info.title,
              subtitle: info.subtitle,
              authors: info.authors || [],
              imageUrl: info.imageLinks?.thumbnail || "/book-placeholder.png",
              publishedDate: info.publishedDate || "Unknown",
              rating: info.averageRating || 0,
              categories: info.categories || [],
              infoLink: info.infoLink,
              description: info.description,
              publisher: info.publisher,
            } as Book;
          })
        );
        setBooks(fetched.filter((b): b is Book => !!b));
      } catch {
        setError("Unable to load books.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[rgb(var(--cta))]" />
      </div>
    );

  if (error)
    return <p className="text-center text-[rgb(var(--error))]">{error}</p>;

  return (
    <section
      className="max-w-6xl mx-auto px-6 space-y-6"
      style={{ fontSize: "var(--user-font-size)" }}
    >
      <h2 className="text-2xl font-semibold text-[rgb(var(--copy-primary))]">
        Good Reads
      </h2>
      <div className="space-y-4">
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
      <p className="text-xs text-[rgb(var(--copy-secondary))] text-right mt-6">
        Book data provided by{" "}
        <a
          href="https://books.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[rgb(var(--cta))]"
        >
          Google Books
        </a>
        .
      </p>
    </section>
  );
};

export default BooksSection;
