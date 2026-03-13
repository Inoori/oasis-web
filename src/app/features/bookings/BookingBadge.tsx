import type { Booking } from "@/api/booking";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function BookingBadge({
  status,
}: {
  status: Booking["Status"];
}) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "w-24 text-center",
        status === "UnConfirmed" ? "bg-sky-500" : "",
        status === "CheckedIn" ? "bg-green-500" : "",
        status === "CheckedOut" ? "bg-gray-500" : ""
      )}
    >
      {status}
    </Badge>
  );
}
