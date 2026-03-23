import Pannel from "@/components/Pannel";
import BookingTable from "@/features/bookings/BookingTable";
import BookingTableOperations from "@/features/bookings/BookingTableOperations";

export default function Bookings() {
  return (
    <>
      <h1 className="text-3xl">All Bookings</h1>

      <Pannel className="mt-6">
        <BookingTableOperations />
        <BookingTable />
      </Pannel>
    </>
  );
}
