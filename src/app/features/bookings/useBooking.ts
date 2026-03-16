import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type Booking } from "@/api/booking";
import { toast } from "react-toastify";
import type { ODataResponse, QueryParams } from "@/api/query";
import { useParams } from "react-router-dom";

export const BOOKINGS_TABLE = "bookings";

export function useBookings(query: QueryParams = {}) {
  return useQuery({
    queryKey: query.queryKey
      ? [BOOKINGS_TABLE, ...query.queryKey]
      : [BOOKINGS_TABLE],
    queryFn: () =>
      api.getBookings(query) as unknown as Promise<ODataResponse<Booking>>,
    retry: false,
  });
}

/**
 * 获取单个预订详情的 Hook
 * @returns
 */
export function useBooking() {
  const { id } = useParams();
  return useBookings({
    queryKey: [id!],
    $filter: `Id eq ${id}`,
    $expand:
      "Cabin($select=Name),Guest($select=FullName,Email,CountryFlag,NationalID)",
  });
}

/**
 * 更新预订状态的 Hook
 */
export function useUpdateBookingStatus(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: Booking["Status"]) =>
      api.updateBookingStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKINGS_TABLE] });
    },

    onError: (error: unknown) => {
      toast.error(`Failed to update booking status: ${error}`);
    },
  });
}
