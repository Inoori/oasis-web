import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserIconProps = {
  icon?: string;
  className?: string;
} & React.ComponentProps<typeof Avatar>;

const defaultAvatar = "default-user.jpg";

export default function UserIcon({ icon, className, ...props }: UserIconProps) {
  return (
    <Avatar className={cn("hover:cursor-pointer", className)} {...props}>
      {/* grayscale */}
      <AvatarImage
        src={icon || defaultAvatar}
        alt="User Avatar"
        className="object-cover"
      />
      <AvatarFallback>User Avatar</AvatarFallback>
    </Avatar>
  );
}
