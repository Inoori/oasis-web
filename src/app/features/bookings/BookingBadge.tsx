import type { Booking } from "@/api/booking";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function BookingBadge({
  status,
  className,
}: {
  status: Booking["Status"];
  className?: string;
}) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "w-24 text-center",
        status === "UnConfirmed" ? "bg-sky-500/90 text-sky-50" : "",
        status === "CheckedIn" ? "bg-green-500/90 text-green-50" : "",
        status === "CheckedOut" ? "bg-gray-500/90 text-gray-50" : "",
        className
      )}
    >
      {status}
    </Badge>
  );
}
