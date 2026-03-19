import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  return (
    <header className="flex h-auto max-w-full flex-row items-center justify-between p-2">
      <SidebarTrigger className="size-5 hover:cursor-pointer" />
      <div className="flex">
        <ThemeToggle />
      </div>
    </header>
  );
}
