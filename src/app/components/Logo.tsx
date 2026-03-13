import { useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "./theme-provider";

const Logo: React.FC = () => {
  const { open } = useSidebar();

  const { theme } = useTheme();

  const src = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return open ? (
    <div className="mx-auto pt-2">
      <img
        src={src}
        alt="Logo"
        draggable={false}
        className="pointer-events-none inline-block h-24 w-auto select-none"
      />
    </div>
  ) : (
    <div className="flex h-12 items-center justify-center">
      <Avatar>
        {/* grayscale */}
        <AvatarImage
          src="./logo-avatar.png"
          alt="Logo"
          className="object-cover"
        />
        <AvatarFallback>Logo</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Logo;
