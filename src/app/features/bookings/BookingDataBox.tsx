import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import type { BookingWithRelations } from "./BookingTable";
import { formatCurrency, formatDistanceFromNow } from "@/lib/helps";
import { format, isToday } from "date-fns";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function BookingDataBox({
  booking,
}: {
  booking: BookingWithRelations;
}) {
  const {
    CreatedAt,
    StartDate,
    EndDate,
    NumNights,
    NumGuests,
    CabinPrice,
    ExtrasPrice,
    TotalPrice,
    HasBreakfast,
    Observations,
    IsPaid,
    Cabin: { Name: cabinName },
    Guest: { FullName: guestName, Email, CountryFlag, NationalID },
  } = booking;

  return (
    <Card className="mt-5 px-2">
      <section>
        <header className="flex flex-wrap items-center justify-between px-2 py-5 text-lg font-medium">
          <div className="flex items-center gap-4 text-lg font-semibold">
            <HiOutlineHomeModern className="size-8" />
            <p>
              {NumNights} nights in Cabin
              <span className="ml-1 font-[Sono] text-xl">{cabinName}</span>
            </p>
          </div>

          <p>
            {format(new Date(StartDate!), "EEE, MMM dd yyyy")} (
            {isToday(new Date(StartDate!))
              ? "Today"
              : formatDistanceFromNow(StartDate!)}
            ) &mdash; {format(new Date(EndDate!), "EEE, MMM dd yyyy")}
          </p>
        </header>

        <section className="px-3 pt-8 pb-10">
          <div className="mt-4 mb-4 flex flex-wrap items-center gap-3 text-accent-foreground/60">
            {CountryFlag && (
              <img
                src={CountryFlag}
                alt={`Flag of ${CountryFlag}`}
                className="block max-w-5 rounded-xs border border-accent"
              />
            )}
            <p>
              {guestName} {NumGuests! > 1 ? `+ ${NumGuests! - 1} guests` : ""}
            </p>
            <span>&bull;</span>
            <p>{Email}</p>
            <span>&bull;</span>
            <p>National ID {NationalID}</p>
          </div>

          {Observations && (
            <div className="flex flex-wrap gap-4 px-0 py-2">
              <Label className="flex items-center gap-2 font-medium">
                <HiOutlineChatBubbleBottomCenterText className="size-5 text-indigo-600" />
                <span>Observations</span>
              </Label>
              <span>{Observations}</span>
            </div>
          )}

          {HasBreakfast && (
            <div className="flex items-center gap-4 px-0 py-2">
              <Label className="flex items-center gap-2 font-medium">
                <HiOutlineCheckCircle className="size-5" />
                <span>Breakfast included?</span>
              </Label>
              {HasBreakfast ? "Yes" : "No"}
            </div>
          )}

          <div
            className={cn(
              "mt-6 flex items-center justify-between gap-1 rounded-sm px-8 py-4",
              IsPaid
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            )}
          >
            <div className="flex items-center gap-4 px-0 py-2">
              <Label className="flex items-center gap-2 font-medium">
                <HiOutlineCurrencyDollar className="size-6" />
                <span>Total Price</span>
              </Label>
              {formatCurrency(TotalPrice)}
              {HasBreakfast &&
                ` (${formatCurrency(CabinPrice)} cabin + ${formatCurrency(
                  ExtrasPrice
                )} breakfast)`}
            </div>
            <p className="text-sm font-semibold uppercase">
              {IsPaid ? "Paid" : "Will pay at property"}
            </p>
          </div>
        </section>

        <footer className="px-10 py-4 text-right text-xs text-accent-foreground/60">
          <p>Booked {format(new Date(CreatedAt!), "EEE, MMM dd yyyy, p")}</p>
        </footer>
      </section>
    </Card>
  );
}
