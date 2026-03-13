import { TableCell, TableRow } from "@/components/ui/table";
import type { BookingWithRelations } from "./BookingTable";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "@/lib/helps";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { HiEye } from "react-icons/hi2";
import BookingDropDownMenus from "./BookingDropDownMenus";
import BookingBadge from "./BookingBadge";

export default function BookingRow({
  booking,
}: {
  booking: BookingWithRelations;
}) {
  return (
    <TableRow>
      <TableCell>{booking.Cabin.Name}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">{booking.Guest.FullName}</span>
          <span className="text-xs text-accent-foreground/60">
            {booking.Guest.Email}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">
            {isToday(new Date(booking.StartDate!))
              ? "Today"
              : formatDistanceFromNow(booking.StartDate!)}{" "}
            &rarr; {booking.NumNights} night stay
          </span>
          <span className="text-xs text-accent-foreground/60">
            {format(new Date(booking.StartDate!), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(booking.EndDate!), "MMM dd yyyy")}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <BookingBadge status={booking.Status} />
      </TableCell>

      <TableCell className="font-medium">
        {formatCurrency(booking.TotalPrice)}
      </TableCell>

      <TableCell>
        <BookingDropDownMenus booking={booking} />
      </TableCell>
    </TableRow>
  );
}
