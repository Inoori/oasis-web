import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex cursor-pointer rounded-full p-1 transition-colors duration-300 hover:bg-accent"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <HiOutlineSun className="h-5 w-5" />
      ) : (
        <HiOutlineMoon className="h-5 w-5" />
      )}
    </div>
  );
}
