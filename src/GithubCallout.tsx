import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";

const GithubCallout: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.2 }}
      className="mt-12 flex flex-col items-center select-none"
      style={{ fontSize: "calc(var(--user-font-size) * 0.9)" }}
    >
      {/* Bouncing Down Arrow */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ChevronsDown
          size={24}
          strokeWidth={1.5}
          className="text-[rgb(var(--copy-secondary))] opacity-70"
        />
      </motion.div>

      {/* Underlined Label */}
      <span
        className="mt-2 relative text-[rgb(var(--copy-secondary))] font-medium tracking-wide cursor-default"
        style={{ fontSize: "calc(var(--user-font-size) * 0.9)" }}
      >
        <span className="pb-0.5">GitHub Info</span>
        <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-[rgb(var(--copy-secondary))] transition-all duration-300 -translate-x-1/2 group-hover:w-3/4"></span>
      </span>
    </motion.div>
  );
};

export default GithubCallout;
