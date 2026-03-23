import { Spinner } from "@/components/ui/spinner";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Stats from "./Stats";
import TodayActivity from "../check-in-out/TodayActivity";
import { cn } from "@/lib/utils";
import DurationChart from "./DurationChart";

export default function DashboardLayout() {
  const { data: bookingResponse, isPending } = useRecentBookings();

  const { confirmStays, numDays, isPending: isStaysPending } = useRecentStays();

  const { data: cabins, isPending: isCabinsPending } = useCabins();

  if (isPending || isStaysPending || isCabinsPending)
    return <Spinner className="size-4" />;

  const bookings = bookingResponse?.value || [];

  return (
    <>
      <div
        className={cn(
          "grid min-w-120 grid-cols-2 grid-rows-[auto_auto_22rem_auto] gap-4",
          "md:grid-cols-2 md:grid-rows-[auto_auto_22rem_auto] md:gap-4",
          "xl:min-w-6xl xl:grid-cols-4 xl:grid-rows-[auto_22rem_auto] xl:gap-6"
        )}
      >
        <Stats
          bookings={bookings}
          confirmedStays={confirmStays!}
          numDays={numDays}
          cabinCount={cabins!.value.length}
        />
        <TodayActivity />
        <DurationChart confirmedStays={confirmStays!} />
        {/* Todo */}
        {/* <SalesChart/> */}
      </div>
    </>
  );
}
