import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function LogoSmall() {
  return (
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
}
