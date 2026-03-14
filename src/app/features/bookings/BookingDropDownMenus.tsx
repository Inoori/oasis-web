import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEllipsisVertical,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import type { BookingWithRelations } from "./BookingTable";
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

export default function BookingDropDownMenus({
  booking: { Id, Status },
}: {
  booking: BookingWithRelations;
}) {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer rounded-md p-1.5 transition-all duration-200 hover:bg-primary/20">
          <HiEllipsisVertical className="size-6" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <Link to={`/bookings/${Id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <HiEye />
                See details
              </DropdownMenuItem>
            </Link>

            {Status === "UnConfirmed" && (
              <Link to={`/checkin/${Id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <HiArrowDownOnSquare />
                  Check in
                </DropdownMenuItem>
              </Link>
            )}

            {Status === "CheckedIn" && (
              <DropdownMenuItem className="cursor-pointer">
                <HiArrowUpOnSquare />
                <span>Check Out</span>
              </DropdownMenuItem>
            )}
            {Status === "CheckedOut" && (
              <DropdownMenuItem className="cursor-pointer">
                <HiArrowUpOnSquare />
                <span>Unconfirm</span>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setDeleteConfirmOpen(true)}
            >
              <HiTrash />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this booking? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => console.log("confirm deletion")}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
