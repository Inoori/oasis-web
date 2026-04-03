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
import { GoPerson, GoSignOut, GoSun, GoMoon } from "react-icons/go";
import UserIcon from "@/components/UserIcon";
import { FaGithub } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { useAuthStore } from "@/store/authStore";

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

export default function UserAvatar() {
  const { theme, setTheme } = useTheme();

  const user = useAuthStore((state) => state.user);
  const signout = useAuthStore((state) => state.logout);

  const navgae = useNavigate();

  if (!user) return null;

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
          <DropdownMenuItem
            onClick={() => {
              signout();
              navgae("/login");
            }}
          >
            <GoSignOut className="stroke-1" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
