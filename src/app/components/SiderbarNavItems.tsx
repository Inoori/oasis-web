import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface SiderbarNavItemProps {
  /**
   * Icon - 用于显示的图标组件，通常为 React 图标组件
   */
  Icon: React.ReactNode;

  /**
   * to - 点击导航项时跳转的路径，传递给 NavLink 的 to 属性
   */
  to: string;

  /**
   * label - 显示在图标旁边的文本标签
   */
  label: string;
}

/**
 * 导航项数据数组，包含每个导航项的标签、路径和图标组件
 */
const navItems: SiderbarNavItemProps[] = [
  {
    label: "Home",
    to: "/dashboard",
    Icon: <HiOutlineHome />,
  },
  {
    label: "Bookings",
    to: "/bookings",
    Icon: <HiOutlineCalendarDays />,
  },
  {
    label: "Cabins",
    to: "/cabins",
    Icon: <HiOutlineHomeModern />,
  },
  {
    label: "Users",
    to: "/users",
    Icon: <HiOutlineUsers />,
  },
  {
    label: "Settings",
    to: "/settings",
    Icon: <HiOutlineCog6Tooth />,
  },
];

export default function SiderbarNavItems() {
  const { open } = useSidebar();

  return navItems.map((item) => (
    <SidebarMenuItem key={item.to} className="list-none overflow-hidden">
      {open ? (
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            `group/nav-link flex items-center gap-3 px-1.5 py-2 text-sm font-medium text-primary transition-all duration-300 group-hover/menu-item:rounded-sm group-hover/menu-item:bg-secondary/90 group-hover/menu-item:text-primary ${isActive ? "active rounded-sm bg-secondary/90 text-primary" : ""} `
          }
        >
          <span
            className={`[&>svg]:size-5 [&>svg]:text-primary [&>svg]:transition-all [&>svg]:duration-300 group-hover/menu-item:[&>svg]:text-indigo-600 group-[.active]/nav-link:[&>svg]:text-indigo-600`}
          >
            {item.Icon}
          </span>
          {open && (
            <span className="group-hover/menu-item:text-primary">
              {item.label}
            </span>
          )}
        </NavLink>
      ) : (
        <Tooltip key={item.to}>
          <TooltipTrigger>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `group/nav-link flex items-center gap-3 px-1.5 py-2 text-sm font-medium text-primary transition-all duration-300 group-hover/menu-item:rounded-sm group-hover/menu-item:bg-secondary/90 group-hover/menu-item:text-primary ${isActive ? "active rounded-md bg-secondary/90 text-primary" : ""} `
              }
            >
              <span
                className={`[&>svg]:size-5 [&>svg]:text-primary [&>svg]:transition-all [&>svg]:duration-300 group-hover/menu-item:[&>svg]:text-indigo-600 group-[.active]/nav-link:[&>svg]:text-indigo-600`}
              >
                {item.Icon}
              </span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      )}
    </SidebarMenuItem>
  ));
}
