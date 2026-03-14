import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type Booking } from "@/api/booking";
import { toast } from "react-toastify";
import type { QueryParams } from "@/api/query";

export const BOOKINGS_TABLE = "bookings";

export function useBookings(query: QueryParams = {}) {
  return useQuery({
    queryKey: query.queryKey
      ? [...query.queryKey, BOOKINGS_TABLE]
      : [BOOKINGS_TABLE],
    queryFn: () => api.getBookings(query) as unknown as Promise<Booking[]>,
    retry: false,
  });
}
