import { Button } from "@/components/ui/button";
import BookingBadge from "../bookings/BookingBadge";
import type { BookingWithRelations } from "../bookings/BookingTable";
import { cn } from "@/lib/utils";

export default function TodayItem({ stay }: { stay: BookingWithRelations }) {
  const { Status, NumNights, Guest } = stay;

  return (
    <li
      className={cn(
        "grid items-center",
        // "grid-cols-1 gap-1.5 py-1.5 text-xs",
        // "md:grid-cols-[5.2rem_0.1fr_1fr_0.2fr_5rem] md:gap-3 md:py-2 md:text-sm"
        "grid-cols-[5.2rem_0.1fr_1fr_0.2fr_5rem] gap-3 py-2 text-sm"
      )}
    >
      <BookingBadge status={Status} className="w-auto" />
      <img
        src={Guest.CountryFlag}
        // alt={`Flag of ${Guest.}`}
        className="block max-w-5 rounded-sm border border-solid border-primary-foreground"
      />
      <div className="font-medium">{Guest.FullName}</div>
      <div>{NumNights}</div>
      {Status === "UnConfirmed" && <Button size={"xs"}>Check In</Button>}
      {Status === "CheckedIn" && <Button size={"xs"}>Check Out</Button>}
    </li>
  );
}
