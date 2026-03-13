import HeaderMenu from "@/components/HeaderMenu";
import UserAvatar from "@/features/authentication/UserAvatar";

const Header: React.FC = () => (
  <header className="flex items-center justify-end gap-6 border border-solid border-gray-100 bg-white p-[0.75rem_3rem]">
    <UserAvatar />
    <HeaderMenu />
  </header>
);

export default Header;
