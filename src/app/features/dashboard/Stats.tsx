import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import type { BookingWithRelations } from "../bookings/BookingTable";
import { formatCurrency } from "@/lib/helps";
import Stat from "./Stat";

type StatsProps = {
  bookings: { CreatedAt: string; TotalPrice: number; ExtrasPrice: number }[];
  confirmedStays: BookingWithRelations[];
  numDays: number;
  cabinCount: number;
};

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: StatsProps) {
  const numberOfBookings = bookings?.length || 0;
  const sales = bookings?.reduce((total, booking) => {
    return total + booking.TotalPrice;
  }, 0);

  const checkIns = confirmedStays.length || 0;

  const occupancyRate =
    confirmedStays.reduce((total, stay) => {
      return total + stay.NumNights!;
    }, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase className="text-blue-500" />}
        value={numberOfBookings}
        iconClassName="bg-blue-100"
      />
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes className="text-green-500" />}
        value={formatCurrency(sales)}
        iconClassName="bg-green-100"
      />

      <Stat
        title="Check ins"
        icon={<HiOutlineCalendarDays className="text-indigo-500" />}
        value={checkIns}
        iconClassName="bg-indigo-100"
      />

      <Stat
        title="Occupancy rate"
        icon={<HiOutlineChartBar className="text-yellow-500" />}
        value={Math.round(occupancyRate * 100) + "%"}
        iconClassName="bg-yellow-100"
      />
    </>
  );
}
