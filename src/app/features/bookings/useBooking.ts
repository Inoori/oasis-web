import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { api, type Booking } from "@/api/booking";
import { toast } from "react-toastify";
import type { ODataResponse, QueryParams } from "@/api/query";
import { useParams } from "react-router-dom";
import { errorHandle } from "@/lib/errorHandle";

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

export function useBookingSuspense() {
  const { id } = useParams();
  if (!id) throw new Error("Booking ID is required");

  return useSuspenseQuery({
    queryKey: [BOOKINGS_TABLE, id],
    queryFn: () =>
      api.getBookings({
        $filter: `Id eq ${id}`,
        $expand:
          "Cabin($select=Name),Guest($select=FullName,Email,CountryFlag,NationalID)",
      }) as unknown as Promise<ODataResponse<Booking>>,
  });
}

/**
 * 入住预订的 Hook
 * @param id 预订 ID
 * @returns
 */
export function useCheckInBooking(id: bigint) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.checkInBooking(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [BOOKINGS_TABLE, id] });
      queryClient.invalidateQueries({ queryKey: [BOOKINGS_TABLE] });
    },
    onError: (error: unknown) =>
      errorHandle(error)
        ? undefined
        : toast.error(`Failed to check in booking: ${error}`),
  });
}

/**
 * 退房预订的 Hook
 * @param id
 * @returns
 */
export function useCheckOutBooking(id: bigint) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.checkOutBooking(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [BOOKINGS_TABLE, id] });
      queryClient.invalidateQueries({ queryKey: [BOOKINGS_TABLE] });
    },
    onError: (error: unknown) =>
      errorHandle(error)
        ? undefined
        : toast.error(`Failed to check out booking: ${error}`),
  });
}

/**
 * 取消确认预订的 Hook
 * @param id
 * @returns
 */
export function useUnConfirmBooking(id: bigint) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.unConfirmBooking(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [BOOKINGS_TABLE, id] });
      queryClient.invalidateQueries({ queryKey: [BOOKINGS_TABLE] });
    },
    onError: (error: unknown) =>
      errorHandle(error)
        ? undefined
        : toast.error(`Failed to unconfirm booking: ${error}`),
  });
}
