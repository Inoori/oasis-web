import { api } from "@/api/booking";
import type { ODataResponse } from "@/api/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { BookingWithRelations } from "../bookings/BookingTable";

export const TODAY_ACTIVITY_KEY = "todayActivity";

export function useTodayActivity() {
  return useSuspenseQuery({
    queryKey: [TODAY_ACTIVITY_KEY],
    staleTime: 0,
    queryFn: async () =>
      api.getStaysTodayActivity() as unknown as Promise<
        ODataResponse<BookingWithRelations>
      >,
  });
}
