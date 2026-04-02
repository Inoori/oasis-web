import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={cn(
        "flex h-7 w-12 cursor-pointer flex-row items-center rounded-full bg-accent px-0.5",
        theme === "light" ? "justify-start" : "justify-end"
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <motion.div
        className="rounded-full bg-primary-foreground p-1 text-primary"
        layout
        transition={{ type: "spring", visualDuration: 0.4, bounce: 0.2 }}
      >
        {theme === "light" ? (
          <HiOutlineSun className="size-5" />
        ) : (
          <HiOutlineMoon className="size-5" />
        )}
      </motion.div>
    </button>
  );
}
