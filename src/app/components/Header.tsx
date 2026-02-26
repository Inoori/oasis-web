import HeaderMenu from "@/components/HeaderMenu";
import UserAvatar from "@/features/authentication/UserAvatar";

const Header: React.FC = () => (
  <header className="flex gap-6 items-center justify-end bg-white  p-[0.75rem_3rem] border border-solid border-gray-100">
    <UserAvatar />
    <HeaderMenu />
  </header>
);

export default Header;