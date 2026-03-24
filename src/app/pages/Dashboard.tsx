import DashboardFilter from "@/features/dashboard/DashboardFilter";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/pages/ErrorPage";
import { Spinner } from "@/components/ui/spinner";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <DashboardFilter />
      </div>
      <Suspense fallback={<Spinner className="mx-auto size-12" />}>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <DashboardLayout />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
