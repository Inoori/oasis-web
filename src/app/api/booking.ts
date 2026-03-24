import request from "@/lib/axiosInstance"; // 上面创建的实例
import type { QueryParams } from "./query";
import { getToday } from "@/lib/helps";

export type Booking = {
  Id?: bigint;
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
  CabinID?: bigint;
  GuestID?: bigint;
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

  checkInBooking: (id: bigint) => request.post(`/api/bookings/${id}/checkin`),

  checkOutBooking: (id: bigint) => request.post(`/api/bookings/${id}/checkout`),

  unConfirmBooking: (id: bigint) =>
    request.post(`/api/bookings/${id}/unconfirm`),

  getBookingsAfterDate: (date: string) =>
    request.get(
      `/odata/bookings?$filter=CreatedAt ge ${date} and CreatedAt le ${getToday({ end: true })}&$select=CreatedAt,TotalPrice,ExtrasPrice`
    ),

  getStaysAfterDate: (date: string) =>
    request.get(
      `/odata/bookings?$expand=Guest($select=FullName)&$filter=StartDate ge ${date} and StartDate le ${getToday()} `
    ),

  getStaysTodayActivity: () =>
    request.get(
      `/odata/bookings?$expand=Guest($select=FullName,Nationality,CountryFlag)&$filter=((Status eq 0 and StartDate eq ${getToday()}) or (Status eq 1 and EndDate eq ${getToday()}))&$orderby=CreatedAt`
    ),
};
