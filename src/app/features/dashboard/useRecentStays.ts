import { api } from "@/api/booking";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import type { BookingWithRelations } from "../bookings/BookingTable";
import type { ODataResponse } from "@/api/query";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  let numDays = Number(searchParams.get("last"));
  numDays = numDays === 0 ? 7 : numDays;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isPending } = useQuery({
    queryKey: ["recentStays", numDays],
    queryFn: async () =>
      api.getStaysAfterDate(queryDate) as unknown as Promise<
        ODataResponse<BookingWithRelations>
      >,
  });

  const confirmStays = stays?.value?.filter(
    (stay) => stay.Status === "CheckedIn" || stay.Status === "CheckedOut"
  );

  return { stays, confirmStays, isPending, numDays };
}
