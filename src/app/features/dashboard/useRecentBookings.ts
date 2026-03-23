import { api } from "@/api/booking";
import type { ODataResponse } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  let numDays = Number(searchParams.get("last"));
  numDays = numDays === 0 ? 7 : numDays;

  const queryDate = subDays(new Date(), numDays).toISOString();

  return useQuery({
    queryKey: ["recentBookings", numDays],
    queryFn: async () =>
      api.getBookingsAfterDate(queryDate) as unknown as Promise<
        ODataResponse<{
          CreatedAt: string;
          TotalPrice: number;
          ExtrasPrice: number;
        }>
      >,
  });
}
