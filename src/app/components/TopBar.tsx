import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  return (
    <header className="flex min-h-12 max-w-full flex-row items-center justify-end p-2">
      <div className="flex">
        <ThemeToggle />
      </div>
    </header>
  );
}
