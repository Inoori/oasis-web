import Stats from "./Stats";
import TodayActivity from "../check-in-out/TodayActivity";
import { cn } from "@/lib/utils";
import DurationChart from "./DurationChart";
import { DASHBOARD_QUERY_KEYS, useDashboardQuery } from "./useDashBoardQuery";
import AsyncBoundary from "@/components/AsyncBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useIsFetching } from "@tanstack/react-query";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
export default function DashboardLayout() {
  const [recentBookingResponse, recentStaysResponse, cabinsResponse] =
    useDashboardQuery();

  // 监测所有与 dashboard 相关的查询是否正在进行中
  const isDashboardFetching =
    useIsFetching({ queryKey: [DASHBOARD_QUERY_KEYS] }) > 0;

  // const isDashboardFetching = true;

  const bookings = recentBookingResponse.data.value || [];
  const confirmStays = recentStaysResponse.data?.confirmStays || [];
  const numDays = recentStaysResponse.data?.numDays || 7;
  const cabinCount = cabinsResponse.data["@odata.count"] || 0;

  return (
    <LayoutGroup>
      <motion.div layout className="flex flex-col items-center gap-6">
        {isDashboardFetching ? (
          <motion.div
            key="dashboard-spinner"
            layout
            className="pointer-events-none"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Spinner className="size-8 text-muted-foreground" />
          </motion.div>
        ) : null}
        <motion.div
          layout
          className={cn(
            "grid min-w-120 grid-cols-2 grid-rows-[auto_auto_26rem_26rem_auto] gap-4",
            "md:grid-cols-2 md:grid-rows-[auto_auto_26rem_26rem_auto] md:gap-4",
            "xl:min-w-6xl xl:grid-cols-4 xl:grid-rows-[auto_26rem_auto] xl:gap-6"
          )}
        >
          <Stats
            bookings={bookings}
            confirmedStays={confirmStays}
            numDays={numDays}
            cabinCount={cabinCount}
          />

          <AsyncBoundary
            fallback={
              <div className="col-span-2 flex flex-col gap-6 pt-6 pr-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            }
          >
            <TodayActivity />
          </AsyncBoundary>

          <DurationChart confirmedStays={confirmStays} />
          {/* Todo */}
          {/* <SalesChart/> */}
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}
