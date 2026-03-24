import BookingBadge from "../bookings/BookingBadge";
import type { BookingWithRelations } from "../bookings/BookingTable";
import { cn } from "@/lib/utils";
import { HiMiniArrowDownCircle, HiMiniArrowUpCircle } from "react-icons/hi2";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";
import { useCheckOutBooking } from "../bookings/useBooking";
import { toast } from "react-toastify";
import { Spinner } from "@/components/ui/spinner";
import TopTip from "@/components/TopTip";

export default function TodayItem({ stay }: { stay: BookingWithRelations }) {
  const { Id, Status, NumNights, Guest } = stay;

  const [checkOutConfirmOpen, setCheckOutConfirmOpen] =
    React.useState<boolean>(false);

  const { mutate: checkOutBooking, isPending: isCheckOutPending } =
    useCheckOutBooking(Id!);

  return (
    <li
      className={cn(
        "grid items-center",
        "grid-cols-[5.2rem_0.1fr_1fr_0.2fr_auto] gap-3 py-2 text-sm"
      )}
    >
      <BookingBadge status={Status} className="w-auto" />
      <img
        src={Guest.CountryFlag}
        // alt={`Flag of ${Guest.}`}
        className="block max-w-5 rounded-sm border border-solid border-primary-foreground"
      />
      <div className="font-medium">{Guest.FullName}</div>
      <div>{NumNights}</div>
      {Status === "UnConfirmed" && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Action asChild>
              <Link to={`/bookings/${Id}/checkin`} className="cursor-pointer">
                <HiMiniArrowDownCircle className="text- size-6 text-green-500/80 dark:text-green-400/80" />
              </Link>
            </Action>
          </TooltipTrigger>
          <TooltipContent>
            <p>Check In</p>
          </TooltipContent>
        </Tooltip>
      )}
      {Status === "CheckedIn" && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Action onClick={() => setCheckOutConfirmOpen(true)}>
              <HiMiniArrowUpCircle className="size-6 text-amber-500/80 dark:text-amber-400/80" />
            </Action>
          </TooltipTrigger>
          <TooltipContent>
            <p>Check Out</p>
          </TooltipContent>
        </Tooltip>
      )}
      <AlertDialog
        open={checkOutConfirmOpen}
        onOpenChange={setCheckOutConfirmOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Check Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to proceed with the checkout?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="default"
              onClick={() =>
                checkOutBooking(undefined, {
                  onSuccess: () => {
                    toast.success("Booking checked out successfully");
                  },
                })
              }
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isCheckOutPending && Id === 166 && (
        <TopTip title="Checking out..." media={<Spinner />} />
      )}
    </li>
  );
}

function Action({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { icon?: React.ReactNode }) {
  return (
    <Button
      size="icon-xs"
      variant="ghost"
      className={cn(
        "rounded-full p-0.5 transition-transform duration-200 active:translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
