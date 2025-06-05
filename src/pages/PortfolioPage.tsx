import PortfolioSection from "../PortfolioSection";

const PortfolioPage = () => {
  return (
    <main
      className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--copy))]"
      style={{ fontSize: "var(--user-font-size)" }}
    >
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-32">
        {/* ── Hero */}
        <header className="text-center space-y-4">
          <h1
            className="font-extrabold leading-tight tracking-tight"
            style={{
              fontSize: "calc(var(--user-font-size) * 2.8)",
              lineHeight: "1.2",
            }}
          >
            Portfolio
          </h1>
          <p
            className="text-[rgb(var(--copy-secondary))] max-w-2xl mx-auto leading-relaxed"
            style={{
              fontSize: "var(--user-font-size)",
              lineHeight: "1.6",
            }}
          >
            A collection of full-stack builds, infrastructure systems, and
            interface engineering — all with clean code and real-world scale.
          </p>
        </header>

        {/* ── Project Grid */}
        <section>
          <PortfolioSection />
        </section>

        {/* ── Skills */}
        <section className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl backdrop-blur-lg px-8 py-14 md:px-16 md:py-20 shadow-[0_0_20px_rgba(0,0,0,0.05)]">
          <h2
            className="text-[rgb(var(--copy))] font-semibold mb-8"
            style={{ fontSize: "calc(var(--user-font-size) * 1.5)" }}
          >
            Technical Scope
          </h2>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-[rgb(var(--copy-secondary))]"
            style={{ fontSize: "var(--user-font-size)" }}
          >
            <span>React / TypeScript</span>
            <span>Next.js / Vite</span>
            <span>Tailwind / CSS Vars</span>
            <span>Node.js / Express</span>
            <span>PostgreSQL / Prisma</span>
            <span>Docker / CI Pipelines</span>
            <span>Networking / Firewalls</span>
            <span>Cybersecurity / OWASP</span>
          </div>
        </section>
      </section>
    </main>
  );
};

export default PortfolioPage;
