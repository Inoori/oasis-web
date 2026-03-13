import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  return (
    <header className="flex h-10 max-w-full flex-row items-center justify-between px-2">
      <SidebarTrigger className="hover:cursor-pointer" />
      <div className="flex">
        <ThemeToggle />
      </div>
    </header>
  );
}
