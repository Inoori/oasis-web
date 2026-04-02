import type { User } from "@/api/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileIconProps = {
  user: User;
};

const defaultAvatar = "default-user.jpg";

export default function ProfileSidebar({ user }: ProfileIconProps) {
  const avatar = user.avatar;

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div>
        <Avatar className="size-66 justify-self-center">
          {/* grayscale */}
          <AvatarImage
            src={avatar || defaultAvatar}
            alt="User Avatar"
            className="object-cover"
          />
          <AvatarFallback>User Avatar</AvatarFallback>
        </Avatar>
      </div>

      <div className="text-lg font-medium text-accent-foreground capitalize">
        {user.userName}
      </div>
    </div>
  );
}
