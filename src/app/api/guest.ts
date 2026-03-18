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
  
  getGuests: ({ $select, $filter }: QueryParams = {}) =>
    request.get(
      `/odata/guests${$select ? `?$select=${$select}` : ""}${$filter ? `&$filter=${$filter}` : ""}`
    ),


  uploadGuests: (guests: Guest[]) => request.post("/api/guests/upload", guests),

  deleteGuests: () => request.delete("/api/guests"),

  getAllGuestsIds: () => request.get("/odata/guests?$select=id"),
};
