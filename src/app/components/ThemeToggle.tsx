import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex transition-colors duration-300 cursor-pointer p-1 rounded-full hover:bg-accent">
      {theme === "light" ? (
        <HiOutlineSun className="h-5 w-5" onClick={() => setTheme("dark")} />
      ) : (
        <HiOutlineMoon className="h-5 w-5" onClick={() => setTheme("light")} />
      )}
    </div>
  );
}
