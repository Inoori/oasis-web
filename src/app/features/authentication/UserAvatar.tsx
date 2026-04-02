import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineUser } from "react-icons/hi2";
import { GoPerson, GoSignOut, GoSun, GoMoon } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import UserIcon from "@/components/UserIcon";
import { useUser } from "./useUser";
import { FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";

const UserAvatar1: React.FC = () => {
  // const { user: { user_metadata: { fullName, avatar } = {} } = {} } = useUser();

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

export default function UserAvatar() {
  const { data: user, error } = useUser();
  const { theme, setTheme } = useTheme();

  if (error) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserIcon icon={user.avatar} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 border border-ring/30">
        <header className="flex h-16 flex-row items-center gap-3 p-1">
          <UserIcon icon={user.avatar} />
          <span>{user.userName}</span>
        </header>

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NavLink to="/profile">
              <GoPerson className="stroke-1" />
              <span>Profile</span>
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
                  <GoSun className="stroke-1" />
                ) : (
                  <GoMoon className="stroke-1" />
                )}
              </div>
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <GoSun className="stroke-1" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <GoMoon className="stroke-1" />
                  <span>Dark</span>
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
            <FaGithub className="stroke-1" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => useAuthStore.getState().logout()}>
            <GoSignOut className="stroke-1" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
