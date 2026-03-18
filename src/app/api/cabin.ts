import request from "@/lib/axiosInstance"; // 上面创建的实例
import type { QueryParams } from "./query";

export type Cabin = {
  Id?: number;
  Name?: string;
  MaxCapacity?: number;
  RegularPrice?: number;
  Discount?: number;
  Image?: string;
  Description?: string;
};

export const api = {
  getCabins: ({ $select, $filter }: QueryParams = {}) =>
    request.get(
      `/odata/cabins${$select ? `?$select=${$select}` : ""}${$filter ? `&$filter=${$filter}` : ""}`
    ),

  deleteCabin: (id: number) => request.delete(`/api/cabins/${id}`),

  deleteCabins: () => request.delete("/api/cabins"),

  createCabin: (cabin: Cabin) => request.post("/api/cabins", cabin),

  updateCabin: (cabin: Cabin) => request.put(`/api/cabins/${cabin.Id}`, cabin),

  uploadCabins: (cabins: Cabin[]) => request.post("/api/cabins/upload", cabins),
};
