import DashboardFilter from "@/features/dashboard/DashboardFilter";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import AsyncBoundary from "@/components/AsyncBoundary";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <DashboardFilter />
      </div>
      <AsyncBoundary>
        <DashboardLayout />
      </AsyncBoundary>
    </div>
  );
}
