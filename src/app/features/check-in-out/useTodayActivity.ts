import { api } from "@/api/booking";
import type { ODataResponse } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import type { BookingWithRelations } from "../bookings/BookingTable";

export function useTodayActivity() {
  return useQuery({
    queryKey: ["todayActivity"],
    queryFn: async () =>
      api.getStaysTodayActivity() as unknown as Promise<
        ODataResponse<BookingWithRelations>
      >,
  });
}
