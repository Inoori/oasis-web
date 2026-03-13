import { Spinner } from "@/components/ui/spinner";
import { useBookings } from "./useBooking";
import { useParams } from "react-router-dom";
import BookingBadge from "./BookingBadge";
import { Button } from "@/components/ui/button";
import { HiArrowLeft } from "react-icons/hi2";

export default function BookingDetail() {
  const { id } = useParams();
  const { data: bookings, isPending } = useBookings({
    $filter: `Id eq ${id}`,
    $expand:
      "Cabin($select(Name)),Guest($select(FullName,Email,CountryFlag,NationalID))",
  });

  const booking = bookings?.[0];

  if (isPending) return <Spinner className="mx-auto size-12" />;

  if (!booking) return <p>Booking could not be found</p>;

  return (
    <>
      <div className="flex w-full flex-row flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <h1 className="text-3xl font-bold">{`Booking #${booking.Id}`}</h1>
          <BookingBadge status={booking.Status} />
        </div>
        <Button
          variant="ghost"
          className="rounded-sm text-center font-medium transition-all duration-300"
        >
          <HiArrowLeft className="mr-1 text-accent-foreground" />
          Back
        </Button>
      </div>
    </>
  );
}
