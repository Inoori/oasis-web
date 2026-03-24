import { api } from "@/api/booking";
import type { ODataResponse } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import type { BookingWithRelations } from "../bookings/BookingTable";

export const TODAY_ACTIVITY_KEY = "todayActivity";

export function useTodayActivity() {
  return useQuery({
    queryKey: ["todayActivity"],
    queryFn: async () =>
      api.getStaysTodayActivity() as unknown as Promise<
        ODataResponse<BookingWithRelations>
      >,
  });
}
