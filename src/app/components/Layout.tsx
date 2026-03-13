import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function Layout() {
  return (
    <div className="relative flex h-screen">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "16rem",
            "--sidebar-width-mobile": "16rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar />

        <div className="mx-4 flex w-full flex-col">
          <TopBar />
          <div
            id="container"
            className="grid flex-1 grid-cols-[0.5fr_3fr_0.7fr] py-24"
          >
            <main className="col-start-2 flex flex-col">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
