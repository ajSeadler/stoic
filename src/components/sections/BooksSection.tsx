import { useState, useEffect } from "react";
import { Star, ExternalLink } from "lucide-react";

interface Book {
  id: string;
  title: string;
  authors: string[];
  imageUrl: string;
  publishedDate: string;
  rating: number;
  infoLink?: string;
}

const initialBooks = [
  {
    title: "Spam Nation",
    authors: ["Brian Krebs"],
    isbn: "9781492603231",
  },
  {
    title: "Practice of Network Security Monitoring",
    authors: ["Richard Bejtlich"],
    isbn: "9781593275099",
  },
];

const formatDate = (dateString: string) => {
  if (dateString === "Unknown") return dateString;
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(date);
};

const BooksSection = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookDetails = await Promise.all(
          initialBooks.map(async (book) => {
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`
            );
            const data = await response.json();

            if (data.items && data.items[0]) {
              const bookData = data.items[0].volumeInfo;
              return {
                id: data.items[0].id,
                title: bookData.title,
                authors: bookData.authors || [],
                imageUrl:
                  bookData.imageLinks?.thumbnail || "/book-placeholder.png",
                publishedDate: bookData.publishedDate || "Unknown",
                rating: bookData.averageRating || 0,
                infoLink: bookData.infoLink,
              } as Book;
            }
            return null;
          })
        );

        setBooks(bookDetails.filter((book): book is Book => book !== null));
      } catch (err) {
        setError("Failed to fetch book details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(var(--cta))]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-[rgb(var(--error))]">
        {error}
      </div>
    );
  }

  return (
    <section
      className="w-full max-w-7xl mx-auto"
      style={{ fontSize: "var(--user-font-size)" }}
    >
      <h2 className="text-2xl font-bold text-[rgb(var(--copy-primary))] mb-8">
        Influential Reads
      </h2>

      <div className="space-y-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="group flex items-start gap-6 p-4 rounded-lg hover:bg-[rgb(var(--card))] transition-colors"
          >
            {/* Book Cover */}
            <div className="w-24 h-36 flex-shrink-0">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-full object-cover rounded shadow-sm"
              />
            </div>

            {/* Book Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-[rgb(var(--copy-primary))] mb-1">
                {book.title}
              </h3>

              <p className="text-sm text-[rgb(var(--copy-secondary))] mb-3">
                {book.authors.join(", ")}
              </p>

              <div className="flex items-center gap-4 text-sm text-[rgb(var(--copy-secondary))]">
                {book.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(book.rating)
                              ? "text-[rgb(var(--cta))] fill-[rgb(var(--cta))]"
                              : "text-[rgb(var(--copy-secondary))]"
                          }`}
                        />
                      ))}
                    </div>
                    <span>{book.rating.toFixed(1)}</span>
                  </div>
                )}
                <span>•</span>
                <time>{formatDate(book.publishedDate)}</time>
              </div>

              {book.infoLink && (
                <a
                  href={book.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-sm text-[rgb(var(--cta))] hover:text-[rgb(var(--cta-active))] transition-colors"
                >
                  <ExternalLink size={14} className="stroke-[2]" />
                  <span>View on Google Books</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BooksSection;
