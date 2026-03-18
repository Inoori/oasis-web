import { Spinner } from "@/components/ui/spinner";
import { useBooking, useCheckOutBooking } from "./useBooking";
import { Link } from "react-router-dom";
import BookingBadge from "./BookingBadge";
import { Button } from "@/components/ui/button";
import { HiArrowDownOnSquare, HiArrowLeft } from "react-icons/hi2";
import { useMoveBack } from "@/hooks/useMoveBack";
import BookingDataBox from "./BookingDataBox";
import type { BookingWithRelations } from "./BookingTable";
import { toast } from "react-toastify";

export default function BookingDetail() {
  const { data, isPending } = useBooking();

  const moveBack = useMoveBack();

  const booking = data?.value?.[0] as BookingWithRelations;

  const { mutate: checkOutBooking, isPending: isUpdating } = useCheckOutBooking(
    booking?.Id as unknown as number
  );

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

      <div className="mt-4 flex justify-end gap-3">
        <Button variant="outline" onClick={moveBack}>
          <HiArrowLeft />
          Back
        </Button>
        {booking.Status === "UnConfirmed" && (
          <Link to={`/bookings/${booking.Id}/checkin`}>
            <Button>
              <HiArrowDownOnSquare />
              Check in
            </Button>
          </Link>
        )}

        {booking.Status === "CheckedIn" && (
          <Button
            disabled={isUpdating}
            onClick={() =>
              checkOutBooking(undefined, {
                onSuccess: () => {
                  toast.success("Checked out successfully");
                },
              })
            }
          >
            {isUpdating && <Spinner className="size-4" />}
            Check out
          </Button>
        )}
      </div>
    </>
  );
}
