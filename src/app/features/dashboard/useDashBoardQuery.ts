import { api } from "@/api/booking";
import type { ODataResponse } from "@/api/query";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  let numDays = Number(searchParams.get("last"));
  numDays = numDays === 0 ? 7 : numDays;




}
