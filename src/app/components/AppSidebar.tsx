import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import SiderbarNavItems from "@/components/SiderbarNavItems";
import { cn } from "@/lib/utils";
import Uploader from "@/data/Uploader";
import LogoSmall from "./LogoSmall";

export default function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mt-4 flex flex-row justify-between p-2 transition-all duration-300">
        <LogoSmall className="block h-auto" />
        {open && <SidebarTrigger />}
      </SidebarHeader>
      <SidebarGroup className="mt-2">
        <SidebarContent
          className={cn("gap-3 overflow-hidden transition-all duration-300")}
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
