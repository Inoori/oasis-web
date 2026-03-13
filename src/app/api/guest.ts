import request from "@/lib/axiosInstance"; // 上面创建的实例
import type { QueryParams } from "./query";

export type Guest = {
  Id?: number;
  FullName?: string;
  Email?: string;
  Nationality?: string;
  NationalID?: string;
  CountryFlag?: string;
};

export const api = {
  createGuests: (guests: Guest[]) =>
    request.post("/odata/guests/batch", guests),
  deleteGuests: () => request.delete("/api/guests"),

  getGuests: ({ $select, $filter }: QueryParams = {}) =>
    request.get(
      `/odata/guests${$select ? `?$select=${$select}` : ""}${$filter ? `&$filter=${$filter}` : ""}`
    ),

  getAllGuestsIds: () => request.get("/odata/guests?$select=id"),
};
