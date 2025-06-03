import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Rocket } from "lucide-react";
import HeroSnippet from "./HeroSnippet";
import PortfolioSection from "./PortfolioSection";

const TYPEWRITER_WORDS = [
  "Frontend Engineer",
  "UI/UX Aficionado",
  "Performance Optimizer",
  "Accessibility Advocate",
];

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const TYPING_DELAY = 100;
  const DELETING_DELAY = 50;
  const PAUSE_AFTER_WORD = 1500;

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = TYPEWRITER_WORDS[wordIndex];
      if (!isDeleting && charIndex <= fullWord.length) {
        setCurrentWord(fullWord.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex >= 0) {
        setCurrentWord(fullWord.slice(0, charIndex));
        setCharIndex((prev) => prev - 1);
      }

      if (!isDeleting && charIndex === fullWord.length + 1) {
        setTimeout(() => setIsDeleting(true), PAUSE_AFTER_WORD);
      } else if (isDeleting && charIndex === -1) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
        setCharIndex(0);
      }
    };

    const timeoutId = window.setTimeout(
      handleTyping,
      isDeleting ? DELETING_DELAY : TYPING_DELAY
    );
    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <section
      aria-label="Hero section"
      className="p-6 pt-20 w-full md:px-16 text-[rgb(var(--copy-primary))]"
      style={{ fontSize: "var(--user-font-size)" }}
    >
      {/* Centered Hero Content */}
      <div className="min-h-screen flex flex-col justify-center items-center w-full max-w-4xl mx-auto text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-extrabold tracking-tight text-[rgb(var(--copy-primary))] text-balance text-center md:text-left"
          style={{
            fontSize: "clamp(2.25rem, 6vw, 3.75rem)",
            lineHeight: "1.1",
            letterSpacing: "-0.015em",
          }}
        >
          Hi, I’m <span className="text-[rgb(var(--cta))]">AJ</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-[rgb(var(--copy-secondary))] leading-relaxed text-lg"
        >
          <span className="mr-1">I’m a</span>
          <span className="font-medium text-[rgb(var(--cta))]">
            {currentWord}
            <span className="inline-block animate-blink">|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-[rgb(var(--copy-secondary))] leading-relaxed max-w-xl"
          style={{ fontSize: "1em" }}
        >
          Crafting pixel-perfect, accessible, and high-performance web apps
          using React, TypeScript, and cutting-edge design systems. Let’s build
          something amazing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[rgb(var(--cta-active))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] transition"
            style={{ fontSize: "1em" }}
          >
            <Rocket size={20} />
            <span>View Projects</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--copy-secondary))] font-medium px-6 py-3 rounded-full hover:border-[rgb(var(--cta))] hover:text-[rgb(var(--cta))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] transition"
            style={{ fontSize: "1em" }}
          >
            <Mail size={20} />
            <span>Get in Touch</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="mt-10 flex flex-col items-center text-[rgb(var(--copy-secondary))] select-none space-y-1"
          style={{ fontSize: "0.9em" }}
        >
          <motion.span
            className="block"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            aria-hidden="true"
            style={{ fontSize: "1.6em" }}
          >
            ⌄
          </motion.span>
          <span className="tracking-wide">Scroll to explore</span>
        </motion.div>
      </div>

      {/* Scroll Below: HeroSnippet & PortfolioSection */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.6 }}
        className="mt-24"
        style={{ minHeight: "520px" }}
      >
        <HeroSnippet />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 3.0 }}
        className="mt-16"
        style={{ minHeight: "520px" }}
      >
        <PortfolioSection />
      </motion.div>
    </section>
  );
};

export default HeroSection;
