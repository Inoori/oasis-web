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

export interface BookingWithRelations extends Booking {
  Cabin: Cabin;
  Guest: Guest;
}

export default function BookingTable() {
  const { data, isLoading } = useBookings({
    $skip: 0,
    $top: 2,
    $expand: "Cabin,Guest",
  });

  const bookings = data as unknown as BookingWithRelations[];

  if (isLoading) return <Spinner className="mx-auto size-12" />;

  return (
    <div className={cn("rounded-md border")}>
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
  );
}
