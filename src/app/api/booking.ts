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

  createBookings: (bookings: Booking[]) =>
    request.post("/odata/bookings/batch", bookings),

  deleteBookings: () => request.delete("/api/bookings"),

  updateBookingStatus: (id: number, status: Booking["Status"]) =>
    request.post(`/api/bookings/${id}/status`, { status: status }),
};
