import { api as bookingApi } from "@/api/booking";
import { api as cabinApi, type Cabin } from "@/api/cabin";
import type { ODataResponse } from "@/api/query";
import { useSuspenseQueries } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import type { BookingWithRelations } from "../bookings/BookingTable";
import { CABINS_TABLE } from "../cabins/useCabins";

export const RECENT_BOOKINGS_QUERY_KEY = "recentBookings";
export const RECENT_STAYS_QUERY_KEY = "recentStays";
export const DASHBOARD_QUERY_KEYS = "dashboardQueries";

export function useDashboardQuery() {
  const [searchParams] = useSearchParams();
  let numDays = Number(searchParams.get("last"));
  numDays = numDays === 0 ? 7 : numDays;

  const queryDate = subDays(new Date(), numDays).toISOString();

  return useSuspenseQueries({
    queries: [
      {
        // 最近的预订
        queryKey: [DASHBOARD_QUERY_KEYS, RECENT_BOOKINGS_QUERY_KEY, numDays],
        staleTime: 30 * 1000, // 30秒
        queryFn: () =>
          bookingApi.getBookingsAfterDate(queryDate) as unknown as Promise<
            ODataResponse<{
              CreatedAt: string;
              TotalPrice: number;
              ExtrasPrice: number;
            }>
          >,
      },
      {
        // 最近的入住和退房
        queryKey: [DASHBOARD_QUERY_KEYS, RECENT_STAYS_QUERY_KEY, numDays],
        staleTime: 0,
        queryFn: async () => {
          const res = (await bookingApi.getStaysAfterDate(
            queryDate
          )) as unknown as ODataResponse<BookingWithRelations>;

          const confirmStays = res.value.filter(
            (stay) =>
              stay.Status === "CheckedIn" || stay.Status === "CheckedOut"
          );
          return { confirmStays, numDays };
        },
      },
      {
        // 小屋数量
        queryKey: [DASHBOARD_QUERY_KEYS, CABINS_TABLE],
        staleTime: 30 * 1000, // 30秒
        queryFn: () =>
          cabinApi.getCabins({ $count: true, $top: 0 }) as unknown as Promise<
            ODataResponse<Cabin>
          >,
      },
    ],
  });
}
