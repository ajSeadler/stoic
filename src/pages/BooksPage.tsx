import BooksSection from "../components/sections/BooksSection";

const BooksPage = () => {
  return (
    <main
      className="
        min-h-screen 
        bg-[rgb(var(--background))] 
        text-[rgb(var(--copy-primary))] 
        flex 
        justify-center 
        px-4 
        py-10
        sm:py-16
      "
      style={{ fontSize: "var(--user-font-size)" }}
    >
      <div className="w-full max-w-6xl">
        <BooksSection />
      </div>
    </main>
  );
};

export default BooksPage;
