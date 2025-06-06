import PortfolioSection from "../PortfolioSection";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const PortfolioPage = () => {
  return (
    <main
      className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--copy))]"
      style={{ fontSize: "var(--user-font-size)" }}
    >
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <h1
              className="font-extrabold leading-tight tracking-tight text-[rgb(var(--cta))]"
              style={{
                fontSize: "calc(var(--user-font-size) * 3)",
                lineHeight: "1.1",
              }}
            >
              Portfolio
            </h1>
            <p
              className="text-[rgb(var(--copy-secondary))] max-w-2xl mx-auto leading-relaxed"
              style={{
                fontSize: "calc(var(--user-font-size) * 1.1)",
                lineHeight: "1.6",
              }}
            >
              A collection of full-stack and frontend builds I have developed
              recently.
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[rgb(var(--copy-secondary))]"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <PortfolioSection />
      </section>

      {/* Skills Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-8 md:p-12">
          <h2
            className="text-[rgb(var(--copy))] font-bold mb-12 text-center"
            style={{ fontSize: "calc(var(--user-font-size) * 1.75)" }}
          >
            Technical Expertise
          </h2>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-[rgb(var(--copy-secondary))]"
            style={{ fontSize: "var(--user-font-size)" }}
          >
            <div className="space-y-3">
              <h3 className="font-semibold text-[rgb(var(--cta))]">Frontend</h3>
              <div className="space-y-2">
                <span>React / TypeScript</span>
                <span>Next.js / Vite</span>
                <span>Tailwind / CSS Vars</span>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-[rgb(var(--cta))]">Backend</h3>
              <div className="space-y-2">
                <span>Node.js / Express</span>
                <span>PostgreSQL / Prisma</span>
                <span>REST / GraphQL</span>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-[rgb(var(--cta))]">DevOps</h3>
              <div className="space-y-2">
                <span>Docker / CI Pipelines</span>
                <span>AWS / Cloud Services</span>
                <span>Git / GitHub Actions</span>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-[rgb(var(--cta))]">Security</h3>
              <div className="space-y-2">
                <span>Networking / Firewalls</span>
                <span>Cybersecurity / OWASP</span>
                <span>Pen Testing / Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
