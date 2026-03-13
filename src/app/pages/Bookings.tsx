import Pannel from "@/components/Pannel";
import BookingTable from "@/features/bookings/BookingTable";

export default function Bookings() {
  return (
    <>
      <h1 className="text-3xl">All Bookings</h1>

      <Pannel className="mt-6">
        {/* <CabinTableOperations /> */}
        <BookingTable />

        {/* <div className="bg-background pt-12">
            <Pagination dataLength={500} />
          </div> */}
      </Pannel>
    </>
  );
}
