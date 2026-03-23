import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookingRow from "./BookingRow";
import { cn } from "@/lib/utils";
import { useBookings } from "./useBooking";
import { Spinner } from "@/components/ui/spinner";
import type { Booking } from "@/api/booking";
import type { Cabin } from "@/api/cabin";
import type { Guest } from "@/api/guest";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import Error from "../cabins/Error";

export interface BookingWithRelations extends Booking {
  Cabin: Cabin;
  Guest: Guest;
}

export default function BookingTable() {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("Status");
  const sort = searchParams.get("sort");

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const { data, isLoading, error } = useBookings({
    queryKey: ["page", currentPage, "status", status, "sort", sort],
    $skip: (currentPage - 1) * 10,
    $top: 10,
    $expand: "Cabin,Guest",
    $count: true,
    $filter: status ? `Status eq '${status}'` : undefined,
    $orderby: sort ? sort : undefined,
  });

  const bookings = data?.value as unknown as BookingWithRelations[]; // 直接断言为包含关系的类型

  if (isLoading) return <Spinner className="mx-auto size-12" />;

  if (error) return <Error message={error.message} />;

  return (
    <>
      <div className={cn("h-150 rounded-md border")}>
        <Table className="font-[Sono]">
          <TableHeader>
            <TableRow>
              <TableHead>Cabin</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.map((booking) => (
              <BookingRow key={booking.Id} booking={booking} />
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        dataLength={data!["@odata.count"]!}
        pageSize={10}
        className="mt-4"
      />
    </>
  );
}
