import { useAuthStore } from "@/store/authStore";
import { GoSignOut } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import type { UserAvatarMenuItemProps } from "./UserAvatarMenuItem";
import UserAvatarMenuItem from "./UserAvatarMenuItem";

export default function UserAvatarMenus() {
  const signout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const menus: UserAvatarMenuItemProps[] = [
    {
      label: "Sign out",
      icon: <GoSignOut className="size-5 stroke-primary stroke-[0.5px]" />,
      onClick: () => {
        signout(); //TODO: add confirmation dialog before sign out
        navigate("/login");
      },
    },
  ];

  return (
    <ul>
      {menus.map((menu, index) => (
        <UserAvatarMenuItem key={index} {...menu} />
      ))}
    </ul>
  );
}
