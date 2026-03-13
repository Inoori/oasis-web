import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo";

import SiderbarNavItems from "@/components/SiderbarNavItems";
import { cn } from "@/lib/utils";
import Uploader from "@/data/Uploader";

export default function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="items-center justify-center duration-100"
    >
      <SidebarHeader className="transition-all duration-300">
        <Logo />
      </SidebarHeader>
      <SidebarGroup>
        <SidebarContent
          className={cn(
            "overflow-hidden transition-all duration-300",
            open && "mt-7 pl-6",
            !open && "mt-4 items-center gap-8"
          )}
        >
          <SiderbarNavItems />
        </SidebarContent>
      </SidebarGroup>

      <SidebarFooter className="mt-auto px-2 py-12 transition-all duration-300">
        <Uploader />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
