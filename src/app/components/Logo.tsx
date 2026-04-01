import { useTheme } from "./theme-provider";

const Logo: React.FC = () => {
  const { theme } = useTheme();

  const src = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return (
    <div className="mx-auto pt-2">
      <img
        src={src}
        alt="Logo"
        draggable={false}
        className="pointer-events-none inline-block h-24 w-auto select-none"
      />
    </div>
  );
};

export default Logo;
