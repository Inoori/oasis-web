import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type LogoSmallProps = {
  className?: string;
};

export default function LogoSmall({ className }: LogoSmallProps) {
  return (
    <div className={cn(`flex h-12 items-center justify-center`, className)}>
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
}
