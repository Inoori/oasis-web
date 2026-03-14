import { Spinner } from "@/components/ui/spinner";
import { useBookings } from "./useBooking";
import { Link, useParams } from "react-router-dom";
import BookingBadge from "./BookingBadge";
import { Button } from "@/components/ui/button";
import { HiArrowDownOnSquare, HiArrowLeft } from "react-icons/hi2";
import { useMoveBack } from "@/hooks/useMoveBack";
import BookingDataBox from "./BookingDataBox";
import type { BookingWithRelations } from "./BookingTable";

export default function BookingDetail() {
  const { id } = useParams();
  const { data: bookings, isPending } = useBookings({
    queryKey: [id!],
    $filter: `Id eq ${id}`,
    $expand:
      "Cabin($select=Name),Guest($select=FullName,Email,CountryFlag,NationalID)",
  });

  const moveBack = useMoveBack();

  const booking = bookings?.[0] as BookingWithRelations;

  if (isPending) return <Spinner className="mx-auto size-12" />;

  if (!booking) return <p>Booking could not be found</p>;

  return (
    <>
      <div className="flex w-full flex-row flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <h1 className="text-3xl font-bold">{`Booking #${booking.Id}`}</h1>
          <BookingBadge status={booking.Status} />
        </div>
      </div>

      <BookingDataBox booking={booking} />

      <div className="mt-2 flex justify-end gap-3">
        <Button variant="outline" onClick={moveBack}>
          <HiArrowLeft />
          Back
        </Button>
        {booking.Status === "UnConfirmed" && (
          <Link to={`/checkin/${booking.Id}`}>
            <Button>
              <HiArrowDownOnSquare />
              Check in
            </Button>
          </Link>
        )}

        {booking.Status === "CheckedIn" && (
          <Button disabled={false}>Check out</Button>
        )}
      </div>
    </>
  );
}
