import request from "@/lib/axiosInstance"; // 上面创建的实例
import type { QueryParams } from "./query";

export type Booking = {
  Id?: number;
  CreatedAt?: string;
  StartDate?: string;
  EndDate?: string;
  NumNights?: number;
  NumGuests?: number;
  CabinPrice?: number;
  ExtrasPrice?: number;
  TotalPrice?: number;
  Status?: "UnConfirmed" | "CheckedOut" | "CheckedIn";
  HasBreakfast?: boolean;
  IsPaid?: boolean;
  Observations?: string;
  CabinID?: number;
  GuestID?: number;
};

export const api = {
  getBookings: ({
    $select,
    $filter,
    $expand,
    $orderby,
    $top,
    $skip = 0,
    $count,
  }: QueryParams = {}) =>
    request.get(
      `/odata/bookings?$skip=${$skip}${$select ? `&$select=${$select}` : ""}${$filter ? `&$filter=${$filter}` : ""}${$expand ? `&$expand=${$expand}` : ""}${$orderby ? `&$orderby=${$orderby}` : ""}${$top ? `&$top=${$top}` : ""}${$count ? `&$count=${$count}` : ""}`
    ),

  uploadBookings: (bookings: Booking[]) =>
    request.post("/api/bookings/upload", bookings),

  deleteBookings: () => request.delete("/api/bookings"),

  checkInBooking: (id: number) => request.post(`/api/bookings/${id}/checkin`),

  checkOutBooking: (id: number) => request.post(`/api/bookings/${id}/checkout`),

  unConfirmBooking: (id: number) =>
    request.post(`/api/bookings/${id}/unconfirm`),
};
