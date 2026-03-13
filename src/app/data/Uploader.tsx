import { useState } from "react";
import { api as cabinApi } from "@/api/cabin";
import { api as guestApi } from "@/api/guest";
import { api as bookingApi } from "@/api/booking";

import { cabins } from "@/data/data-cabins";
import { bookings } from "@/data/data-bookings";
import { guests } from "@/data/data-guests";
import { Button } from "@/components/ui/button";
import Pannel from "@/components/Pannel";
import { toast } from "react-toastify";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { subtractDates } from "@/lib/helps";
import { isFuture, isPast, isToday } from "date-fns";

async function createBookings() {
  const allGuestIds = (
    (await guestApi.getGuests({ $select: "id" })) as unknown as { Id: number }[]
  ).map((item) => item.Id);
  const allCabinIds = (
    (await cabinApi.getCabins({ $select: "id" })) as unknown as { Id: number }[]
  ).map((item) => item.Id);

  const finalBookings = bookings.map((booking, index) => {
    const cabin = cabins.at(booking.cabinID - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin!.regularPrice - cabin!.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "CheckedOut";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "Unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "CheckedIn";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestID: allGuestIds.at(booking.guestID - 1),
      cabinID: allCabinIds.at(booking.cabinID - 1),
      status,
    };
  });

  
  console.log(finalBookings);

  await bookingApi.createBookings(finalBookings as any[]);
}

const Uploader: React.FC = () => {
  const { open } = useSidebar();
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);

    try {
      await bookingApi.deleteBookings();
      await guestApi.deleteGuests();
      await cabinApi.deleteCabins();

      await guestApi.createGuests(guests as any[]);
      await cabinApi.createCabins(cabins as any[]);
      await createBookings();

      toast.success("upload done!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Upload failed: ${error.message}`);
      } else {
        toast.error("Upload failed: Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Pannel
      className={cn(
        "mt-auto flex flex-col gap-2 rounded bg-secondary px-2 py-3 text-center text-secondary-foreground",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <h3 className="font-medium uppercase italic">sample data</h3>

      <Button
        onClick={uploadAll}
        disabled={isLoading}
        variant={"default"}
        className="cursor-pointer rounded-full bg-indigo-600 text-white transition-all duration-200 hover:bg-indigo-700"
      >
        Upload ALL
      </Button>

      <Button
        onClick={() => {}}
        disabled={isLoading}
        variant={"outline"}
        className="cursor-pointer rounded-full transition-all duration-200"
      >
        Upload bookings ONLY
      </Button>
    </Pannel>
  );
};

export default Uploader;
