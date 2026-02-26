
const Logo: React.FC = () => {
  // const { isDarkMode } = useDarkMode();
  const { isDarkMode } = { isDarkMode: false }; // Placeholder for the actual dark mode hook

  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <div className="mx-auto">
      <img
        src={src}
        alt="Logo"
        draggable={false}
        className="h-24 w-auto select-none pointer-events-none inline-block" />
    </div>
  );
}

export default Logo;