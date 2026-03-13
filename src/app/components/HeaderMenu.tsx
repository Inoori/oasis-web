// import Logout from "@/features/authentication/Logout";
import ButtonIcon from "@/components/ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
// import DarkModeToggle from "@/components/DarkModeToggle";

const HeaderMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ul className="flex gap-2">
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      {/* todo: implement logout and dark mode toggle */}
      {/* <li>
        <Logout />
      </li>
      <li>
        <DarkModeToggle />
      </li> */}
    </ul>
  );
};
export default HeaderMenu;
