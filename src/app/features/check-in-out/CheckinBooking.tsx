import { useMoveBack } from "@/hooks/useMoveBack";
import { useEffect, useState } from "react";
import { useBooking, useUpdateBookingStatus } from "../bookings/useBooking";
import type { BookingWithRelations } from "../bookings/BookingTable";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import BookingDataBox from "../bookings/BookingDataBox";
import { formatCurrency } from "@/lib/helps";
import { Label } from "@/components/ui/label";
import { HiArrowDownOnSquare, HiArrowLeft } from "react-icons/hi2";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";

export default function CheckinBooking() {
  const moveBack = useMoveBack();

  const { data, isPending } = useBooking();

  const booking = data?.value?.[0] as BookingWithRelations;

  const [confirmPaid, setConfirmPaid] = useState(booking?.IsPaid || false);

  const { mutate: updateBookingStatus, isPending: isUpdating } =
    useUpdateBookingStatus(booking?.Id as unknown as number);

  if (!booking) return null;

  const { Id: bookingId, Guest, TotalPrice } = booking;

  if (isPending) return <Spinner className="mx-auto size-12" />;

  return (
    <>
      <h1 className="text-3xl font-bold">Check in booking #{bookingId}</h1>

      <BookingDataBox booking={booking} />

      <div className="mt-4 flex gap-4 pl-1">
        <Checkbox
          id="confirmPaid"
          name="confirmPaid"
          disabled={booking?.IsPaid}
          className="size-5 data-[state=checked]:bg-indigo-500"
          checked={confirmPaid}
          onCheckedChange={(checked) => setConfirmPaid(checked === true)}
        />

        <Label
          htmlFor="confirmPaid"
          className="flex flex-1 flex-wrap items-center gap-2 text-red-500/80"
        >
          I confirm that <strong>{Guest?.FullName}</strong> has paid a total
          amount <strong>{formatCurrency(TotalPrice)}</strong>
        </Label>
      </div>

      <div className="mt-2 flex justify-end gap-3">
        <Button variant="outline" onClick={moveBack}>
          <HiArrowLeft />
          Back
        </Button>

        <Button
          disabled={isUpdating || !confirmPaid}
          onClick={() =>
            updateBookingStatus("CheckedIn", {
              onSuccess: () => {
                toast.success("Checked in successfully");
                moveBack();
              },
            })
          }
        >
          {isUpdating ? (
            <Spinner className="size-4" />
          ) : (
            <HiArrowDownOnSquare className="size-4" />
          )}
          Check in
        </Button>
      </div>
    </>
  );
}
