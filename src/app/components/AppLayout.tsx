import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";


const AppLayout: React.FC = () => (
  <div className="grid relative h-screen grid-cols-[16.25rem_1fr] grid-rows-[auto_1fr]">
    <Header />
    <Sidebar />
    <main className="bg-gray-50 pt-10 px-12 pb-16 overflow-auto">
      <div className="max-w-480 my-0 mx-auto flex flex-col gap-8">
        <Outlet />
      </div>
    </main>
  </div>
);

export default AppLayout;