import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import { GoPerson, GoSignOut, GoSun, GoMoon } from "react-icons/go";
import UserIcon from "@/components/UserIcon";
import { FaGithub } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserAvatarMenus from "./UserAvatarMenus";

const UserAvatar1: React.FC = () => {
  const avatar = "default-user.jpg";
  const fullName = "UserAvatar";

  return (
    <div className="flex items-center gap-5 text-sm font-medium text-grey-600">
      <img
        src={avatar}
        alt={fullName || "User Avatar"}
        className="block aspect-square w-9 rounded-full object-cover object-center outline-2 outline-grey-100"
      />
      <span>{fullName}</span>
    </div>
  );
};

export function UserAvatar2() {
  const { theme, setTheme } = useTheme();

  const user = useAuthStore((state) => state.user);
  const signout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex size-11 items-center justify-center rounded-full transition-colors duration-300 hover:bg-accent">
          <UserIcon icon={user.avatar} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 border border-ring/30">
        <header className="flex h-16 flex-row items-center gap-3 p-1">
          <UserIcon icon={user.avatar} />
          <span className="text-lg font-medium text-accent-foreground">
            {user.userName}
          </span>
        </header>

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NavLink to="/profile">
              <GoPerson className="stroke-primary stroke-[0.5px]" />
              <span className="text-sm font-medium">Profile</span>
            </NavLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* <DropdownMenuItem>Theme</DropdownMenuItem> */}

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div>
                {theme === "light" ? (
                  <GoSun className="stroke-primary stroke-[0.5px]" />
                ) : (
                  <GoMoon className="stroke-primary stroke-[0.5px]" />
                )}
              </div>
              <span className="text-sm font-medium">Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <GoSun className="stroke-primary stroke-[0.5px]" />
                  <span className="text-sm font-medium">Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <GoMoon className="stroke-primary stroke-[0.5px]" />
                  <span className="text-sm font-medium">Dark</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              window.open("https://github.com/", "_blank");
            }}
          >
            <FaGithub className="stroke-primary stroke-[0.5px]" />
            <span className="text-sm font-medium">GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              signout();
              navigate("/login");
            }}
          >
            <GoSignOut className="stroke-primary stroke-[0.5px]" />
            <span className="text-sm font-medium">Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const defaultAvatar = "default-user.jpg";

export default function UserAvatar() {
  // const { theme, setTheme } = useTheme();

  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex size-11 items-center justify-center rounded-full transition-colors duration-300 hover:bg-accent">
          <UserIcon icon={user.avatar} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex min-w-sm flex-col p-0">
        <div className="flex flex-row items-center gap-5 p-4">
          <Avatar className="size-24 justify-self-center">
            {/* grayscale */}
            <AvatarImage
              src={user.avatar || defaultAvatar}
              alt="User Avatar"
              className="object-cover"
            />
            <AvatarFallback>User Avatar</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-primary">
              {user.userName}
            </h3>
            <div className="text-sm text-accent-foreground"> {user.email}</div>
            <NavLink to="/profile" className="text-sm text-blue-400 underline">
              Profile
            </NavLink>
          </div>
        </div>

        <UserAvatarMenus />
      </PopoverContent>
    </Popover>
  );
}
